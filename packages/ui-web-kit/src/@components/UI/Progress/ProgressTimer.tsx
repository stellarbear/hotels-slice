import React from "react";
import {ProgressUI} from "./styles";

type Props = {
    timeout: number;
    state?: React.CSSProperties["animationPlayState"];
};

export const ProgressTimer = React.memo<Props>((props) => {

    return (
        <ProgressUI.ProgressTimerContent {...props} />
    );
});
