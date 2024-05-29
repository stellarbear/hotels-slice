import React from "react";

export const isValidElement = <T,>(child: any, type: React.ElementType<T>): child is React.ReactElement<T> =>
    React.isValidElement(child) && child.type === type;

