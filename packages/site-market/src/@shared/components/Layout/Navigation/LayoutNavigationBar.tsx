import * as React from "react";
import { useLayoutNavigation } from "./LayoutNavigationContext";

type Props = {
    children: React.ReactNode;
};

export const LayoutNavigationBar = React.memo<Props>((props) => {
    const context = useLayoutNavigation();

    React.useEffect(() => {
        context.mount(props.children);
        return () => {
            context.unmount();
        };
    }, []);

    return null;
});
