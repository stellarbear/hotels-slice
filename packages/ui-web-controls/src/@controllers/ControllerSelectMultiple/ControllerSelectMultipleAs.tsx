import * as React from "react";
import {ControllerSelectMultipleProps, ControllerSelectMultiplePropsRender} from "./types";
import {useControllerSelectMultiple} from "./useControllerSelectMultiple";

type Props<T, V> =
    & ControllerSelectMultipleProps<T, V>
    & {
        children: (input: ControllerSelectMultiplePropsRender<T>) => React.ReactNode;
    };

export const ControllerSelectMultipleAs = <T, V extends PropertyKey>(props: Props<T, V>) => {
    const control = useControllerSelectMultiple(props);

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
