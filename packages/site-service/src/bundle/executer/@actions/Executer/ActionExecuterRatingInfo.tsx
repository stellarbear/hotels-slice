
import {Dialog} from "@app/ui-web-kit";
import * as React from "react";

type Props = {
    rating: number;
};

export const ActionExecuterRatingInfo = React.memo<Props>((props) => {
    const {rating} = props;

    return (
        <>
            <Dialog.Header>Рейтинг аккаунта: {rating}</Dialog.Header>
            <Dialog.Content>
                <div>Рейтинг составляется на основе отзывов заказчиков на закрытые заявки</div>
            </Dialog.Content>

            <Dialog.Actions>
                <Dialog.ButtonCancel />
            </Dialog.Actions>
        </>
    );
});
