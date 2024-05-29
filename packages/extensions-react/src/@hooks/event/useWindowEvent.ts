import * as React from "react";

export const useWindowEvent = <K extends keyof WindowEventMap>(
    key: K,
    listener: (this: Window, ev: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
) => {
    React.useEffect(() => {
        window.addEventListener(key, listener, options);

        return () => {
            window.removeEventListener(key, listener);
        };
    }, [listener]);
};
