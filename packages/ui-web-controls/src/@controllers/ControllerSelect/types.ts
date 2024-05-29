export type ControllerSelectPropsRender<T> = {
    entry: T;
    isActive: boolean;
    onClick: () => void;
    label: React.ReactNode;
};

export type ControllerSelectProps<T, V> = {
    value?: V | null;
    onChange: (data: V | null, entry?: T | null) => void;

    items: T[];
    unset?: string;
    getId: (e: T) => V;
    getLabel: (src: T) => React.ReactNode;

    search?: (e: T, s: string) => boolean;
    disabled?: boolean;
    disabledSpecific?: (entry: T) => boolean;
};
