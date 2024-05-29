import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {ControllerInputMask, ControllerInputPattern} from "@app/ui-web-controls";
import {Button, Dialog, Form, Input, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {MainContainer} from "../../../@components";
import {EXECUTER_REQUISITES_UPSERT_MUTATION} from "../../../@query";
import {
    ERequisitesFragment, ExecuterRequisitesUpsertMutation,
    ExecuterRequisitesUpsertMutationVariables
} from "../../../interfaces";
import {AccountEditDialog} from "../AccountEditDialog";
import {queryRequisites} from "./AccountRequisites";


const doc = EXECUTER_REQUISITES_UPSERT_MUTATION;
type Mutation = ExecuterRequisitesUpsertMutation;
type Variables = ExecuterRequisitesUpsertMutationVariables;
type InputForm = Variables["input"];
export type Requisites = Omit<ERequisitesFragment, "id" | "__typename">;

const mutationAccounRequieistesUpdate = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

type Props = {
};

export const AccountRequisitesForm = React.memo<Props>(() => {
    const [data] = queryRequisites.use();
    const requisites = data.executerGetSimpleRequisite ?? null;

    const {me} = MainContainer.use();

    const template = useNotification.template();
    const notification = useNotification.snackbar();
    const [mutation] = mutationAccounRequieistesUpdate
        .onSuccess(() => notification.success("Изменения сохранены"))
        .compile();

    const form = ExtensionsForm.useFormSchema(requisites)<InputForm>({
        inn: true,
        bankName: true,
        cardNumber: true,
    });

    const [onSubmit, ready] = useAsyncOp(async (input: InputForm) => {
        const onConfirm = () => mutation({variables: {input}});

        const noChanges =
            requisites?.inn === input.inn;

        if (me.status === "STEP_3_VERIFIED" && !noChanges) {
            return template.onOpen(
                <Dialog.Handle>
                    <AccountEditDialog onConfirm={onConfirm} />
                </Dialog.Handle>,
            );
        }

        return onConfirm();
    }, [requisites]);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Form.Body>
                <Form.Field>
                    <Form.Label>ИНН *</Form.Label>
                    <Controller
                        control={form.control}
                        name="inn"
                        rules={{
                            validate: form.op.validate(
                                form.op.validators.required,
                                form.op.validators.length_exact(12),
                            ),
                        }}
                        render={({field: {value, onChange}}) => (
                            <ControllerInputMask
                                value={value}
                                onChange={onChange}
                                inputMode="tel"
                                mask={(m) => m.numeric(12)}
                            />
                        )}
                    />
                    <Form.Error>{form.op.error("inn")}</Form.Error>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Номер карты</Form.Label>
                    <Controller
                        control={form.control}
                        name="cardNumber"
                        render={({field: {value, onChange}}) => (
                            <ControllerInputPattern
                                pattern="digits"
                                value={value}
                                onChange={onChange} />
                        )} />
                    <Form.Error>{form.op.error("cardNumber")}</Form.Error>
                </Form.Field>
                <Form.Field>
                    <Form.Label>Наименование банка </Form.Label>
                    <Input
                        {...form.register("bankName")}
                        color={form.op.color("bankName")}
                        autoComplete={"off"} />
                    <Form.Error>{form.op.error("bankName")}</Form.Error>
                </Form.Field>
            </Form.Body>

            <Button
                type="submit"
                loading={!ready}>
                Сохранить
            </Button>
        </Form.Handle>
    );
});
