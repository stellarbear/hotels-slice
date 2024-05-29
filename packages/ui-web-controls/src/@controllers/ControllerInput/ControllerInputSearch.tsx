
import {ExtensionsObject} from "@app/extensions-classes";
import {useTimer} from "@app/extensions-react";
import {IconButton} from "@app/ui-icons";
import {Flex} from "@app/ui-web-core";
import {Dropdown, Input, Loader} from "@app/ui-web-kit";
import * as React from "react";

type InputProps = Omit<React.ComponentProps<typeof Input>, "value" | "onChange" | "onError" | "disabled">;

type Props<V, T, K extends PropertyKey> = InputProps & {
    value?: K | null;
    onChange: (id: K | null, data: T | null) => void;

    query: (variables: V) => Promise<T[] | undefined>;
    variables: (input: string) => V;

    getId: (src: T) => K;
    getLabel: (src: T) => React.ReactNode;

    onError?: (e: string) => void;
    disabled?: boolean | ((e: T) => boolean);
};

const isBoolean = (src: any): src is boolean => typeof src === "boolean";
const isFunction = (src: any): src is (...args: any[]) => any => typeof src === "function";
export const ControllerInputSearch = <V, T, K extends PropertyKey>(props: Props<V, T, K>) => {
    const {
        value,
        getId,
        variables,
        onChange,
        onError,
        query,
        getLabel = String,
        disabled = false,
        ...rest
    } = props;

    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState<T[]>([]);

    const timer = useTimer(500);
    const [input, setInput] = React.useState("");

    React.useEffect(() => {
        if (input.length > 0) {
            timer.call(() =>
                onQuery(variables(input)));
        }
    }, [input]);

    const onQuery = React.useCallback(async (variables: V) => {
        setLoading(true);

        try {
            const result = await query(variables);
            setOptions(result ?? []);
        } catch (error) {
            onError?.(error instanceof Error
                ? error.message
                : JSON.stringify(error));
        } finally {
            setLoading(false);
        }
    }, []);

    const [opened, setOpened] = React.useState(false);

    const onFocus = React.useCallback(() => setOpened(true), []);
    const onBlur = React.useCallback(() => setOpened(false), []);

    const dict = React.useMemo(() => ExtensionsObject.fromArray(options, getId), [options]);
    const current = React.useMemo(() => (value && value in dict && dict[value]) || null, [dict, value]);

    const onReset = React.useCallback(() => {
        onChange(null, null);
        setInput("");
    }, []);

    const onClickChangeEvent = React.useCallback((entry: T) => () => {
        onChange(getId(entry), entry);
    }, [onChange]);

    const onInputChangeEvent = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    if (current) {
        return (
            <Flex.Row align="center" justify="space-between">
                {getLabel(current)}

                <IconButton onClick={onReset} icon="close" />
            </Flex.Row>
        );
    }

    return (
        <Dropdown.Handle
            opened={opened}
            button={
                <Input
                    {...rest}
                    value={input}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    right={loading && <Loader.Spinner />}
                    disabled={isBoolean(disabled) ? disabled : false}
                    onChange={onInputChangeEvent}
                />
            }>
            {options.map((entry) => (
                <Dropdown.Item
                    key={String(getId(entry))}
                    disabled={isFunction(disabled) ? disabled(entry) : false}
                    onClick={onClickChangeEvent(entry)}>
                    {getLabel(entry)}
                </Dropdown.Item>
            ))}
        </Dropdown.Handle>
    );
};
