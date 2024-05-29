import {Input} from "@app/ui-web-kit";
import * as React from "react";
import {Mask, usePattern} from "./usePattern";

type Props = Omit<React.ComponentProps<typeof Input>, "onChange"> & {
    mask: Mask;
    value?: string;
    onChange: (value: string) => void;
    separator?: string | string[];
};

//  mask example: 
//  ["+7 (", /\d/, /\d/, /\d/, ") ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, " "]
export const ControllerInputMask = React.memo<Props>((props) => {
    const {
        mask,
        value,
        onChange,
        separator = "_",
        ...rest
    } = props;

    const [text, setText] = React.useState("");
    const pattern = usePattern(mask, separator);

    React.useEffect(() => {
        if (value) {
            setText(pattern.validate(value));
        } else {
            setText("");
        }
    }, [value, pattern.regexp]);

    React.useEffect(() => {
        pattern.updateCaret();
    }, [text]);

    const onChangeEvent = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const extracted = pattern.extract(e.target.value);
        const result = pattern.validate(extracted);
        setText(result);

        onChange((result.length === pattern.regexp.length)
            ? result
            : null as any);
    }, [text]);

    return (
        <Input
            {...rest}
            ref={pattern.input}
            onClick={pattern.updateCaret}
            onFocus={pattern.updateCaret}
            value={pattern.apply(text)}
            onChange={onChangeEvent}
        />
    );
});
