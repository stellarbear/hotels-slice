import {ExtensionsReact} from "@app/extensions-react";
import * as React from "react";
import * as ReactDom from "react-dom";

type Props = {
    prefix: string;
    children: React.ReactNode;
};

export const Portal = React.memo<Props>((props) => {
    const {prefix, children} = props;

    const id = React.useId();
    const node = React.useRef(`${prefix}-${id}`);

    React.useEffect(() => () => {
        const element = document.getElementById(node.current);
        element?.remove();
    }, []);

    const noPropagate = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        e.stopPropagation(), []);

    return (
        ReactDom.createPortal(
            <div onClick={noPropagate}>
                {children}
            </div>,
            ExtensionsReact.getDomNode(node.current),
        )
    );
});
