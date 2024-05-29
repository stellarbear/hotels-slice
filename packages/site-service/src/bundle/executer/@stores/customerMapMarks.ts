import create from "zustand";

type Store = {
    showBookmarks: boolean;

    toggleShowBookmarks: () => void;
};

export const useStoreCustomerMapMarks = create<Store>((set, get) => ({
    showBookmarks: false,

    toggleShowBookmarks: () => set({showBookmarks: !get().showBookmarks}),
}));
