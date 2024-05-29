import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useAsyncOp} from "@app/extensions-react";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {DialogDownload, ReportTemplateDates} from "../../../../@shared";
import {REPORT_CREATE_MUTATION} from "../../@query";
import {
    InputForStatisticDocForExecuter, ReportCreateMutation,
    ReportCreateMutationVariables, TypeExecutersDoc
} from "../../interfaces";

type Props = {
    type: TypeExecutersDoc;
};

const doc = REPORT_CREATE_MUTATION;
type Mutation = ReportCreateMutation;
type Variables = ReportCreateMutationVariables;
type ReportForm = InputForStatisticDocForExecuter;
export type InputForm = Variables["input"];

const mutationReportCreate = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const ActionReportCreate = React.memo<Props>((props) => {
    const {type} = props;

    const overlay = useOverlay();
    const template = useNotification.template();
    const notification = useNotification.snackbar();

    const [create] = mutationReportCreate
        .withConfiguration({
            context: {
                headers: {
                    "Time-Zone-Offset": new Date().getTimezoneOffset(),
                },
            },
        })
        .onSuccess(() => {
            overlay.close();
            notification.success("Сформирован отчет");
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {type},
    });

    const [onSubmit, ready] = useAsyncOp(async (input: InputForm) => {
        const result = await create({variables: {input}});
        const path = result.data?.executerCreateReport.path;

        path && template.onOpen(
            <Dialog.Handle>
                <DialogDownload
                    fs={executer.URL_FS}
                    url={path}
                />
            </Dialog.Handle>,
        );
    }, []);

    const loading = !ready;

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Создание отчета</Dialog.Header>
            <Dialog.Content loading={loading}>
                <ReportTemplateDates<ReportForm>
                    form={form}
                    start="startDate"
                    end="endDate"
                />
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
