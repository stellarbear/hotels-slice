import create from "zustand";

type Store = {
    count: number;

    init: (value?: number) => void;
    modify: (delta: number) => void;
    reset: () => void;
};

export const useStoreNotifications = create<Store>((set, get) => ({
    count: 0,

    init: (value) =>
        set({count: value ?? 0}),

    modify: (delta) =>
        set({count: get().count + delta}),

    reset: () =>
        set({count: 0}),
}));
