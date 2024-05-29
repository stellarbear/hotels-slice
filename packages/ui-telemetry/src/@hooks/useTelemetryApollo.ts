import {QueryManager} from "@apollo/client/core/QueryManager";
import * as React from "react";
import {TelemetryHandle} from "../telemetry";

const format = (as: string, args: any) => ({
    as, args,
});

const definedApolloNames = new Set(["kind", "definitions", "loc"]);
const pickApolloName = (args: Record<string, any>) => 
    Object.keys(args).filter(a => !definedApolloNames.has(a))[0];

export const useTelemetryApollo = (count: number) => {
    const refQueryFn = React.useRef(QueryManager.prototype.query);
    const refMutateFn = React.useRef(QueryManager.prototype.mutate);

    React.useEffect(() => {
        QueryManager.prototype.query = new Proxy(
            refQueryFn.current, {
            apply: async function (target, thisArg, args) {
                const query = pickApolloName(args[0]?.query) ?? "unknown";
                const variables = args[0]?.variables ?? {};

                try {
                    const result = await Reflect.apply(target, thisArg, args);
                    TelemetryHandle.register("apollo", format("query-ok", {query, variables}), count);
                    return result;
                } catch (error) {
                    TelemetryHandle.register("apollo", format("query-error", {query, variables, error}), count);
                    throw error;
                }
            },
        });

        QueryManager.prototype.mutate = new Proxy(
            refMutateFn.current, {
            apply: async function (target, thisArg, args) {
                const mutation = pickApolloName(args[0]?.mutation) ?? "unknown";
                const variables = args[0]?.variables ?? {};

                try {
                    const result = await Reflect.apply(target, thisArg, args);
                    TelemetryHandle.register("apollo", format("mutation-ok", {mutation, variables}), count);
                    return result;
                } catch (error) {
                    TelemetryHandle.register("apollo", format("mutation-error", {mutation, variables, error}), count);
                    throw error;
                }
            },
        });

        return () => {
            QueryManager.prototype.query = refQueryFn.current;
            QueryManager.prototype.mutate = refMutateFn.current;
        };
    }, []);
};
