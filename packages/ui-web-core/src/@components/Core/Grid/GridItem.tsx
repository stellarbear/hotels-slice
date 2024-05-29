import {Size, sizes} from "@app/extensions-react";
import {ReactNode} from "react";
import styled, {css} from "styled-components";

export type GridItemProps = Partial<Record<Size, number>> & {
  col?: number;
  children: ReactNode;
};

export const GridItem = styled.div<GridItemProps>`
  width: ${(p) =>
    p.col ? css`calc(100% * ${p.col} / var(--Grid-columns) - var(--Grid-col-spacing)` : "100%"};
  margin: calc(var(--Grid-row-spacing) / 2) calc(var(--Grid-col-spacing) / 2);

  ${p => p.xs && (
    css`
      @media ${sizes.xs} { 
        width: calc(100% * ${p.xs} / var(--Grid-columns) - var(--Grid-col-spacing));
      }
    `
  )}
  
  ${p => p.sm && (
    css`
      @media ${sizes.sm} { 
        width: calc(100% * ${p.sm} / var(--Grid-columns) - var(--Grid-col-spacing));
      }
    `
  )}
  
  ${p => p.md && (
    css`
      @media ${sizes.md} { 
        width: calc(100% * ${p.md} / var(--Grid-columns) - var(--Grid-col-spacing));
      }
    `
  )}
  
  ${p => p.lg && (
    css`
      @media ${sizes.lg} { 
        width: calc(100% * ${p.lg} / var(--Grid-columns) - var(--Grid-col-spacing));
      }
    `
  )}
`;
