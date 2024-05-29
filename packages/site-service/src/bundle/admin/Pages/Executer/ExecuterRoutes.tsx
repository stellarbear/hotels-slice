import {Routing} from "@app/ui-web-core";
import {Breadcrumbs} from "@app/ui-web-kit";
import * as React from "react";
import {Navigate} from "react-router";
import {ERoute} from "../../AppRoutes";
import {ExecuterEntry} from "./ExecuterEntry";
import {ERoutesExecuter, ExecuterTabs} from "./ExecuterTabs";

export const ExecuterRoutes = React.memo(() => {
    Breadcrumbs.add({to: ERoute.executer, crumb: "Исполнители"});

    return (
        <Routing.Routes>
            <Routing.Route path={"/:type/*"} element={<ExecuterTabs />} />
            <Routing.Route path={"/entry/:executerId/*"} element={<ExecuterEntry />} />
            <Routing.Route path={"/*"} element={<Navigate to={ERoutesExecuter.list} replace />} />
        </Routing.Routes>
    );
});
