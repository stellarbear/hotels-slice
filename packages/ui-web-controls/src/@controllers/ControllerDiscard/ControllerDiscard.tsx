import {Button} from "@app/ui-web-kit";
import * as React from "react";
import {ControllerDiscardIcon} from "./ControllerDiscardIcon";

type Props = {
    onChange: (value: unknown) => void;
    value?: unknown;
    to?: unknown;

    children?: React.ReactNode;
};

export const ControllerDiscard = React.memo<Props>((props) => {
    const {onChange, value, to = null, children = <ControllerDiscardIcon />} = props;

    const onReset = React.useCallback(() => onChange(to), []);

    if (value === to) {
        return null;
    }

    return (
        <Button variant="text" color="error" onClick={onReset}>
            {children}
        </Button>
    );
});
