import {Size, sizes} from "@app/extensions-react";
import React from "react";
import styled, {css} from "styled-components";
import {Overlay} from "../../Core";
/* eslint-disable max-len */

const DialogHeaderCloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            fill="currentColor"
            d="M18.2997 5.70997C17.9097 5.31997 17.2797 5.31997 16.8897 5.70997L11.9997 10.59L7.10973 5.69997C6.71973 5.30997 6.08973 5.30997 5.69973 5.69997C5.30973 6.08997 5.30973 6.71997 5.69973 7.10997L10.5897 12L5.69973 16.89C5.30973 17.28 5.30973 17.91 5.69973 18.3C6.08973 18.69 6.71973 18.69 7.10973 18.3L11.9997 13.41L16.8897 18.3C17.2797 18.69 17.9097 18.69 18.2997 18.3C18.6897 17.91 18.6897 17.28 18.2997 16.89L13.4097 12L18.2997 7.10997C18.6797 6.72997 18.6797 6.08997 18.2997 5.70997Z" />
    </svg>
);

const DialogHeaderTitle = styled.h1`
    margin: 0;
    font-size: 24px;
    font-weight: 600;
`;

const DialogHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1rem 2rem;
    border-bottom: 1px solid ${p => p.theme.variables.divider};
`;

const DialogContentContainer = styled.div`
    &:empty {
        display: none;
    }

    &:not(:empty) {
        flex: 1;
        overflow: auto;
        padding: 1rem 2rem;
        border-bottom: 1px solid ${p => p.theme.variables.divider};
    }
`;

const DialogActionsContainer = styled.div<{$loading: boolean}>`
    padding: 1rem 2rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    ${p => p.$loading && css`
        pointer-events: none;
        opacity: ${p.theme.variables.disabled};
    `}
`;

const DialogBlur = styled(Overlay.Blur)`
    backdrop-filter: brightness(0.5);
`;

const DialogContainer = styled.div<{size: Size}>`
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 11px;
    border-radius: 0.25rem;

    background-color: ${p => p.theme.variables.background};
    max-height: calc(100vh - 4rem);
    width: ${p => sizes[p.size]}px;
    max-width: calc(100vw - 4rem);
    position: relative;
    margin: auto;
    pointer-events: all;

    outline: none;
    display: flex;
    flex-direction: column;
`;

export const DialogUI = {
    DialogBlur,
    DialogContainer,

    DialogHeaderContainer,
    DialogHeaderCloseIcon,
    DialogHeaderTitle,

    DialogContentContainer,

    DialogActionsContainer,
};
