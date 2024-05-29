import {Dialog, Image, useNotification} from "@app/ui-web-kit";
import React from "react";

type Props = {
    value: Image["Shape"][];
    onChange: (value: any[]) => void;
};

export const useImageDelete = (props: Props) => {
    const template = useNotification.template();

    const onDelete = React.useCallback((index: number) => () => {
        const onRemove = () => {
            const update = Array.from(props.value);
            update.splice(index, 1);

            props.onChange(update);
        };

        template.onOpen(
            <Dialog.Handle>
                <Dialog.Header>Подтвердить удаление?</Dialog.Header>

                <Dialog.Actions>
                    <Dialog.ButtonCancel
                        variant="contained"
                        onClick={onRemove}>
                        Подтвердить
                    </Dialog.ButtonCancel>
                </Dialog.Actions>
            </Dialog.Handle>,
        );
    }, [props.value]);

    return onDelete;
};
