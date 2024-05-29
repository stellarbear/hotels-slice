import styled, {css} from "styled-components";
import {ThemePaletteColors} from "../../../@theme";

type Color =
    | ThemePaletteColors
    | `#${string}`
    | "currentColor";

type ColoredProps = {
    background?: Color | false;
    color?: Color | boolean;
    border?: Color | false;
};

const isPaletteColor = (src: Color): src is ThemePaletteColors =>
    !src.startsWith("#") && src !== "currentColor";

type Props = Omit<React.ComponentProps<"span">, "color"> & ColoredProps;

export const Colored = styled.span<ColoredProps>`
    ${(p) => p.color && css`
        color: ${isPaletteColor(p.color) 
            ? p.theme.palette.color(p.color) 
            : p.color};
    `}
    ${(p) => p.background && css`
        background-color: ${isPaletteColor(p.background) 
            ? p.theme.palette.color(p.background) 
            : p.background};
    `}
    ${(p) => p.border && css`
        border-color: ${isPaletteColor(p.border) 
            ? p.theme.palette.color(p.border) 
            : p.border};
    `}
` as React.FC<Props>;
