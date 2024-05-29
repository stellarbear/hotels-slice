const isDefined = <T>(src: T | null | undefined): src is T => 
    src !== null && src !== undefined;

export type Some<T> = {tag: "some"; value: T};
export type None = {tag: "none"};
export type Option<T> = None | Some<T>;

const none = (): None => ({tag: "none"});
const some = <T,>(value: T): Some<T> => ({tag: "some", value});

const from = <T>(value: T | null | undefined): Option<T> =>
    isDefined(value)
        ? some(value)
        : none();

const match = <T,N,S>(onNone: () => N, onSome: (e: T) => S) => (src: Option<T>) => 
    src.tag === "none"
        ? onNone()
        : onSome(src.value);

export const option = {
    some,
    match,
    none, 
    from,
};
