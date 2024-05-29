import React from "react";
import styled, {css} from "styled-components";

const CarouselImageContainer = styled.div`
    position: relative;
    width: fit-content;
`;

const CarouselDotsContainer = styled.div`
    position: absolute;
    bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
`;

const DotCounter = styled.div<{active: boolean}>`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    backdrop-filter: brightness(0.5);
    background-color: ${p => p.active 
        ? p.theme.palette.color("primary") 
        : p.theme.palette.color("primary", {lightness: +100})};
`;

const ImageIcon = css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    backdrop-filter: brightness(0.5);
    border-radius: 50%;
    overflow: hidden;

    > button {
        padding: 0rem;
    }
`;

const IconArrowLeft = styled.div`
    ${ImageIcon}
    transform: rotate(90deg);
    left: 0.5rem;
`;
const IconArrowRight = styled.div`
    ${ImageIcon}
    transform: rotate(-90deg);
    right: 0.5rem;
`;

const IconArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
            fill="currentColor"
            // eslint-disable-next-line max-len
            d="M15.4625 9.2925L11.5825 13.1725L7.7025 9.2925C7.3125 8.9025 6.6825 8.9025 6.2925 9.2925C5.9025 9.6825 5.9025 10.3125 6.2925 10.7025L10.8825 15.2925C11.2725 15.6825 11.9025 15.6825 12.2925 15.2925L16.8825 10.7025C17.2725 10.3125 17.2725 9.6825 16.8825 9.2925C16.4925 8.9125 15.8525 8.9025 15.4625 9.2925Z" />
    </svg>
);

export const CarouselUI = {
    IconArrow,
    IconArrowLeft,
    IconArrowRight,

    CarouselImageContainer,
    CarouselDotsContainer,
    DotCounter,
};
