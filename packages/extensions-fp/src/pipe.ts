type FN<A, T> = (result: A) => T;
const isPromise = (src: any): src is Promise<any> => {
  return src && typeof src.then === "function";
};

type PipeResult<T extends any[], Last> = T extends [infer F, ...infer L]
  ? F extends Promise<any>
    ? Promise<Awaited<Last>>
    : PipeResult<L, Last>
  : Awaited<Last>;

export function pipe<A>(a: A): PipeResult<[A], A>;
export function pipe<A, B>(a: A, ab: (a: Awaited<A>) => B): PipeResult<[A, B], B>;
export function pipe<A, B, C>(
  a: A,
  ab: (a: Awaited<A>) => B,
  bc: (b: Awaited<B>) => C
): PipeResult<[A, B, C], C>;
export function pipe<A, B, C, D>(
  a: A,
  ab: (a: Awaited<A>) => B,
  bc: (b: Awaited<B>) => C,
  cd: (c: Awaited<C>) => D
): PipeResult<[A, B, C, D], D>;
export function pipe<A, B, C, D, E>(
  a: A,
  ab: (a: Awaited<A>) => B,
  bc: (b: Awaited<B>) => C,
  cd: (c: Awaited<C>) => D,
  de: (d: Awaited<D>) => E
): PipeResult<[A, B, C, D, E], E>;

export function pipe(a: any, ...fns: FN<any, any>[]): Promise<any> {
  let result = a;
  for (const fn of fns) {
    if (isPromise(result)) {
      result = result.then(fn);
    } else {
      result = fn(result);
    }
  }

  return result;
}
