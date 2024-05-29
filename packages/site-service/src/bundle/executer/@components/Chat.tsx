import * as React from "react";
import {getFullName, useChat} from "../../../@shared";
import {MainContainer} from "./MainContainer";

export const Chat = React.memo(() => {
    const {me} = MainContainer.use();

    const info = React.useMemo(() => [
        {title: "Роль", content: "Исполнитель"},
        {title: "Телефон", content: me.phoneNumber},
        {title: "email", content: me.email},
        {title: "ФИО", content: getFullName(me)},
    ], [me]);

    useChat(executer.CHAT_ID, info);

    return null;
});
