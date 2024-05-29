import {windowPadding} from "./getStyles";

export const getMinMax = (rectOverlay: DOMRect) => {
    const maxWidth = (delta: number) =>
        Math.min(
            window.innerWidth - windowPadding * 2,
            Math.max(
                delta,
                rectOverlay.width,
            ),
        );

    const maxHeight = (delta: number) =>
        Math.min(
            window.innerHeight - windowPadding * 2,
            Math.max(
                delta,
                rectOverlay.height,
            ),
        );

    const horizontal = (delta: number) =>
        Math.max(
            windowPadding,
            Math.min(
                delta,
                window.innerWidth - rectOverlay.width - windowPadding,
            ),
        );


    const vertical = (delta: number) =>
        Math.max(
            windowPadding,
            Math.min(
                delta,
                window.innerHeight - rectOverlay.height - windowPadding,
            ),
        );

    return ({
        maxWidth,
        maxHeight,
        vertical,
        horizontal,
    });
};
