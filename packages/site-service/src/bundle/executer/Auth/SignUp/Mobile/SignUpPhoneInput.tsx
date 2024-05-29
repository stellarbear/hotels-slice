import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {ControllerInputMask} from "@app/ui-web-controls";
import {Flex, Mobile} from "@app/ui-web-core";
import {Button, Form, Typo, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {AUTH_CODE_SEND_MUTATION} from "../../../@query";
import {AuthCodeSendMutation, AuthCodeSendMutationVariables} from "../../../interfaces";
import {useWizardAuth} from "./SignUp";

const doc = AUTH_CODE_SEND_MUTATION;
type Mutation = AuthCodeSendMutation;
type Variables = AuthCodeSendMutationVariables;

type InputForm = {
    phone: string;
};

const mutation = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const SignUpPhoneInput = React.memo(() => {
    const {onNext, setStore} = useWizardAuth();

    const notification = useNotification.snackbar();
    const [sendCode] = mutation
        .onSuccess(() => notification.success("Код отправлен"))
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({});

    const [onPhoneInput, ready] = useAsyncOp(async (input: InputForm) => {
        setStore((prev) => ({...prev, ...input}));
        const result = await sendCode({
            variables: {
                input: {
                    phonenumber: input.phone,
                    isRequestForRecoveryPassword: false,
                },
            },
        });

        const response = result.data?.executerSendCode.ok;
        if (response) {
            onNext();
        }
    }, []);

    return (
        <Flex.Col>
            <Typo.SubTitle>Введите номер</Typo.SubTitle>
            <div>Введите номер телефона для регистрации</div>

            <Form.Handle onSubmit={form.handleSubmit(onPhoneInput)}>
                <Form.Body>
                    <Form.Field>
                        <Form.Label>Номер телефона</Form.Label>
                        <Controller
                            control={form.control}
                            name="phone"
                            rules={{
                                validate: form.op.validate(
                                    form.op.validators.required,
                                ),
                            }}
                            render={({field: {value, onChange}}) => (
                                <ControllerInputMask
                                    value={value}
                                    onChange={onChange}
                                    inputMode="tel"
                                    mask={(m) => m.phone}
                                />
                            )}
                        />
                        <Form.Error>{form.op.error("phone")}</Form.Error>
                    </Form.Field>
                </Form.Body>

                <Mobile>
                    <Flex.Cell flex />
                </Mobile>

                <Button
                    fullwidth
                    type="submit"
                    loading={!ready}>
                    Продолжить
                </Button>
            </Form.Handle>
        </Flex.Col>
    );
});
