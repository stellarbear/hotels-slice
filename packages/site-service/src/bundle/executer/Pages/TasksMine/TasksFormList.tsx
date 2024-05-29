import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {TASK_GET_BY_ID_QUERY} from "../../@query";
import {TaskGetByIdQuery, TaskGetByIdQueryVariables} from "../../interfaces";
import {TasksFormListForm} from "./TasksFormListForm";

export const queryTaskById = ExtensionsApollo.Query
    .from<TaskGetByIdQuery, TaskGetByIdQueryVariables>(TASK_GET_BY_ID_QUERY)
    .context();

export type TaskInfo = TaskGetByIdQuery["executerGetExecuterStateById"][number];

type Props = {
    ids: string[];
};

export const TasksFormList = React.memo<Props>((props) => {
    const {ids} = props;

    const query = queryTaskById
        .query({
            __typename: "Query",
            executerGetExecuterStateById: [],
        })
        .withConfiguration({variables: {input: {ids}}})
        .compile();


    return (
        <Query.Await query={query}>
            <TasksFormListForm />
        </Query.Await>
    );
});
