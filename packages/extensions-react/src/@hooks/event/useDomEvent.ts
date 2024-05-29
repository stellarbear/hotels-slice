import * as React from "react";

export const useDomEvent = <K extends keyof HTMLElementEventMap>(
    ref: React.MutableRefObject<HTMLDivElement | null>,
    key: K,
    listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any,
    options?: AddEventListenerOptions,
) => {
    React.useEffect(() => {
        ref.current?.addEventListener(key, listener, options);

        return () => {
            ref.current?.removeEventListener(key, listener);
        };
    }, [listener]);
};
