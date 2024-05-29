import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {
    ControllerDate, ControllerImage, ControllerInputMask, ControllerSelectButton
} from "@app/ui-web-controls";
import {Flex} from "@app/ui-web-core";
import {Button, Dialog, Form, Input, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {dataCitizenship} from "../../../../../@shared";
import {MainContainer, useUpload} from "../../../@components";
import {EXECUTER_PASSPORT_UPSERT_MUTATION} from "../../../@query";
import {
    ExecuterPassportUpsertMutation, ExecuterPassportUpsertMutationVariables
} from "../../../interfaces";
import {AccountEditDialog} from "../AccountEditDialog";
import {queryExecuterPassport} from "./AccountPassport";

const doc = EXECUTER_PASSPORT_UPSERT_MUTATION;
type Mutation = ExecuterPassportUpsertMutation;
type InputForm = Variables["input"];
type Variables = ExecuterPassportUpsertMutationVariables;

const mutationAccountPassportUpdate = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const AccountPassportForm = React.memo(() => {
    const [data] = queryExecuterPassport.use();
    const passport = data.executerPassport;

    const {me} = MainContainer.use();
    const {uploadMultiple} = useUpload("PASSPORT");

    const template = useNotification.template();
    const notification = useNotification.snackbar();
    const [mutation] = mutationAccountPassportUpdate
        .onSuccess(() => notification.success("Изменения сохранены"))
        .compile();

    const form = ExtensionsForm.useFormSchema(passport)<InputForm>({
        citizenship: true,
        series: true,
        number: true,
        issuedBy: true,
        dateOfIssue: true,
        subdivisionCode: true,
        placeBirth: true,
        passportFileInfo: "passportData",
    });

    const [onSubmit, ready] = useAsyncOp((input: InputForm) => {
        const onConfirm = async () => await mutation({
            variables: {
                input: {
                    ...input,
                    passportFileInfo: await uploadMultiple(
                        input.passportFileInfo,
                    ),
                },
            },
        });

        if (me.status === "STEP_3_VERIFIED") {
            return template.onOpen(
                <Dialog.Handle>
                    <AccountEditDialog onConfirm={onConfirm} />
                </Dialog.Handle>,
            );
        }

        return onConfirm();
    }, [passport]);

    const isRussianPassport = form.watch("citizenship") === "RUSSIA";

    React.useEffect(() => {
        if (!isRussianPassport) {
            form.unregister(["subdivisionCode", "series"]);
        }
    }, [isRussianPassport]);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Body>
                <Form.Field>
                    <Form.Label>Гражданство *</Form.Label>
                    <Controller
                        name="citizenship"
                        control={form.control}
                        rules={{
                            validate: form.op.validate(
                                form.op.validators.required,
                            ),
                        }}
                        render={({field: {value, onChange}}) => (
                            <Flex.Row>
                                <ControllerSelectButton
                                    value={value}
                                    items={dataCitizenship}
                                    getId={(e) => e.id}
                                    getLabel={(e) => e.label}
                                    onChange={onChange}
                                />
                            </Flex.Row>
                        )} />
                    <Form.Error>{form.op.error("citizenship")}</Form.Error>
                </Form.Field>
                <Form.Row>
                    {isRussianPassport && (
                        <Form.Field>
                            <Form.Label>Серия паспорта *</Form.Label>
                            <Controller
                                control={form.control}
                                name="series"
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
                            <Form.Error>{form.op.error("series")}</Form.Error>
                        </Form.Field>
                    )}
                    {isRussianPassport && (
                        <Form.Field>
                            <Form.Label>Номер паспорта *</Form.Label>
                            <Controller
                                control={form.control}
                                name="number"
                                rules={{
                                    validate: form.op.validate(
                                        form.op.validators.required,
                                        form.op.validators.length_exact(6),
                                    ),
                                }}
                                render={({field: {value, onChange}}) => (
                                    <ControllerInputMask
                                        value={value}
                                        onChange={onChange}
                                        inputMode="tel"
                                        mask={(m) => m.numeric(6)}
                                    />
                                )}
                            />
                            <Form.Error>{form.op.error("number")}</Form.Error>
                        </Form.Field>
                    )}
                    {!isRussianPassport && (
                        <Form.Field>
                            <Form.Label>Серия и номер документа *</Form.Label>
                            <Input {...form.register("number", {
                                validate: form.op.validate(
                                    form.op.validators.required,
                                ),
                            })} />
                            <Form.Error>{form.op.error("number")}</Form.Error>
                        </Form.Field>
                    )}
                </Form.Row>
                <Form.Field>
                    <Form.Label>Кем выдан *</Form.Label>
                    <Input
                        {...form.register("issuedBy", {
                            validate: form.op.validate(
                                form.op.validators.required,
                            ),
                        })}
                        color={form.op.color("issuedBy")}
                        autoComplete={"off"} />
                    <Form.Error>{form.op.error("issuedBy")}</Form.Error>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Дата выдачи *</Form.Label>
                    <Controller
                        control={form.control}
                        name="dateOfIssue"
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
                                color={form.op.color("dateOfIssue")}
                            />
                        )} />
                    <Form.Error>{form.op.error("dateOfIssue")}</Form.Error>
                </Form.Field>
                {isRussianPassport && (
                    <Form.Field>
                        <Form.Label>Код подразделения *</Form.Label>
                        <Controller
                            name={"subdivisionCode"}
                            control={form.control}
                            rules={{
                                validate: form.op.validate(
                                    form.op.validators.required,
                                ),
                            }}
                            render={({field: {value, onChange}}) => (
                                <ControllerInputMask
                                    inputMode="numeric"
                                    color={form.op.color("subdivisionCode")}
                                    mask={[/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                                    value={String(value)}
                                    onChange={onChange}
                                />
                            )} />
                        <Form.Error>{form.op.error("subdivisionCode")}</Form.Error>
                    </Form.Field>
                )}
                <Form.Field>
                    <Form.Label>{
                        isRussianPassport
                            ? "Две страницы паспорта *"
                            : "Две страницы документа *"
                    }</Form.Label>
                    <Controller
                        name="passportFileInfo"
                        control={form.control}
                        rules={{
                            validate: form.op.validate(
                                form.op.validators.array_min(2),
                            ),
                        }}
                        render={({field: {value, onChange}}) => (
                            <ControllerImage
                                crop
                                limit={2}
                                url={executer.URL_FS}
                                value={value}
                                onChange={onChange}
                            />
                        )} />
                    <Form.Error>{form.op.error("passportFileInfo")}</Form.Error>
                </Form.Field>
            </Form.Body>

            <Button
                type="submit"
                loading={!ready}>
                Обновить
            </Button>
        </Form.Handle>
    );
});
