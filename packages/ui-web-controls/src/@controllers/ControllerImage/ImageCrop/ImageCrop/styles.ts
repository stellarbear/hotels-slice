import styled, {css} from "styled-components";

export const ImageEditContainer = styled.div`
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 80vw;
    max-height: 60vh;
    overflow: hidden;
    user-select: none;
    touch-action: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ImageEditContainerMedia = styled.img`
    will-change: transform;
    width: 100%;
`;

type ImageEditContainerCropProps = {
    circle?: boolean;
};

export const ImageEditContainerCrop = styled.div<ImageEditContainerCropProps>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    box-shadow: 0 0 0 9999em;
    color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    cursor: move;

    ${p => p.circle && css`
        border-radius: 50%;
    `}
`;
