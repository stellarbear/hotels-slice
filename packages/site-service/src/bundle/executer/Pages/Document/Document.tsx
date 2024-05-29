import {Flex} from "@app/ui-web-core";
import {Typo} from "@app/ui-web-kit";
import React from "react";
import {DocumentList} from "./DocumentList";
import {DocumentNoticeList} from "./DocumentNoticeList";
import {TaskCurrent} from "./TaskCurrent";

export const Document = React.memo(() => (
    <Flex.Col>
        <Typo.SubTitle>Список документов</Typo.SubTitle>
        <DocumentList />
        <DocumentNoticeList />

        <Typo.SubTitle>Активная заявка</Typo.SubTitle>
        <TaskCurrent />
    </Flex.Col>
));
 