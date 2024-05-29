import {ExtensionsObject} from "@app/extensions-classes";
import {isNull} from "@app/extensions-guard";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Alert, Button, Dialog, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {
    ActionExecuterVerificationRequest
} from "../../../@actions";
import {MainContainer} from "../../../@components";
import {Verification, queryAccountVerification} from "./AccountVerificationStatus";

type Props = {
};

const verificationLabels: Record<string, (entry: Verification) => any> = {
    "Заполнение реквизитов": (v) => v.executerGetSimpleRequisite,
    "Заполнение паспортных данных": (v) => v.executerPassport,
    "Заполнение документов": (v) => v.executerMe.medicalBookExpiration,
};

export const AccountVerificationStatusForm = React.memo<Props>(() => {
    const [verification] = queryAccountVerification.use();

    const {me} = MainContainer.use();
    const {status} = me;

    const canVerifyAccount =
        !isNull(verification.executerGetSimpleRequisite) &&
        !isNull(verification.executerPassport) &&
        !isNull(verification.executerMe.medicalBookExpiration) &&
        verification.executerMe.profilePic.length > 0;

    return (
        <Typo.p>
            Подтверждение аккаунта необходимо для получения полного доступа ко всему функционалу ресурса.
            <br />
            Подтверждение аккаунта состоит из 2 этапов:
            <br />
            1: Заполнение информации
            <ul>
                {ExtensionsObject.entries(verificationLabels).map(([label, pathFn], index) => (
                    <li key={index}>
                        <LabelSatisfied when={!isNull(pathFn(verification))}>
                            {label}
                        </LabelSatisfied>
                    </li>
                ))}
            </ul>
            2: Подтверждение
            <ul>
                <li>
                    <LabelSatisfied when={canVerifyAccount}>
                        <Colored color="primary">
                            <Link external blank to={`${executer.URL_DOMAIN}/document/OFFER`} >
                                <b>Акцепт оферты </b>
                            </Link>
                        </Colored>
                        {" "}осуществляется оплатой 11 рублей с Вашей карты.
                        После оплаты деньги вернутся на счет автоматически.
                    </LabelSatisfied>
                </li>
            </ul>

            <Flex.Col>
                {status === "STEP_1_REGISTERED" && (
                    <Dialog.Handle button={
                        <Button disabled={!canVerifyAccount} >Акцепт оферты</Button>
                    }>
                        <ActionExecuterVerificationRequest />
                    </Dialog.Handle>
                )}
                {status === "STEP_2_WAITING_FOR_VERIFICATION" && (
                    <Alert color="expectation">
                        Ваш аккаунт находится на стадии проверки
                    </Alert>
                )}
                {status === "STEP_3_VERIFICATION_DECLINED" && (
                    <Alert color="error">
                        В подтверждении отклонено
                    </Alert>
                )}
                {status === "STEP_3_VERIFIED" && (
                    <Alert>
                        Аккаунт подтвержден
                    </Alert>
                )}
            </Flex.Col>
        </Typo.p>
    );
});

const LabelSatisfied = React.memo<{when: boolean; children: React.ReactNode}>((props) => (
    <>
        {props.children}{" "}
        <Colored color={props.when ? "success" : "expectation"}>
            {props.when ? "✓" : "✗"}
        </Colored>
    </>
));
