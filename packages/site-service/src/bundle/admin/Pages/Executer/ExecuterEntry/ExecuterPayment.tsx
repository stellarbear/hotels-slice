import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Defined} from "@app/extensions-utility";
import {Flex} from "@app/ui-web-core";
import {Pagination, Query} from "@app/ui-web-kit";
import * as React from "react";
import {EXECUTER_GET_PAYMENT_ALL_QUERY} from "../../../@query";
import {
    ExecuterGetPaymentAllQuery, ExecuterGetPaymentAllQueryVariables
} from "../../../interfaces";
import {queryExecuterEntry} from "./ExecuterEntry";
import {ExecuterPaymentTable} from "./ExecuterPaymentTable";

const doc = EXECUTER_GET_PAYMENT_ALL_QUERY;
type Query = ExecuterGetPaymentAllQuery;
type Variables = ExecuterGetPaymentAllQueryVariables;
export type ExecuterPaymentFilters = Defined<Variables["input"]>;
export type ExecuterPayment = Query["adminGetPaymentsOfExecuterById"]["edges"][number]["node"];

export const queryExecuterPaymentPagination = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const ExecuterPayment = React.memo(() => {
    const [data] = queryExecuterEntry.use();
    const executer = data.adminGetExecuterById;

    const [paramsPagination, setParamsPagination] = useQueryParams(p => ({
        first: p.number.defaults(10),
        offset: p.number,
    }));
    const pagination = usePagination({
        onChange: setParamsPagination,
        defaults: paramsPagination,
    });

    const form = ExtensionsForm.useForm<ExecuterPaymentFilters>({
        defaultValues: {id: executer.id},
        onChange: pagination.reset,
    });

    const query = queryExecuterPaymentPagination
        .query({
            __typename: "Query",
            adminGetPaymentsOfExecuterById: {
                totalCount: 0,
                edges: [],
            },
        })
        .withConfiguration({variables: {input: form.getValues(), ...pagination.state}})
        .compile();

    pagination.register(query.data?.adminGetPaymentsOfExecuterById.totalCount);

    return (
        <Flex.Col>
            <Query.Async query={query}>
                <Query.Overlay>
                    <ExecuterPaymentTable form={form} />
                </Query.Overlay>

                <Query.Await>
                    <Pagination {...pagination} />
                </Query.Await>
            </Query.Async>
        </Flex.Col>
    );
});
