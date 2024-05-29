import * as React from "react";
import {ProgressUI} from "./styles";

type Props = {
    current: number;
    max: number;
};

export const ProgressBar = React.memo<Props>((props) => {
    const {current, max} = props;

    const percent = React.useMemo(() =>
        Math.max(Math.min(max, current), 0) * 100 / max, [current, max]);

    return (
        <ProgressUI.ProgressBarContent percent={percent} />
    );
});
