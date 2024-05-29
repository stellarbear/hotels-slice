import React from "react";
import styled, {css} from "styled-components";
import {Overlay} from "../../Core";

const DropdownContent = styled.div`
    display: flex;
    flex-direction: column;
    
    overflow: auto;
    max-width: inherit;
    max-height: inherit;

    color: ${p => p.theme.variables.input};
    background-color: ${p => p.theme.variables.background};
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 11px;
    border-radius: 0.25rem;
`;

type DropdownItemContentProps = {active: boolean};

const DropdownItemContent = styled.button<DropdownItemContentProps>`
    all: unset;
    position: relative;
    padding: 0.5rem 1rem;
    transition: background-color ${p => p.theme.variables.animation};
    cursor: pointer;
    white-space: pre;

    display: block;
    width: 100%;
    box-sizing: border-box;

    &:hover {
        background-color: ${p => p.theme.palette.color("primary", {alpha: 0.3})};
    }

    ${p => p.active && css`
        background-color: ${p => p.theme.palette.color("primary", {alpha: 0.4})};
    `}
    
    ${p => p.disabled && css`
        opacity: ${p => p.theme.variables.disabled};
    `}
`;

/* eslint-disable max-len */
const DropdownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            fill="currentColor"
            d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
        />
    </svg>
);


const DropdownTriggerContent = styled.button`
    all: unset;

    flex: 1;
    cursor: pointer;
    
    width: 100%;
    box-sizing: border-box;

    border-width: 1px;
    border-style: solid;
    border-radius: 0.25rem;
    overflow: hidden;
    padding: 0px 0.5rem;
    user-select: none;
    
    font-size: 14px;
    color: ${p => p.theme.variables.input};
    border-color: ${p => p.theme.variables.divider};

    min-height: 2.5rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    
    ${p => p.disabled && css`
        opacity: ${p => p.theme.variables.disabled};
    `}
`;

const DropdownTriggerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path 
            fill="currentColor"
            d="M8.70956 11.71L11.2996 14.3C11.6896 14.69 12.3196 14.69 12.7096 14.3L15.2996 11.71C15.9296 11.08 15.4796 10 14.5896 10H9.40956C8.51956 10 8.07956 11.08 8.70956 11.71Z"
        />
    </svg>
);

const DropdownBlur = styled(Overlay.Blur)`
`;


export const DropdownUI = {
    DropdownBlur,
    
    DropdownIcon,
    DropdownContent,

    DropdownItemContent,

    DropdownTriggerIcon,
    DropdownTriggerContent,
};
