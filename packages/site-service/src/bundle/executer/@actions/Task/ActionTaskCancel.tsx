import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {TASK_CANCEL_MUTATION} from "../../@query";
import {TaskCancelMutation, TaskCancelMutationVariables} from "../../interfaces";
import {Task} from "./interface";

type Props = {
    task: Task;
};

const doc = TASK_CANCEL_MUTATION;
type Mutation = TaskCancelMutation;
type Variables = TaskCancelMutationVariables;
type InputForm = Variables;

const mutationTaskCancel = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const ActionTaskCancel = React.memo<Props>((props) => {
    const {task} = props;

    const overlay = useOverlay();
    const notification = useNotification.snackbar();

    const [mutation, {loading}] = mutationTaskCancel
        .onSuccess(() => {
            overlay.close();
            notification.success("Заявка снята с выполнения");
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {task: task.id},
    });

    const onSubmit = React.useCallback((variables: InputForm) =>
        mutation({variables}), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Отказаться от выполнения заявки?</Dialog.Header>
            <Dialog.Content loading={loading}>
                <Form.Field>
                    <Form.Label>Заявка</Form.Label>
                    {task.id}
                </Form.Field>
                <Form.Field>
                    <Form.Label>Заказчик</Form.Label>
                    {task.manager.hotel.nameHotel}
                </Form.Field>
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
