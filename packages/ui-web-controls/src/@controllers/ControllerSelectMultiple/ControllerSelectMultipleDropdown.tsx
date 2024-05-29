import {Dropdown} from "@app/ui-web-kit";
import * as React from "react";
import {ControllerSelectMultipleProps} from "./types";
import {useControllerSelectMultiple} from "./useControllerSelectMultiple";

type Props<T, V> =
    ControllerSelectMultipleProps<T, V>
    & {
        button?: JSX.Element;
    };

export const ControllerSelectMultipleDropdown = <T, V extends PropertyKey>(props: Props<T, V>) => {
    const control = useControllerSelectMultiple(props);

    const button = React.cloneElement(props.button ?? (
        <Dropdown.Trigger>
            {control.label}
        </Dropdown.Trigger>
    ), {disabled: control.disabled});

    return (
        <Dropdown.Handle
            {...props}
            side="bottom-auto"
            button={button}>
            {props.items.map((entry, index) => (
                <Dropdown.Item
                    key={index}
                    disabled={props.disabledSpecific?.(entry)}
                    onClick={control.onClick(entry)}
                    active={control.isActive(entry)}>
                    {props.getLabel(entry)}
                </Dropdown.Item>
            ))}
        </Dropdown.Handle>
    );
};
