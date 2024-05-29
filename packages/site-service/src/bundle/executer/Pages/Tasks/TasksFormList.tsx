import {Flex} from "@app/ui-web-core";
import * as React from "react";
import {queryTaskPagination} from "./TasksForm";
import {TasksFormListEntry} from "./TasksFormListEntry";

export const TasksFormList = React.memo(() => {
    const [data] = queryTaskPagination.use();
    const tasks = React.useMemo(() => data.executerAllTasks.edges.map(e => e.node), [data]);

    return (
        <Flex.Col>
            {tasks.map((entry) => (
                <TasksFormListEntry
                    key={entry.id}
                    task={entry}
                />
            ))}
        </Flex.Col>
    );
});
