import React from "react";
import {GridContainer, GridContainerProps} from "./GridContainer";
import {GridItem, GridItemProps} from "./GridItem";

type PropsContainer = GridContainerProps & {
  container?: true;
};

type PropsItem = GridItemProps & {
  item?: true;
};

type Props = PropsContainer | PropsItem;

export const Grid = React.memo<Props>((props) => {
  if ("item" in props) {
    return <GridItem {...props} />;
  }

  if ("container" in props) {
    return <GridContainer {...props} />;
  }

  return null;
});
