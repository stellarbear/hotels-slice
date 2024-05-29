import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {fp} from "@app/extensions-fp";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Flex} from "@app/ui-web-core";
import {Breadcrumbs, Pagination, Query} from "@app/ui-web-kit";
import React from "react";
import {EXECUTER_ACTIVITY_QUERY} from "../../../@query";
import {ERoute} from "../../../AppRoutes";
import {ExecuterActivityQuery, ExecuterActivityQueryVariables} from "../../../interfaces";
import {ERoutesExecuter} from "../ExecuterTabs";
import {ExecuterActivityTable} from "./ExecuterActivityTable";

const doc = EXECUTER_ACTIVITY_QUERY;
type Query = ExecuterActivityQuery;
type Variables = ExecuterActivityQueryVariables;
export type Executer = Query["adminAllExecuters"]["edges"][number]["node"];
export type ExecuterActivityFilters = Variables["input"];

export const queryExecuterActivity = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const ExecuterActivity = React.memo(() => {
    Breadcrumbs.add({
        crumb: "Активность исполнителей",
        to: `${ERoute.document}/${ERoutesExecuter.activity}`,
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
        idProfession: p.string,
        countDayForEndMedicalBook: p.number,
        countDayForEndRegistration: p.number,
        countDayForLastTask: p.number,
        isTest: p.boolean,
        listOfIdProfession: p.array(p.string),
        status: p.union(
            "STEP_1_REGISTERED",
            "STEP_2_WAITING_FOR_VERIFICATION",
            "STEP_3_VERIFICATION_DECLINED",
            "STEP_3_VERIFIED",
        ),
    }));

    const form = ExtensionsForm.useForm<ExecuterActivityFilters>({
        defaultValues: paramsForm,
        onChange: fp.apply(setParamsForm, pagination.reset),
    });

    const query = queryExecuterActivity
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
                    <ExecuterActivityTable form={form} />
                </Query.Overlay>

                <Query.Await>
                    <Pagination {...pagination} />
                </Query.Await>
            </Query.Async>
        </Flex.Col>
    );
});
