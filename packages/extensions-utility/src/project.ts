export type Primitives = null | undefined | number | string | boolean | Date;

//  drop record key types by key (nested & array)
export type OmitRecordByKey<T extends {}, Replace extends string> = {
    [P in keyof Omit<T, Replace>]:
        T[P] extends Array<infer A extends {}>
            ? Array<OmitRecordByKey<A, Replace>>
            : T[P] extends Record<string, any>
                ? OmitRecordByKey<T[P], Replace>
                : T[P]
};

//  swap record key types by key (nested & array)
export type ProjectRecordByKey<T extends Record<string, any>, Replace, With> = {
    [P in keyof T]:
    (P extends Replace
        ? (T[P] extends Array<any> ? With[] : With)
        : (T[P] extends Primitives
            ? T[P]
            : ProjectRecordByKey<T[P], Replace, With>))
};
