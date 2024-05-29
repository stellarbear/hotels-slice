import * as React from "react";

export type Breadcrumb = {
    crumb: React.ReactNode;
    to: string;
};

type BreadcumbsContext = {
    crumbs: Breadcrumb[];
    add: (crumb: Breadcrumb) => void;
};

export const BreadcumbsContext = React.createContext({} as BreadcumbsContext);

export const useBreadcrumbs = () => React.useContext(BreadcumbsContext);
export const addBreadcrumbs = (crumb: Breadcrumb) => {
    const {add} = useBreadcrumbs();

    add(crumb);
};
