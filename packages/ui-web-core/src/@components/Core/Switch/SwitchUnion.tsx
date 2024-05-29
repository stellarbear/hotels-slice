import * as React from "react";

type Props<T> = {
    value: T;
    as: UnionToTuple<T, React.ReactNode>;
    children?: React.ReactNode;
};

type UnionToIntersection<U> = (
    U extends never ? never : (arg: U) => never
) extends (arg: infer I) => void
    ? I
    : never;

type UnionToTuple<T, R> = UnionToIntersection<
    T extends never ? never : (t: T) => T
> extends (_: never) => infer W
    ? [...UnionToTuple<Exclude<T, W>, R>, [W, (e: W) => R]]
    : [];

export const SwitchUnion = <T,>(props: Props<T>) => {
    const {value, as, children = null} = props;

    const dict = React.useMemo(() => {
        const result = {} as Record<string, (input: any) => any>;

        for (const option of as) {
            const [key, apply] = option as any;
            result[JSON.stringify(key)] = apply;
        }

        return result;
    }, []);

    const search = JSON.stringify(value);

    if (search in dict) {
        return <>{dict[search](value)}</>;
    }

    return <>{children}</>;
};
