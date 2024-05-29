import styled from "styled-components";

const QueryOverlayPlaceholder = styled.div`
    position: absolute;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
    z-index: 2;
`;

const QueryOverlayPlaceholderBlur = styled.div`
    inset: 0;
    z-index: 2;
    position: absolute;
    backdrop-filter: brightness(0.9);
    border-radius: 0.25rem;
    cursor: not-allowed;

    opacity: 0.8;
    background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: pulse 1.5s infinite ease-in-out;
    
    @keyframes pulse {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
`;

export const QueryUI = {
    QueryOverlayPlaceholder,
    QueryOverlayPlaceholderBlur,
};
