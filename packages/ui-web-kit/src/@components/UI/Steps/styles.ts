import styled, {css} from "styled-components";

type StepsContentProps = {
    type: "row" | "column";
};

const StepsContent = styled.div<StepsContentProps>`
    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: ${p => p.type};

    > *:not(:last-child)::after {    
        content: " ";
        position: absolute;
        background-color:${p => p.theme.palette.color("primary")};
        
        ${p => p.type === "column" && css`
            bottom: calc(-1rem - 2px);
            width: 2px;
            height: 1rem;
        `};
        ${p => p.type === "row" && css`
            right: calc(-1rem - 2px);
            width: 1rem;
            height: 2px;
        `};
    }
`;


type StepsButtonContentProps = {
    active?: boolean;
};

const StepsButtonContent = styled.button<StepsButtonContentProps>`
    all: unset;
    cursor: pointer;
    position: relative;

    border-radius: 50%;
    width: 2rem;
    height: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border: solid 2px ${p => p.theme.palette.color("primary", {lightness: -10})};
    color: ${p => p.theme.palette.color("primary")};

    ${p => p.active && css`
        background-color: ${p => p.theme.palette.color("primary")};
        color: ${p => p.theme.palette.contrast("primary")};

        cursor: pointer;
    `}
`;

export const StepsUI = {
    StepsContent,
    StepsButtonContent,
};
