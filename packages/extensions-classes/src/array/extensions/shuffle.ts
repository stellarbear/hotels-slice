const replace = (array: any, from: number, to: number) => {
    const temp = array[from];
    array[from] = array[to];
    array[to] = temp;
};

export const shuffle = <T>(array: T[]) => {
    const result = [...array];

    for (let i = 0; i < result.length; i++) {
        replace(result, i, Math.floor(Math.random() * result.length));
    }

    return result;
};
