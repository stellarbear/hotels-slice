import {ExtensionsArray} from "@app/extensions-classes";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useStateEffect} from "@app/extensions-react";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Button, Checkbox, Chip, Dialog, Dropdown, Table} from "@app/ui-web-kit";
import React from "react";
import {DropdownShrink, FilterByBoolean, FilterBySelect, getFullName} from "../../../../../@shared";
import {
    ActionExecuterMarkAsTest,
    ActionExecuterSendPushNotificationsByFilters,
    ActionExecuterSendPushNotificationsById
} from "../../../@actions";
import {FilterByNumber, FilterByProfession, FilterByString} from "../../../@filters";
import {StatusExecuter} from "../../../interfaces";
import {Executer, ExecuterActivityFilters, queryExecuterActivity} from "./ExecuterActivity";

type Props = {
    form: ExtensionsForm.Result<ExecuterActivityFilters>;
};

export const ExecuterActivityTable = React.memo<Props>((props) => {
    const {form} = props;

    const [data] = queryExecuterActivity.use();
    const activity = React.useMemo(() =>
        data.adminAllExecuters.edges.map(e => e.node), [data]);

    const [selected, setSelected] = useStateEffect<Executer[]>([], [activity]);
    const onSelect = React.useCallback((entry: Executer) => () =>
        setSelected((prev) => ExtensionsArray.toggle(prev, entry)), []);
    const onSelectAll = React.useCallback(() =>
        setSelected((prev) => prev.length !== activity.length ? activity : []), [activity]);

    const Factory = Table.Factory(activity);

    return (
        <Flex.Col>
            <Flex.Row justify="flex-end">
                <Dropdown.Handle button={
                    <Dropdown.Trigger>Отправить PUSH уведомления</Dropdown.Trigger>
                }>
                    <Dialog.Handle
                        button={(
                            <Dropdown.Item
                                disabled={selected.length === 0}>
                                Выбранным исполнителям
                            </Dropdown.Item>
                        )}>
                        <ActionExecuterSendPushNotificationsById
                            id={selected.map(e => e.id)} />
                    </Dialog.Handle>
                    <Dialog.Handle
                        button={(
                            <Dropdown.Item
                                disabled={activity.length === 0}>
                                Всем исполнителям, попавшим под примененные фильтры
                            </Dropdown.Item>
                        )}>
                        <ActionExecuterSendPushNotificationsByFilters
                            filters={form.watch()} />
                    </Dialog.Handle>
                </Dropdown.Handle>

                <Button disabled variant="contained">Скачать</Button>
            </Flex.Row>

            <Factory.Body items={activity} view="full-width">
                <Factory.Column
                    title={(
                        <Checkbox
                            readOnly
                            onClick={onSelectAll}
                            checked={selected.length > 0 &&
                                selected.length === activity.length} />
                    )}>
                    {(task) => (
                        <Checkbox
                            readOnly
                            onClick={onSelect(task)}
                            checked={selected.includes(task)} />
                    )}
                </Factory.Column>
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
                <Factory.Column align="left" title={(
                    <Controller
                        name="listOfIdProfession"
                        control={form.control}
                        render={({field: {value, onChange}}) => (
                            <FilterByProfession
                                value={value}
                                onChange={onChange}
                            />
                        )} />
                )}>
                    {(executer) => (
                        <DropdownShrink>
                            {executer.professions.map((e, index) => (
                                <div key={index}>{e.name}</div>
                            ))}
                        </DropdownShrink>
                    )}
                </Factory.Column>
                <Factory.Column name="countDayForEndMedicalBook" title={
                    <FilterByNumber label="Мед книжка" form={form} name="countDayForEndMedicalBook" />
                } />
                <Factory.Column name="countDayForEndRegistration" title={
                    <FilterByNumber label="Регистрация" form={form} name="countDayForEndRegistration" />
                } />
                <Factory.Column name="countDayForLastTask" title={
                    <FilterByNumber label="Последняя заявка" form={form} name="countDayForLastTask" />
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
            </Factory.Body>
        </Flex.Col>
    );
});


const dataExecuterStatus: Record<StatusExecuter, string> = {
    "STEP_1_REGISTERED": "Зарегистрирован",
    "STEP_2_WAITING_FOR_VERIFICATION": "Ожидает",
    "STEP_3_VERIFICATION_DECLINED": "Отклонен",
    "STEP_3_VERIFIED": "Подтвержден",
};
