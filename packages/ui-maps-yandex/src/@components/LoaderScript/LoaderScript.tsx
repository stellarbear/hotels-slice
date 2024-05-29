import * as React from "react";
import {useScript} from "../../@hooks";
import {LoaderPlaceholder} from "../LoaderPlaceholder";

type Props = {
    src: string;
    onError?: string;
    onLoading?: string;

    children: React.ReactNode;
};

export const LoaderScript = React.memo<Props>((props) => {
    const {src,
        onLoading = "Загрузка скрипта",
        onError = "Возникла проблема при загрузке",
        children,
    } = props;
    const {error, loaded} = useScript(src);

    if (error) {
        return (
            <LoaderPlaceholder text={onError} />
        );
    }

    if (!loaded) {
        return (
            <LoaderPlaceholder text={onLoading} />
        );
    }

    return (
        <>{children}</>
    );
});
