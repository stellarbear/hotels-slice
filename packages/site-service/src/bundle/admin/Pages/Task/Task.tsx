import {Routing} from "@app/ui-web-core";
import {Breadcrumbs} from "@app/ui-web-kit";
import * as React from "react";
import {Navigate} from "react-router";
import {ERoute} from "../../AppRoutes";
import {TaskEntry} from "./TaskEntry";
import {TaskList} from "./TaskList";

export const Task = React.memo(() => {
    Breadcrumbs.add({to: ERoute.task, crumb: "Заявки"});

    return (
        <Routing.Routes>
            <Routing.Route index element={<TaskList />} />
            <Routing.Route path={"/entry/:taskid/*"} element={<TaskEntry />} />

            <Routing.Route path={"*"} element={<Navigate to="" replace />} />
        </Routing.Routes>
    );
});
