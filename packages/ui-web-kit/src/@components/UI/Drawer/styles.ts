import styled, {css} from "styled-components";
import {DrawerSide} from "./Drawer";
import {Overlay} from "../../Core";

type DrawerContentProps = {
    side: DrawerSide;
};

const radius = "1rem";

const DrawerContent = styled.div<DrawerContentProps>`
    height: 100%;
    width: 100%;
    
    background-color: ${p => p.theme.variables.background};
    overflow: hidden;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 20%), 0px 1px 1px 0px rgba(0, 0, 0, 14%),
    0px 1px 3px 0px rgba(0, 0, 0, 12%);

    ${p => p.side === "left" && css`
        border-top-right-radius: ${radius};
        border-bottom-right-radius: ${radius};
    `}
    ${p => p.side === "top" && css`
        border-bottom-left-radius: ${radius};
        border-bottom-right-radius: ${radius};
    `}
    ${p => p.side === "bottom" && css`
        border-top-right-radius: ${radius};
        border-top-left-radius: ${radius};
    `}
    ${p => p.side === "right" && css`
        border-top-left-radius: ${radius};
        border-bottom-left-radius: ${radius};
    `}
`;

const DrawerBlur = styled(Overlay.Blur)`
    backdrop-filter: brightness(0.5);
`;

export const DrawerUI = {
    DrawerBlur,
    DrawerContent,
};
