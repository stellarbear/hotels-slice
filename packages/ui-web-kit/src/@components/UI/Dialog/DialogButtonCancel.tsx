import {useOverlay} from "@app/ui-web-core";
import React from "react";
import {Button} from "../Button";

type Props = React.ComponentProps<typeof Button>;

export const DialogButtonCancel = React.memo<Props>((props) => {
    const overlay = useOverlay();

    const onClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        props.onClick?.(e);
        overlay.close();
    }, [props.onClick]);

    return (
        <Button
            type="button"
            variant="outlined"
            {...props}
            onClick={onClick}>
            {props.children ?? "Отменить"}
        </Button>
    );
});
