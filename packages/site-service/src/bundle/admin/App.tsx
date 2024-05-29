import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {MainContainer} from "./@components";
import {MAIN_QUERY} from "./@query";
import {AppRoutes} from "./AppRoutes";
import {MainQuery} from "./interfaces";

const doc = MAIN_QUERY;
type Query = MainQuery;
const {Provider: MainProvider} = MainContainer.context();

const queryMain = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const App = React.memo(() => {
    const query = queryMain
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <AppForm />
        </Query.Await>
    );
});

const AppForm = React.memo(() => {
    const [data, {refetchQuery}] = queryMain.use();
    const value = React.useMemo(() => new MainContainer(data, refetchQuery), [data, refetchQuery]);

    return (
        <MainProvider value={value}>
            <AppRoutes />
        </MainProvider>
    );
});
