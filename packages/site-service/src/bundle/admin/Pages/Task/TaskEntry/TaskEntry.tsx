import {ExtensionsApollo} from "@app/extensions-apollo";
import {Breadcrumbs, Query} from "@app/ui-web-kit";
import React from "react";
import {useParams} from "react-router";
import {TASK_GET_BY_ID_QUERY} from "../../../@query";
import {ERoute} from "../../../AppRoutes";
import {TaskGetByIdQuery, TaskGetByIdQueryVariables} from "../../../interfaces";
import {TaskEntryForm} from "./TaskEntryForm";

type Params = "taskid";

const doc = TASK_GET_BY_ID_QUERY;
type Query = TaskGetByIdQuery;
type Variables = TaskGetByIdQueryVariables;

export const queryTaskGetById = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const TaskEntry = () => {
    const {taskid: id} = useParams<Params>();
    Breadcrumbs.add({to: `${ERoute.task}/entry/${id}`, crumb: `Заявка ${id}`});

    const query = queryTaskGetById
        .query()
        .withConfiguration({variables: {input: {id}}})
        .compile();

    return (
        <Query.Await query={query}>
            <TaskEntryForm />
        </Query.Await>
    );
};


