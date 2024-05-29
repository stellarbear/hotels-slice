import * as React from "react";
import {autoScrollClass} from "./data";

type Props = {
    if?: boolean;
    children: React.ReactNode;
};

export const AutoScrollTarget = React.memo<Props>((props) => {
    const {if: condition, children} = props;

    return (
        <div className={condition ? autoScrollClass : undefined}>
            {children}
        </div>
    );
});
