import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {ControllerInputNumberFloat, ControllerSelectButton} from "@app/ui-web-controls";
import {Flex, useOverlay} from "@app/ui-web-core";
import {Dialog, Form, Input, InputHidden, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {ADMIN_UPSERT_MUTATION} from "../../@query";
import {AAdminFragment, AdminUpsertMutation, AdminUpsertMutationVariables, Permission} from "../../interfaces";

const doc = ADMIN_UPSERT_MUTATION;
type Admin = AAdminFragment;
type Mutation = AdminUpsertMutation;
type Variables = AdminUpsertMutationVariables;
type InputForm = Variables["input"];

type Props = {
    record?: Admin;
};

const permissionTypes: {id: Permission; label: string}[] = [
    {id: "FULL_ACCESS", label: "Полный доступ"},
    {id: "MANAGER", label: "Менеджер"},
    {id: "MANAGER_REPORT_USERS_PROFILE", label: "Менеджер + отчеты"},
];

const mutationAdminUpsert = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const ActionAdminUpsert = React.memo<Props>((props) => {
    const {record} = props;

    const overlay = useOverlay();
    const notification = useNotification.snackbar();
    const [create, {loading}] = mutationAdminUpsert
        .onSuccess(() => {
            overlay.close();
            notification.success(
                record
                    ? "Администратор обновлен"
                    : "Администратор создан",
            );
        })
        .compile();

    const form = ExtensionsForm.useFormSchema(record)<InputForm>({
        id: true,
        name: true,
        permissions: true,
        role: true,
        password: () => null,
        percent: true,
    });

    const onSubmit = React.useCallback((input: InputForm) =>
        create({variables: {input}}), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>
                {record
                    ? "Редактирование администратора"
                    : "Создание администратора"
                }
            </Dialog.Header>
            <Dialog.Content loading={loading}>
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
                {!record && (
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
                )}
                <Form.Field>
                    <Form.Label>Отображение</Form.Label>
                    <Controller
                        control={form.control}
                        name="permissions"
                        rules={{
                            validate: form.op.validate(
                                form.op.validators.required,
                            ),
                        }}
                        render={({field: {value, onChange}}) => (
                            <Flex.Row>
                                <ControllerSelectButton
                                    value={value}
                                    items={permissionTypes}
                                    getId={(e) => e.id}
                                    getLabel={(e) => e.label}
                                    onChange={onChange}
                                />
                            </Flex.Row>
                        )} />
                    <Form.Error>{form.op.error("permissions")}</Form.Error>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Роль</Form.Label>
                    <Input {...form.register("role", {
                        validate: form.op.validate(
                            form.op.validators.required,
                        ),
                    })}
                        autoComplete={"off"} />
                    <Form.Error>{form.op.error("role")}</Form.Error>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Процент</Form.Label>
                    <Controller
                        control={form.control}
                        name="percent"
                        render={(data) => (
                            <ControllerInputNumberFloat
                                onChange={data.field.onChange}
                                value={data.field.value}
                                min={0}
                                max={100}
                            />
                        )} />
                    <Form.Error>{form.op.error("percent")}</Form.Error>
                </Form.Field>

            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
