import {ThemePaletteColors} from "@app/ui-web-core";
import * as React from "react";
import {CheckboxUI} from "./styles";

type Props = React.ComponentProps<"input"> & {
    color?: ThemePaletteColors;
};

export const Checkbox = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {children, color = "primary", ...rest} = props;

    return (
        <CheckboxUI.CheckboxLabel>
            <CheckboxUI.CheckboxInput
                {...rest}
                ref={ref}
                color={color}
                type="checkbox" />
            <CheckboxUI.CheckboxIcon>
                <CheckboxUI.CheckboxIconChecked />
                <CheckboxUI.CheckboxIconUnchecked />
            </CheckboxUI.CheckboxIcon>
            <CheckboxUI.CheckboxContent>
                {children}
            </CheckboxUI.CheckboxContent>
        </CheckboxUI.CheckboxLabel>
    );
});
