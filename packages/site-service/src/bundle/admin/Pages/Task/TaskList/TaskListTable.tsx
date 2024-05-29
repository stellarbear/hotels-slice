import { ExtensionsDate } from "@app/extensions-classes";
import { ExtensionsForm } from "@app/extensions-form";
import { Colored, Flex, Link } from "@app/ui-web-core";
import { Button, Dialog, Table, Typo } from "@app/ui-web-kit";
import React from "react";
import { ActionTaskMove } from "../../../@actions";
import { FilterByDate, FilterByString } from "../../../@filters";
import { TaskStatus } from "../../../interfaces";
import { TasksFilters, queryTaskPagination } from "./TaskList";

type Props = {
    form: ExtensionsForm.Result<TasksFilters>;
};

export const TaskListTable = (props: Props) => {
    const { form } = props;

    const [data] = queryTaskPagination.use();
    const task = data.adminAllTask.edges.map(e => e.node);

    const Factory = Table.Factory(task);

    return (
        <Flex.Col>
            <Typo.Title>Заявки</Typo.Title>

            <Factory.Body items={task} view="full-width">
                <Factory.Column title={
                    <FilterByString
                        form={form}
                        name="taskId"
                        label="ID"
                    />
                } name="id" />
                <Factory.Column title="Профессия">
                    {(data) =>
                        data.personalProfession?.name ?? data.profession.name}
                </Factory.Column>
                <Factory.Column title={
                    <FilterByDate form={form} name="startAt" />
                }>
                    {(data) => ExtensionsDate.format("d.m.y H:M", data.startAt)}
                </Factory.Column>
                <Factory.Column title="Исполнители">
                    {(data) => (
                        <Colored color="primary">
                            <Link to={`./entry/${data.id}`}>
                                <b>
                                    {data.executers.length} / {data.countExecuters}
                                </b>
                            </Link>
                        </Colored>
                    )}
                </Factory.Column>
                <Factory.Column title="Длительность">
                    {(data) => `${data.duration} ч.`}
                </Factory.Column>
                <Factory.Column title="Статус">
                    {(data) => statusMap[data.status]}
                </Factory.Column>
                <Factory.Column title="Действия">
                    {(data) => (
                        <Dialog.Handle button={
                            <Button>Переместить на&nbsp;месяц&nbsp;назад</Button>
                        }>
                            <ActionTaskMove idTask={data.id} />
                        </Dialog.Handle>
                    )}
                </Factory.Column>
            </Factory.Body>
        </Flex.Col>
    );
};

const statusMap: Record<TaskStatus, string> = {
    "STEP_1_CREATED": "Создана",
    "STEP_2_WAITING": "Появились отклики",
    "STEP_3_COLLECT": "Исполнители заполнены",
    "STEP_4_CONFIRMED": "Исполнители подтверждены",
    "STEP_5_START": "Заявка начата",
    "STEP_6_DONE": "Заявка выполнена",
    "DELETED": "Заявка удалена",
};
