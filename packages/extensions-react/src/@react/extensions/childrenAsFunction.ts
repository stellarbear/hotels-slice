const isFunction = (src: any): src is (...args: any[]) => any => typeof src === "function";

export type ChildrenAsFunction<T> = React.ReactNode | ((e: T) => React.ReactNode);
export const childrenAsFunction = <T,>(value: T, child?: ChildrenAsFunction<T>) =>
    child && (
        isFunction(child) ? child(value) : child
    );
