import {DefaultTheme, FlattenInterpolation, ThemeProps} from "styled-components";
import {ThemePalette} from "./ThemePalette";
import {ThemeVariables} from "./ThemeVariables";

export const themeVariables = {
    animation: "0.3s",
    disabled: "0.4",

    background: "#ffffff",
    foreground: "#000000",
    overlay: "rgba(0, 0, 0, 0.50)",
    input: "#414141",

    surface: "rgba(255, 255, 255, 0.05)",
    divider: "rgba(0, 0, 0, 0.1)",
};

export const theme = {
    palette: ThemePalette,
    variables: ThemeVariables.instance,
};

export type Theme = typeof theme;

export type StyledProperties<T> = {
    [K in keyof T as `$${K & string}`]: T[K]
};
export type StyledCss = FlattenInterpolation<ThemeProps<DefaultTheme>>;
export type StyledProps = {className?: string};

declare module "styled-components" {
    // eslint-disable-next-line
    interface DefaultTheme extends Theme { }
}
