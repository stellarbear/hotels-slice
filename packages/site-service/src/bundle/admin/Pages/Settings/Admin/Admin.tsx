import {ExtensionsApollo} from "@app/extensions-apollo";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Flex} from "@app/ui-web-core";
import {Breadcrumbs, Pagination, Query} from "@app/ui-web-kit";
import * as React from "react";
import {ADMIN_ALL_QUERY} from "../../../@query";
import {ERoute} from "../../../AppRoutes";
import {AdminAllQuery, AdminAllQueryVariables} from "../../../interfaces";
import {ERoutesSettings} from "../SettingsForm";
import {AdminTable} from "./AdminTable";

const doc = ADMIN_ALL_QUERY;
type Query = AdminAllQuery;
type Variables = AdminAllQueryVariables;

export const queryAdminPagination = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const Admin = React.memo(() => {
    Breadcrumbs.add({
        crumb: "Администраторы",
        to: `${ERoute.settings}/${ERoutesSettings.admin}`,
    });

    const [paramsPagination, setParamsPagination] = useQueryParams(p => ({
        first: p.number.defaults(10),
        offset: p.number,
    }));
    const pagination = usePagination({
        onChange: setParamsPagination,
        defaults: paramsPagination,
    });

    const query = queryAdminPagination
        .query({
            __typename: "Query",
            adminAllAdmins: {
                totalCount: 0,
                edges: [],
            },
        })
        .withConfiguration({variables: {...pagination.state}})
        .compile();

    pagination.register(query.data?.adminAllAdmins.totalCount);

    return (
        <Flex.Col>
            <Query.Async query={query}>
                <Query.Overlay>
                    <AdminTable />
                </Query.Overlay>

                <Query.Await>
                    <Pagination {...pagination} />
                </Query.Await>
            </Query.Async>
        </Flex.Col>
    );
});
