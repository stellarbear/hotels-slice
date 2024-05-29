import {ExtensionsApollo} from "@app/extensions-apollo";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {Flex, useOverlay} from "@app/ui-web-core";
import {Dialog, Form, Input, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {Rating} from "../../../../@shared";
import {CUSTOMER_RATE_MUTATION} from "../../@query";
import {CustomerRateMutation, CustomerRateMutationVariables} from "../../interfaces";
import {Task} from "./interface";

type Feedback = {
    id: string;
    comment?: string | null;
    rating: number;
};

type Props = {
    task: Task;
    feedback?: Feedback | null;
};

const doc = CUSTOMER_RATE_MUTATION;
type Mutation = CustomerRateMutation;
type Variables = CustomerRateMutationVariables;
type InputForm = Variables["input"];

const mutationTaskRateManager = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const ActionManagerRate = React.memo<Props>((props) => {
    const {task, feedback} = props;

    const overlay = useOverlay();
    const notification = useNotification.snackbar();

    const [mutation, {loading}] = mutationTaskRateManager
        .onSuccess(() => {
            overlay.close();
            notification.success("Отзыв сохранен");
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {
            taskId: task.id,
            feedbackId: feedback?.id,
            comment: feedback?.comment ?? "",
            rating: feedback?.rating ?? 5,
        },
    });

    const onSubmit = React.useCallback((input: InputForm) =>
        mutation({variables: {input}}), []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Оставить отзыв на исполнителя?</Dialog.Header>
            <Dialog.Content loading={loading}>
                <Form.Field>
                    <Form.Label>Заявка</Form.Label>
                    {task.id}
                </Form.Field>
                <Form.Field>
                    <Form.Label>Заказчик</Form.Label>
                    {task.manager.hotel.nameHotel}
                </Form.Field>

                <Form.Field>
                    <Form.Label>Рейтинг</Form.Label>
                    <Controller
                        control={form.control}
                        name="rating"
                        rules={{
                            validate: form.op.validate(
                                form.op.validators.required,
                            ),
                        }}
                        render={({field: {value, onChange}}) => (
                            <Flex.Row align="center">
                                <Rating
                                    value={value}
                                    count={5}
                                    onClick={onChange}
                                />
                                <Form.Label>{`: ${value} / 5`}</Form.Label>
                            </Flex.Row>
                        )} />
                    <Form.Error>{form.op.error("rating")}</Form.Error>
                </Form.Field>

                <Form.Field>
                    <Form.Label>Комментарий</Form.Label>
                    <Input
                        {...form.register("comment")}
                    />
                    <Form.Error>{form.op.error("comment")}</Form.Error>
                </Form.Field>
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
