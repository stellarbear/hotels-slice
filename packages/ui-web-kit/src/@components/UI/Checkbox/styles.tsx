import {ThemePaletteColors} from "@app/ui-web-core";
import React from "react";
import styled from "styled-components";

/* eslint-disable max-len */
const CheckboxIconChecked = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            fill="currentColor"
            d="M19.7778 2H4.22222C3 2 2 3 2 4.22222V19.7778C2 21 3 22 4.22222 22H19.7778C21 22 22 21 22 19.7778V4.22222C22 3 21 2 19.7778 2ZM10.5667 16.7667C10.1333 17.2 9.43333 17.2 9 16.7667L5.01111 12.7778C4.57778 12.3444 4.57778 11.6444 5.01111 11.2111C5.44444 10.7778 6.14444 10.7778 6.57778 11.2111L9.77778 14.4111L17.4222 6.76667C17.8556 6.33333 18.5556 6.33333 18.9889 6.76667C19.4222 7.2 19.4222 7.9 18.9889 8.33333L10.5667 16.7667Z"
        />
    </svg>
);
const CheckboxIconUnchecked = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            fill="currentColor"
            d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
        />
    </svg>
);

const CheckboxIcon = styled.div`
    position: relative;
    margin-right: 0.5rem;
    line-height: 0;

    & > svg:not(:last-child) {
        position: absolute;
        left: 0;
        top: 0;
    }
`;


const CheckboxLabel = styled.label`
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
`;

const CheckboxContent = styled.div``;

type CheckboxInputProps = {
    color: ThemePaletteColors;
};

const CheckboxInput = styled.input<CheckboxInputProps>`
    appearance: initial;
    visibility: hidden;
    margin: 0;

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
        color: ${p => p.theme.palette.color(p.color)};
    }
`;

export const CheckboxUI = {
    CheckboxLabel,
    CheckboxInput,
    CheckboxContent,

    CheckboxIcon,
    CheckboxIconChecked,
    CheckboxIconUnchecked,
};
