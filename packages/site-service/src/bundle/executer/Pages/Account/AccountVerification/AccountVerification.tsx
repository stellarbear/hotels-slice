import {Routing} from "@app/ui-web-core";
import * as React from "react";
import {AccountVerificationConfirm} from "./AccountVerificationConfirm";
import {AccountVerificationStatus} from "./AccountVerificationStatus";

export const AccountVerification = React.memo(() => (
    <Routing.Routes>
        <Routing.Route index element={<AccountVerificationStatus />} />
        <Routing.Route path={"/:paymentid"} element={<AccountVerificationConfirm />} />
    </Routing.Routes>
));
