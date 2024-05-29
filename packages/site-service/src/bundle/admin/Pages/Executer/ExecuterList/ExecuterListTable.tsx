import {ExtensionsDate} from "@app/extensions-classes";
import {ExtensionsForm} from "@app/extensions-form";
import {Icon} from "@app/ui-icons";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Button, Chip, Dialog, Dropdown, Table, Tooltip, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {FilterByBoolean, FilterBySelect, getFullName} from "../../../../../@shared";
import {
    ActionExecuterCheckFNS, ActionExecuterMarkAsTest,
    ActionExecuterResetPassword, ActionExecuterSyncJump, ActionExecuterVerifyCancel,
    ActionExecuterVerifyConfirm, ActionExecuterVerifyDecline
} from "../../../@actions";
import {FilterByString} from "../../../@filters";
import {ActionAuthRelay} from "../../../@shared";
import {StatusExecuter} from "../../../interfaces";
import {ExecuterFilters, queryExecuterPagination} from "./ExecuterList";

type Props = {
    form: ExtensionsForm.Result<ExecuterFilters>;
};

export const ExecuterListTable = React.memo<Props>((props) => {
    const {form} = props;

    const [data] = queryExecuterPagination.use();
    const executers = React.useMemo(() =>
        data.adminAllExecuters.edges.map(e => e.node), [data]);

    const Factory = Table.Factory(executers);

    return (
        <Factory.Body items={executers} view="full-width">

            <Factory.Column name="id" title={
                <FilterByString label="ID" form={form} name="id" />
            } />
            <Factory.Column align="left" title={
                <FilterByString label="ФИО" form={form} name="fullName" />
            }>
                {(executer) => (
                    <Colored color="primary">
                        <Link to={`../entry/${executer.id}`}>
                            <b>
                                {getFullName(executer)}
                            </b>
                        </Link>
                    </Colored>
                )}
            </Factory.Column>
            <Factory.Column align="right" title="jump" >
                {(data) => (
                    <Flex.Row justify="flex-end" align="center">
                        {data.jumpFinance && (
                            <>
                                <Colored color="secondary">
                                    <Typo.Caption>
                                        {ExtensionsDate.format("d.m.y", data.jumpFinance.updateAt)}
                                    </Typo.Caption>
                                </Colored>
                                {data.jumpFinance.isVerified &&
                                    data.jumpFinance.isCanPayTaxes &&
                                    data.jumpFinance.hasCompanyAgreesPayTaxes && (
                                    )}
                                {data.jumpFinance.isVerified &&
                                    !data.jumpFinance.isCanPayTaxes &&
                                    data.jumpFinance.hasCompanyAgreesPayTaxes && (
                                        <Tooltip button={
                                            <Colored color="expectation">
                                                <Icon icon="minus" />
                                            </Colored>
                                        }>
                                            Не разрешил оплату налогов
                                        </Tooltip>
                                    )}
                                {!data.jumpFinance.isVerified &&
                                    !data.jumpFinance.isCanPayTaxes &&
                                    data.jumpFinance.hasCompanyAgreesPayTaxes && (
                                        <Tooltip button={
                                            <Colored color="error">
                                                <Icon icon="minus" />
                                            </Colored>
                                        }>
                                            Не подключен
                                        </Tooltip>
                                    )}

                            </>
                        )}
                        <Dialog.Handle button={
                            <Colored color="success">
                                <Button variant="text">
                                    <Icon icon="update" />
                                </Button>
                            </Colored>
                        }>
                            <ActionExecuterSyncJump id={data.id} />
                        </Dialog.Handle>
                    </Flex.Row>
                )}
            </Factory.Column>
            <Factory.Column name="phoneNumber" title={
                <FilterByString label="Телефон" form={form} name="phone" />
            } />
            <Factory.Column name="inn" title={
                <FilterByString label="ИНН" form={form} name="inn" />
            } />
            <Factory.Column title={
                <FilterBySelect
                    label="Статус"
                    form={form}
                    name="status"
                    items={[
                        {id: "STEP_1_REGISTERED", name: "Зарегистрирован"},
                        {id: "STEP_2_WAITING_FOR_VERIFICATION", name: "Ожидает"},
                        {id: "STEP_3_VERIFICATION_DECLINED", name: "Отклонен"},
                        {id: "STEP_3_VERIFIED", name: "Подтвержден"},
                    ]}
                    getId={e => e.id}
                    getLabel={e => e.name} />
            }>
                {({status}) => dataExecuterStatus[status]}
            </Factory.Column>
            <Factory.Column title={
                <FilterByBoolean
                    form={form}
                    name="isTest"
                    true="Тестовые"
                    false="Обычные"
                    label="Отметка" />
            }>
                {({isTest, id}) => (
                    <Dialog.Handle button={
                        isTest
                            ? <Chip color="error">Тестовый</Chip>
                            : <Chip color="primary">Обычный</Chip>
                    }>
                        <ActionExecuterMarkAsTest
                            id={id}
                            isTest={isTest} />
                    </Dialog.Handle>
                )}
            </Factory.Column>
            <Factory.Column title="Действия">
                {(executer) => (
                    <Flex.Row align="center">
                        <Dialog.Handle
                            button={
                                <Button>
                                    Авторизоваться
                                </Button>
                            }>
                            <ActionAuthRelay id={executer.id} role="executer" />
                        </Dialog.Handle>
                        <Dropdown.Handle>
                            {executer.status === "STEP_2_WAITING_FOR_VERIFICATION" && (
                                <Dialog.Handle button={
                                    <Dropdown.Item>Подтвердить аккаунт</Dropdown.Item>
                                }>
                                    <ActionExecuterVerifyConfirm id={executer.id} />
                                </Dialog.Handle>
                            )}
                            {executer.status === "STEP_2_WAITING_FOR_VERIFICATION" && (
                                <Dialog.Handle button={
                                    <Dropdown.Item>Отклонить аккаунт</Dropdown.Item>
                                }>
                                    <ActionExecuterVerifyDecline id={executer.id} />
                                </Dialog.Handle>
                            )}
                            {executer.status === "STEP_3_VERIFIED" && (
                                <Dialog.Handle button={
                                    <Dropdown.Item>Сбросить аккаунт</Dropdown.Item>
                                }>
                                    <ActionExecuterVerifyCancel id={executer.id} />
                                </Dialog.Handle>
                            )}
                            <Dialog.Handle
                                button={
                                    <Dropdown.Item>
                                        Сбросить пароль
                                    </Dropdown.Item>
                                }>
                                <ActionExecuterResetPassword id={executer.id} />
                            </Dialog.Handle>
                            <Dialog.Handle
                                button={
                                    <Dropdown.Item>
                                        Самозанятость
                                    </Dropdown.Item>
                                }>
                                <ActionExecuterCheckFNS id={executer.id} />
                            </Dialog.Handle>
                        </Dropdown.Handle>
                    </Flex.Row>
                )}
            </Factory.Column>
        </Factory.Body>
    );
});

const dataExecuterStatus: Record<StatusExecuter, string> = {
    "STEP_1_REGISTERED": "Зарегистрирован",
    "STEP_2_WAITING_FOR_VERIFICATION": "Ожидает",
    "STEP_3_VERIFICATION_DECLINED": "Отклонен",
    "STEP_3_VERIFIED": "Подтвержден",
};
