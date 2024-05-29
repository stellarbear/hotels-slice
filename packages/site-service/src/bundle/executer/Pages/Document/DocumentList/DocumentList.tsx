import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import React from "react";
import {DOCUMENT_ALL_QUERY} from "../../../@query";
import {DocumentAllQuery} from "../../../interfaces";
import {DocumentListForm} from "./DocumentListForm";

const doc = DOCUMENT_ALL_QUERY;
type Query = DocumentAllQuery;

export const queryDocumentsAll = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const DocumentList = React.memo(() => {
    const query = queryDocumentsAll
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <DocumentListForm />
        </Query.Await>
    );
});
