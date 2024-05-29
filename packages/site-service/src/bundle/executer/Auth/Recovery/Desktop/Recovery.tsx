import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {Flex} from "@app/ui-web-core";
import {Button, Form, InputHidden, Typo, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {useAuthorization} from "../../../../auth";
import {
    AUTH_RECOVERY_MUTATION
} from "../../../@query";
import {
    AuthRecoveryMutation,
    AuthRecoveryMutationVariables
} from "../../../interfaces";
import {PhoneCode} from "./PhoneCode";

const doc = AUTH_RECOVERY_MUTATION;
type Mutation = AuthRecoveryMutation;
type Variables = AuthRecoveryMutationVariables;
type InputForm = Variables["input"];

const mutationPasswordRecovery = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const Recovery = React.memo(() => {
    const {update} = useAuthorization();

    const notification = useNotification.snackbar();
    const [recovery] = mutationPasswordRecovery
        .onSuccess(() => notification.success("Пароль обновлен"))
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({});

    const [onSign, ready] = useAsyncOp(async (input: InputForm) => {
        const result = await recovery({variables: {input}});

        const response = result.data?.executerRecoveryPasswordByPhoneAndCode;
        if (response?.token) {
            update(response.token);
        }
    }, []);

    return (
        <Flex.Col>
            <Typo.SubTitle>Восстановление пароля</Typo.SubTitle>
            <Form.Handle onSubmit={form.handleSubmit(onSign)}>
                <Form.Body>
                    <PhoneCode
                        form={form}
                        code="code"
                        phone="phonenumber"
                    />

                    <Form.Field>
                        <Form.Label>Пароль</Form.Label>
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
                </Form.Body>

                <Button
                    type="submit"
                    fullwidth
                    loading={!ready}>
                    Обновить пароль
                </Button>
            </Form.Handle >
        </Flex.Col>
    );
});
