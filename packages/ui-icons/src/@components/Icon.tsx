import * as React from "react";
import {iconNames} from "../data";

export type IconName = keyof typeof iconNames;

type Props = {
    icon?: IconName;
    children?: JSX.Element;

    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];

    fill?: string;
    viewBox?: string;
    className?: string;
};

export const Icon = React.memo<Props>((props) => {
    const {
        icon,
        children,
        width = 24,
        height = width,
        fill = "currentColor",
        viewBox = "0 0 24 24",
        ...rest
    } = props;

    return (
        <svg
            {...rest}
            fill={fill}
            width={width}
            height={height}
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg">
            {icon && React.createElement(iconNames[icon])}
            {children && children}
        </svg>
    );
});
