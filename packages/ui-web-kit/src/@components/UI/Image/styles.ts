import {StyledCss} from "@app/ui-web-core";
import styled, {css} from "styled-components";
import {ImageVariants} from "./ImageHandle";

type ImageContainerProps = {
    variant: ImageVariants;
    size?: React.CSSProperties["width"];
    width?: number;
    height?: number;
};

const variants: Record<ImageVariants, (size?: any) => StyledCss> = {
    "default": () => css`
        max-height: 30vh;
        max-width: 100%;
    `,
    "upload": () => css`
        width: 12rem;
        height: 8rem;
    `,
    "thumbnail": (size = "3.5rem") => css`
        height: ${size};
        width: ${size};
        min-width: ${size};
    `,
    "circle": (size = "8rem") => css`
        height: ${size};
        width: ${size};
        border-radius: 50%;
    `,
};

const ImageHandleMedia = styled.img`
    object-fit: cover;
    height: inherit;
    width: inherit;
    display: block;
`;

const ImageHandleContainer = styled.div<ImageContainerProps>`
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-color: ${p => p.theme.palette.color("primary", {lightness: +40})};
    /* width: ${p => p.width ? `${p.width}px` : "unset"}; */
    width: fit-content;
    height: ${p => p.height ? `${p.height}px` : "unset"};

    &, ${ImageHandleMedia} {
        flex-shrink: 0;
        ${p => variants[p.variant](p.size)};
    }
`;

export const ImageUI = {
    ImageHandleContainer,
    ImageHandleMedia,
};
