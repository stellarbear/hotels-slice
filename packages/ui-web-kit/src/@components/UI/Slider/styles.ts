import styled from "styled-components";
import {ThemePaletteColors} from "../../Core";

const SliderContent = styled.div`
    margin: 1rem auto;
    width: calc(100% - 2rem);

    cursor: pointer;
    display: inline-flex;
    position: relative;
    box-sizing: content-box;
    touch-action: none;
    user-select: none;
    
    &::after {
      top: -0.5rem;
      left: -0.5rem;
      right: -0.5rem;
      bottom: -0.5rem;
      content: "";
      position: absolute;
    }

`;

const SliderRail = styled.span`
    width: 100%;
    height: 4px;
    position: absolute;
    border-radius: 1px;
    background-color: ${p => p.theme.palette.color("primary", {alpha: 0.4})};
`;

type SliderTrackProps = {
    left: number;
    width: number;
    color: ThemePaletteColors;
};

const SliderTrack = styled.span<SliderTrackProps>`
    height: 4px;
    position: absolute;
    border-radius: 1px;
    background-color: ${p => p.theme.palette.color(p.color)};
    transition-property: width, left;
    transition-duration: ${p => p.theme.variables.animation};

    left: ${p => p.left}%;
    width: ${p => p.width}%;
`;

type SliderThumbProps = {
    left: number;
    color: ThemePaletteColors;
};

const SliderThumb = styled.span<SliderThumbProps>`
    z-index: 2;
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
    margin-top: -0.5rem;
    margin-left: -0.5rem;
    border-radius: 50%;
    box-shadow: 0px 4px 8px rgba(45, 45, 45, 0.09);
    background-color: ${p => p.theme.palette.color(p.color, {lightness: +100})};
    transition-property: left;
    transition-duration: ${p => p.theme.variables.animation};

    left: ${p => p.left}%;
`;

type SliderPointProps = {
    left: number;
    color: ThemePaletteColors;
};

const SliderPoint = styled.div<SliderPointProps>`
    z-index: 1;
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    margin-top: -0.1rem;
    margin-left: -0.1rem;
    background-color: ${p => p.theme.palette.color(p.color, {alpha: 0.4})};
    border-radius: 100%;
    
    left: ${p => p.left}%;
`;


type SliderLabelProps = {
    left: number;
};
const SliderLabel = styled.div<SliderLabelProps>`
    z-index: 1;
    position: absolute;
    font-size: 14px;
    opacity: ${p => p.theme.variables.disabled};
    margin-top: 0.5rem;
    
    left: ${p => p.left}%;

    div {
        width: fit-content;
        white-space: pre;
        transform: translate(-50%, 0%);
    }
`;


export const SliderUI = {
    SliderContent,
    SliderRail,
    SliderLabel,
    SliderTrack,
    SliderThumb,
    SliderPoint,
};
