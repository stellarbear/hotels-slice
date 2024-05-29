import React from "react";

export const contextToProps = <T extends {}>(context: () => T, component: React.FunctionComponent<T>) => () => {
    const data = context();

    return React.createElement(component, data);
};
