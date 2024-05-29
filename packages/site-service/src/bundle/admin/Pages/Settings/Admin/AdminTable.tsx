import {Flex, SwitchEnum} from "@app/ui-web-core";
import {Button, Dialog, Dropdown, Table} from "@app/ui-web-kit";
import * as React from "react";
import {ActionAdminDeactivate, ActionAdminResetPassword, ActionAdminUpsert} from "../../../@actions";
import {queryAdminPagination} from "./Admin";

export const AdminTable = React.memo(() => {
    const [data] = queryAdminPagination.use();
    const admins = React.useMemo(() =>
        data.adminAllAdmins.edges.map(e => e.node), [data]);

    const Factory = Table.Factory(admins);

    return (
        <Flex.Col>
            <Flex.Row justify="flex-end">
                <Dialog.Handle button={<Button>Создать</Button>}>
                    <ActionAdminUpsert />
                </Dialog.Handle>
            </Flex.Row>
            
            <Factory.Body items={admins} view="full-width">
                <Factory.Column name="id" title="ID" />

                <Factory.Column name="name" title="Имя" align="left"/>
                <Factory.Column title="Права доступа">
                    {({permissions}) => (
                        <SwitchEnum
                            value={permissions}
                            as={{
                                "FULL_ACCESS": "Полный доступ",
                                "MANAGER": "Менеджер",
                                "MANAGER_REPORT_USERS_PROFILE": "Менеджер + отчеты",
                            }}
                        />
                    )}
                </Factory.Column>
                <Factory.Column name="percent" title="Процент" />
                <Factory.Column name="role" title="Роль" />
                <Factory.Column title="Действия">
                    {(admin) => (
                        <Dropdown.Handle>
                            <Dialog.Handle button={
                                <Dropdown.Item>
                                    Отозвать доступ
                                </Dropdown.Item>
                            }>
                                <ActionAdminDeactivate id={admin.id} />
                            </Dialog.Handle>
                            <Dialog.Handle button={
                                <Dropdown.Item>
                                    Редактировать
                                </Dropdown.Item>
                            }>
                                <ActionAdminUpsert record={admin} />
                            </Dialog.Handle>
                            <Dialog.Handle button={
                                <Dropdown.Item>
                                    Сменить пароль
                                </Dropdown.Item>
                            }>
                                <ActionAdminResetPassword id={admin.id} />
                            </Dialog.Handle>
                        </Dropdown.Handle>
                    )}
                </Factory.Column>
            </Factory.Body>
        </Flex.Col>
    );
});
