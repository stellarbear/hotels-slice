import {Dialog} from "@app/ui-web-kit";
import * as React from "react";
import {useAuthorization} from "../../../bundle/auth";

export const AccountLogout = React.memo(() => {
    const {logOut} = useAuthorization();

    return (
        <>
            <Dialog.Header>Выход из аккаунта</Dialog.Header>
            <Dialog.Content>
                <div>Вы точно хотите выйти из аккаунта?</div>
            </Dialog.Content>

            <Dialog.Actions>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit onClick={logOut}/>
            </Dialog.Actions>
        </>
    );
});
