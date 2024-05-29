import {Wizard, useWizard} from "@app/ui-web-kit";
import * as React from "react";
import {SignUpAuthData} from "./SignUpAuthData";
import {SignUpPassword} from "./SignUpPassword";
import {SignUpPhoneConfirm} from "./SignUpPhoneConfirm";
import {SignUpPhoneInput} from "./SignUpPhoneInput";

export type AuthStore = {
    code: string;
    phone: string;
    password: string;
};

export const SignUp = React.memo(() => (
    <Wizard.Handle<AuthStore> steps state={{
        code: "",
        phone: "",
        password: "",
    }}>
        <SignUpPhoneInput />
        <SignUpPhoneConfirm />
        <SignUpPassword />
        <SignUpAuthData />
    </Wizard.Handle>
));

export const useWizardAuth = useWizard<AuthStore>;
