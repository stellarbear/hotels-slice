import {ThemePaletteColors} from "@app/ui-web-core";
import * as React from "react";
import {RadioButtonUI} from "./styles";

type Props = React.ComponentProps<"input"> & {
    color?: ThemePaletteColors;
};

export const RadioButton = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {children, color = "primary", ...rest} = props;

    return (
        <RadioButtonUI.RadioButtonLabel>
            <RadioButtonUI.RadioButtonInput
                {...rest}
                ref={ref}
                color={color}
                type="radio" />
            <RadioButtonUI.RadioButtonIcon>
                <RadioButtonUI.RadioButtonIconChecked />
                <RadioButtonUI.RadioButtonIconUnchecked />
            </RadioButtonUI.RadioButtonIcon>
            <RadioButtonUI.RadioButtonContent>
                {children}
            </RadioButtonUI.RadioButtonContent>
        </RadioButtonUI.RadioButtonLabel>
    );
});
