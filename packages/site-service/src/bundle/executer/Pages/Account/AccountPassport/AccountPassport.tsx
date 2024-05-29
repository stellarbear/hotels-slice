import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {EXECUTER_PASSPORT_QUERY} from "../../../@query";
import {ExecuterPassportQuery} from "../../../interfaces";
import {AccountPassportForm} from "./AccountPassportForm";

const doc = EXECUTER_PASSPORT_QUERY;
type Query = ExecuterPassportQuery;

export const queryExecuterPassport = ExtensionsApollo.Query
    .from<Query>(doc).context();

export const AccountPassport = React.memo(() => {
    const query = queryExecuterPassport
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <AccountPassportForm />
        </Query.Await>
    );
});
