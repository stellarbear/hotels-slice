import {Link, Routing} from "@app/ui-web-core";
import {Dialog} from "@app/ui-web-kit";
import * as React from "react";
import {Navigate, useParams} from "react-router";
import {MainContainer} from "../../@components";
import {ERoute} from "../../AppRoutes";
import {TasksForm} from "./TasksForm";
import {TasksFormHotel} from "./TasksFormHotel";

export const Tasks = React.memo(() => {
    const {me} = MainContainer.use();
    const professions = me.professions;

    if (me.status !== "STEP_3_VERIFIED") {
        return (
            <Dialog.Handle persistent>
                <Dialog.Header>Заполните профиль</Dialog.Header>
                <Dialog.Content>
                    <div>Заполните данные профиля, чтобы видеть актуальные заявки</div>
                </Dialog.Content>

                <Dialog.Actions>
                    <Link to={ERoute.account}>
                        <Dialog.ButtonSubmit />
                    </Link>
                </Dialog.Actions>
            </Dialog.Handle>
        );
    }

    if (professions.length === 0) {
        return (
            <Dialog.Handle persistent>
                <Dialog.Header>Заполните профиль</Dialog.Header>
                <Dialog.Content>
                    <div>Вам необходимо задать перечень ваших профессий</div>
                </Dialog.Content>

                <Dialog.Actions>
                    <Link to={ERoute.account}>
                        <Dialog.ButtonSubmit />
                    </Link>
                </Dialog.Actions>
            </Dialog.Handle>
        );
    }

    return (
        <Routing.Routes>
            <Routing.Route path={"/:id/*"} element={<TaskRoute />} />
            <Routing.Route path={"/"} element={<TaskRoute />} />

            <Routing.Route path="*" element={<Navigate to="" replace />} />
        </Routing.Routes>
    );
});

type Params = {
    id?: string;
};

const TaskRoute = React.memo(() => {
    const params = useParams<Params>();

    if (params.id) {
        return (
            <TasksFormHotel id={params.id} />
        );
    }

    return (
        <TasksForm
            customer={null}
        />
    );
});
