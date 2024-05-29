import {ViewportConfig} from "../useViewport";
import {windowPadding} from "./getStyles";

export const getSide = (
    rectTrigger: DOMRect,
    rectOverlay: DOMRect,
    config: ViewportConfig,
) => {
    const availableTop = rectTrigger.top - windowPadding * 2;
    const availableBottom = window.innerHeight - rectTrigger.bottom - windowPadding * 2;

    const availableLeft = rectTrigger.left - windowPadding * 2;
    const availableRight = window.innerWidth - rectTrigger.right - windowPadding * 2;

    switch (config.side) {
        case "bottom-auto": {
            if (rectOverlay.height > availableBottom &&
                availableBottom < availableTop) {
                return availableLeft > availableRight
                    ? "top-left"
                    : "top-right";
            } else {
                return availableLeft > availableRight
                    ? "bottom-left"
                    : "bottom-right";
            }
        }
        case "top-auto": {
            if (rectOverlay.height > availableTop &&
                availableTop < availableBottom) {
                return availableLeft > availableRight
                    ? "bottom-left"
                    : "bottom-right";
            } else {
                return availableLeft > availableRight
                    ? "top-left"
                    : "top-right";
            }
        }
        case "right-auto": {
            if (rectOverlay.width > availableRight &&
                availableRight < availableLeft) {
                return availableTop > availableBottom
                    ? "left-top"
                    : "left-bottom";
            } else {
                return availableTop > availableBottom
                    ? "right-top"
                    : "right-bottom";
            }
        }
        case "left-auto": {
            if (rectOverlay.width > availableLeft &&
                availableLeft < availableRight) {
                return availableTop > availableBottom
                    ? "right-top"
                    : "right-bottom";
            } else {
                return availableTop > availableBottom
                    ? "left-top"
                    : "left-bottom";
            }
        }

        case "bottom-left":
        case "bottom-right":
        case "top-left":
        case "top-right":
        case "right-top":
        case "right-bottom":
        case "left-top":
        case "left-bottom":
        case "viewport":
        case "none":
            return config.side;
    }
};
