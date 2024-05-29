import React from "react";

export const usePaginationOptions = (current: number, total: number) => {
    const options = React.useMemo(() =>
        getPaginationOptions(current, Math.max(current, total)), [current, total]);

    return options;
};

const getPaginationOptions = (current: number, total: number) => {
    if (total < 2) {
        return [];
    }

    if (total < 6) {
        return Array.from(Array(total), (_, i) => i + 1);
    }

    if (current < 4) {
        return [
            ...Array.from(Array(4), (_, i) => i + 1),
            null,
            total,
        ];
    }

    if (total - current < 3) {
        return [
            1,
            null,
            ...Array.from(Array(4), (_, i) => total - 3 + i),
        ];
    }

    return [
        1,
        null,
        ...Array.from(Array(3), (_, i) => current - 1 + i),
        null,
        total,
    ];
};
