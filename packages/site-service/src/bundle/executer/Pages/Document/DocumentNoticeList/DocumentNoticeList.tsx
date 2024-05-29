import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {DOCUMENT_NOTICE_GET_ALL_QUERY} from "../../../@query";
import {
    DocumentNoticeGetAllQuery,
    DocumentNoticeGetAllQueryVariables
} from "../../../interfaces";
import {DocumentNoticeListTable} from "./DocumentNoticeListTable";

const doc = DOCUMENT_NOTICE_GET_ALL_QUERY;
type Query = DocumentNoticeGetAllQuery;
export type Variables = DocumentNoticeGetAllQueryVariables;

export const queryDocumentNoticeAll = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const DocumentNoticeList = React.memo(() => {
    const query = queryDocumentNoticeAll
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <DocumentNoticeListTable />
        </Query.Await>
    );
});
