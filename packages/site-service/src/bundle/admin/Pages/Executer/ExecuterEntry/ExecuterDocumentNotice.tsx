import {ExtensionsDate} from "@app/extensions-classes";
import {Icon} from "@app/ui-icons";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Card, Typo} from "@app/ui-web-kit";
import React from "react";
import {queryExecuterEntry} from "./ExecuterEntry";

export const ExecuterDocumentNotice = React.memo(() => {
    const [executer] = queryExecuterEntry.use();
    const documents = executer.adminGetExecuterById.executernoticeSet ?? [];

    if (documents.length === 0) {
        return <Typo.p>Отсутсвуют</Typo.p>;
    }

    return (
        <Flex.Col>
            {documents.map((doc, index) => (
                <Card key={index}>
                    <Link blank external to={`${admin.URL_FS}/${doc.files[0].url}`} >
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
