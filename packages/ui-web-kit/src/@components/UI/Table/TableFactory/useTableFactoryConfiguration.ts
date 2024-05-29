import * as React from "react";
import {TableFactoryColumn} from "./TableFactoryColumn";

const isValidElement = <T,>(child: any, type: React.ElementType<T>): child is React.ReactElement<T> =>
    React.isValidElement(child) && child.type === type;

type Props = React.ComponentProps<typeof TableFactoryColumn>;

export const useTableFactoryConfiguration = (children: React.ReactNode) => {
    const result = [] as Props[];

    for (const child of React.Children.toArray(children)) {
        if (isValidElement(child, TableFactoryColumn)) {
            result.push(child.props);
        }
    }

    return result;
};
