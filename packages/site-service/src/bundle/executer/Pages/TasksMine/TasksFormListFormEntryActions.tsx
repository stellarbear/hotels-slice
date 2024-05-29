import {fp} from "@app/extensions-fp";
import {isDefined} from "@app/extensions-guard";
import {Button, Modal} from "@app/ui-web-kit";
import * as React from "react";
import {ActionManagerRate, ActionTaskCancel} from "../../@actions";
import {TaskInfo} from "./TasksFormList";

type Props = {
    task: TaskInfo;
};

export const TasksFormListFormEntryActions = React.memo<Props>((props) => {
    const {task} = props;

    const canCancel = fp.predicate.or(
        fp.predicate.equal("STEP_1_CREATED"),
        fp.predicate.equal("STEP_2_WAITING"),
        fp.predicate.equal("STEP_3_COLLECT"))(task.task.status);

    const canRate = !canCancel;
    const hasRate = isDefined(task.feedback);

    return (
        <>
            {canCancel && (
                <Modal
                    button={(
                        <Button color="error">
                            Отменить заявку
                        </Button>
                    )}>
                    <ActionTaskCancel {...props} {...task} />
                </Modal>
            )}
            {canRate && (
                <Modal
                    button={(
                        <Button >
                            {hasRate
                                ? "Изменить отзыв"
                                : "Оставить отзыв"
                            }
                        </Button>
                    )}>
                    <ActionManagerRate {...props} {...task} />
                </Modal>
            )}
        </>
    );
});
