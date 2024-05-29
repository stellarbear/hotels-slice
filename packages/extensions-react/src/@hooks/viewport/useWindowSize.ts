import * as React from "react";
import {useTimer} from "../timer";

export type Size = "xs" | "sm" | "md" | "lg";

export const sizes: Record<Size, number> = {
    "xs": 576,
    "sm": 768,
    "md": 992,
    "lg": 1200,
};

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = React.useState({
        width: 0,
        height: 0,
    });

    const timer = useTimer(100);

    React.useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        const handleResize = () => {
            timer.clear();

            timer.call(() => (
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            ));
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const dimensions = React.useMemo(() => `${windowSize.width}x${windowSize.height}`, [windowSize]);

    const result = React.useMemo(() => ({
        window: windowSize,
        dimensions,
        type: windowSize.width > 0 ? "client" : "server",
    }), [dimensions]);

    return result;
};
