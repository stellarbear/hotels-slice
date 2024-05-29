export const omitTypename = <T,>(src: T) => {
    const copy = JSON.parse(JSON.stringify(src));

    const result = {ref: copy};
    parse(result);

    return result.ref;
};

const parse = <T extends Record<string, any>>(src: T) => {
    delete src.__typename;

    for (const key in src) {
        if (typeof src[key] === "object" && src[key] !== null) {
            parse(src[key]);
        }
    }
};
