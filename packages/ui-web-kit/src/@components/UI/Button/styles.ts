import styled, {css} from "styled-components";
import {ButtonColor, ButtonVariant} from "./Button";

type ButtonContentProps = {
    fullwidth?: boolean;

    color: ButtonColor;
    variant: ButtonVariant;
};

export const ButtonContent = styled.button<ButtonContentProps>`
    text-align: center;
    font-family: inherit;
    white-space: break-spaces;
    cursor: pointer;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    min-height: 2.5rem;
    min-width: 2.5rem;

    width: fit-content;
    height: fit-content;

    font-size: 1rem;
    border-width: 1px;
    border-style: solid;
    border-radius: 0.25rem;
    
    transition-property: color, background-color, border-color;
    transition-duration:  ${p => p.theme.variables.animation};

    > svg:only-child {
        margin: -2.5rem;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: ${p => p.theme.variables.disabled};
    }

    ${p => p.fullwidth && css`width: 100%;`}

    ${p => p.variant === "contained" && css`
        padding: 0.5rem 1rem;
        border-color: transparent;
        color: ${p.theme.palette.contrast(p.color)};

        &{
            background-color: ${p.theme.palette.color(p.color)};
        }
        &:hover {
            background-color: ${p.theme.palette.color(p.color, {saturation: -5})};
        }
        &:active {
            background-color: ${p.theme.palette.color(p.color, {saturation: -15})};
        }
    `}

    ${p => p.variant === "secondary" && css`
        padding: 0.5rem 1rem;
        border-color: transparent;
        color: ${p.theme.palette.contrast(p.color, {alpha: 0.1})};

        &{
            border-color: ${p.theme.palette.color(p.color, {alpha: 0.1})};
            background-color: ${p.theme.palette.color(p.color, {alpha: 0.05})};
        }
        &:hover {
            border-color: ${p.theme.palette.color(p.color, {alpha: 0.15})};
            background-color: ${p.theme.palette.color(p.color, {alpha: 0.05})};
        }
        &:active {
            border-color: ${p.theme.palette.color(p.color, {alpha: 0.2})};
            background-color: ${p.theme.palette.color(p.color, {alpha: 0.10})};
        }
    `}

    ${p => p.variant === "outlined" && css`
        padding: 0.5rem;
        background-color: transparent;

        &{
            color: ${p.theme.palette.color(p.color)};
            border-color: ${p.theme.palette.color(p.color)};
        }
        &:hover {
            color: ${p.theme.palette.color(p.color, {saturation: -5})};
            border-color: ${p.theme.palette.color(p.color)};
        }
        &:active {
            color: ${p.theme.palette.color(p.color, {saturation: -15})};
            border-color: ${p.theme.palette.color(p.color)};
        }
    `}

    ${p => p.variant === "text" && css`
        padding: 0.5rem 1rem;
        border-color: transparent;
        background-color: transparent;
        color: ${p.theme.palette.color(p.color)};

        &{
            color: ${p.theme.palette.color(p.color)};
        }
        &:hover {
            color: ${p.theme.palette.color(p.color, {saturation: -5})};
        }
        &:active {
            color: ${p.theme.palette.color(p.color, {saturation: -15})};
        }
   `}

   > div {
        color: currentColor;
   }
`;

export const ButtonUI = {
    ButtonContent,
};

