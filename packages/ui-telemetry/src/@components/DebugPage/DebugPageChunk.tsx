import * as React from "react";
import {TelemetryChunk} from "../../telemetry";

type Props = {
    chunk: TelemetryChunk;
};

export const DebugPageChunk = React.memo<Props>((props) => {
    const {chunk} = props;

    const [date, info] = chunk;

    return (
        <div>
            <b>{new Date(date).toLocaleString()}</b>
            <div>{JSON.stringify(info)}</div>
        </div>
    );
});
