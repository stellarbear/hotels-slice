import {Dropdown, Input} from "@app/ui-web-kit";
import * as React from "react";

type InputProps = Omit<React.ComponentProps<typeof Input>, "value" | "onChange">;

type Props<T, U = T> = InputProps & {
    value?: string | null;
    onChange?: (data: U) => void;
    onSearchChange?: (data: string) => void;

    items: T[];
    getId: (src: T) => U;
    getLabel: (src: T) => string;

    max?: number;
    withoutFiltering?: boolean;
};

export const ControllerInputDropdown = <T, U>(props: Props<T, U>) => {
    const {
        value,
        max = 5,
        items, onChange, onSearchChange,
        withoutFiltering = false,
        getLabel,
        getId,
        ...rest
    } = props;

    const [input, setInput] = React.useState(value ?? "");
    const [opened, setOpened] = React.useState(false);

    React.useEffect(() => {
        setInput(value ?? "");
    }, [value]);

    const onFocus = React.useCallback(() => setOpened(true), []);
    const onBlur = React.useCallback(() => setOpened(false), []);

    const filtered = React.useMemo(() => {
        if (withoutFiltering || input.length === 0) {
            return items;
        }

        return items.filter(e =>
            getLabel(e)
                .toLowerCase()
                .includes(input.toLowerCase()))
            .slice(0, max);
    }, [items, input, max, withoutFiltering]);

    const onClickChangeEvent = React.useCallback((entry: T) => () => {
        setInput(getLabel(entry));
        onChange?.(getId(entry));
    }, [onChange]);

    const onInputChangeEvent = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        onSearchChange?.(e.target.value);
    }, [onSearchChange]);

    return (
        <Dropdown.Handle
            opened={opened}
            button={
                <Input
                    {...rest}
                    value={input}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onInputChangeEvent}
                />
            }>
            {filtered.map((entry) => (
                <Dropdown.Item
                    key={JSON.stringify(getId(entry))}
                    active={getId(entry) === value}
                    onClick={onClickChangeEvent(entry)}>
                    {getLabel(entry)}
                </Dropdown.Item>
            ))}
        </Dropdown.Handle>
    );
};
