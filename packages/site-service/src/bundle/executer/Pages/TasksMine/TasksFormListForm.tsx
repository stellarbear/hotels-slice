import {Flex, Section} from "@app/ui-web-core";
import {Dialog} from "@app/ui-web-kit";
import * as React from "react";
import {queryTaskById} from "./TasksFormList";
import {TasksFormListFormEntry} from "./TasksFormListFormEntry";

export const TasksFormListForm = React.memo(() => {
    const [data] = queryTaskById.use();
    const tasks = data.executerGetExecuterStateById;

    if (tasks.length === 0) {
        return (
            <Dialog.Content>
                На этот день ничего не запланировано
            </Dialog.Content>
        );
    }

    return (
        <Section>
            <Flex.Col>
                {tasks.map((entry, index) => (
                    <TasksFormListFormEntry
                        key={index}
                        task={entry} />
                ))}
            </Flex.Col>
        </Section>
    );
});
