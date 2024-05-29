import * as React from "react";

type EffectDeferredConfiguration = {
    callOnMount: boolean;
};

const defaultConfiguration: EffectDeferredConfiguration = {
    callOnMount: false,
};
/**
 * @deprecated useTimer and useEffect instead
 */
export const useEffectDeferred = (
    delay: number, 
    callback: () => void, 
    deps: any[], configuration = defaultConfiguration,
) => {
    const timer = React.useRef<NodeJS.Timeout | null>(null);
    const mounted = React.useRef(false);

    const clearTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    };

    React.useEffect(() => () => clearTimer(), []);

    React.useEffect(() => {
        if (!configuration.callOnMount && !mounted.current) {
            mounted.current = true;
            return;
        }

        clearTimer();

        timer.current = setTimeout(() => {
            callback();
        }, delay);
    }, deps);
};
