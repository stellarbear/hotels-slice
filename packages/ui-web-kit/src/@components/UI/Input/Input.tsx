import {ThemePaletteColors} from "@app/ui-web-core";
import * as React from "react";
import {InputUI} from "./styles";
import {Loader} from "../Loader";

type Props = React.ComponentProps<"input"> & {
    color?: ThemePaletteColors;
    left?: React.ReactNode;
    right?: React.ReactNode;
    loading?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {
        loading = false,
        color = "primary",
        disabled,
        left, right = loading && <Loader.Spinner />,
        onFocus,
        onBlur,
        ...rest
    } = props;

    const [focused, setFocused] = React.useState(false);

    const onFocusHandler = React.useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        onFocus?.(e);
        setFocused(true);
    }, [onFocus]);
    const onBlurHandler = React.useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        onBlur?.(e);
        setFocused(false);
    }, [onBlur]);

    return (
        <InputUI.InputContent
            color={color}
            disabled={disabled}
            focused={focused}>
            {left && (
                <InputUI.InputAdornment>
                    {left}
                </InputUI.InputAdornment>
            )}
            <InputUI.InputField
                {...rest}
                ref={ref}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                disabled={disabled} />
            {right && (
                <InputUI.InputAdornment>
                    {right}
                </InputUI.InputAdornment>
            )}
        </InputUI.InputContent>
    );
});
