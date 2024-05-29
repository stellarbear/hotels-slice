import React from "react";

export type OverlayContext = {
    close: () => void;
    opened: boolean;
    
    meta: {
        hideOnContentClick: boolean;
    };
};

export const OverlayContext = React.createContext({} as OverlayContext);

export const useOverlay = () => React.useContext(OverlayContext);

export const isOverlay = (src: any): src is OverlayContext => "close" in src;
