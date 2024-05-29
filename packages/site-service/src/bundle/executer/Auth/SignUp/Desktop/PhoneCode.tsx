import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm, Path} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {ControllerInputMask} from "@app/ui-web-controls";
import {Flex} from "@app/ui-web-core";
import {Button, ButtonDelay, Form, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {AUTH_CODE_SEND_MUTATION} from "../../../@query";
import {AuthCodeSendMutation, AuthCodeSendMutationVariables} from "../../../interfaces";

type Props<T extends ExtensionsForm.Constraint> = {
    form: ExtensionsForm.Result<T>;
    code: Path<T>;
    phone: Path<T>;
};

const doc = AUTH_CODE_SEND_MUTATION;
type Mutation = AuthCodeSendMutation;
type Variables = AuthCodeSendMutationVariables;

const mutationPhoneCodeSend = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const PhoneCode = <T extends ExtensionsForm.Constraint>(props: Props<T>) => {
    const {form} = props;
    const [codeSent, setCodeSent] = React.useState(false);

    const notification = useNotification.snackbar();
    const [sendCode] = mutationPhoneCodeSend
        .onSuccess(() => notification.success("Код отправлен"))
        .compile();

    form.register(props.code, {
        required: "Телефон обязателен к подтверждению",
    });

    const [onCode, readyCode] = useAsyncOp(async () => {
        const phonenumber = form.getValues(props.phone);
        const result = await sendCode({variables: {input: {phonenumber, isRequestForRecoveryPassword: false}}});

        const response = result.data?.executerSendCode.ok;
        if (response) {
            setCodeSent(true);
        }
    }, []);

    const onTrigger = React.useCallback(async () => {
        if (codeSent) {
            setCodeSent(false);
        } else {
            await onCode();
        }
    }, [codeSent]);

    const phoneEntered = String(form.watch(props.phone)).length === 10;
    const trigger = codeSent ? "Изменить" : "Подтвердить";

    return (
        <>
            <Form.Field>
                <Form.Label>Номер телефона</Form.Label>
                <Flex.Row>
                    <Controller
                        control={form.control}
                        name={props.phone}
                        rules={{
                            validate: form.op.validate(
                                form.op.validators.required,
                            ),
                        }}
                        render={({field: {value, onChange}}) => (
                            <ControllerInputMask
                                value={value}
                                onChange={onChange}
                                readOnly={codeSent}
                                inputMode="tel"
                                mask={(m) => m.phone}
                            />
                        )}
                    />
                    <Button onClick={onTrigger} disabled={!phoneEntered}>{trigger}</Button>
                </Flex.Row>
                <Form.Error>{form.op.error(props.phone)}</Form.Error>
                {!codeSent && (
                    <Form.Error>{form.op.error(props.code)}</Form.Error>
                )}
            </Form.Field>

            {codeSent && (
                <Form.Field>
                    <Form.Label>Введите код из СМС</Form.Label>
                    <Flex.Row >
                        <Controller
                            control={form.control}
                            name={props.code}
                            rules={{
                                validate: form.op.validate(
                                    form.op.validators.required,
                                    form.op.validators.length_exact(4),
                                ),
                            }}
                            render={({field: {value, onChange}}) => (
                                <ControllerInputMask
                                    value={value}
                                    onChange={onChange}
                                    inputMode="tel"
                                    mask={(m) => m.numeric(4)}
                                />
                            )}
                        />
                        <ButtonDelay
                            behavior="mount"
                            onClick={onCode}
                            loading={!readyCode}>
                            Переотправить
                        </ButtonDelay>
                    </Flex.Row>
                    <Form.Error>{form.op.error(props.code)}</Form.Error>
                </Form.Field>
            )}
        </>
    );
};
