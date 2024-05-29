import {addBreadcrumbs, useBreadcrumbs, type Breadcrumb} from "./BreadcrumbsContext";
import {BreadcrumbsHeader} from "./BreadcrumbsHeader";
import {BreadcrumbsProvider} from "./BreadcrumbsProvider";

export * from "./styles";
export {Breadcrumb};
export const Breadcrumbs = {
    Provider: BreadcrumbsProvider,
    Header: BreadcrumbsHeader,

    add: addBreadcrumbs,
    use: useBreadcrumbs,
};
