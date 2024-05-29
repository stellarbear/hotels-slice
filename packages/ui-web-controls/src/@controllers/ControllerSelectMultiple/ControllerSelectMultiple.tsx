import {Desktop, Mobile} from "@app/ui-web-core";
import * as React from "react";
import {ControllerSelectMultipleDrawer} from "./ControllerSelectMultipleDrawer";
import {ControllerSelectMultipleDropdown} from "./ControllerSelectMultipleDropdown";
import {ControllerSelectMultipleProps} from "./types";

type Props<T, V> =
    & ControllerSelectMultipleProps<T, V>
    & {
        button?: JSX.Element;
    };

export const ControllerSelectMultiple = <T, V extends PropertyKey>(props: Props<T, V>) => (
    <>
        <Mobile>
            <ControllerSelectMultipleDrawer {...props} />
        </Mobile>
        <Desktop>
            <ControllerSelectMultipleDropdown {...props} />
        </Desktop>
    </>
);
