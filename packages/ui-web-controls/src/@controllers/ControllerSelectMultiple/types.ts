export type ControllerSelectMultiplePropsRender<T> = {
    entry: T;
    isActive: boolean;
    onClick: () => void;
    label: React.ReactNode;
};

export type ControllerSelectMultipleProps<T, V> = {
    value?: V[];
    onChange: (data: V[], entry?: T) => void;

    items: T[];
    unset?: string;
    limit?: number;
    getId: (e: T) => V;
    getLabel: (src: T) => React.ReactNode;

    // search?: (e: T, s: string) => boolean;
    disabled?: boolean;
    disabledSpecific?: (entry: T) => boolean;
};
