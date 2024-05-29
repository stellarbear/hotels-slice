import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {EXECUTER_VERIFICATION_QUERY} from "../../../@query";
import {ExecuterVerificationQuery} from "../../../interfaces";
import {AccountVerificationStatusForm} from "./AccountVerificationStatusForm";

const doc = EXECUTER_VERIFICATION_QUERY;
type Query = ExecuterVerificationQuery;
export type Verification = ExecuterVerificationQuery;

export const queryAccountVerification = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const AccountVerificationStatus = React.memo(() => {
    const query = queryAccountVerification
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <AccountVerificationStatusForm />
        </Query.Await>
    );
});
