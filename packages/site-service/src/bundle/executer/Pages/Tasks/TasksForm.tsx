import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {fp} from "@app/extensions-fp";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Flex} from "@app/ui-web-core";
import {Alert, Pagination, Query, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {TASK_QUERY} from "../../@query";
import {
    TaskQuery, TaskQueryVariables
} from "../../interfaces";
import {Customer} from "./TasksFormHotel";
import {TasksFormList} from "./TasksFormList";
import {TasksFormListFilters} from "./TasksFormListFilters";

const doc = TASK_QUERY;
type Query = TaskQuery;
export type Variables = TaskQueryVariables;
export type Task = Query["executerAllTasks"]["edges"][number]["node"];
export type TaskFilters = Variables["input"];

export const queryTaskPagination = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

type Props = {
    customer: Customer | null;
};

export const TasksForm = React.memo<Props>((props) => {
    const {customer} = props;

    const [paramsPagination, setParamsPagination] = useQueryParams(p => ({
        first: p.number.defaults(10),
        offset: p.number,
    }));
    const pagination = usePagination({
        onChange: setParamsPagination,
        defaults: paramsPagination,
    });

    const [paramsForm, setParamsForm] = useQueryParams(p => ({
        id: p.string,
        idHotel: p.string.defaults(customer?.id ?? null),
        sort: p.union(
            "ASC",
            "DESC",
        ).defaults("ASC"),
        fields: p.union(
            "rent",
            "start_at",
        ).defaults("start_at"),
    }));
    const form = ExtensionsForm.useForm<TaskFilters>({
        defaultValues: paramsForm,
        onChange: fp.apply(setParamsForm, pagination.reset),
    });

    const query = queryTaskPagination
        .query({
            __typename: "Query",
            executerAllTasks: {
                totalCount: 0,
                edges: [],
            },
        })
        .withConfiguration({
            variables: {input: form.getValues(), ...pagination.state},
        })
        .compile();

    pagination.register(query.data?.executerAllTasks.totalCount);

    return (
        <Flex.Col>
            <Typo.Title>Заявки</Typo.Title>
            <TasksFormListFilters form={form} customer={customer} />

            <Query.Async query={query}>
                <Query.Overlay>
                    <TasksFormList />
                </Query.Overlay>

                <Query.Await>
                    <Pagination {...pagination} empty={
                        <Alert>
                            Заявки по выбранным параметрам отсутствуют, но скоро появятся!
                        </Alert>
                    } />
                </Query.Await>
            </Query.Async>
        </Flex.Col>
    );
});
