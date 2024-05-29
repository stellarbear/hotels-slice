import * as React from "react";
import {useLocation} from "react-router";
import {TelemetryHandle} from "../telemetry";

export const useTelemetryLocation = (count: number) => {
    const location = useLocation();

    React.useEffect(() => {
        TelemetryHandle.register("history", location.pathname, count);
    }, [location]);
};
