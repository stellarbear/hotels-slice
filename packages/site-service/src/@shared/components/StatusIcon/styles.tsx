import {Icon} from "@app/ui-icons";
import {Colored} from "@app/ui-web-core";
import * as React from "react";

export const IconSuccess = React.memo(() => (
    <Colored color="success">
        <Icon icon="check" />
    </Colored>
));

export const IconFailure = React.memo(() => (
    <Colored color="error">
        <Icon icon="minus" />
    </Colored>
));
