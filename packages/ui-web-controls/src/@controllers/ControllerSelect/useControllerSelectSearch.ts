import {useStateDeferred} from "@app/extensions-react";
import React from "react";
import {ControllerSelectProps} from "./types";

type Props<T, V> = ControllerSelectProps<T, V>;

export const useControllerSelectSearch = <T, V>(props: Props<T, V>) => {
    const {
        search,
        items,
    } = props;

    const [value, setValue] = useStateDeferred(250, "");
    const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }, []);

    const filtered = React.useMemo(() => {
        return search ? items.filter(e => search(e, value.deffered)) : items;
    }, [value.deffered]);

    const input = {
        value: value.current,
        onChange,
    };

    return ({
        items: filtered,
        input,
    }) as const;
};
