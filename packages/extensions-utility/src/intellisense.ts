export type IntellisenseFix<T> = {[P in keyof T]: T[P]};

export type IntellisenseFixDeep<T> = T extends Record<string, any>
    ? T extends infer O ? {[K in keyof O]: IntellisenseFixDeep<O[K]>} : never
    : T;
