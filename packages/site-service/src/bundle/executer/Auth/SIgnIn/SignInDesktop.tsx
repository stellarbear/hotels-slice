import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {ControllerInputMask} from "@app/ui-web-controls";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Button, Form, InputHidden, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {FCM} from "../../../../@shared";
import {useAuthorization} from "../../../auth";
import {AUTH_SIGN_IN_EXECUTER_MUTATION} from "../../@query";
import {AuthSignInExecuterMutation, AuthSignInExecuterMutationVariables} from "../../interfaces";
import {ERouteAuth} from "../Anon";

const doc = AUTH_SIGN_IN_EXECUTER_MUTATION;
type Mutation = AuthSignInExecuterMutation;
type Variables = AuthSignInExecuterMutationVariables;
type InputForm = Variables["input"];

const mutationSignIn = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const SignInDesktop = React.memo(() => {
    const {update} = useAuthorization();
    const [signUp] = mutationSignIn
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({});

    const [onSubmit, ready] = useAsyncOp(async (data: InputForm) => {
        const input = {...data, token: FCM.get()};
        const result = await signUp({variables: {input}});

        const response = result.data?.executerAuthenticate;
        if (response?.token) {
            update(response.token);
        }
    }, []);

    return (
        <Flex.Col>
            <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
                <Typo.SubTitle>Вход</Typo.SubTitle>

                <Form.Body>
                    <Form.Field>
                        <Form.Label>Номер телефона</Form.Label>
                        <Controller
                            control={form.control}
                            name="phonenumber"
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
                        <Form.Error>{form.op.error("phonenumber")}</Form.Error>
                    </Form.Field>
                    <Form.Field>
                        <Flex.Row justify="space-between">
                            <Form.Label>Пароль</Form.Label>
                            <Link to={ERouteAuth.recovery}>
                                <Colored color="primary">
                                    <Typo.Caption>
                                        Забыли пароль?
                                    </Typo.Caption>
                                </Colored>
                            </Link>
                        </Flex.Row>
                        <InputHidden {...form.register("password", {
                            validate: form.op.validate(
                                form.op.validators.required,
                            ),
                        })}
                            autoComplete={"off"} />
                        <Form.Error>{form.op.error("password")}</Form.Error>
                    </Form.Field>
                </Form.Body>

                <Button
                    type="submit"
                    fullwidth
                    loading={!ready}>
                    Войти
                </Button>
            </Form.Handle>

            <Form.Label>
                <Flex.Row justify="center">
                    <div>Еще нет аккаунта?</div>
                    <Colored color="primary">
                        <Link to={ERouteAuth.sign_up}>
                            Зарегистрируйтесь
                        </Link>
                    </Colored>
                </Flex.Row>
            </Form.Label>
        </Flex.Col>
    );
});
