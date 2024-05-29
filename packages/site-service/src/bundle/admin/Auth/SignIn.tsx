import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {Button, Form, Input, InputHidden} from "@app/ui-web-kit";
import * as React from "react";
import {useAuthorization} from "../../auth";
import {AUTH_SIGN_IN_ADMIN_MUTATION} from "../@query";
import {AuthSignInAdminMutation, AuthSignInAdminMutationVariables} from "../interfaces";

const doc = AUTH_SIGN_IN_ADMIN_MUTATION;
type Mutation = AuthSignInAdminMutation;
type Variables = AuthSignInAdminMutationVariables;
type InputForm = Variables["input"];

const mutationAuthSignIn = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const SignIn = React.memo(() => {
    const {update} = useAuthorization();
    const [signUp] = mutationAuthSignIn
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({});

    const [onSubmit, ready] = useAsyncOp(async (input: InputForm) => {
        const result = await signUp({variables: {input}});

        const response = result.data?.adminAuthenticate;
        if (response?.token) {
            update(response.token);
        }
    }, []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Body>
                <Form.Field>
                    <Form.Label>Имя</Form.Label>
                    <Input {...form.register("name", {
                        validate: form.op.validate(
                            form.op.validators.required,
                        ),
                    })}
                        autoComplete={"off"} />
                    <Form.Error>{form.op.error("name")}</Form.Error>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Пароль</Form.Label>
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
                loading={!ready}
                type="submit"
                fullwidth>Войти</Button>
        </Form.Handle>
    );
});
