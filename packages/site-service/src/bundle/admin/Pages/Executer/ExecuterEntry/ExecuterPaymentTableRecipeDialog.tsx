import {ExtensionsDate} from "@app/extensions-classes";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Dialog, Dictionary} from "@app/ui-web-kit";
import * as React from "react";
import {ExecuterPayment} from "./ExecuterPayment";

type Props = {
    payment: ExecuterPayment;
};

export const ExecuterPaymentTableRecipeDialog = React.memo<Props>((props) => {
    const {payment} = props;

    return (
        <>
            <Dialog.Header>Информация по чеку ${payment.id}</Dialog.Header>
            <Dialog.Content>
                <Flex.Col>
                    <Dictionary
                        object={payment}
                        as={{
                            "Создано": (v) => ExtensionsDate.format("d.m.y", v.createAt),
                            "Изменено": (v) => ExtensionsDate.format("d.m.y", v.updateAt),
                            "Время создания": (v) => ExtensionsDate.format("H:M:S", v.createAt),
                            "Идентификатор платежа в сиситеме JumpFinance": "idPayment",
                            "Сумма заявки на выплату": "amount",
                            "Сумма фактической выплаты": "amountPaid",
                            "Удержанная с исполнителя сумма на уплату налога самозанятых": "taxAmount",
                            "Чек от ФНС": (v) => v.fnsUrl &&
                                <Colored color="primary">
                                    <Link to={v.fnsUrl} external blank >
                                        ссылка
                                    </Link>
                                </Colored>
                            ,
                            "Чек от JumpFinance": (v) => v.savedUrl &&
                                <Colored color="primary">
                                    <Link to={v.savedUrl} external blank>
                                        ссылка
                                    </Link>
                                </Colored>
                            ,
                            "Фраза для чека": "purpose",
                        }} />
                </Flex.Col>
            </Dialog.Content>

            <Dialog.Actions >
                <Dialog.ButtonCancel />
            </Dialog.Actions>
        </>
    );
});
