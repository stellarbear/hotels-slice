import * as React from "react";
import {useMap} from "./MapContext";

export const MapObserver = () => {
    const map = useMap();

    const updateOverlayRect = React.useCallback(() => {
        map.container.querySelectorAll("button").forEach(button =>
            button.type = "button");
    }, []);

    const observerMutation = React.useRef<MutationObserver>(
        new MutationObserver(updateOverlayRect));

    React.useEffect(() => {
        const node = map.container;
        observerMutation.current.observe(node, {childList: true, subtree: true});

        return () => {
            observerMutation.current.disconnect();
        };
    }, [map]);

    return null;
};
