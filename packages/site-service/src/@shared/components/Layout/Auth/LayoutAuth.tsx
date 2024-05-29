import {Desktop, Mobile} from "@app/ui-web-core";
import * as React from "react";
import {LayoutDesktop} from "./LayoutDesktop";
import {LayoutMobile} from "./LayoutMobile";

type Props = {
    children: React.ReactNode;
};

export const LayoutAuth = React.memo<Props>((props) => (
    <>
        <Mobile>
            <LayoutMobile {...props} />
        </Mobile>
        <Desktop>
            <LayoutDesktop {...props} />
        </Desktop>
    </>
));
