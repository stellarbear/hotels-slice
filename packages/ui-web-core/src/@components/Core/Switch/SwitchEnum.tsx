import * as React from "react";

type Props<T extends string> = {
    value: T;
    as: Record<`${T}`, React.ReactNode>;
    children?: React.ReactNode;
};

export const SwitchEnum = <T extends string>(props: Props<T>) => {
    const {value, as, children} = props;

    if (value in as) {
        return (
            <>{(as as any)[value]}</>
        );
    }

    return <>{children}</>;
};
