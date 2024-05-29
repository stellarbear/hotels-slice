import * as React from "react";

export const useStateMemo = <T>(defaultValue: T) => {
    const [state, setState] = React.useState<T>(defaultValue);
    const hashRef = React.useRef<Record<string, T>>({});

    const hashKey = React.useCallback((key: any) =>
        JSON.stringify(key), []);

    const updateState = React.useCallback((update: T, key: any) => {
        hashRef.current[hashKey(key)] = update;
        setState(update);
    }, []);

    const memoState = React.useCallback((key: any) => {
        const hash = hashKey(key);

        if (hash in hashRef.current) {
            setState(hashRef.current[hash]);
            return true;
        } else {
            return false;
        }

    }, []);

    return [state, updateState, memoState] as const;
};
