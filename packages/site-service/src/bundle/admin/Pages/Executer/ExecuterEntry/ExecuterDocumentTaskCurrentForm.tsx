import {ExtensionsDate} from "@app/extensions-classes";
import {Colored, Flex, Section} from "@app/ui-web-core";
import {Card, Dictionary, Modal, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {queryExecuterGetTaskCurrentEntry} from "./ExecuterDocumentTaskCurrent";

export const ExecuterDocumentTaskCurrentForm = React.memo(() => {
    const [data] = queryExecuterGetTaskCurrentEntry.use(true);
    const task = data.adminGetCurrentTaskIdExecuter;

    if (!task) {
        return <Typo.p>Отсутсвует</Typo.p>;
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
                            
                            <Flex.Col>
                                <Dictionary
                                    object={task}
                                    as={{
                                        "Дата": (v) => ExtensionsDate.format("y.m.d H:M", new Date(v.startAt)),
                                        "Заказчик": (v) => v.manager.hotel.nameHotel,
                                        "Длительность": (v) => `${v.duration} ч.`,
                                    }} />
                            </Flex.Col>
                        </Flex.Col>
                    </Card>
                </Section>
            </Modal>
        </Typo.p>
    );
});
