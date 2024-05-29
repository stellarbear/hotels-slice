export const getFileName = (src: string) => {
    const splitted = src.split(".");
    return splitted.slice(0, -1).join(".");
};
