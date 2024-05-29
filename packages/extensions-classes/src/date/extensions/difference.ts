import {isValid} from "./helper";

export const difference = (src1: any, src2: any) => {
    if (!src1 || !src2) {
        return null;
    }

    const date1 = new Date(src1);
    const date2 = new Date(src2);

    if (!isValid(date1) || !isValid(date2)) {
        return null;
    }

    const base = new Date(0);
    base.setHours(0);

    return +base + Math.abs(+date1 - +date2);
};
