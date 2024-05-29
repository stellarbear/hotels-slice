
import {Flex} from "@app/ui-web-core";
import {Tab, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {useNavigate, useParams} from "react-router";
import {ERoute} from "../../AppRoutes";
import {Admin} from "./Admin";
import {Profession} from "./Profession";

export enum ERoutesSettings {
    profession = "profession",
    admin = "admin",
}

type Params = {
    type: ERoutesSettings;
};

export const SettingsForm = React.memo(() => {
    const params = useParams<Params>();
    const navigate = useNavigate();

    const urlReplace = React.useCallback((type?: string) =>
        type && navigate(`${ERoute.settings}/${type}`), []);

    return (
        <Flex.Col>
            <Typo.Title>Настройки</Typo.Title>
            <Tab.Handle onTabChange={urlReplace} defaultId={params.type}>
                <Tab.Item title="Профессии" id={ERoutesSettings.profession}>
                    <Profession />
                </Tab.Item>
                <Tab.Item title="Сотрудники" id={ERoutesSettings.admin}>
                    <Admin />
                </Tab.Item>
            </Tab.Handle>
        </Flex.Col>
    );
});
