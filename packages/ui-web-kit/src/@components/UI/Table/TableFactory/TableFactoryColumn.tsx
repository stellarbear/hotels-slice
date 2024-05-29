import * as React from "react";

type TableFactoryColumnPropsBase<T> = {
    title?: React.ReactNode;
    onClick?: (entry: T) => void;

    align?: "center" | "left" | "right";
};

export type TableFactoryColumnPropsChildren<T> = TableFactoryColumnPropsBase<T> & {
    children: (entry: T, index: number) => React.ReactNode;
};

export type TableFactoryColumnPropsKey<T> = TableFactoryColumnPropsBase<T> & {
    name: keyof T;
};

export type TableFactoryColumnProps<T> = 
    | TableFactoryColumnPropsChildren<T>
    | TableFactoryColumnPropsKey<T>;


export const TableFactoryColumn = <T, >(props: TableFactoryColumnProps<T>) => {
    const {} = props;

    return null;
};
