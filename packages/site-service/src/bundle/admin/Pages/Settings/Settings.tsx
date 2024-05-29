import {Routing} from "@app/ui-web-core";
import {Breadcrumbs} from "@app/ui-web-kit";
import * as React from "react";
import {Navigate} from "react-router";
import {ERoute} from "../../AppRoutes";
import {ERoutesSettings, SettingsForm} from "./SettingsForm";

export const Settings = React.memo(() => {
    Breadcrumbs.add({crumb: "Настройки", to: ERoute.settings});

    return (
        <Routing.Routes>
            <Routing.Route path={"/:type/*"} element={<SettingsForm />} />

            <Routing.Route path="*" element={<Navigate to={ERoutesSettings.admin} replace />} />
        </Routing.Routes>
    );
});
