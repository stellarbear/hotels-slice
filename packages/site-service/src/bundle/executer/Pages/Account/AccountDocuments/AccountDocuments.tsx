import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {EXECUTER_DOCUMENTS_QUERY} from "../../../@query";
import {ExecuterDocumentsQuery} from "../../../interfaces";
import {AccountDocumentsForm} from "./AccountDocumentsForm";

const doc = EXECUTER_DOCUMENTS_QUERY;
type Query = ExecuterDocumentsQuery;
export type DocumentsNode = Query;

export const queryDocumentsAll = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const AccountDocuments = React.memo(() => {
    const query = queryDocumentsAll
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <AccountDocumentsForm />
        </Query.Await>
    );
});
