import {Routing} from "@app/ui-web-core";
import {Breadcrumbs} from "@app/ui-web-kit";
import * as React from "react";
import {Navigate} from "react-router";
import {ERoute} from "../../AppRoutes";
import {AccountForm, ERouteAccount} from "./AccountForm";

export const Account = React.memo(() => {
    Breadcrumbs.add({crumb: "Личный кабинет", to: ERoute.account});

    return (
        <Routing.Routes>
            <Routing.Route path={"/:type/*"} element={<AccountForm />} />

            <Routing.Route path={"/*"} element={<Navigate to={ERouteAccount.profile} replace />} />
        </Routing.Routes>
    );
});
