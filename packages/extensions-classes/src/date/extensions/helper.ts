export const isDate = (src: any): src is Date => typeof src?.getMonth === "function";
export const isValid = (src: Date) => src.getTime() === src.getTime();

