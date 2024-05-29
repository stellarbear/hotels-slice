import {ExtensionsApollo} from "@app/extensions-apollo";
import {Query} from "@app/ui-web-kit";
import * as React from "react";
import {REPORT_GET_QUERY} from "../../@query";
import {ReportGetQuery} from "../../interfaces";
import {ReportList} from "./ReportList";

const doc = REPORT_GET_QUERY;
type Query = ReportGetQuery;
export type Report = Query["executerGetMyReport"][number];
export type ReportType = Report["type"];

export const queryReportAll = ExtensionsApollo.Query
    .from<Query>(doc)
    .context();

export const Report = React.memo(() => {
    const query = queryReportAll
        .query()
        .compile();

    return (
        <Query.Await query={query}>
            <ReportList />
        </Query.Await>
    );
});
