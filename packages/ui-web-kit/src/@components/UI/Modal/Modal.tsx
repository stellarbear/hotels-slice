import {Desktop, Mobile} from "@app/ui-web-core";
import * as React from "react";
import {Dialog} from "../Dialog";
import {Drawer} from "../Drawer";

type Props = React.ComponentProps<typeof Drawer> &
    React.ComponentProps<typeof Dialog.Handle>;

export const Modal = React.memo<Props>((props) => (
    <>
        <Mobile>
            <Drawer side="bottom" fill="fit" {...props} />
        </Mobile>
        <Desktop>
            <Dialog.Handle {...props} />
        </Desktop>
    </>
));
