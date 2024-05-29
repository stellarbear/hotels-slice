import {useWindowEvent} from "@app/extensions-react";
import * as React from "react";

type Props = {
    opened?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
};

export const ClickAway = React.memo<Props>((props) => {
    const {opened = true, onClick, children} = props;
    const wrapper = React.useRef<HTMLDivElement | null>(null);

    const handleClickOutside = React.useCallback((event: MouseEvent) => {
        if (opened && onClick && !wrapper.current?.contains(event.target as Node)) {
            onClick();
            event.stopPropagation();
        }
    }, [opened, onClick, wrapper]);

    useWindowEvent("click", handleClickOutside);

    return (
        <div ref={wrapper}>
            {children}
        </div>
    );
});
