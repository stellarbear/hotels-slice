import {Colored, Flex, SwitchEnum} from "@app/ui-web-core";
import {Breadcrumbs, Chip, Dialog, Dropdown, Tab, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {useNavigate, useParams} from "react-router";
import {getFullName} from "../../../../../@shared";
import {
    ActionExecuterVerifyCancel, ActionExecuterVerifyConfirm,
    ActionExecuterVerifyDecline
} from "../../../@actions";
import {ERoute} from "../../../AppRoutes";
import {ExecuterDocument} from "./ExecuterDocument";
import {queryExecuterEntry} from "./ExecuterEntry";
import {ExecuterPayment} from "./ExecuterPayment";

export enum ERoutesExecuterEntry {
    document = "document",
    payment = "payment",
}

type Params = {
    type: ERoutesExecuterEntry;
};

export const ExecuterEntryTabs = React.memo(() => {
    const [data] = queryExecuterEntry.use();
    const executer = data.adminGetExecuterById;

    Breadcrumbs.add({
        crumb: getFullName(executer),
        to: `${ERoute.executer}/entry/${executer.id}`,
    });

    const params = useParams<Params>();
    const navigate = useNavigate();
    const urlReplace = React.useCallback((type?: string) =>
        type && navigate(`${ERoute.executer}/entry/${executer.id}/${type}`), []);

    return (
        <Flex.Col>
            <Typo.Title>
                {getFullName(executer)}
            </Typo.Title>

            <Flex.Row align="center">
                <SwitchEnum value={executer.status}
                    as={{
                        "STEP_1_REGISTERED": <Chip color="secondary">Неподтвержден</Chip>,
                        "STEP_2_WAITING_FOR_VERIFICATION": <Chip color="expectation">Ожидание верификации</Chip>,
                        "STEP_3_VERIFICATION_DECLINED": <Chip color="error">Отклонен</Chip>,
                        "STEP_3_VERIFIED": <Chip color="primary">Подтвержден</Chip>,
                    }} />

                {executer.status === "STEP_2_WAITING_FOR_VERIFICATION" && (
                    <Dropdown.Handle>
                        <Dialog.Handle button={
                            <Dropdown.Item>
                                <Colored color="success">Подтвердить аккаунт</Colored>
                            </Dropdown.Item>
                        }>
                            <ActionExecuterVerifyConfirm id={executer.id} />
                        </Dialog.Handle>
                        <Dialog.Handle button={
                            <Dropdown.Item>
                                <Colored color="error">Отклонить аккаунт</Colored>
                            </Dropdown.Item>
                        }>
                            <ActionExecuterVerifyDecline id={executer.id} />
                        </Dialog.Handle>
                    </Dropdown.Handle>
                )}

                {executer.status === "STEP_3_VERIFIED" && (
                    <Dropdown.Handle>
                        <Dialog.Handle button={
                            <Dropdown.Item>
                                <Colored color="error">Сбросить аккаунт</Colored>
                            </Dropdown.Item>
                        }>
                            <ActionExecuterVerifyCancel id={executer.id} />
                        </Dialog.Handle>
                    </Dropdown.Handle>
                )}
            </Flex.Row>

            <Tab.Handle onTabChange={urlReplace} defaultId={params.type}>
                <Tab.Item title="Документы" id={ERoutesExecuterEntry.document}>
                    <ExecuterDocument />
                </Tab.Item>
                <Tab.Item title="Выплаты" id={ERoutesExecuterEntry.payment}>
                    <ExecuterPayment />
                </Tab.Item>
            </Tab.Handle>
        </Flex.Col>
    );
});
