import {useAsyncOp} from "@app/extensions-react";
import {useOverlay} from "@app/ui-web-core";
import {Dialog} from "@app/ui-web-kit";
import React from "react";

type Props = {
    onConfirm: () => Promise<unknown>;
};

export const AccountEditDialog = React.memo<Props>((props) => {
    const {onConfirm} = props;

    const overlay = useOverlay();
    const [onSubmit, ready] = useAsyncOp(() => onConfirm().then(overlay.close), []);

    const loading = !ready;

    return (
        <>
            <Dialog.Header>Предупреждение</Dialog.Header>
            <Dialog.Content loading={loading}>
                Если изменить ваши данные*, аккаунт потребуется активировать заново
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit onClick={onSubmit} />
            </Dialog.Actions>
        </>
    );
});
