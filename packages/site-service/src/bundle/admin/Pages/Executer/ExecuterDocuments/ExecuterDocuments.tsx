import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {fp} from "@app/extensions-fp";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Flex} from "@app/ui-web-core";
import {Breadcrumbs, Pagination, Query} from "@app/ui-web-kit";
import React from "react";
import {EXECUTER_DOCUMENTS_QUERY} from "../../../@query";
import {ERoute} from "../../../AppRoutes";
import {ExecuterDocumentsQuery, ExecuterDocumentsQueryVariables} from "../../../interfaces";
import {ERoutesExecuter} from "../ExecuterTabs";
import {ExecuterDocumentsTable} from "./ExecuterDocumentsTable";

const doc = EXECUTER_DOCUMENTS_QUERY;
type Query = ExecuterDocumentsQuery;
type Variables = ExecuterDocumentsQueryVariables;
export type Executer = Query["adminAllExecuters"]["edges"][number]["node"];
export type ExecuterDocumentsFilters = Variables["input"];

export const queryExecuterDocuments = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const ExecuterDocuments = React.memo(() => {
    Breadcrumbs.add({
        crumb: "Документы исполнителей",
        to: `${ERoute.document}/${ERoutesExecuter.documents}`,
    });

    const [paramsPagination, setParamsPagination] = useQueryParams(p => ({
        first: p.number.defaults(10),
        offset: p.number,
    }));
    const pagination = usePagination({
        onChange: setParamsPagination,
        defaults: paramsPagination,
    });

    const [paramsForm, setParamsForm] = useQueryParams((p) => ({
        id: p.string,
        fullName: p.string,
        citizenship: p.union("Российская Федерация", "Иное"),
        agreementDatetime: p.date,
    }));

    const form = ExtensionsForm.useForm<ExecuterDocumentsFilters>({
        defaultValues: paramsForm,
        onChange: fp.apply(setParamsForm, pagination.reset),
    });

    const query = queryExecuterDocuments
        .query({
            __typename: "Query",
            adminAllExecuters: {
                totalCount: 0,
                edges: [],
            },
        })
        .withConfiguration({variables: {input: form.getValues(), ...pagination.state}})
        .compile();

    pagination.register(query.data?.adminAllExecuters.totalCount);

    return (
        <Flex.Col>
            <Query.Async query={query}>
                <Query.Overlay>
                    <ExecuterDocumentsTable form={form} />
                </Query.Overlay>

                <Query.Await>
                    <Pagination {...pagination} />
                </Query.Await>
            </Query.Async>
        </Flex.Col>
    );
});
