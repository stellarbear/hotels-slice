import React from "react";
import {isValidElement} from "./validElement";

export const pickChildren = <T,>(type: React.ElementType<T>) => (children: React.ReactNode) => {
    const result: T[] = [];

    for (const child of React.Children.toArray(children)) {
        if (isValidElement(child, type)) {
            result.push(child.props);
        }
    }

    return result;
};
