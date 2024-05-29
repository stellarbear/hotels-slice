import {Flex, Overlay, Section} from "@app/ui-web-core";
import {Button, Checkbox, Drawer, Dropdown} from "@app/ui-web-kit";
import * as React from "react";
import {ControllerSelectMultipleProps} from "./types";
import {useControllerSelectMultiple} from "./useControllerSelectMultiple";

type Props<T, V> =
    ControllerSelectMultipleProps<T, V>
    & {
        button?: JSX.Element;
    };

export const ControllerSelectMultipleDrawer = <T, V extends PropertyKey>(props: Props<T, V>) => {
    const control = useControllerSelectMultiple(props);

    const button = React.cloneElement(props.button ?? (
        <Dropdown.Trigger>
            {control.label}
        </Dropdown.Trigger>
    ), {disabled: control.disabled});

    return (
        <Drawer
            fill="fit"
            side="bottom"
            {...props}
            button={button}
        >
            <Section>
                <Flex.Col>
                    {props.items.map((entry, index) => (
                        <Checkbox
                            key={index}
                            disabled={props.disabledSpecific?.(entry)}
                            checked={control.isActive(entry)}
                            onChange={control.onClick(entry)}>
                            {props.getLabel(entry)}
                        </Checkbox>
                    ))}
                    <Overlay.Use>
                        {(overlay) => (
                            <Button fullwidth onClick={overlay.close}>Подтвердить</Button>
                        )}
                    </Overlay.Use>
                </Flex.Col>
            </Section>
        </Drawer>
    );
};
