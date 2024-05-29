import * as React from "react";
import {useCallback} from "react";

const isFunction = (src: any): src is (...args: any[]) => any => typeof src === "function";
export type SerializeValues = Record<string, any> | string | number | boolean | null | undefined;

/* eslint-disable max-len */
export function useStateLocal<T extends SerializeValues>(key: string, defaultValue: T, validate?: (e: any) => e is T): [T, (input: T) => void];
export function useStateLocal<T extends SerializeValues>(key: string, defaultValue: () => T, validate?: (e: any) => e is T): [T, (input: T) => void];
export function useStateLocal<T extends SerializeValues>(key: string, defaultValue: any, validate?: (e: any) => e is T): [T, (input: T) => void] {
    const [state, setState] = React.useState<T>(() => {
        const applyDefault = () => isFunction(defaultValue) ? defaultValue() : defaultValue;

        if (typeof localStorage !== "undefined") {
            try {
                const stored = localStorage.getItem(key);
                const parsed = JSON.parse(stored ?? "");

                if (validate) {
                    const isValid = validate(parsed);
                    if (isValid) {
                        return parsed;
                    } else {
                        localStorage.removeItem(key);
                        return applyDefault();
                    }
                } else {
                    return parsed;
                }
            } catch {
                localStorage.removeItem(key);
            }
        }

        return applyDefault();
    });

    const updateState = useCallback((nextState: T) => {
        localStorage.setItem(key, JSON.stringify(nextState));
        setState(nextState);
    }, [key, state]);

    return [state, updateState];
}
