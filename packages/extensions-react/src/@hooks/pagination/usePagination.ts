import React from "react";

type PaginationInput = {
    defaults?: PaginationState;
    onChange?: (state: PaginationState) => void;
};

export type PaginationState = {
    first?: number | null;
    offset?: number | null;
};

export const usePagination = (input: PaginationInput) => {
    const {defaults, onChange} = input;
    const [total, setTotal] = React.useState(0);
    const [first, _] = React.useState(() => Math.max(1, (defaults?.first ?? 10)));
    const [offset, setOffset] = React.useState(() => Math.max(0, (defaults?.offset ?? 0)));

    const paginationState = React.useMemo(() =>
        ({offset, first}),
        [offset, first]);

    React.useEffect(() => {
        onChange?.(paginationState);
    }, [paginationState]);

    const navigate = React.useCallback((page: number) => {
        setOffset((page - 1) * first);
    }, [first]);

    const register = React.useCallback((value?: number) => {
        React.useEffect(() => {
            if (value !== undefined) {
                setTotal(value);
            }
        }, [value]);
    }, []);

    const reset = React.useCallback(() => {
        setOffset(0);
    }, []);

    const pagination = React.useMemo(() => ({
        state: paginationState,

        navigate,
        register,
        reset,

        page: Math.floor(paginationState.offset / paginationState.first) + 1,
        total: Math.ceil(total / paginationState.first),
    }), [navigate, reset, register, paginationState, total]);

    return pagination;
};
