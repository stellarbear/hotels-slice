import {useViewport, ViewportConfig} from "@app/extensions-react";
import React from "react";

type Props = {
    trigger: Element | null | undefined;
    side: ViewportConfig["side"];

    children: React.ReactNode;
};

export const InViewport = React.memo<Props>((props) => {
    const {trigger, side, children} = props;
    const [overlay, setOverlay] = React.useState<Element | null>(null);
    const viewport = useViewport({side}, trigger ?? document.body, overlay);

    return (
      <div style={viewport.style} ref={setOverlay}>
        {children}
      </div>
    );
  });
  