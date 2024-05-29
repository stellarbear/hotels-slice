export type Left<T> = {tag: "left"; value: T};
export type Right<T> = {tag: "right"; value: T};
export type Either<E, A> = Left<E> | Right<A>;

const ifLeft = <E, A>(input: Either<E, A>): input is Left<E> =>
    input.tag === "left";
const ifRight = <E, A>(input: Either<E, A>): input is Left<E> =>
    input.tag === "right";

const strip = (src: any) =>
    (ifLeft(src) || ifRight(src)) ? src.value : src;

const left = <E, A>(value: E): Either<E, A> =>
    ({tag: "left", value: strip(value)});
const right = <E, A>(value: A): Either<E, A> =>
    ({tag: "right", value: strip(value)});

const from = <E, A>(src: Either<E, A>) => ifLeft(src) ? left(src) : right(src);

const match = async <E, A>(
    input: Either<E, A>,
    onLeft: (src: E) => Promise<void>,
    onRight: (src: A) => Promise<void>,
) => {
    switch (input.tag) {
        case "left": return onLeft(input.value);
        case "right": return onRight(input.value);
    }
};

export const either = {
    left,
    right,
    match,
    from,

    ifLeft,
    ifRight,
};
