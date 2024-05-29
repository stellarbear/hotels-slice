import * as React from "react";
import {useLocation} from "react-router";
import {TelemetryHandle} from "../telemetry";

const getErrorInfo = (error: ErrorEvent) => ({
    message: error.message,
    filename: error.filename,
});

export const useTelemetryError = (count: number) => {
    const location = useLocation();

    const onError = React.useCallback((error: ErrorEvent) => {
        TelemetryHandle.register("apollo", getErrorInfo(error), count);
    }, []);


    React.useEffect(() => {
        window.addEventListener("error", onError);

        return () => {
            window.removeEventListener("error", onError);
        };
    }, [location]);
};
