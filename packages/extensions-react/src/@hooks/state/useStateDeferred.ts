import * as React from "react";
import {useTimer} from "../timer";

/**
 * @deprecated useTimer and useEffect instead
 */
export const useStateDeferred = <T>(delay: number, input: T) => {
    const timer = useTimer();
    const [stateCurrent, setStateCurrent] = React.useState<T>(input);
    const [stateDelayed, setStateDelayed] = React.useState<T>(input);

    const updateState = React.useCallback((val: T) => {
        timer.clear();
        setStateCurrent(val);

        timer.call(() => {
            setStateDelayed(val);
        }, delay);
    }, []);

    return [
        {current: stateCurrent, deffered: stateDelayed},
        updateState,
    ] as const;
};
