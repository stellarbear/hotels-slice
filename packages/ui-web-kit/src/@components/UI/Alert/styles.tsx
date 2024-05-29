import {ThemePaletteColors} from "@app/ui-web-core";
import React from "react";
import styled from "styled-components";

export type AlertColor = ThemePaletteColors;

type Props = {
    color: AlertColor;
};

const AlertContent = styled.div<Props>`
    border-radius: 4px;
    position: relative;
    padding: 0rem 1rem 0.125rem;
    min-height: 3rem;
    height: fit-content;
    white-space: break-spaces;
    border-width: 1px;
    border-style: solid;
    display: flex;
    align-items: center;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: space-between;

    color: ${p => p.theme.palette.color(p.color ?? "primary")};
    background-color: ${p => p.theme.palette.color(p.color ?? "primary", {lightness: +45})};
    border-color: 1px solid ${p => p.theme.palette.color(p.color ?? "primary")};
`;

const AlertIcon = React.memo(() => (<>X</>));

export const AlertUI = {
    AlertContent,
    AlertIcon,
};

