import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {fp} from "@app/extensions-fp";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Flex} from "@app/ui-web-core";
import {Pagination, Query} from "@app/ui-web-kit";
import React from "react";
import {TASK_ALL_QUERY} from "../../../@query";
import {
    TaskAllQuery, TaskAllQueryVariables
} from "../../../interfaces";
import {TaskListTable} from "./TaskListTable";

const doc = TASK_ALL_QUERY;
type Query = TaskAllQuery;
type Variables = TaskAllQueryVariables;
export type TasksFilters = NonNullable<Variables["input"]>;

export const queryTaskPagination = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const TaskList = () => {
    const [paramsPagination, setParamsPagination] = useQueryParams(p => ({
        first: p.number.defaults(10),
        offset: p.number,
    }));

    const pagination = usePagination({
        onChange: setParamsPagination,
        defaults: paramsPagination,
    });

    const [paramsForm, setParamsForm] = useQueryParams(p => ({
        taskId: p.string,
        startAt: p.date,
    }));

    const form = ExtensionsForm.useForm<TasksFilters>({
        defaultValues: paramsForm,
        onChange: fp.apply(setParamsForm, pagination.reset),
    });

    const query = queryTaskPagination
        .query({
            __typename: "Query",
            adminAllTask: {
                totalCount: 0,
                edges: [],
            },
        })
        .withConfiguration({variables: {...pagination.state, input: form.getValues()}})
        .compile();

    pagination.register(query.data?.adminAllTask.totalCount);

    return (
        <Flex.Col>
            <Query.Async query={query}>
                <Query.Overlay>
                    <TaskListTable form={form} />
                </Query.Overlay>

                <Query.Await>
                    <Pagination {...pagination} />
                </Query.Await>
            </Query.Async>
        </Flex.Col>
    );
};


