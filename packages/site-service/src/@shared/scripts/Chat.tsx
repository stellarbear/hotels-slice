import {useScript} from "@app/extensions-react";
import * as React from "react";

type JivoApiMessage = {
    title?: string;
    content: string;
};

type JivoApi = {
    setCustomData: (input: JivoApiMessage[]) => void;
};

declare let jivo_api: JivoApi | undefined;
declare global {
    interface Window {
        jivo_onLoadCallback?: () => void;
        jivo_destroy?: () => void;
        jivo_init?: () => void;
    }
}

export const useChat = (id: string | false | undefined, info: JivoApiMessage[]) => {
    const {loaded} = useScript(
        `https://code.jivo.ru/widget/${id}`,
        {type: "src", skip: !id},
    );

    React.useEffect(() => {
        if (loaded) {
            window.jivo_init?.();

            window.jivo_onLoadCallback = () => {
                jivo_api?.setCustomData(info);
            };

            return () => {
                window.jivo_destroy?.();
            };
        }
    }, [loaded]);
};
