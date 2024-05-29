import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {CUSTOMER_BOOKMARK_UNDO_ALL_MUTATION} from "../../@query";
import {CustomerBookmarkUndoAllMutation} from "../../interfaces";

const doc = CUSTOMER_BOOKMARK_UNDO_ALL_MUTATION;
type Mutation = CustomerBookmarkUndoAllMutation;

const mutationManagerBookmarkUndoAll = ExtensionsApollo.Mutation
    .from<Mutation>(doc);

export const ActionManagerBookmarkUndoAll = React.memo(() => {
    const overlay = useOverlay();
    const notification = useNotification.snackbar();

    const [mutation, {loading}] = mutationManagerBookmarkUndoAll
        .onSuccess(() => {
            overlay.close();
            notification.success("Список избранных заказчиков очищен");
        })
        .compile();

    const form = ExtensionsForm.useForm({});

    const onSubmit = React.useCallback(() => mutation(), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Очистить избранное?</Dialog.Header>
            <Dialog.Content loading={loading}>
                <div>Все данные об избранных заказчиках будут удалены</div>
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
