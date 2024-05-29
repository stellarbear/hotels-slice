import {useCallback, useState} from "react";

//  TODO: remove deps
export function useAsyncOp<T, A extends any[]>(fn: (...args: A) => T, deps: any[] = []) {
    const [state, setState] = useState(false);
    const callback = useCallback(
        async (...args: A) => {
            setState(true);
            return Promise.resolve(fn(...args)).finally(() => setState(false));
        },
        [state, ...deps],
    );

    return [callback, !state] as const;
}
