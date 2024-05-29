import * as React from "react";
import {useTimer} from "../../timer";
import {useWindowSize} from "../useWindowSize";
import {getStyles} from "./calculate";

//  Without auto - fixed positions
//  With auto - side selevtion & flip
export type ViewportSide =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "right-bottom"
    | "right-top"
    | "left-top"
    | "left-bottom"

    | "top-auto"
    | "bottom-auto"
    | "right-auto"
    | "left-auto"
    
    | "viewport"
    | "none";

export type ViewportConfig = {
    side: ViewportSide;
};

export const useViewport = (
    config: ViewportConfig,
    trigger: Element,
    overlay: Element | null = null,
) => {
    const size = useWindowSize();
    const configRef = React.useRef(config);

    //  In order to be able to use current nodes in observer closures
    const refTrigger = React.useRef(trigger);
    const refOverlay = React.useRef(overlay);
    refTrigger.current = trigger;
    refOverlay.current = overlay;


    const [rectTrigger, setRectTrigger] = React.useState(() =>
        trigger.getBoundingClientRect());
    const [rectOverlay, setRectOverlay] = React.useState<DOMRect | null>(
        () => overlay?.getBoundingClientRect() ?? null);

    const updateTriggerRect = React.useCallback(() => {
        setRectTrigger(refTrigger.current.getBoundingClientRect());
    }, []);

    const updateOverlayRect = React.useCallback(() => {
        if (refOverlay.current) {
            setRectOverlay(refOverlay.current.getBoundingClientRect());
        }
    }, []);

    const observerResizeTrigger = React.useRef<ResizeObserver>(
        new ResizeObserver(updateTriggerRect));
    const observerResizeOverlay = React.useRef<ResizeObserver>(
        new ResizeObserver(updateOverlayRect));
    const observerMutationOverlay = React.useRef<MutationObserver>(
        new MutationObserver(updateOverlayRect));

    React.useEffect(() => {
        if (trigger) {
            observerResizeTrigger.current.observe(trigger);
        }
        if (overlay) {
            observerResizeOverlay.current.observe(overlay);
            observerMutationOverlay.current.observe(overlay, {childList: true});
        }

        return () => {
            observerMutationOverlay.current.disconnect();
            observerResizeTrigger.current.disconnect();
            observerResizeOverlay.current.disconnect();
        };
    }, [trigger, overlay]);

    const updateTimeout = useTimer(100);
    const updateAllRect = React.useCallback(() => {
        updateTimeout.clear();
        updateTimeout.call(() => {
            updateTriggerRect();
            updateOverlayRect();
        });
    }, []);

    React.useLayoutEffect(() => {
        updateAllRect();
    }, [size.dimensions]);

    const style = React.useMemo(() =>
        getStyles({rectTrigger, rectOverlay, config: configRef.current}),
        [rectTrigger, rectOverlay]);

    return ({style});
};
