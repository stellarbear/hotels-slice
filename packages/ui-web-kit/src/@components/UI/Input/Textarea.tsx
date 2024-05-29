import {ThemePaletteColors} from "@app/ui-web-core";
import * as React from "react";
import {InputUI} from "./styles";

type Props = React.ComponentPropsWithoutRef<"textarea"> & {
    color?: ThemePaletteColors;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
    const {
        color = "primary",
        disabled,
        onFocus,
        onBlur,
        ...rest
    } = props;

    const [focused, setFocused] = React.useState(false);

    const onFocusHandler = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
        onFocus?.(e);
        setFocused(true);
    }, [onFocus]);
    const onBlurHandler = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement, Element>) => {
        onBlur?.(e);
        setFocused(false);
    }, [onBlur]);

    return (
        <InputUI.InputContent
            color={color}
            disabled={disabled}
            focused={focused}>
            <InputUI.TextareaField
                {...rest}
                ref={ref}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                disabled={disabled} />
        </InputUI.InputContent>
    );
});
