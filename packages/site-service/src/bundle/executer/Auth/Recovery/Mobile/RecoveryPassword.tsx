import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {Flex, Mobile} from "@app/ui-web-core";
import {Button, Form, InputHidden, Typo, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {useAuthorization} from "../../../../auth";
import {AUTH_RECOVERY_MUTATION} from "../../../@query";
import {AuthRecoveryMutation, AuthRecoveryMutationVariables} from "../../../interfaces";
import {useWizardRecovery} from "./Recovery";

const doc = AUTH_RECOVERY_MUTATION;
type Mutation = AuthRecoveryMutation;
type Variables = AuthRecoveryMutationVariables;

const mutationPasswordRecovery = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

type InputForm = {
    password: string;
    confirm: string;
};

export const RecoveryPassword = React.memo(() => {
    const {store} = useWizardRecovery();
    const {update} = useAuthorization();

    const notification = useNotification.snackbar();
    const [recovery] = mutationPasswordRecovery
        .onSuccess(() => notification.success("Пароль обновлен"))
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({});
    const password = form.watch("password");

    const [onPasswordConfirm, ready] = useAsyncOp(async (input: InputForm) => {
        const result = await recovery({
            variables: {
                input: {
                    password: input.password,
                    phonenumber: store.phone,
                    code: store.code,
                },
            },
        });

        const response = result.data?.executerRecoveryPasswordByPhoneAndCode;
        if (response?.token) {
            update(response.token);
        }
    }, [store]);

    return (
        <>
            <Typo.SubTitle>Придумайте пароль</Typo.SubTitle>
            <Form.Handle onSubmit={form.handleSubmit(onPasswordConfirm)}>
                <Form.Body>
                    <Form.Field>
                        <Form.Label>Ваш пароль</Form.Label>
                        <InputHidden
                            {...form.register("password", {
                                validate: form.op.validate(
                                    form.op.validators.required,
                                ),
                            })}
                            color={form.op.color("password")}
                            autoComplete={"off"} />
                        <Form.Error>{form.op.error("password")}</Form.Error>
                    </Form.Field>
                    <Form.Field>
                        <InputHidden
                            {...form.register("confirm", {
                                validate: form.op.validate(
                                    form.op.validators.required,
                                    (v) => v === password || "Пароли должны совпадать",
                                ),
                            })}
                            color={form.op.color("confirm")}
                            autoComplete={"off"} />
                        <Form.Error>{form.op.error("confirm")}</Form.Error>
                    </Form.Field>
                </Form.Body>

                <Mobile>
                    <Flex.Cell flex />
                </Mobile>

                <Button
                    type="submit"
                    fullwidth
                    loading={!ready}>
                    Сохранить и продолжить
                </Button>
            </Form.Handle>
        </>
    );
});
