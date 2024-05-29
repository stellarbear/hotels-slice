import {ExtensionsArray} from "@app/extensions-classes";
import {isString} from "@app/extensions-guard";
import {Input} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";

type Props = Omit<React.ComponentProps<typeof Input>, "pattern"> & {
    count: number;
    pattern: RegExp;

    value?: string;
    onChange: (...event: any[]) => void;
};

export const ControllerInputCode = React.memo<Props>((props) => {
    const {count, pattern, value, onChange, className, ...rest} = props;
    const inputs = React.useRef<(HTMLInputElement | null)[]>([]);

    const getValue = React.useCallback((input?: string) => {
        const parsed = isString(input) ? input : "";
        const sliced = parsed.slice(0, count);
        const filtered = Array.from(sliced.matchAll(new RegExp(pattern, "g"))).join("");

        return filtered;
    }, [pattern, count]);

    const [state, setState] = React.useState(getValue(value));

    React.useEffect(() => {
        setState(getValue(value));
    }, [value]);

    React.useEffect(() => {
        inputs.current[state.length]?.focus();
    }, [inputs, state]);

    const onInputChange = React.useCallback((index: number) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.slice(0, 1);

            if (value.match(pattern) || value === "") {
                const update = state.slice(0, index) + value;
                setState(update);
                onChange(update);
            }
        }, [state]);

    return (
        <Layout>
            {ExtensionsArray.sequence(count, (i) => (
                <Input
                    {...rest}
                    key={i}
                    value={state[i] ?? ""}
                    onChange={onInputChange(i)}
                    ref={el => inputs.current[i] = el}
                />
            ))}
        </Layout>
    );
});

const Layout = styled.div`
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(4, auto);
`;
