import {isNumber} from "@app/extensions-guard";
import * as React from "react";
import {DrawerFill, DrawerSide} from "./Drawer";

const getFill = (fill: DrawerFill) =>
    isNumber(fill) ? `${fill}%` : "unset";
    
const vertical = (fill: DrawerFill): React.CSSProperties =>
    ({left: 0, right: 0, height: getFill(fill), maxHeight: "90vh", overflow: "auto"});
const horizontal = (fill: DrawerFill): React.CSSProperties =>
    ({top: 0, bottom: 0, width: getFill(fill)});

const radius = "0.75rem";

const left = (fill: DrawerFill): React.CSSProperties => ({
    left: 0, right: "auto",
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
    // paddingRight: "0.5rem",
    ...horizontal(fill),
});
const right = (fill: DrawerFill): React.CSSProperties => ({
    right: 0, left: "auto",
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
    // paddingLeft: "0.5rem",
    ...horizontal(fill),
});
const top = (fill: DrawerFill): React.CSSProperties => ({
    top: 0, bottom: "auto",
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    // paddingBottom: "0.5rem",
    ...vertical(fill),
});
const bottom = (fill: DrawerFill): React.CSSProperties => ({
    bottom: 0, top: "auto",
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    // paddingTop: "0.5rem",
    ...vertical(fill),
});

export const stylesClosed = (side: DrawerSide, fill: DrawerFill): React.CSSProperties => {
    switch (side) {
        case "right":
            return ({
                transform: "translateX(100%)",
                ...right(fill),
            });
        case "left":
            return ({
                transform: "translateX(-100%)",
                ...left(fill),
            });
        case "top":
            return ({
                transform: "translateY(-100%)",
                ...top(fill),
            });
        case "bottom":
            return ({
                transform: "translateY(100%)",
                ...bottom(fill),
            });
    }
};
export const stylesOpened = (side: DrawerSide, fill: DrawerFill): React.CSSProperties => {
    switch (side) {
        case "right":
            return ({
                transform: "translateX(0%)",
                ...right(fill),
            });
        case "left":
            return ({
                transform: "translateX(0%)",
                ...left(fill),
            });
        case "top":
            return ({
                transform: "translateY(0%)",
                ...top(fill),
            });
        case "bottom":
            return ({
                transform: "translateY(0%)",
                ...bottom(fill),
            });
    }
};
