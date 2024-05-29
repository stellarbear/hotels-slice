import React from "react";
export const windowPadding = 8;

type TransformConfig = {
    base?: React.CSSProperties;
    rect?: DOMRect | null;
};

export const applyTransform = (config: TransformConfig) => {
    const {base = {}, rect} = config;
    const height = window.innerHeight;
    const width = window.innerWidth;

    const result: React.CSSProperties = {
        ...base,
        overflow: "auto",
        maxHeight: height - windowPadding * 2,
        maxWidth: width - windowPadding * 2,
    };

    if (rect) {
        const translates = [];

        if (rect.left < 0 + windowPadding) {
            translates.push(`translateX(${windowPadding - rect.left}px)`);
        } else if (rect.right > width - windowPadding) {
            translates.push(`translateX(${(width - windowPadding) - rect.right}px)`);
        }
    
        if (rect.top < 0 + windowPadding) {
            translates.push(`translateY(${windowPadding - rect.top}px)`);
        } else if (rect.bottom > height - windowPadding) {
            translates.push(`translateY(${(height - windowPadding) - rect.bottom}px)`);
        }

        result.transform = translates.join(" ");
    }

    return (result);
};
