import React from "react";

type Props = {
    active?: boolean;
    onClick: () => void;
};

export const useClickOutside = (props: Props) => {
    const {active, onClick} = props;

    const ref = React.useRef<HTMLDivElement | null>(null);
    const onClickRef = React.useRef(onClick);

    const handleClickOutside = React.useCallback((event: MouseEvent) => {
        if (active && !ref.current?.contains(event.target as Node)) {
            onClickRef.current();
            event.stopPropagation();
        }
    }, [onClickRef, ref, active]);

    React.useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    return ref;
};
