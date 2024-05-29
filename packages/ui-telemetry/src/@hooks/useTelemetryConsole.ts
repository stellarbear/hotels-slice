import * as React from "react";
import {useLocation} from "react-router";
import {TelemetryHandle} from "../telemetry";

const format = (as: string, args: any) => ({
    as, args,
});

export const useTelemetryConsole = (count: number) => {
    const location = useLocation();
    const fnLogRef = React.useRef(window.console.log);
    const fnErrorRef = React.useRef(window.console.error);
    const fnWarnRef = React.useRef(window.console.warn);

    React.useEffect(() => {
        window.console.log = (...args: any[]) => {
            TelemetryHandle.register("console", format("log", args), count);
            fnLogRef.current(...args);
        };
        window.console.error = (...args: any[]) => {
            TelemetryHandle.register("console", format("error", args), count);
            fnLogRef.current(...args);
        };
        window.console.warn = (...args: any[]) => {
            TelemetryHandle.register("console", format("warn", args), count);
            fnLogRef.current(...args);
        };

        return () => {
            window.console.log = fnLogRef.current;
            window.console.error = fnErrorRef.current;
            window.console.warn = fnWarnRef.current;
        };
    }, [location]);
};
