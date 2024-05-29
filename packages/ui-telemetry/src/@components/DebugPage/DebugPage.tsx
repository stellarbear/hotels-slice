import * as React from "react";
import {TelemetryHandle} from "../../telemetry";
import {DebugPageChunk} from "./DebugPageChunk";
import {downloadAsFile} from "./download";

export const DebugPage = React.memo(() => {
    const data = TelemetryHandle.defaults();
    const keys = React.useMemo(() => Array.from(data.keys()), []);

    const onDownload = React.useCallback(() => {
        const array = Array.from(TelemetryHandle.defaults().entries())
            .map((e) => JSON.stringify(e));

        downloadAsFile(array);
    }, []);

    return (
        <div>
            <button onClick={onDownload}>Скачать журнал</button>
            {keys.map((key, index) => (
                <React.Fragment key={index}>
                    <h5>{key}</h5>
                    {(data.get(key) ?? []).map((entry, index) => (
                        <DebugPageChunk key={index} chunk={entry} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
});
