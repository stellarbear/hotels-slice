import {ThemePaletteColors} from "@app/ui-web-core";
import React from "react";
import styled, {css} from "styled-components";

type InputContentProps = {
    focused?: boolean;
    disabled?: boolean;
    color: ThemePaletteColors;
};

const InputContent = styled.div<InputContentProps>`
    display: flex;
    align-items: center;
    flex: 1;

    border-width: 1px;
    border-style: solid;
    border-radius:  0.25rem;
    overflow: hidden;

    color: ${p => p.theme.variables.input};
    border-color: ${p => p.theme.variables.divider};
    
    transition-property: border-color, color;
    transition-duration: ${p => p.theme.variables.animation};

    &:hover {
        border-color: ${p => p.theme.palette.color(p.color)};
    }

    ${p => p.focused && css`
        border-color: ${p.theme.palette.color(p.color)};
    `}
    
    ${p => p.disabled && css`
        cursor: not-allowed;
        opacity: ${p => p.theme.variables.disabled};
    `}
`;

const InputAdornment = styled.div`
    display: inherit;
    padding: 0rem 0.5rem;
`;

const InputField = styled.input`
    /* min-width: 100px; */
    /* min-height: 2.5rem; */
    flex: 1;
    padding: 0rem 0.5rem;
    border: none;
    outline: none;
    width: 100%;
    color: inherit;
    background-color: transparent;

    font-family: inherit;
    font-size: 14px;

    ${p => p.type === "password" && css`
        font: small-caption;
    `}
`;

const TextareaField = styled.textarea`
    /* min-width: 100px; */
    /* min-height: 2.5rem; */
    flex: 1;
    border: none;
    outline: none;
    width: 100%;
    color: inherit;
    font-family: inherit;

    font-size: 14px;
    padding: 0.5rem;
`;

/* eslint-disable max-len */
const InputHiddenIcon = React.memo(() => (
    <>*</>
));

export const InputUI = {
    InputContent,
    InputAdornment,
    InputField,

    TextareaField,

    InputHiddenIcon,
};
