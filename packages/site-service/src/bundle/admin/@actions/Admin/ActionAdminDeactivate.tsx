import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {ADMIN_DEACTIVATE_MUTATION} from "../../@query";
import {AdminDeactivateMutation, AdminDeactivateMutationVariables} from "../../interfaces";

type Props = {
    id: string;
};

const doc = ADMIN_DEACTIVATE_MUTATION;
type Mutation = AdminDeactivateMutation;
type Variables = AdminDeactivateMutationVariables;
type InputForm = Variables["input"];

const mutationAdminDeactivate = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const ActionAdminDeactivate = React.memo<Props>((props) => {
    const {id} = props;

    const overlay = useOverlay();
    const notification = useNotification.snackbar();

    const [resend, {loading}] = mutationAdminDeactivate
        .onSuccess(() => {
            overlay.close();
            notification.success("Доступ успешно отозван");
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {id},
    });

    const onSubmit = React.useCallback((input: InputForm) =>
        resend({variables: {input}}), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Отозвать доступ?</Dialog.Header>
            <Dialog.Content loading={loading}>
                <div>Это действие необратимо</div>
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
