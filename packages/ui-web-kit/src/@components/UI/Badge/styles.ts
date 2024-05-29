import styled, {css} from "styled-components";
import {StyledCss, ThemePaletteColors} from "../../Core";

export type BadgePosition =
    | "right-top" | "right-bottom" | "right"
    | "left-top" | "left-bottom" | "left";

const positions: Record<BadgePosition, StyledCss> = {
    "right": css`
        right: 0%;
        top: 50%;
        transform: translateY(-50%);
      `,
    "right-bottom": css`
        bottom: 0%;
        right: 0%;
      `,
    "right-top": css`
        top: 0%;
        right: 0%;
      `,

    "left": css`
        left: 0%;
        top: 50%;
        transform: translateY(-50%);
      `,
    "left-bottom": css`
        bottom: 0%;
        left: 0%;
      `,
    "left-top": css`
        top: 0%;
        left: 0%;
      `,
};

type BadgeNotificationProps = {
    position: BadgePosition;
    color: ThemePaletteColors;
};

const BadgeNotification = styled.div<BadgeNotificationProps>`
    position: absolute;
    text-align: center;
    border-radius: 50%;
    pointer-events: none;
    background-color: ${p => p.theme.palette.color(p.color)};

    margin: 0;
    padding: 0.1rem;
    z-index: 2;
    width: 1rem;
    height: 1rem;

    font-size: 12px;
    ${(p) => positions[p.position]};
`;

export const BadgeUI = {
    BadgeNotification,
};
