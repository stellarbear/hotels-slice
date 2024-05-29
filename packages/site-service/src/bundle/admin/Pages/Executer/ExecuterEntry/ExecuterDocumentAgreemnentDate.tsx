import {ExtensionsDate} from "@app/extensions-classes";
import {Flex} from "@app/ui-web-core";
import {Button, Dialog, Typo} from "@app/ui-web-kit";
import React from "react";
import {ActionExecuterSetAgreementDate} from "../../../@actions";
import {queryExecuterEntry} from "./ExecuterEntry";

export const ExecuterDocumentAgreemnentDate = React.memo(() => {
    const [data] = queryExecuterEntry.use();
    const executer = data.adminGetExecuterById;

    return (
        <Flex.Col>
            <Typo.p>
                {ExtensionsDate.format("d.m.y", executer.agreementDatetime, "-")}
            </Typo.p>

            <Dialog.Handle button={(
                <Button disabled={executer.agreementDatetime}>
                    Назначить
                </Button>
            )}>
                <ActionExecuterSetAgreementDate id={executer.id} />

            </Dialog.Handle>
        </Flex.Col>
    );
});
