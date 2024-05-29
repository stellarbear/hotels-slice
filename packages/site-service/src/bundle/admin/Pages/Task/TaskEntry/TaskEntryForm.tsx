import {Icon} from "@app/ui-icons";
import {Flex} from "@app/ui-web-core";
import {Button, Card, Dialog, Image, Typo} from "@app/ui-web-kit";
import React from "react";
import {getFullName} from "../../../../../@shared";
import {ActionTaskExecutersAdd, ActionTaskExecutersRemove} from "../../../@actions";
import {queryTaskGetById} from "./TaskEntry";

export const TaskEntryForm = () => {
    const [data] = queryTaskGetById.use();
    const task = data.adminGetTaskById;

    return (
        <Flex.Col>
            <Flex.Row justify="space-between" align="center">
                <Typo.SubTitle>Исполнители: {task.executers.length} \ {task.countExecuters}</Typo.SubTitle>
                <Dialog.Handle button={
                    <Button>
                        Добавить
                    </Button>
                }>
                    <ActionTaskExecutersAdd idTask={task.id}/>
                </Dialog.Handle>
            </Flex.Row>

            {task.executers.map((entry) => (
                <Card key={entry.id}>
                    <Flex.Row>
                        <Image.Zoom>
                            <Image.Handle
                                variant="thumbnail"
                                image={entry.executer.profilePic}
                                url={admin.URL_FS} />
                        </Image.Zoom>

                        <Typo.p>
                            {getFullName(entry.executer)}
                        </Typo.p>

                        <Flex.Cell flex />

                        <Dialog.Handle button={
                            <Button color="error">
                                <Icon icon="trash" />
                            </Button>
                        }>
                            <ActionTaskExecutersRemove idTask={entry.id} />
                        </Dialog.Handle>
                    </Flex.Row>
                </Card>
            ))}
        </Flex.Col>
    );
};


