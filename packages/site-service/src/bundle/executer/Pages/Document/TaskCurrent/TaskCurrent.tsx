import {ExtensionsApollo} from "@app/extensions-apollo";
import {Defined} from "@app/extensions-utility";
import {Query} from "@app/ui-web-kit";
import React from "react";
import {TASK_GET_CURRENT_QUERY} from "../../../@query";
import {TaskGetCurrentQuery} from "../../../interfaces";
import {TaskCurrentForm} from "./TaskCurrentForm";

const doc = TASK_GET_CURRENT_QUERY;
type Query = TaskGetCurrentQuery;
export type Task = Defined<Query["executerGetTaskAtTheMoment"]>;

export const queryTaskCurrent = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const TaskCurrent = React.memo(() => {
    const query = queryTaskCurrent
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <TaskCurrentForm />
        </Query.Await>
    );
});
