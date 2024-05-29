import * as React from "react";

export const useInterval = (defaultDelay?: number) => {
    const interval = React.useRef<NodeJS.Timer | null>(null);
    const delay = React.useRef(defaultDelay ?? 0);

    const clear = React.useCallback(() => {
        interval.current && clearInterval(interval.current);
    }, []);

    React.useEffect(() => clear, []);

    const call = React.useCallback((cb: () => void, defaultDelay?: number) => {
        clear();
        interval.current = setInterval(cb, defaultDelay ?? delay.current);
    }, []);

    return {call, clear} as const;
};
