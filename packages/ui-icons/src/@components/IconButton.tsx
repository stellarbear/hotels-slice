import * as React from "react";
import styled, {css} from "styled-components";
import {iconNames} from "../data";
import {Icon, IconName} from "./Icon";

type Props =
    & React.ComponentPropsWithoutRef<"button">
    & IconButtonContentProps
    & {
        icon: IconName | JSX.Element;
    };

const isIcon = (src: any): src is IconName =>
    src in iconNames;

/**
 * @deprecated since version 2.0.0
 */
export const IconButton = React.memo<Props>((props) => {
    const {icon, ...rest} = props;

    return (
        <IconButtonContent {...rest} type="button">
            {isIcon(icon)
                ? <Icon icon={icon} />
                : <>{icon}</>}
        </IconButtonContent>
    );
});

type IconButtonContentProps = {
    border?: boolean | "rounded";
};

const IconButtonContent = styled.button<IconButtonContentProps>`
    border-style: none;
    border-color: inherit;
    color: inherit;
    background: transparent;
    min-width: 2.5rem;
    min-height: 2.5rem;
    padding: 0.5rem;
    cursor: pointer;

    ${p => p.border && css`
        border-style: solid;
        border-width: 1px;
        border-radius: ${p.border === "rounded" ? "50%" : "0.25rem"};
    `}

    &:disabled {
        opacity: 0.4;
        pointer-events: none;
    }
`;
