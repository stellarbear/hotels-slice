import styled, {css} from "styled-components";

type TabButtonProps = {
    active?: boolean;
};

const TabHandleButton = styled.button<TabButtonProps>`
    all: unset;
    cursor: pointer;
    padding: 0rem 0rem 0.75rem;
    position: relative;
    margin: 0.5rem 0.5rem 0;
    border-bottom: 2px solid transparent;
    user-select: none;
    white-space: pre;
    /* color: ${p => p.theme.variables.input}; */

    transition-duration: ${p => p.theme.variables.animation};
    transition-property: color, border-bottom;

    ${p => p.active && css`
        color: ${p => p.theme.palette.color("primary")};
        border-bottom: 2px solid ${p => p.theme.palette.color("primary")};
    `};
`;

const TabHandleContent = styled.div`
    display: flex;
    align-items: center;
    overflow: auto;

    border-bottom: 1px solid ${p => p.theme.variables.divider};
    margin-bottom: 1rem;
`;

export const TabUI = {
    TabHandleContent,
    TabHandleButton,
};
