import {ThemePaletteColors} from "@app/ui-web-core";
import styled, {css} from "styled-components";

export type ChipColor = ThemePaletteColors;

type Props = {
    color?: ChipColor;
    border?: boolean;
};

export const Chip = styled.div<Props>`
    padding: 0rem 1rem;
    margin: 0.1rem 0.25rem;
    cursor: pointer;
    width: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;

    border-radius: 0.25rem;
    border: none;
    min-height: 2rem;

    color: ${p => p.theme.palette.color(p.color ?? "primary")};
    background-color: ${p => p.theme.palette.color(p.color ?? "primary", {alpha: 0.1})};

    ${p => p.border && css`
        border: 1px solid ${p.theme.palette.color(p.color ?? "primary")};
    `}
`;
