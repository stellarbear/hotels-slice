import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {fp} from "@app/extensions-fp";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Defined} from "@app/extensions-utility";
import {Flex} from "@app/ui-web-core";
import {Breadcrumbs, Pagination, Query} from "@app/ui-web-kit";
import * as React from "react";
import {EXECUTER_ALL_QUERY} from "../../../@query";
import {ERoute} from "../../../AppRoutes";
import {
    ExecuterAllQuery, ExecuterAllQueryVariables
} from "../../../interfaces";
import {ERoutesExecuter} from "../ExecuterTabs";
import {ExecuterListTable} from "./ExecuterListTable";

const doc = EXECUTER_ALL_QUERY;
type Query = ExecuterAllQuery;
type Variables = ExecuterAllQueryVariables;
export type Executer = Query["adminAllExecuters"]["edges"][number]["node"];
export type ExecuterFilters = Defined<Variables["input"]>;

export const queryExecuterPagination = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const ExecuterList = React.memo(() => {
    Breadcrumbs.add({
        crumb: "Список исполнителей",
        to: `${ERoute.executer}/${ERoutesExecuter.list}`,
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
        inn: p.string,
        email: p.string,
        fullName: p.string,
        phone: p.string,
        isTest: p.boolean,
        status: p.union(
            "STEP_1_REGISTERED",
            "STEP_2_WAITING_FOR_VERIFICATION",
            "STEP_3_VERIFICATION_DECLINED",
            "STEP_3_VERIFIED",
        ),
    }));

    const form = ExtensionsForm.useForm<ExecuterFilters>({
        defaultValues: paramsForm,
        onChange: fp.apply(setParamsForm, pagination.reset),
    });

    const query = queryExecuterPagination
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
                    <ExecuterListTable form={form} />
                </Query.Overlay>

                <Query.Await>
                    <Pagination {...pagination} />
                </Query.Await>
            </Query.Async>
        </Flex.Col>
    );
});

