import React from "react";
import {CardUI} from "./styles";

type Props =
    & React.ComponentPropsWithoutRef<"div">
    & {
        children: React.ReactNode;
    };

export const Card = React.memo<Props>((props) => {
    const {children, ...rest} = props;
    return (
        <CardUI.CardContent {...rest}>
            {children}
        </CardUI.CardContent>
    );
});
