import * as React from "react";

type MountCallback = () => void;

export const useMount = (callback?: MountCallback) => {
    const [mounted, setMounted] = React.useState(false);

    React.useLayoutEffect(() => {
        if (!mounted) {
            callback?.();
        }
    }, [mounted, callback]);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return mounted;
};
