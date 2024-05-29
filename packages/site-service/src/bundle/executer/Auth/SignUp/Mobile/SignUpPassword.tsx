import {ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {Flex, Mobile} from "@app/ui-web-core";
import {Button, Form, InputHidden, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {useWizardAuth} from "./SignUp";

type InputForm = {
    password: string;
    confirm: string;
};

export const SignUpPassword = React.memo(() => {
    const {onNext, setStore} = useWizardAuth();

    const form = ExtensionsForm.useForm<InputForm>({});
    const password = form.watch("password");

    const [onPasswordConfirm, ready] = useAsyncOp(async (input: InputForm) => {
        setStore((prev) => ({...prev, ...input}));
        onNext();
    }, []);

    return (
        <>
            <Typo.SubTitle>Придумайте пароль</Typo.SubTitle>
            <Form.Handle onSubmit={form.handleSubmit(onPasswordConfirm)}>
                <Form.Body >
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
                    fullwidth
                    type="submit"
                    loading={!ready}>
                    Продолжить
                </Button>
            </Form.Handle>
        </>
    );
});
