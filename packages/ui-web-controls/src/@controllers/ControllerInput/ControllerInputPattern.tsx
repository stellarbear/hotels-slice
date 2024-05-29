import {Input} from "@app/ui-web-kit";
import * as React from "react";

type Pattern =
    | "digits"
    | "cyrillyc"
    | `^${string}$`;

const patterns: Record<Pattern, string> = {
    "cyrillyc": "^[- а-яА-ЯёË]*$",
    "digits": "^[0-9]*$",
};

type Props = Omit<React.ComponentProps<typeof Input>, "value" | "pattern"> & {
    pattern: Pattern;
    regex?: string;

    value?: any;
    onChange: (input: string) => void;
};

export const ControllerInputPattern = React.memo<Props>((props) => {
    const {
        value,
        pattern,
        onChange,
        ...rest
    } = props;

    const onChangeEvent = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const regex = new RegExp(
            pattern in patterns
                ? patterns[pattern]
                : pattern,
        );

        if (regex.test(event.target.value)) {
            onChange?.(event.target.value);
        }
    }, [onChange]);

    return (
        <Input
            value={value ?? ""}
            onChange={onChangeEvent}
            {...rest}
        />
    );
});
