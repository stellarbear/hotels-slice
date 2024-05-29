import React from "react";
import styled from "styled-components";

export type GridContainerProps = {
  columns?: number;

  spacing?: number;
  spacingCol?: number;
  spacingRow?: number;

  children: React.ReactNode;
};

export const GridContainer = React.memo<GridContainerProps>((props) => (
  <GridContainerContent>
    <GridContainerHandle {...props} />
  </GridContainerContent>
));

const GridContainerContent = styled.div`
  flex-grow: 1;
`;

const GridContainerHandle = styled.div<GridContainerProps>`
  --Grid-columns: ${(p) => p.columns ?? 12};
  --Grid-row-spacing: ${(p) => p.spacing ?? p.spacingRow ?? 0}px;
  --Grid-col-spacing: ${(p) => p.spacing ?? p.spacingCol ?? 0}px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: ${(p) =>
    `-${(p.spacing ?? p.spacingRow ?? 0) / 2}px -${(p.spacing ?? p.spacingCol ?? 0) / 2}px`};
`;
