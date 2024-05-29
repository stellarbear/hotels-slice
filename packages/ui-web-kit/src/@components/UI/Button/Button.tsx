import {ThemePaletteColors} from "@app/ui-web-core";
import * as React from "react";
import {Loader} from "../Loader";
import {ButtonUI} from "./styles";

export type ButtonColor = ThemePaletteColors;
export type ButtonVariant = "contained" | "secondary" | "outlined" | "text";

type Props = Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
    loading?: boolean;
    fullwidth?: boolean;
    color?: ButtonColor;
    variant?: ButtonVariant;
};

export const Button = React.memo<Props>((props) => {
    const {
        children,
        color = "primary",
        variant = "contained",
        loading = false,
        disabled,
        ...rest
    } = props;

    return (
        <ButtonUI.ButtonContent
            type="button"
            {...rest}
            color={color}
            variant={variant}
            disabled={disabled || loading}>
            <>
                {children}
                {loading && (
                    <Loader.Spinner />
                )}
            </>
        </ButtonUI.ButtonContent>
    );
});
