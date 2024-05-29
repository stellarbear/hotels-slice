import {ThemePaletteColors} from "@app/ui-web-core";
import React from "react";
import styled from "styled-components";

/* eslint-disable max-len */
const RadioButtonIconChecked = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
        />
        <path
            fill="currentColor"
            d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
        />
    </svg>
);
const RadioButtonIconUnchecked = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
        />
    </svg>
);

const RadioButtonIcon = styled.div`
    position: relative;
    margin-right: 0.5rem;
    line-height: 0;

    & > svg:not(:last-child) {
        position: absolute;
        left: 0;
        top: 0;
    }
`;


const RadioButtonLabel = styled.label`
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
`;

const RadioButtonContent = styled.div``;

type RadioButtonInputProps = {
    color: ThemePaletteColors;
};

const RadioButtonInput = styled.input<RadioButtonInputProps>`
    appearance: initial;
    visibility: hidden;
    margin: 0;

    background-color: blue;

    &:not(:checked) + div > svg:nth-child(1),
    &:checked + div > svg:nth-child(2) {
        opacity: 0;
        transition: opacity ${p => p.theme.variables.animation}
    }

    &:disabled ~ div {
        opacity: ${p => p.theme.variables.disabled};
        cursor: not-allowed;
    }

    & + div { 
        ${p => p.theme.palette.color(p.color)};
    }
`;

export const RadioButtonUI = {
    RadioButtonLabel,
    RadioButtonInput,
    RadioButtonContent,

    RadioButtonIcon,
    RadioButtonIconChecked,
    RadioButtonIconUnchecked,
};

