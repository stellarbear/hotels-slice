import {Desktop, Mobile} from "@app/ui-web-core";
import * as React from "react";
import {SignInDesktop} from "./SignInDesktop";
import {SignInMobile} from "./SignInMobile";

export const SignIn = React.memo(() => (
    <>
        <Mobile>
            <SignInMobile />
        </Mobile>
        <Desktop>
            <SignInDesktop />
        </Desktop>
    </>
));
