import {ExtensionsDate} from "@app/extensions-classes";
import {Icon} from "@app/ui-icons";
import {Flex} from "@app/ui-web-core";
import {Button, Card, Dictionary, Modal, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {ActionTaskRequest} from "../../@actions";
import {Task} from "./TasksForm";

type Props = {
    task: Task;
};

export const TasksFormListEntry = React.memo<Props>((props) => {
    const {task} = props;

    const profession = React.useMemo(() =>
        task.personalProfession?.name ?? task.profession.name,
        [task]);

    return (
        <Card>
            <Flex.Col>
                <Flex.Row justify="space-between">
                    <Typo.p>{profession}</Typo.p>
                    <Typo.p pre>{`${task.rent} ₽/ч.`}</Typo.p>
                </Flex.Row>

                <Typo.p>{task.profession.description}</Typo.p>

                <Dictionary
                    object={task}
                    as={{
                        "calendar": (v) => ExtensionsDate.format("d.m.y H:M", new Date(v.startAt)),
                        "clock": (v) => `${v.duration} ч.`,
                        "pin": (v) => v.manager.hotel.coordinates?.address,
                        "hotel": (v) => v.manager.hotel.nameHotel,
                    }}
                    renderKey={(key) => (<Icon icon={key} />)} />

                <Modal
                    button={(
                        <Button
                            fullwidth>
                            Принять заявку
                        </Button>
                    )}>
                    <ActionTaskRequest task={task} />
                </Modal>
            </Flex.Col>
        </Card>
    );
});
