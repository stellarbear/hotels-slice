import {ExtensionsDate} from "@app/extensions-classes";
import {Colored, Flex, Section} from "@app/ui-web-core";
import {Card, Dictionary, Modal, Typo} from "@app/ui-web-kit";
import React from "react";
import {queryTaskCurrent} from "./TaskCurrent";

type Props = {
};

export const TaskCurrentForm = React.memo<Props>(() => {
    const [data] = queryTaskCurrent.use();
    const task = data.executerGetTaskAtTheMoment;

    if (!task) {
        return <Typo.p>Активная заявка отсутсвует</Typo.p>;
    }

    return (
        <Typo.p>
            Оказание услуги по заявке{" "}
            <Modal button={
                <Colored color="success">
                    <b>{`№${task.id}`}</b>
                </Colored>
            }>
                <Section>
                    <Card>
                        <Flex.Col>
                            <Typo.SubTitle>{`Заявка ${task.id}`}</Typo.SubTitle>
                            
                            <div>
                                <Dictionary
                                    object={task}
                                    as={{
                                        "Дата": (v) => ExtensionsDate.format("y.m.d H:M", new Date(v.startAt)),
                                        "Заказчик": (v) => v.manager.hotel.nameHotel,
                                        "Длительность": (v) => `${v.duration} ч.`,
                                    }} />
                            </div>
                        </Flex.Col>
                    </Card>
                </Section>
            </Modal>
        </Typo.p>
    );
});
