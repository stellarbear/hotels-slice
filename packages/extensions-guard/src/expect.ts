import {Guard, isObject} from "./base";

export const expect = <T>(
    toBe: {
        [P in keyof T]: Guard<T[P]>
    },
) => (src: any): src is T => {
    if (!isObject(src)) {
        return false;
    }

    for (const key in toBe) {
        const validate = toBe[key];
        if (!validate(src[key])) {
            return false;
        }
    }

    return true;
};
