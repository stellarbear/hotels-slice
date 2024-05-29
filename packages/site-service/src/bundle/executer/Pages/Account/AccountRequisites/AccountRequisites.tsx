import {ExtensionsApollo} from "@app/extensions-apollo";
import {Flex} from "@app/ui-web-core";
import {Divider, Query} from "@app/ui-web-kit";
import * as React from "react";
import {EXECUTER_REQUISITES_QUERY} from "../../../@query";
import {ExecuterRequisitesQuery} from "../../../interfaces";
import {AccountRequisitesCard} from "./AccountRequisitesCard";
import {AccountRequisitesForm} from "./AccountRequisitesForm";

const doc = EXECUTER_REQUISITES_QUERY;
type Query = ExecuterRequisitesQuery;

export const queryRequisites = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const AccountRequisites = React.memo(() => {
    const query = queryRequisites
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <Flex.Col>
                <AccountRequisitesForm />
                <Divider />
                <AccountRequisitesCard />
            </Flex.Col>
        </Query.Await>
    );
});
