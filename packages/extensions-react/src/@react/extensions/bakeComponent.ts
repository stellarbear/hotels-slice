import React from "react";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export const bakeComponent = <T extends React.ElementType, const K extends Partial<React.ComponentPropsWithoutRef<T>>>
    (element: T, props: K) =>
    (rest: PartialBy<React.ComponentPropsWithoutRef<T>, keyof K>) =>
        React.createElement(element, {...props, ...rest});

