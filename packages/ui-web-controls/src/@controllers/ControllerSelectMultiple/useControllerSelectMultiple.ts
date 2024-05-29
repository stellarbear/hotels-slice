import {ExtensionsObject} from "@app/extensions-classes";
import React from "react";
import {ControllerSelectMultipleProps} from "./types";

type Props<T, V> = ControllerSelectMultipleProps<T, V>;

export const useControllerSelectMultiple = <T, V extends PropertyKey>(props: Props<T, V>) => {
    const {
        getId,
        unset = "Не выбрано",
        items, onChange,
        getLabel = String,
        disabled = false,
        limit,
        value = [],
    } = props;

    const dict = React.useMemo(() => ExtensionsObject.fromArray(items, entry => getId(entry)), [items]);
    const isActive = React.useCallback((entry: T) => value.includes(getId(entry)), [getId, value]);
    const onClick = React.useCallback((entry: T) => () => {
        const max = limit ?? items.length + 1;

        if (value.includes(getId(entry))) {
            onChange(value.filter(e => e !== getId(entry)), entry);
        } else {
            const update = [...value, getId(entry)];
            if (update.length >= max) {
                update.shift();
            }
            onChange(update, entry);
        }
    }, [value]);

    const label = React.useMemo(() =>
        value
            .map(entry => dict[entry])
            .filter(e => e !== undefined)
            .map(getLabel)
            .join(", ") || unset,
        [value, dict]);

    return ({
        label,
        disabled: disabled || items.length === 0,

        onClick,
        isActive,
    }) as const;
};
