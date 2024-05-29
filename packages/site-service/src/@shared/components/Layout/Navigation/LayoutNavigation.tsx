import {Desktop, Mobile} from "@app/ui-web-core";
import * as React from "react";
import {LayoutDesktop} from "./LayoutDesktop";
import {LayoutMobile} from "./LayoutMobile";

export type Option = {
    title: string;
    to: string;
    icon: JSX.Element;
};

type Props = {
    options: (Option | false)[];
    header: React.ReactNode;
    children: React.ReactNode;
};

export const LayoutNavigation = React.memo<Props>((props) => (
    <>
        <Mobile>
            <LayoutMobile {...props} />
        </Mobile>
        <Desktop>
            <LayoutDesktop {...props} />
        </Desktop>
    </>
));
