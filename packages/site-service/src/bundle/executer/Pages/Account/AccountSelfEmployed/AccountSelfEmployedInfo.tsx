import {Flex} from "@app/ui-web-core";
import {Button, Typo} from "@app/ui-web-kit";
import * as React from "react";

type Props = {
    onSubmit: () => void;
};

export const AccountSelfEmployedInfo = React.memo<Props>((props) => {
    const {onSubmit} = props;

    return (
        <Flex.Col fullheight>
            <Typo.SubTitle>Станьте самозанятым со Сбербанком</Typo.SubTitle>
            <Typo.p>и получите сервисы за 0 рублей</Typo.p>
            <ul>
                <li>
                    Бесплатная регистрация через приложение СберБанк Онлайн
                </li>
                <li>
                    Бесплатные сервисы для развития вашего дела
                </li>
                <li>
                    Работа с чеками и оплата налога в приложении СберБанк Онлайн
                </li>
            </ul>
            <Flex.Cell flex />
            <Button onClick={onSubmit}>Стать самозанятым</Button>
        </Flex.Col>
    );
});
