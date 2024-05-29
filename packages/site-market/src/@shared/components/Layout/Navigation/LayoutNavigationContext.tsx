import * as React from "react";

export type LayoutNavigationContext = {
    mount: (node: React.ReactNode) => void;
    unmount: () => void;
};

export const LayoutNavigationContext = React.createContext({} as LayoutNavigationContext);

export const useLayoutNavigation = () => React.useContext(LayoutNavigationContext);