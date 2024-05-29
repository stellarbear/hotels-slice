import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {CUSTOMER_BOOKMARK_MUTATION} from "../../@query";
import {CustomerBookmarkMutation, CustomerBookmarkMutationVariables} from "../../interfaces";

type Props = {
    id: string;
};

const doc = CUSTOMER_BOOKMARK_MUTATION;
type Mutation = CustomerBookmarkMutation;
type Variables = CustomerBookmarkMutationVariables;
type InputForm = Variables["input"];

const mutationManagerBookmark = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const ActionManagerBookmark = React.memo<Props>((props) => {
    const {id} = props;

    const overlay = useOverlay();
    const notification = useNotification.snackbar();

    const [mutation, {loading}] = mutationManagerBookmark
        .onSuccess(() => {
            overlay.close();
            notification.success("Заказчик добавлен в избранное");
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {id},
    });

    const onSubmit = React.useCallback((input: InputForm) =>
        mutation({variables: {input}}), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Добавить заказчика в избранное?</Dialog.Header>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
