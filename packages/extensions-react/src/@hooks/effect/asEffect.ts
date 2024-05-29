import * as React from "react";

const isDefined = <T>(src: T | null | undefined): src is T => 
    src !== null && src !== undefined;

export const asEffect = <T, >(
    data: T | null | undefined, 
    cb: (e: T) => void, 
    validate: (e: T) => boolean | undefined = Boolean,
) => {
    React.useEffect(() => {
        if (isDefined(data) && validate(data)) {
            cb(data);
        }
    }, [data]);
};
