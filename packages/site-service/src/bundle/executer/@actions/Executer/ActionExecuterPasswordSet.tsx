import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, InputHidden, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {EXECUTER_PASSWORD_SET_MUTATION} from "../../@query";
import {ExecuterPasswordSetMutation, ExecuterPasswordSetMutationVariables} from "../../interfaces";

const doc = EXECUTER_PASSWORD_SET_MUTATION;
type Mutation = ExecuterPasswordSetMutation;
type Variables = ExecuterPasswordSetMutationVariables;
type InputForm = Variables["input"];

const mutationExecuterPasswordSet = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

type Props = {};

export const ActionExecuterPasswordSet = React.memo<Props>(() => {
    const overlay = useOverlay();
    const notification = useNotification.snackbar();

    const [update, {loading}] = mutationExecuterPasswordSet
        .onSuccess(() => {
            overlay.close();
            notification.success("Пароль успешно обновлен");
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({});

    const onSubmit = React.useCallback((input: InputForm) =>
        update({variables: {input}}), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Изменить пароль</Dialog.Header>
            <Dialog.Content loading={loading}>
                <Form.Field>
                    <Form.Label>Старый пароль</Form.Label>
                    <InputHidden {...form.register("oldPassword", {
                        validate: form.op.validate(
                            form.op.validators.required,
                        ),
                    })}
                        autoComplete={"off"} />
                    <Form.Error>{form.op.error("oldPassword")}</Form.Error>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Новый пароль</Form.Label>
                    <InputHidden {...form.register("newPassword", {
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
