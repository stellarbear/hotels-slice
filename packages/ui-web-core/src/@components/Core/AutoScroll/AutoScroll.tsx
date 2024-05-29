import * as React from "react";
import {autoScrollClass} from "./data";
import {AutoScrollContent} from "./styles";

type Props = {
    to?: string;
    smooth?: boolean;
    children: React.ReactNode;
    deps?: any[];
};

export const AutoScroll = React.memo<Props>((props) => {
    const {children, smooth, to = autoScrollClass, deps = []} = props;
    const wrapper = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
        if (wrapper.current) {
            const target = wrapper.current.querySelector(`.${to}`) as HTMLElement;

            if (target) {
                wrapper.current.firstElementChild?.scrollTo({
                    top: target.offsetTop - 8,
                    left: target.offsetLeft - 8,
                    behavior: smooth ? "smooth" : "auto",
                });
            }
        }
    }, [JSON.stringify(deps)]);

    return (
        <AutoScrollContent ref={wrapper}>
            {children}
        </AutoScrollContent>
    );
});
