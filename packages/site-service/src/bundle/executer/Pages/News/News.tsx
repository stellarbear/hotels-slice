import {ExtensionsApollo} from "@app/extensions-apollo";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Flex} from "@app/ui-web-core";
import {Breadcrumbs, Pagination, Query} from "@app/ui-web-kit";
import * as React from "react";
import {NEWS_ALL_QUERY} from "../../@query";
import {ERoute} from "../../AppRoutes";
import {
    NewsAllQuery,
    NewsAllQueryVariables
} from "../../interfaces";
import {NewsForm} from "./NewsForm";

const doc = NEWS_ALL_QUERY;
type Query = NewsAllQuery;
type Variables = NewsAllQueryVariables;
export type NewsPost = Query["allGetPosts"]["edges"][number]["node"];

export const queryNewsPagination = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const News = React.memo(() => {
    Breadcrumbs.add({to: ERoute.news, crumb: "Новости"});

    const [paramsPagination, setParamsPagination] = useQueryParams(p => ({
        first: p.number.defaults(10),
        offset: p.number,
    }));
    const pagination = usePagination({
        onChange: setParamsPagination,
        defaults: paramsPagination,
    });

    const query = queryNewsPagination
        .query({
            __typename: "Query",
            allGetPosts: {
                totalCount: 0,
                edges: [],
            },
        })
        .withConfiguration({variables: {...pagination.state}})
        .compile();

    pagination.register(query.data?.allGetPosts.totalCount);

    return (
        <Flex.Col>
            <Query.Async query={query}>
                <Query.Overlay>
                    <NewsForm />
                </Query.Overlay>

                <Query.Await>
                    <Pagination {...pagination} />
                </Query.Await>
            </Query.Async>
        </Flex.Col>
    );
});
