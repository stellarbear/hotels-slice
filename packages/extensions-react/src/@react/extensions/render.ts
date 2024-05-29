import React from "react";
import {createRoot, hydrateRoot} from "react-dom/client";
import {getDomNode} from "./getDomNode";

export const render = (element: React.ReactElement) => {
    const node = getDomNode();

    if (node.hasChildNodes()) {
        // console.log("SSR");
        return hydrateRoot(node, element);
    } else {
        // console.log("CSR");
        return createRoot(node).render(element);
    }
};
