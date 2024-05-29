import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsDate} from "@app/extensions-classes";
import {ExtensionsForm} from "@app/extensions-form";
import {MapYandex} from "@app/ui-maps-yandex";
import {useOverlay} from "@app/ui-web-core";
import {Card, Dialog, Dictionary, Form, Typo, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {TASK_REQUEST_MUTATION} from "../../@query";
import {TaskRequestMutation, TaskRequestMutationVariables} from "../../interfaces";
import {Task} from "./interface";

type Props = {
    task: Task;
};

const doc = TASK_REQUEST_MUTATION;
type Mutation = TaskRequestMutation;
type Variables = TaskRequestMutationVariables;
type InputForm = Variables["input"];

const mutationTaskRequest = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const ActionTaskRequest = React.memo<Props>((props) => {
    const {task} = props;

    const overlay = useOverlay();
    const notification = useNotification.snackbar();

    const [mutation, {loading}] = mutationTaskRequest
        .onSuccess(() => {
            overlay.close();
            notification.success("Заявка успешно принята");
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {id: task.id},
    });

    const onSubmit = React.useCallback((input: InputForm) =>
        mutation({variables: {input}}), []);

    const coordinates = task.manager.hotel.coordinates;

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Принять заявку?</Dialog.Header>
            <Dialog.Content loading={loading}>
                <Form.Field>
                    <Form.Label>Данные заявки</Form.Label>
                    <Card>
                        <Dictionary
                            object={task}
                            as={{
                                "Ставка": (v) => `${v.rent} ₽/ч.`,
                                "Заказчик": v => v.manager.hotel.nameHotel,
                                "Дата": (v) => ExtensionsDate.format("d.m.y", new Date(v.startAt)),
                                "Время": (v) => ExtensionsDate.format("H:M", new Date(v.startAt)),
                                "Длительность": (v) => `${v.duration} ч.`,
                            }}
                        />
                    </Card>
                </Form.Field>
                {task.comment && (
                    <Form.Field>
                        <Form.Label>Комментарий</Form.Label>
                        <Card>
                            <Typo.p>{task.comment}</Typo.p>
                        </Card>
                    </Form.Field>
                )}
                <Form.Field>
                    <Form.Label>Местоположение</Form.Label>
                    <MapYandex.Map
                        height={200}
                        api={executer.MAP_YANDEX_KEY}>
                        {coordinates && (
                            <MapYandex.MapMarker
                                latitude={coordinates.latitude}
                                longitude={coordinates.longitude}>
                                <MapYandex.MapMarkerIcon />
                            </MapYandex.MapMarker>
                        )}
                    </MapYandex.Map>
                </Form.Field>
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
