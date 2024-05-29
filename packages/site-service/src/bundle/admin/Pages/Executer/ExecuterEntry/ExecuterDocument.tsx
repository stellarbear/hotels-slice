import {Flex} from "@app/ui-web-core";
import React from "react";
import {ExecuterDocumentAgreemnentDate} from "./ExecuterDocumentAgreemnentDate";
import {ExecuterDocumentCitizenship} from "./ExecuterDocumentCitizenship";
import {ExecuterDocumentNotice} from "./ExecuterDocumentNotice";
import {ExecuterDocumentTaskCurrent} from "./ExecuterDocumentTaskCurrent";

export const ExecuterDocument = React.memo(() => (
    <Flex.Col>
        <div>
            <>Гражданство</>
            <ExecuterDocumentCitizenship />
        </div>
        <div>
            <>Дата подписания договора</>
            <ExecuterDocumentAgreemnentDate />
        </div>
        <div>
            <>Входящие уведомления</>
            <ExecuterDocumentNotice />
        </div>
        <div>
            <>Активная заявка</>
            <ExecuterDocumentTaskCurrent />
        </div>
    </Flex.Col>
));
