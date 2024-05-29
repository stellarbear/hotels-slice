import {Flex} from "@app/ui-web-core";
import {Typo} from "@app/ui-web-kit";
import * as React from "react";
import {ReportType, queryReportAll} from "./Report";
import {ReportListEntry} from "./ReportListEntry";
import {ExtensionsObject} from "@app/extensions-classes";

type Props = {
};

export const dataDocumentExecuter: Record<ReportType, string> = {
    "BY_TYPE": "Отчет по типам услуг",
    "DIFFERENCE_REPORT": "Отчет по корректировкам",
    "FINANCIAL": "Финансовый отчет",
    "STANDART_REPORT": "Стандартный отчет",
};

export const ReportList = React.memo<Props>(() => {
    const [data] = queryReportAll.use();

    const reportsMap = React.useMemo(() =>
        ExtensionsObject.fromArray(data.executerGetMyReport, e => e.type), []);

    const reports: ReportType[] = React.useMemo(() =>
        ["BY_TYPE", "DIFFERENCE_REPORT", "FINANCIAL", "STANDART_REPORT"], []);

    return (
        <Flex.Col>
            <Typo.Title>Отчеты</Typo.Title>
            {reports.map((report, index) => (
                <ReportListEntry
                    key={index}
                    type={report}
                    name={dataDocumentExecuter[report]}
                    report={reportsMap[report]}
                />
            ))}
        </Flex.Col>
    );
});

