import * as React from "react";
import {WizardContext} from "./Context";

type Props<T extends Store = {}> = {
    children: React.ReactNode;
    steps?: boolean;

    state?: T;
};

type Store = Record<string, any>;

export const Handle = <T extends Store = {}>(props: Props<T>) => {
    const {children, state = {} as T} = props;
    const options = React.useMemo(() => (
        React.Children.toArray(children)
    ), [children]);

    const [current, setCurrent] = React.useState<number>(0);
    const [localStore, setLocalStore] = React.useState<T>(state);

    const onNext = React.useCallback((index?: number) => {
        setCurrent((prev) => Math.min(options.length - 1, index ?? prev + 1));
    }, []);

    const onPrev = React.useCallback(() => {
        setCurrent((prev) => Math.max(0, prev - 1));
    }, []);

    const context = React.useMemo(() => (
        {
            count: options.length,
            onNext, onPrev,
            current,
            store: localStore,
            setStore: setLocalStore,
        }
    ), [options, onNext, onPrev, current, localStore, setLocalStore]);

    return (
        <WizardContext.Provider value={context as any}>
            {options[current] ?? null}
        </WizardContext.Provider>
    );
};
