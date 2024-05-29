import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, Input, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {ADMIN_PASSWORD_RESET_MUTATION} from "../../@query";
import {AdminPasswordResetMutation, AdminPasswordResetMutationVariables} from "../../interfaces";

type Props = {
    id: string;
};

const doc = ADMIN_PASSWORD_RESET_MUTATION;
type Mutation = AdminPasswordResetMutation;
type Variables = AdminPasswordResetMutationVariables;
type InputForm = Variables["input"];

const mutationAdminPasswordReset = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const ActionAdminResetPassword = React.memo<Props>((props) => {
    const {id} = props;

    const overlay = useOverlay();
    const notification = useNotification.snackbar();
    const [reset, {loading}] = mutationAdminPasswordReset
        .onSuccess(() => {
            overlay.close();
            notification.success("Пароль успешно изменен");
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {
            newPassword: "",
            id,
        },
    });

    const onSubmit = React.useCallback((input: InputForm) =>
        reset({variables: {input}}), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Смена пароля</Dialog.Header>
            <Dialog.Content loading={loading}>
                <Form.Field>
                    <Form.Label>Пароль</Form.Label>
                    <Input {...form.register("newPassword", {
                        validate: form.op.validate(
                            form.op.validators.required,
                        ),
                    })}
                        autoComplete={"off"} />
                    <Form.Error>{form.op.error("newPassword")}</Form.Error>
                </Form.Field>
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
