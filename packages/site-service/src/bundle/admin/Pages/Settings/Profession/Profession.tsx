import {ExtensionsApollo} from "@app/extensions-apollo";
import {Breadcrumbs, Query} from "@app/ui-web-kit";
import * as React from "react";
import {PROFESSION_ALL_QUERY} from "../../../@query";
import {ERoute} from "../../../AppRoutes";
import {ProfessionAllQuery} from "../../../interfaces";
import {ERoutesSettings} from "../SettingsForm";
import {ProfessionTable} from "./ProfessionTable";

const doc = PROFESSION_ALL_QUERY;
type Query = ProfessionAllQuery;

export const queryProfessionAll = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const Profession = React.memo(() => {
    Breadcrumbs.add({
        crumb: "Профессии",
        to: `${ERoute.settings}/${ERoutesSettings.profession}`,
    });

    const query = queryProfessionAll
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <ProfessionTable />
        </Query.Await>
    );
});
