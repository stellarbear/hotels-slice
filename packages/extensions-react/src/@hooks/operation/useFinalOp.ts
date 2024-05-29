import {useCallback, useState} from "react";

export function useFinalOp<T, A extends any[]>(fn: (...args: A) => Promise<T>, deps: any[] = []) {
    const [state, setState] = useState(false);
    const callback = useCallback(
        async (...args: A) => {
            setState(true);
            return fn(...args)
                .catch((error) => {
                    setState(false);
                    throw error;
                });
        },
        deps,
    );

    return [callback, !state] as const;
}
