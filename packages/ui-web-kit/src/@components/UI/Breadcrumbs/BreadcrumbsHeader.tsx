import {Flex} from "@app/ui-web-core";
import * as React from "react";
import {useBreadcrumbs} from "./BreadcrumbsContext";
import {Crumb} from "./styles";

export const BreadcrumbsHeader = React.memo(() => {
    const {crumbs} = useBreadcrumbs();

    return (
        <Flex.Row align="center" scroll>
            {crumbs.map(entry => (
                <Crumb key={entry.to} to={entry.to}>
                    {entry.crumb}
                </Crumb>
            ))}
        </Flex.Row>
    );
});
