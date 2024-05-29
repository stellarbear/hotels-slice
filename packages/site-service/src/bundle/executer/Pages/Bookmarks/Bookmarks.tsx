import {ExtensionsApollo} from "@app/extensions-apollo";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Flex} from "@app/ui-web-core";
import {Breadcrumbs, Pagination, Query} from "@app/ui-web-kit";
import * as React from "react";
import {CUSTOMER_GET_BOOKMARKS_QUERY} from "../../@query";
import {ERoute} from "../../AppRoutes";
import {
    CustomerGetBookmarksQuery,
    CustomerGetBookmarksQueryVariables
} from "../../interfaces";
import {BookmarksForm} from "./BookmarksForm";

const doc = CUSTOMER_GET_BOOKMARKS_QUERY;
type Query = CustomerGetBookmarksQuery;
type Variables = CustomerGetBookmarksQueryVariables;
export type Bookmark = Query["executerGetFavoriteHotels"]["edges"][number]["node"];

export const queryBookmarkPagination = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const Bookmarks = React.memo(() => {
    Breadcrumbs.add({to: ERoute.bookmarks, crumb: "Избранное"});

    const [paramsPagination, setParamsPagination] = useQueryParams(p => ({
        first: p.number.defaults(10),
        offset: p.number,
    }));
    const pagination = usePagination({
        onChange: setParamsPagination,
        defaults: paramsPagination,
    });

    const query = queryBookmarkPagination
        .query({
            __typename: "Query",
            executerGetFavoriteHotels: {
                totalCount: 0,
                edges: [],
            },
        })
        .withConfiguration({variables: {...pagination.state}})
        .compile();

    pagination.register(query.data?.executerGetFavoriteHotels.totalCount);

    return (
        <Flex.Col>
            <Query.Async query={query}>
                <Query.Overlay>
                    <BookmarksForm />
                </Query.Overlay>

                <Query.Await>
                    <Pagination {...pagination} />
                </Query.Await>
            </Query.Async>
        </Flex.Col>
    );
});
