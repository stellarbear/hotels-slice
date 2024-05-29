/* eslint-disable max-len */
import React from "react";
import styled, {css} from "styled-components";

export const AccordionContent = styled.div`
    overflow: inherit;
    width: fit-content;    
    position: relative;
    z-index: 1;
    width: 100%;

    &:not(:last-child) {
        border-bottom: 1px solid ${p => p.theme.variables.divider};
    }
`;

export const AccordionContentTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    min-height: 3rem;
    cursor: pointer;
`;

const AccordionContentBody = styled.div`
    border-radius: 0rem 0rem 0.5rem 0.5rem;
    overflow: visible;
    padding: 0rem 2rem 1rem;
`;

type AccordionIconToggleProps = {
    opened?: boolean;
};

const AccordionIconToggle = styled.div<AccordionIconToggleProps>`
    transition: transform ${p => p.theme.variables.animation};
    transform-origin: center;
    display: flex;

    ${p => p.opened && css`
        transform: rotate(90deg);
    `}
`;

const AccordionIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            fill="currentColor"
            d="M9.29 6.71002C8.9 7.10002 8.9 7.73002 9.29 8.12002L13.17 12L9.29 15.88C8.9 16.27 8.9 16.9 9.29 17.29C9.68 17.68 10.31 17.68 10.7 17.29L15.29 12.7C15.68 12.31 15.68 11.68 15.29 11.29L10.7 6.70002C10.32 6.32002 9.68 6.32002 9.29 6.71002Z" />
    </svg>
);

export const AccordionUI = {
    AccordionIcon,
    AccordionIconToggle,
    AccordionContentBody,
    AccordionContentTitle,
    AccordionContent,
};
