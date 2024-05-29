import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {ControllerInputCode} from "@app/ui-web-controls";
import {Flex, Mobile} from "@app/ui-web-core";
import {Button, Form, Typo, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {AUTH_CODE_VERIFY_QUERY} from "../../../@query";
import {AuthCodeVerifyQuery, AuthCodeVerifyQueryVariables} from "../../../interfaces";
import {useWizardAuth} from "./SignUp";

const doc = AUTH_CODE_VERIFY_QUERY;
type Query = AuthCodeVerifyQuery;
type Variables = AuthCodeVerifyQueryVariables;

type InputForm = {
    code: string;
};

const queryConfirmPhone = ExtensionsApollo.Query
    .from<Query, Variables>(doc);

export const SignUpPhoneConfirm = React.memo(() => {
    const {onNext, setStore, store} = useWizardAuth();
    const phone = store.phone;

    const notification = useNotification.snackbar();
    const [query] = queryConfirmPhone
        .onSuccess(() => notification.success("Код подтвержден"))
        .lazy();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {code: ""},
    });

    const [onPhoneConfirm, ready] = useAsyncOp(async (input: InputForm) => {
        setStore((prev) => ({...prev, ...input}));
        const result = await query({
            variables: {
                input: {
                    phonenumber: store.phone,
                    code: input.code,
                },
            },
        });

        const response = result.data?.executerCheckCodeByPhone;
        if (response) {
            onNext();
        } else {
            form.reset();
        }
    }, [store, phone]);

    return (
        <Flex.Col>
            <Typo.SubTitle>Подтвердите номер</Typo.SubTitle>
            <div>SMS-код отправлен на номер {phone}</div>

            <Form.Handle onSubmit={form.handleSubmit(onPhoneConfirm)}>
                <Form.Body>
                    <Form.Field>
                        <Form.Label>Код подтверждения</Form.Label>
                        <Controller
                            control={form.control}
                            name="code"
                            rules={{
                                validate: form.op.validate(
                                    form.op.validators.required,
                                ),
                            }}
                            render={({field: {value, onChange}}) => (
                                <ControllerInputCode
                                    count={4}
                                    pattern={/\d/}
                                    inputMode="numeric"
                                    value={value}
                                    onChange={onChange}
                                />
                            )} />
                        <Form.Error>{form.op.error("code")}</Form.Error>
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
