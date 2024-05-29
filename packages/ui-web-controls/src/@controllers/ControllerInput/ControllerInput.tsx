import {Input} from "@app/ui-web-kit";
import * as React from "react";

type Props = Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & {
    value?: any;
    onChange: (input: string) => void;
};

export const ControllerInput = React.memo<Props>((props) => {
    const {
        value,
        onChange,
        ...rest
    } = props;

    const onChangeEvent = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value);
    }, [onChange]);

    return (
        <Input
            value={value ?? ""}
            onChange={onChangeEvent}
            {...rest}
        />
    );
});
