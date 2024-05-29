import * as React from "react";

export const useStateEffect = <T>(defaultValue: T, deps: any[]) => {
    const [state, setState] = React.useState<T>(defaultValue);

    React.useEffect(() => {
        setState(defaultValue);
    }, deps);

    return [state, setState] as const;
};
