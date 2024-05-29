const isFunction = (src: any): src is (...args: any[]) => any => typeof src === "function";
const isPromise = (src: any): src is Promise<any> => {
  return src && typeof src.then === "function";
};

export function flowBranch<T, True, False>(
  when: (e: T) => boolean,
  onTrue: (e: T) => True,
  onFalse?: (e: T) => False,
) {
  return (e: T) => {
    if (when(e)) {
      return onTrue(e);
    } else {
      return isFunction(onFalse) ? onFalse(e) : e;
    }
  };
}

type FlowResult<T extends any[], Last> = T extends [infer F, ...infer L]
  ? F extends Promise<any>
    ? Promise<Awaited<Last>>
    : FlowResult<L, Last>
  : Awaited<Last>;

export function flow<A extends ReadonlyArray<unknown>, B>(
  ab: (...a: A) => B
): (...a: A) => FlowResult<[B], B>;
export function flow<A extends ReadonlyArray<unknown>, B, C>(
  ab: (...a: A) => B,
  bc: (b: Awaited<B>) => C
): (...a: A) => FlowResult<[B, C], C>;
export function flow<A extends ReadonlyArray<unknown>, B, C, D>(
  ab: (...a: A) => B,
  bc: (b: Awaited<B>) => C,
  cd: (c: Awaited<C>) => D
): (...a: A) => FlowResult<[B, C, D], D>;
export function flow<A extends ReadonlyArray<unknown>, B, C, D, E>(
  ab: (...a: A) => B,
  bc: (b: Awaited<B>) => C,
  cd: (c: Awaited<C>) => D,
  de: (d: Awaited<D>) => E
): (...a: A) => FlowResult<[B, C, D, E], E>;
export function flow(...fns: ((input: any) => any)[]): any {
  return (result: any) => {
    for (const fn of fns) {
      if (isPromise(result)) {
        result = result.then(fn);
      } else {
        result = fn(result);
      }
    }

    return result;
  };
}
