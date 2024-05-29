import React from "react";
import {ViewportConfig} from "../useViewport";
import {getMinMax} from "./getMinMax";
import {getSide} from "./getSide";

export const windowPadding = 8;

type TransformConfig = {
    rectTrigger: DOMRect;
    rectOverlay: DOMRect | null;
    config: ViewportConfig;
};

export const getStyles = (input: TransformConfig): React.CSSProperties => {
    const {rectTrigger, rectOverlay, config} = input;

    const result: React.CSSProperties = {
        // overflow: "auto",
        // transition: "all 0.3s",
        width: "fit-content",
        height: "fit-content",
        position: "fixed",
        maxHeight: window.innerHeight - windowPadding * 2,
        maxWidth: window.innerWidth - windowPadding * 2,
    };

    if (!rectOverlay) {
        return result;
    }

    //  right at styles and right at rect are different "rights"
    //  rect from left-top corner
    const side = getSide(rectTrigger, rectOverlay, config);
    const fix = getMinMax(rectOverlay);
    switch (side) {
        case "none": {
            return {};
        }
        case "viewport": {
            return result;
        }
        case "top-left": {
            return ({
                ...result,
                right: fix.horizontal(window.innerWidth - rectTrigger.right),
                bottom: window.innerHeight - rectTrigger.top + windowPadding,
                maxHeight: rectTrigger.top - windowPadding * 2,
                maxWidth: fix.maxWidth(rectTrigger.right - windowPadding),
            });
        }
        case "top-right": {
            return ({
                ...result,
                left: fix.horizontal(rectTrigger.left),
                bottom: window.innerHeight - rectTrigger.top + windowPadding,
                maxHeight: rectTrigger.top - windowPadding * 2,
                maxWidth: fix.maxWidth(window.innerWidth - rectTrigger.left - windowPadding),
            });
        }
        case "bottom-left": {
            return ({
                ...result,
                right: fix.horizontal(window.innerWidth - rectTrigger.right),
                top: rectTrigger.bottom + windowPadding,
                maxHeight: window.innerHeight - rectTrigger.bottom - windowPadding * 2,
                maxWidth: fix.maxWidth(rectTrigger.right - windowPadding),
            });
        }
        case "bottom-right": {
            return ({
                ...result,
                left: fix.horizontal(rectTrigger.left),
                top: rectTrigger.bottom + windowPadding,
                maxHeight: window.innerHeight - rectTrigger.bottom - windowPadding * 2,
                maxWidth: fix.maxWidth(window.innerWidth - rectTrigger.left - windowPadding),
            });
        }
        case "right-top": {
            return ({
                ...result,
                left: rectTrigger.right + windowPadding,
                bottom: fix.vertical(window.innerHeight - rectTrigger.bottom),
                maxHeight: fix.maxHeight(rectTrigger.bottom - windowPadding),
                maxWidth: window.innerWidth - rectTrigger.right - windowPadding * 2,
            });
        }
        case "right-bottom": {
            return ({
                ...result,
                left: rectTrigger.right + windowPadding,
                top: fix.vertical(rectTrigger.top),
                maxHeight: fix.maxHeight(window.innerHeight - rectTrigger.top - windowPadding),
                maxWidth: window.innerWidth - rectTrigger.right - windowPadding * 2,
            });
        }
        case "left-top": {
            return ({
                ...result,
                right: window.innerWidth - rectTrigger.left + windowPadding,
                bottom: fix.vertical(window.innerHeight - rectTrigger.bottom),
                maxHeight: fix.maxHeight(rectTrigger.bottom - windowPadding),
                maxWidth: rectTrigger.left - windowPadding * 2,
            });
        }
        case "left-bottom": {
            return ({
                ...result,
                right: window.innerWidth - rectTrigger.left + windowPadding,
                top: fix.vertical(rectTrigger.top),
                maxHeight: fix.maxHeight(window.innerHeight - rectTrigger.top - windowPadding),
                maxWidth: rectTrigger.left - windowPadding * 2,
            });
        }
    }
};
