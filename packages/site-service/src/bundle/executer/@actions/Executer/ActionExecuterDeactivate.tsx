import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {AUTH_DEACTIVATE_EXECUTER_MUTATION} from "../../@query";
import {AuthDeactivateExecuterMutation} from "../../interfaces";

type Props = {
    onDeactivate?: () => void;
};

const doc = AUTH_DEACTIVATE_EXECUTER_MUTATION;
type Mutation = AuthDeactivateExecuterMutation;

const mutationExecuterDeactivate = ExtensionsApollo.Mutation
    .from<Mutation>(doc);

export const ActionExecuterDeactivate = React.memo<Props>((props) => {
    const {onDeactivate} = props;

    const overlay = useOverlay();
    const notification = useNotification.snackbar();

    const [mutation, {loading}] = mutationExecuterDeactivate
        .onSuccess(() => {
            overlay.close();
            notification.success("Аккаунт удален");
            onDeactivate?.();
        })
        .compile();

    const form = ExtensionsForm.useForm({});

    const onSubmit = React.useCallback(() =>
        mutation(), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Удалить аккаунт?</Dialog.Header>
            <Dialog.Content loading={loading}>
                <div>При удалении аккаунта связанные с ним данные будут удалены</div>
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
