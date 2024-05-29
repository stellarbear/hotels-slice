import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {ControllerDate} from "@app/ui-web-controls";
import {Flex} from "@app/ui-web-core";
import {Button, Form, Typo, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {EXECUTER_DOCUMENTS_UPSERT_MUTATION} from "../../../@query";
import {
    ExecuterDocumentsUpsertMutation,
    ExecuterDocumentsUpsertMutationVariables
} from "../../../interfaces";
import {queryDocumentsAll} from "./AccountDocuments";

const doc = EXECUTER_DOCUMENTS_UPSERT_MUTATION;
type Mutation = ExecuterDocumentsUpsertMutation;
type Variables = ExecuterDocumentsUpsertMutationVariables;
type InputForm = Variables["input"];

const mutationAccounDocumentsUpdate = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

type Props = {
};

export const AccountDocumentsForm = React.memo<Props>(() => {
    const [document] = queryDocumentsAll.use();

    const citizenship = document.executerPassport?.citizenship;
    const registrationDocumentsRequired = citizenship !== "RUSSIA";

    React.useEffect(() => {
        if (!registrationDocumentsRequired) {
            form.unregister("workExpiration");
        }
    }, [registrationDocumentsRequired]);

    const notification = useNotification.snackbar();
    const [mutation] = mutationAccounDocumentsUpdate
        .onSuccess(() => notification.success("Изменения сохранены"))
        .compile();

    const form = ExtensionsForm.useFormSchema(document)<InputForm>({
        "medicalBookExpiration": (v) => v.executerMe.medicalBookExpiration,
        "workExpiration": (v) => v.executerMe.workExpiration,
    });

    const [onSubmit, ready] = useAsyncOp(async (input: InputForm) => {
        await mutation({variables: {input}});
    }, []);

    return (
        <Flex.Col>
            <Typo.p>
                Укажите, до какого срока действуют следующие документы
            </Typo.p>
            <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
                <Form.Body>
                    <Form.Field>
                        <Form.Label>Mедицинская книжка</Form.Label>
                        <Controller
                            control={form.control}
                            name="medicalBookExpiration"
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
                                    color={form.op.color("medicalBookExpiration")}
                                />
                            )} />
                        <Form.Error>{form.op.error("medicalBookExpiration")}</Form.Error>
                    </Form.Field>
                    {registrationDocumentsRequired && (
                        <Form.Field>
                            <Form.Label>Временная регистрация</Form.Label>
                            <Controller
                                control={form.control}
                                name="workExpiration"
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
                                        color={form.op.color("workExpiration")}
                                    />
                                )} />
                            <Form.Error>{form.op.error("workExpiration")}</Form.Error>
                        </Form.Field>
                    )}
                </Form.Body>

                <Button
                    type="submit"
                    loading={!ready}>
                    Обновить
                </Button>
            </Form.Handle>
        </Flex.Col>
    );
});
