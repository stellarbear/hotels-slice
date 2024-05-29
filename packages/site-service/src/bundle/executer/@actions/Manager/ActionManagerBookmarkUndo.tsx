import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {CUSTOMER_BOOKMARK_UNDO_MUTATION} from "../../@query";
import {CustomerBookmarkUndoMutation, CustomerBookmarkUndoMutationVariables} from "../../interfaces";

type Props = {
    id: string;
};

const doc = CUSTOMER_BOOKMARK_UNDO_MUTATION;
type Mutation = CustomerBookmarkUndoMutation;
type Variables = CustomerBookmarkUndoMutationVariables;
type InputForm = Variables["input"];

const mutationManagerBookmarkUndo = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const ActionManagerBookmarkUndo = React.memo<Props>((props) => {
    const {id} = props;

    const overlay = useOverlay();
    const notification = useNotification.snackbar();

    const [mutation, {loading}] = mutationManagerBookmarkUndo
        .onSuccess(() => {
            overlay.close();
            notification.success("Заказчик убран из избранного");
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {id},
    });

    const onSubmit = React.useCallback((input: InputForm) =>
        mutation({variables: {input}}), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Убрать заказчика из избранного?</Dialog.Header>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
