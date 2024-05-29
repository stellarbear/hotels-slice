import {Flex, Section} from "@app/ui-web-core";
import {Drawer, Dropdown, Input, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {ControllerSelectProps} from "./types";
import {useControllerSelect} from "./useControllerSelect";
import {useControllerSelectSearch} from "./useControllerSelectSearch";

type Props<T, V> =
    & ControllerSelectProps<T, V>
    & {
        button?: JSX.Element;
    };

export const ControllerSelectDrawer = <T, V>(props: Props<T, V>) => {
    const control = useControllerSelect(props);
    const search = useControllerSelectSearch(props);

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
                    {search.items.map((entry, index) => (
                        <Dropdown.Item
                            key={index}
                            disabled={props.disabledSpecific?.(entry)}
                            onClick={control.onClick(entry)}
                            active={control.isActive(entry)}
                            closeOnClick>
                            {props.getLabel(entry)}
                        </Dropdown.Item>
                    ))}
                    {props.search && (
                        <Section>
                            <Typo.Label>Поиск</Typo.Label>
                            <Input {...search.input} />
                        </Section>
                    )}
                </Flex.Col>
            </Section>
        </Drawer>
    );
};
