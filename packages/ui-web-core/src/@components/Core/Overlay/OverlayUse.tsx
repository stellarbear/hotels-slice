import React from "react";
import {OverlayContext, useOverlay} from "./Context";

type Props = {
    children: (context: OverlayContext) => React.ReactNode;
};

export const OverlayUse = React.memo<Props>((props) => {
    const overlay = useOverlay();

    return <>{props.children(overlay)}</>;
});
