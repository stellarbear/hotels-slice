
import {Wizard, useWizard} from "@app/ui-web-kit";
import * as React from "react";
import {RecoveryPassword} from "./RecoveryPassword";
import {RecoveryPhoneConfirm} from "./RecoveryPhoneConfirm";
import {RecoveryPhoneInput} from "./RecoveryPhoneInput";

export type RecoveryStore = {
    code: string;
    phone: string;
};

export const Recovery = React.memo(() => (
    <Wizard.Handle<RecoveryStore> steps state={{
        code: "",
        phone: "",
    }}>
        <RecoveryPhoneInput />
        <RecoveryPhoneConfirm />
        <RecoveryPassword />
    </Wizard.Handle>
));

export const useWizardRecovery = useWizard<RecoveryStore>;
