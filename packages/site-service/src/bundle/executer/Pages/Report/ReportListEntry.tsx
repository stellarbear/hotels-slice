import {isDefined} from "@app/extensions-guard";
import {Icon} from "@app/ui-icons";
import {Colored, Flex} from "@app/ui-web-core";
import {Card, Dropdown, Modal, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {DialogDownload} from "../../../../@shared";
import {ActionReportCreate} from "../../@actions";
import {Report, ReportType} from "./Report";

type Props = {
    name: string;
    type: ReportType;

    report?: Report;
};

export const ReportListEntry = React.memo<Props>((props) => {
    const {report, type, name} = props;


    return (
        <Card>
            <Flex.Row>
                <Colored color={isDefined(report) ? "primary" : undefined}>
                    <Icon icon="doc" />
                </Colored>
                <Typo.p>
                    {name}
                </Typo.p>

                <Flex.Cell flex />

                <Dropdown.Handle>
                    <Modal
                        button={
                            <Dropdown.Item>Сформировать</Dropdown.Item>
                        }>
                        <ActionReportCreate type={type} />
                    </Modal>
                    {report && (
                        <Modal
                            button={
                                <Dropdown.Item>Скачать</Dropdown.Item>
                            }>
                            <DialogDownload
                                fs={executer.URL_FS}
                                url={report.path} />
                        </Modal>
                    )}
                </Dropdown.Handle>
            </Flex.Row>
        </Card>
    );
});
