import {Flex} from "@app/ui-web-core";
import {Tab} from "@app/ui-web-kit";
import * as React from "react";
import {useNavigate, useParams} from "react-router";
import {ERoute} from "../../AppRoutes";
import {AccountAvatar} from "./AccountAvatar";
import {AccountDocuments} from "./AccountDocuments";
import {AccountInformation} from "./AccountInformation";
import {AccountPassport} from "./AccountPassport";
import {AccountRequisites} from "./AccountRequisites";
import {AccountSecurity} from "./AccountSecurity";
import {AccountSelfEmployed} from "./AccountSelfEmployed";
import {AccountVerification} from "./AccountVerification";

export enum ERouteAccount {
    profile = "profile",
    security = "security",
    id = "id",
    address = "address",
    documents = "documents",
    requisites = "requisites",
    confirmation = "confirmation",
}

type Params = {
    type: ERouteAccount;
};

export const AccountForm = React.memo(() => {
    const params = useParams<Params>();
    const navigate = useNavigate();

    const urlReplace = React.useCallback((type?: string) =>
        type && navigate(`${ERoute.account}/${type}`), []);

    return (
        <Flex.Col>
            <AccountAvatar />
            
            <Tab.Handle onTabChange={urlReplace} defaultId={params.type}>
                <Tab.Item title="Мои данные" id="profile">
                    <AccountInformation />
                </Tab.Item>
                <Tab.Item title="Безопасность" id="security">
                    <AccountSecurity />
                </Tab.Item>
                <Tab.Item title="Паспортные данные" id="id">
                    <AccountPassport />
                </Tab.Item>
                <Tab.Item title="Необходимые документы" id="documents">
                    <AccountDocuments />
                </Tab.Item>
                <Tab.Item title="Стать самозанятым" id="selfemployed">
                    <AccountSelfEmployed />
                </Tab.Item>
                <Tab.Item title="Платежные реквизиты" id="requisites">
                    <AccountRequisites />
                </Tab.Item>
                <Tab.Item title="Подтверждение аккаунта" id="confirmation">
                    <AccountVerification />
                </Tab.Item>
            </Tab.Handle>
        </Flex.Col>
    );
});
