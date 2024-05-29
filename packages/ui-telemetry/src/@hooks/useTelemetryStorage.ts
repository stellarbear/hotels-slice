import {isAny, isArrayOf, isNumber, isString, isTuple} from "@app/extensions-guard";
import React from "react";
import {useStateLocal} from "../@helper";
import {TelemetryHandle, TelemetryShape} from "../telemetry";

type TelemetrySerializable = [string, [number, any][]][];

const serialize = (value: TelemetryShape): TelemetrySerializable =>
    Array.from(value.entries());
const deserialize = (value: TelemetrySerializable): TelemetryShape =>
    new Map(value);

const isTelemetryChunk = isTuple(isNumber, isAny);
const isTelemetryChunkSeries = isArrayOf(isTelemetryChunk);
const isTelemetryShape = isArrayOf(isTuple(isString, isTelemetryChunkSeries));

export const useTelemetryStorage = () => {
    const [state, setState] = useStateLocal<TelemetrySerializable>(
        "tlm",
        serialize(TelemetryHandle.defaults()),
        isTelemetryShape,
    );

    const onChange = React.useCallback((value: TelemetryShape) => {
        const serializable = Array.from(value.entries());
        setState(serializable);
    }, []);

    React.useEffect(() => {
        TelemetryHandle.initialize(deserialize(state));
        TelemetryHandle.subscribe(onChange);
        return () => {
            TelemetryHandle.unsubscribe(onChange);
        };
    }, []);
};
