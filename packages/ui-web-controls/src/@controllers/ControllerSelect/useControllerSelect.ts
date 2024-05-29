import {ExtensionsObject} from "@app/extensions-classes";
import {isDefined} from "@app/extensions-guard";
import React from "react";
import {ControllerSelectProps} from "./types";

type Props<T, V> = ControllerSelectProps<T, V>;

export const useControllerSelect = <T, V>(props: Props<T, V>) => {
    const {
        getId,
        unset = "Не выбрано",
        items, onChange,
        getLabel = String,
        disabled = false,
        value,
    } = props;

    const dict = React.useMemo(() => ExtensionsObject.fromArray(items, entry => String(getId(entry))), [items]);
    const isActive = React.useCallback((entry: T) => getId(entry) === value, [getId, value]);
    const onClick = React.useCallback((entry: T) =>
        () => onChange(getId(entry), entry), [props.value]);

    const label = React.useMemo(() =>
        isDefined(value) && (String(value) in dict)
            ? getLabel(dict[String(value)])
            : unset,
        [value]);

    return ({
        label,
        disabled: disabled || items.length === 0,

        onClick,
        isActive,
    }) as const;
};
