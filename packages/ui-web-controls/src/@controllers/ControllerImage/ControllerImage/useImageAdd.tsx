import {Image} from "@app/ui-web-kit";
import React from "react";
import {extract} from "./extract";

type Props = {
    value?: Image["Shape"][];
    onChange: (value: any[]) => void;
};

export const useImageAdd = (props: Props) => {
    const {value = []} = props;

    const onAdd = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            const update = [...value, await extract.srcFromFile(file)];
            props.onChange(update);

            e.target.value = "";
        }
    }, [props.value]);

    return onAdd;
};
