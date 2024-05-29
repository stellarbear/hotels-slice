import * as React from "react";

type Store = Record<string, any>;

type WizardContext<T extends Store> = {
    count: number;
    current: number;

    onNext: (index?: number) => void;
    onPrev: () => void;

    store: T;
    setStore: React.Dispatch<React.SetStateAction<T>>;
};

export const WizardContextFn = <T extends Store>() => React.createContext({} as WizardContext<T>);
export const WizardContext = WizardContextFn();

export const useWizard = <T extends Store>() => React.useContext(WizardContext) as WizardContext<T>;
