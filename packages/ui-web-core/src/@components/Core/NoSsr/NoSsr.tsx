import * as React from "react";

type Props = {
    children: React.ReactNode;
};

export const NoSsr = React.memo<Props>((props) => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return <>{props.children}</>;
});
