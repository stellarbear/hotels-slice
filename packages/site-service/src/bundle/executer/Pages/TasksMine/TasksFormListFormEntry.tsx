import {ExtensionsDate} from "@app/extensions-classes";
import {Flex} from "@app/ui-web-core";
import {Card, Chip, Dictionary, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {Rating} from "../../../../@shared";
import {ExecuterStateStatus} from "../../interfaces";
import {TaskInfo} from "./TasksFormList";
import {TasksFormListFormEntryActions} from "./TasksFormListFormEntryActions";

type Props = {
    task: TaskInfo;
};

const statusText: Record<ExecuterStateStatus, string> = {
    "CANCEL_BY_CUSTOMER": "Отменена заказчиком",
    "CANCEL_YOURSELF": "Отменена исполнителем",
    "CONFIRMED": "Подтверждена",
    "REPLY": "Произведен отклик",
    "START": "В работе",
    "STOP": "Закрыта",
};

export const TasksFormListFormEntry = React.memo<Props>((props) => {
    const {task} = props;

    return (
        <Card>
            <Flex.Col>
                <Typo.Title>{task.task.personalProfession?.name}</Typo.Title>

                <Flex.Row align="center" justify="space-between">
                    <Typo.SubTitle>{`Заявка ${task.task.id}`}</Typo.SubTitle>
                    <div>{statusText[task.status]}</div>
                </Flex.Row>

                {task.paymentStatus === "paid_payment" && (
                    <Chip>Оплачено</Chip>
                )}

                <div>
                    <Dictionary
                        object={task}
                        as={{
                            "Дата": (v) => ExtensionsDate.format("y.m.d H:M", new Date(v.task.startAt)),
                            "Заказчик": (v) => v.task.manager.hotel.nameHotel,
                            "Длительность": (v) => `${v.task.duration} ч.`,
                            "Профессия": (v) => v.task.personalProfession?.name ?? "-",
                            "Отработано": (v) => ExtensionsDate.format(
                                "H:M",
                                ExtensionsDate.difference(v.startAt, v.stopAt)),
                            "Оценка": (v) => (
                                v.feedback?.rating
                                    ? <Rating value={v.feedback?.rating} />
                                    : "-"
                            ),
                        }} />
                </div>
                <TasksFormListFormEntryActions {...props} />
            </Flex.Col>
        </Card>
    );
});
