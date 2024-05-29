import {Size, sizes, useWindowSize} from "@app/extensions-react";
import React from "react";

type PropsFrom = {
  from: Size;
  to?: Size;
};

type PropsTo = {
  from?: Size;
  to: Size;
};

type Props = (PropsFrom | PropsTo) & {
  children: React.ReactNode;
};

export const Adaptive = React.memo<Props>((props) => {
  const {children, from, to} = props;
  const size = useWindowSize();
  const width = size.window.width;

  const shouldRender = React.useMemo(() => {
    if (from && to) {
      return width >= sizes[from] && width < sizes[to];
    } else if (from) {
      return width >= sizes[from];
    } else if (to) {
      return width < sizes[to];
    } else {
      return false;
    }
  }, [width, from, to]);

  if (shouldRender) {
    return <>{children}</>;
  } else {
    return null;
  }
});
