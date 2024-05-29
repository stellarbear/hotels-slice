import {Colored, Flex, Link, Section} from "@app/ui-web-core";
import {Button, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {queryRequisites} from "./AccountRequisites";

type Props = {
};

export const AccountRequisitesCard = React.memo<Props>(() => {
    const [data] = queryRequisites.use();

    const citizenship = data.executerPassport?.citizenship;
    const citizenshipRU = citizenship === "RUSSIA";

    const url = citizenshipRU
        ? executer.CARD_REFERRAL_RU
        : executer.CARD_REFERRAL_NON_RU;

    if (!url || !citizenship) {
        return null;
    }

    return (
        <Section>
            <Flex.Col align="center" s={16}>
                <Typo.SubTitle>
                    Дебетовая карта Tinkoff Black
                </Typo.SubTitle>
                <Link external to={url}>
                    <Colored background="#ffdd2d" color="#282828">
                        <Button>
                            Оформить карту
                        </Button>
                    </Colored>
                </Link>
            </Flex.Col>
        </Section>
    );
});
