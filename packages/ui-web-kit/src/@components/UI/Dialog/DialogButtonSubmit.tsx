import React from "react";
import {Button} from "../Button";

type Props = React.ComponentProps<typeof Button>;

export const DialogButtonSubmit = React.memo<Props>((props) => {

    return (
        <Button
            {...props}
            type="submit">
            {props.children ?? "Подтвердить"}
        </Button>
    );
});
