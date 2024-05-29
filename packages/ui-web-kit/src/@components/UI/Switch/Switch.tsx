import * as React from "react";
import {ThemePaletteColors} from "../../Core";
import {SwitchUI} from "./styles";

type Props = {
    color?: ThemePaletteColors;
};

export const Switch = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {color = "primary"} = props;
    
    return (
        <SwitchUI.SwitchContent color={color}>
            <SwitchUI.SwitchTrack color={color}/>
            <SwitchUI.SwitchInput {...props} ref={ref} type="checkbox" />
            <SwitchUI.SwitchThumb color={color}/>
        </SwitchUI.SwitchContent>
    );
});
