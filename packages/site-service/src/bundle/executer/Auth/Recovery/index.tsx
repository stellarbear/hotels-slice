import {Desktop, Mobile} from "@app/ui-web-core";
import * as React from "react";
import {RecoveryDesktop} from "./Desktop";
import {RecoveryMobile} from "./Mobile";

export const Recovery = React.memo(() => (
    <>
        <Mobile>
            <RecoveryMobile />
        </Mobile>
        <Desktop>
            <RecoveryDesktop />
        </Desktop>
    </>
));
