import {ThemePaletteColors} from "@app/ui-web-core";
import styled, {keyframes} from "styled-components";

const loading = keyframes`
    from {
        transform: scaleX(0);
    }

    to {
        transform: scaleX(1);
    }
`;

type ProgressBarContentProps = {
    percent: number;
};

const ProgressBarContent = styled.div<ProgressBarContentProps>`
    height: 0.25rem;
    background: inherit;
    transform-origin: left;
    border-radius: 0.25rem;

    width: ${p => p.percent}%;
    transition: width ${p => p.theme.variables.animation};
`;

type ProgressTimerContentProps = {
    timeout: number;
    state?: React.CSSProperties["animationPlayState"];
    color?: ThemePaletteColors;
  };

const ProgressTimerContent = styled.div<ProgressTimerContentProps>`
  height: 0.25rem;
  width: 100%;
  background: inherit;
  transform-origin: left;
  border-radius: 0.25rem;
  
  background-color: ${p => p.theme.palette.color(p.color ?? "secondary")};

  animation-duration: ${p => p.timeout}ms;
  animation-name: ${loading};
  animation-play-state: ${(p) => p.state ?? "running"};
  animation-timing-function: linear;
`;

export const ProgressUI = {
    ProgressBarContent,
    ProgressTimerContent,
};
