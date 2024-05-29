import * as React from "react";
import {ControllerSelectProps, ControllerSelectPropsRender} from "./types";
import {useControllerSelect} from "./useControllerSelect";

type Props<T, V> =
    & ControllerSelectProps<T, V>
    & {
        children: (input: ControllerSelectPropsRender<T>) => React.ReactNode;
    };

export const ControllerSelectAs = <T, V extends PropertyKey>(props: Props<T, V>) => {
    const control = useControllerSelect(props);

    return (
        <>
            {props.items.map((entry) => (
                <React.Fragment key={String(props.getId(entry))}>
                    {props.children({
                        label: props.getLabel(entry),
                        onClick: control.onClick(entry),
                        isActive: control.isActive(entry),
                        entry,
                    })}
                </React.Fragment>
            ))}
        </>
    );
};
