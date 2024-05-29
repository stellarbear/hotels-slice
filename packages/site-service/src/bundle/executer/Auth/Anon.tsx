import {Routing} from "@app/ui-web-core";
import * as React from "react";
import {Navigate} from "react-router-dom";
import {LayoutAuth} from "../../../@shared";
import {Recovery} from "./Recovery";
import {SignIn} from "./SIgnIn";
import {SignUp} from "./SignUp";

export enum ERouteAuth {
    sign_in = "/",
    sign_up = "/singup",
    recovery = "/recovery",
}

export const Anon = React.memo(() => (
    <LayoutAuth>
        <Routing.Routes>
            <Routing.Route path={ERouteAuth.sign_in} element={<SignIn />} />
            <Routing.Route path={ERouteAuth.sign_up} element={<SignUp />} />
            <Routing.Route path={ERouteAuth.recovery} element={<Recovery />} />

            <Routing.Route path="*" element={<Navigate to={ERouteAuth.sign_in} replace/>} />
        </Routing.Routes>
    </LayoutAuth>
));
