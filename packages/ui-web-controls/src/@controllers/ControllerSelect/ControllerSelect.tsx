import {Desktop, Mobile} from "@app/ui-web-core";
import * as React from "react";
import {ControllerSelectDrawer} from "./ControllerSelectDrawer";
import {ControllerSelectDropdown} from "./ControllerSelectDropdown";
import {ControllerSelectProps} from "./types";

type Props<T, V> =
    & ControllerSelectProps<T, V>
    & {
        button?: JSX.Element;
    };

export const ControllerSelect = <T, V>(props: Props<T, V>) => (
    <>
        <Mobile>
            <ControllerSelectDrawer<T, V> {...props} />
        </Mobile>
        <Desktop>
            <ControllerSelectDropdown<T, V> {...props} />
        </Desktop>
    </>
);
