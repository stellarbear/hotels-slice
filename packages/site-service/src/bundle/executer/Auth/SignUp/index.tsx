import {Desktop, Mobile} from "@app/ui-web-core";
import * as React from "react";
import {SignUpDesktop} from "./Desktop";
import {SignUpMobile} from "./Mobile";

export const SignUp = React.memo(() => (
    <>
        <Mobile>
            <SignUpMobile />
        </Mobile>
        <Desktop>
            <SignUpDesktop />
        </Desktop>
    </>
));
