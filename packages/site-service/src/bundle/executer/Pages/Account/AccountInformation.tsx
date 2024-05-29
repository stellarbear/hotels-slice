import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {
    ControllerDate,
    ControllerInputPattern,
    ControllerSelectButton,
    ControllerSelectMultiple
} from "@app/ui-web-controls";
import {Flex} from "@app/ui-web-core";
import {Button, Dialog, Form, Input, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {dataGender} from "../../../../@shared";
import {MainContainer} from "../../@components";
import {EXECUTER_UPDATE_MUTATION} from "../../@query";
import {ExecuterUpdateMutation, ExecuterUpdateMutationVariables} from "../../interfaces";
import {AccountEditDialog} from "./AccountEditDialog";

const doc = EXECUTER_UPDATE_MUTATION;
type Mutation = ExecuterUpdateMutation;
type Variables = ExecuterUpdateMutationVariables;
export type InputForm = Variables["input"];

const mutationAccountInformationUpdate = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const AccountInformation = React.memo(() => {
    const {me, professions} = MainContainer.use();

    const template = useNotification.template();
    const notification = useNotification.snackbar();
    const [mutation] = mutationAccountInformationUpdate
        .onSuccess(() => notification.success("Изменения сохранены"))
        .compile();

    const form = ExtensionsForm.useFormSchema(me)<InputForm>({
        "firstName": true,
        "secondName": true,
        "middleName": true,
        "email": true,
        "gender": true,
        "birthday": true,
        "professions": (me) => me.professions.map(p => p.id),
        "about": () => "",
        "kind": () => "",
    });

    const [onSubmit, ready] = useAsyncOp((input: InputForm) => {
        const onConfirm = () => mutation({variables: {input}});

        const noChanges =
            me.firstName === input.firstName &&
            me.secondName === input.secondName &&
            me.middleName === input.middleName &&
            new Date(me.birthday).getTime() === new Date(input.birthday).getTime();

        if (me.status === "STEP_3_VERIFIED" && !noChanges) {
            return template.onOpen(
                <Dialog.Handle>
                    <AccountEditDialog onConfirm={onConfirm} />
                </Dialog.Handle>,
            );
        }

        return onConfirm();
    }, [me]);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Body>
                <Form.Field>
                    <Form.Label>Фамилия *</Form.Label>
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
                    <Form.Label>Имя *</Form.Label>
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
                    <Form.Label>Отчество *</Form.Label>
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
                                    items={dataGender}
                                    getId={(e) => e.id}
                                    getLabel={(e) => e.label}
                                    value={value}
                                    onChange={onChange}
                                />
                            </Flex.Row>
                        )} />
                    <Form.Error>{form.op.error("gender")}</Form.Error>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Дата рождения *</Form.Label>
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
                    <Form.Label>Перечень профессий</Form.Label>
                    <Controller
                        control={form.control}
                        name="professions"
                        rules={{
                            validate: form.op.validate(
                                form.op.validators.required,
                            ),
                        }}
                        render={({field: {value, onChange}}) => (
                            <ControllerSelectMultiple
                                value={value}
                                onChange={onChange}
                                items={professions}
                                getId={e => e.id}
                                getLabel={e => e.name}
                            />
                        )}
                    />
                    <Form.Error>{form.op.error("professions")}</Form.Error>
                </Form.Field>
            </Form.Body>

            <Button
                fullwidth
                type="submit"
                loading={!ready}>
                Сохранить
            </Button>
        </Form.Handle>
    );
});
