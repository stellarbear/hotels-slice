import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {CUSTOMER_GET_ALL_QUERY} from "../../@query";
import {CustomerGetAllQuery} from "../../interfaces";
import {CustomersForm} from "./CustomersForm";

const doc = CUSTOMER_GET_ALL_QUERY;
type Query = CustomerGetAllQuery;
export type Customer = Query["executerGetCustomerLocationList"][number];

export const queryCustomersAll = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const Customers = React.memo(() => {
    const query = queryCustomersAll
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <CustomersForm />
        </Query.Await>
    );
});
