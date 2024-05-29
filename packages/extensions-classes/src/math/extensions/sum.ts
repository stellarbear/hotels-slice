export const sum = (...input: number[]) => {
    let result = 0;

    for (const entry of input) {
        result += entry;
    }

    return result;
};
