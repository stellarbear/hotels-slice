import {ExtensionsDate} from "@app/extensions-classes";
import {Icon} from "@app/ui-icons";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Card, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {queryDocumentNoticeAll} from "./DocumentNoticeList";

type Props = {
};

export const DocumentNoticeListTable = React.memo<Props>(() => {
    const [data] = queryDocumentNoticeAll.use();

    const documents = data.executerGetExecuterNotices;
    const filtered = React.useMemo(() => documents.filter(o => o.files.length === 1), []);

    return (
        <Flex.Col>
            {filtered.map((doc, index) => (
                <Card key={index}>
                    <Link blank external to={`${executer.URL_FS}/${doc.files[0].url}`} >
                        <Flex.Row>
                            <Colored color="success">
                                <Icon icon="doc" />
                            </Colored>
                            <Flex.Row justify="space-between" align="center" flex>
                                <Typo.p>
                                    {doc.files[0].fileName}
                                </Typo.p>
                                <Typo.Caption>
                                    {ExtensionsDate.format("d.m.y", doc.createAt)}
                                </Typo.Caption>
                            </Flex.Row>
                        </Flex.Row>
                    </Link>
                </Card>
            ))}
        </Flex.Col>
    );
});
