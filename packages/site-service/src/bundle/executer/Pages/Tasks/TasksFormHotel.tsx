import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {CUSTOMER_GET_BY_ID} from "../../@query";
import {CustomerGetByIdQuery, CustomerGetByIdQueryVariables} from "../../interfaces";
import {TasksForm} from "./TasksForm";

type Props = {
    id: string;
};

const doc = CUSTOMER_GET_BY_ID;
type Query = CustomerGetByIdQuery;
type Variables = CustomerGetByIdQueryVariables;
export type Customer = Query["executerGetCustomerById"];

export const queryTaskHotel = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const TasksFormHotel = React.memo<Props>((props) => {
    const query = queryTaskHotel
        .query()
        .withConfiguration({variables: {input: {id: props.id}}})
        .compile();

    return (
        <Query.Await query={query}>
            <TaskFormHotel />
        </Query.Await>
    );
});

const TaskFormHotel = React.memo(() => {
    const [data] = queryTaskHotel.use();

    return (
        <TasksForm
            customer={data.executerGetCustomerById}
        />
    );
});
