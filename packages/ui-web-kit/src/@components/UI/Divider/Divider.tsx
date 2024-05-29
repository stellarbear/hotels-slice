import styled, {css} from "styled-components";

type DividerProps = {
    vertical?: boolean;
};

export const Divider = styled.hr<DividerProps>`
    height: 1px;
    border: none;
    width: 100%;
    margin: unset;
    background-color: ${p => p.theme.palette.color("secondary", {alpha: 0.3})};

    ${p => p.vertical && css`
        width: 1px;
        height: 100%;
    `}

    &:last-child,
    &:first-child {
        display: none
    }

    &:only-child {
        display: block
    }
`;
