import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {
    ControllerDate,
    ControllerInputPattern, ControllerSelectButton
} from "@app/ui-web-controls";
import {Colored, Flex, Link, Mobile} from "@app/ui-web-core";
import {Button, Checkbox, Form, Input, Typo, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {dataGender} from "../../../../../@shared";
import {useAuthorization} from "../../../../auth";
import {AUTH_SIGN_UP_EXECUTER_MUTATION} from "../../../@query";
import {AuthSignUpExecuterMutation, AuthSignUpExecuterMutationVariables} from "../../../interfaces";
import {useWizardAuth} from "./SignUp";

const doc = AUTH_SIGN_UP_EXECUTER_MUTATION;
type Mutation = AuthSignUpExecuterMutation;
type Variables = AuthSignUpExecuterMutationVariables;
type InputForm = Variables["input"];

const mutationSignUp = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const SignUpAuthData = React.memo(() => {
    const {store} = useWizardAuth();
    const {update} = useAuthorization();

    const notification = useNotification.snackbar();
    const [signUp] = mutationSignUp
        .onSuccess(() => notification.success("Аккаунт зарегистрирован"))
        .compile();

    const [accepted, setAccepted] = React.useState(false);
    const onAcceptChange = React.useCallback(() =>
        setAccepted(prev => !prev), []);

    const form = ExtensionsForm.useForm<InputForm>({});

    const [onRegister, ready] = useAsyncOp(async (input: InputForm) => {
        const result = await signUp({
            variables: {
                input: {
                    ...input,
                    password: store.password,
                    phoneNumber: store.phone,
                    code: store.code,
                },
            },
        });

        const response = result.data?.executerCreate;
        if (response?.token) {
            update(response.token);
        }
    }, [store]);

    return (
        <>
            <Typo.SubTitle>Личные данные</Typo.SubTitle>
            <Form.Handle onSubmit={form.handleSubmit(onRegister)}>
                <Form.Body>
                    <Form.Field>
                        <Form.Label>Фамилия</Form.Label>
                        <Controller
                            control={form.control}
                            rules={{
                                validate: form.op.validate(
                                    form.op.validators.required,
                                ),
                            }}
                            name="middleName"
                            render={({field: {value, onChange}}) => (
                                <ControllerInputPattern
                                    color={form.op.color("middleName")}
                                    pattern="cyrillyc"
                                    value={value}
                                    onChange={onChange} />
                            )} />
                        <Form.Error>{form.op.error("middleName")}</Form.Error>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Имя</Form.Label>
                        <Controller
                            control={form.control}
                            rules={{
                                validate: form.op.validate(
                                    form.op.validators.required,
                                ),
                            }}
                            name="firstName"
                            render={({field: {value, onChange}}) => (
                                <ControllerInputPattern
                                    color={form.op.color("firstName")}
                                    pattern="cyrillyc"
                                    value={value}
                                    onChange={onChange} />
                            )} />
                        <Form.Error>{form.op.error("firstName")}</Form.Error>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Отчество</Form.Label>
                        <Controller
                            control={form.control}
                            name="secondName"
                            render={({field: {value, onChange}}) => (
                                <ControllerInputPattern
                                    color={form.op.color("secondName")}
                                    pattern="cyrillyc"
                                    value={value}
                                    onChange={onChange} />
                            )} />
                        <Form.Error>{form.op.error("secondName")}</Form.Error>
                    </Form.Field>

                    <Form.Field>
                        <Form.Label>Пол</Form.Label>
                        <Controller
                            control={form.control}
                            name="gender"
                            rules={{
                                validate: form.op.validate(
                                    form.op.validators.required,
                                ),
                            }}
                            render={({field: {value, onChange}}) => (
                                <Flex.Row>
                                    <ControllerSelectButton
                                        value={value}
                                        items={dataGender}
                                        getId={(e) => e.id as any}
                                        getLabel={(e) => e.label}
                                        onChange={onChange}
                                    />
                                </Flex.Row>
                            )} />
                        <Form.Error>{form.op.error("gender")}</Form.Error>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Дата рождения</Form.Label>
                        <Controller
                            control={form.control}
                            name="birthday"
                            rules={{
                                validate: form.op.validate(
                                    form.op.validators.required,
                                ),
                            }}
                            render={({field: {value, onChange}}) => (
                                <ControllerDate
                                    as="date"
                                    value={value}
                                    onChange={onChange}
                                    color={form.op.color("birthday")}
                                />
                            )} />
                        <Form.Error>{form.op.error("birthday")}</Form.Error>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label>Email</Form.Label>
                        <Input
                            {...form.register("email", {
                                validate: form.op.validate(
                                    form.op.validators.required,
                                    form.op.validators.email,
                                ),
                            })}
                            color={form.op.color("email")}
                            autoComplete={"off"} />
                        <Form.Error>{form.op.error("email")}</Form.Error>
                    </Form.Field>

                    <Form.Field>
                        <Checkbox checked={accepted} onChange={onAcceptChange}>
                            <Flex.Row align="center">
                                <span>Даю согласие на обработку персональных данных</span>
                                <Colored color="primary">
                                    <Link
                                        to={`${executer.URL_DOMAIN}/document/PERSONAL_DATA_AGREEMENT`} external blank>
                                        Ссылка на документ
                                    </Link>
                                </Colored>
                            </Flex.Row>
                        </Checkbox>
                    </Form.Field>
                </Form.Body>

                <Mobile>
                    <Flex.Cell flex />
                </Mobile>

                <Button
                    fullwidth
                    type="submit"
                    disabled={!accepted}
                    loading={!ready}>
                    Продолжить
                </Button>
            </Form.Handle >
        </>
    );
});
