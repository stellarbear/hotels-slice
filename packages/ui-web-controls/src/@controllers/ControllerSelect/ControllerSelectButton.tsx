import {Button} from "@app/ui-web-kit";
import * as React from "react";
import {ControllerSelectProps} from "./types";
import {useControllerSelect} from "./useControllerSelect";

type Props<T, V> =
    & ControllerSelectProps<T, V>;

export const ControllerSelectButton = <T, V extends PropertyKey>(props: Props<T, V>) => {
    const control = useControllerSelect(props);

    return (
        <>
            {props.items.map((entry) => (
                <Button
                    key={String(props.getId(entry))}
                    onClick={control.onClick(entry)}
                    color={control.isActive(entry) ? "primary" : "secondary"}
                    variant={control.isActive(entry) ? "contained" : "secondary"}>
                    {props.getLabel(entry)}
                </Button>
            ))}
        </>
    );
};
