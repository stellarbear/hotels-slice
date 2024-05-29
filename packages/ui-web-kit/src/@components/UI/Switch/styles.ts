import styled from "styled-components";
import {ThemePaletteColors} from "../../Core";

type SwitchTrackProps = {
    color: ThemePaletteColors;
};
export const SwitchTrack = styled.span<SwitchTrackProps>`
    height: 100%;
    width: 100%;
    border-radius: 7px;
    z-index: -1;
    background-color: ${p => p.theme.palette.color(p.color, {alpha: 0.4})};
`;

type SwitchThumbProps = {
    color: ThemePaletteColors;
};
export const SwitchThumb = styled.span<SwitchThumbProps>`
    position: absolute;
    left: 0%;
    top: 50%;
    transform: translate(0%, -50%);
    transition: all ${p => p.theme.variables.animation};

    box-shadow: 0px 4px 8px rgba(45, 45, 45, 0.09);
    background-color: ${p => p.theme.palette.color(p.color, {lightness: +100})};

    width: 20px;
    height: 20px;
    border-radius: 50%;
`;

export const SwitchInput = styled.input`
    cursor: inherit;
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 1;
`;

type SwitchContentProps = {
    color: ThemePaletteColors;
};
export const SwitchContent = styled.span<SwitchContentProps>`
    cursor: pointer;
    display: inline-flex;
    width: 3rem;
    height: 2.5rem;
    overflow: hidden;
    padding: 12px;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;
    z-index: 0;
    vertical-align: middle;

    ${SwitchInput}:checked ~ ${SwitchThumb} {
        left: 100%;
        transform: translate(-100%, -50%);
        background-color: ${p => p.theme.palette.color(p.color)};
    }
`;

export const SwitchUI = {
    SwitchTrack,
    SwitchContent,
    SwitchInput,
    SwitchThumb,
};
