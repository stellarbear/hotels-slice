import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {ControllerInputMask} from "@app/ui-web-controls";
import {Flex, Mobile} from "@app/ui-web-core";
import {Button, Form, Typo, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {AUTH_CODE_SEND_MUTATION} from "../../../@query";
import {AuthCodeSendMutation, AuthCodeSendMutationVariables} from "../../../interfaces";
import {useWizardRecovery} from "./Recovery";

const doc = AUTH_CODE_SEND_MUTATION;
type Mutation = AuthCodeSendMutation;
type Variables = AuthCodeSendMutationVariables;

const mutationPhoneInput = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

type InputForm = {
    phone: string;
};

export const RecoveryPhoneInput = React.memo(() => {
    const {onNext, setStore} = useWizardRecovery();

    const notification = useNotification.snackbar();
    const [sendCode] = mutationPhoneInput
        .onSuccess(() => notification.success("Код отправлен"))
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({});

    const [onPhoneInput, ready] = useAsyncOp(async (input: InputForm) => {
        setStore((prev) => ({...prev, ...input}));
        const result = await sendCode({
            variables: {
                input: {
                    phonenumber: input.phone,
                    isRequestForRecoveryPassword: true,
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
            <div>Введите номер телефона для восстановления</div>

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
