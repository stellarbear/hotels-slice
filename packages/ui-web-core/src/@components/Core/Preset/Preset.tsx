import React from "react";
import {presets} from "./styles";

type Props = {
    children: React.ReactNode;
    type: PresetType;
};

type PresetType =
    "center";

export const Preset = React.memo<Props>((props) => {
    const {type, children, ...rest} = props;

    return React.createElement(presets[type], rest, children);
});
