import {isString} from "@app/extensions-guard";

export const pad = (length: number) => (value: number | string) => {
    if (isString(value)) {
        return value;
    }
    
    const str = String(value);
    return "0".repeat(length - str.length) + str;
};
