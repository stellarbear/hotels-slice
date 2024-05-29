//  [arg1, arg2, ..., argN] -> [arg1], [arg1, arg2], ... [arg1, arg2, ..., argN]
type Variants<Src extends any[], Acc extends any[] = [], Path extends any[] = []> = Src extends [
    infer First,
    ...infer Last
  ]
    ? Variants<Last, [...Acc, [...Path, First]], [...Path, First]>
    : Acc[number];
  
  type InferTail<
    Src extends any[],
    Dst extends any[],
    Result extends any[] = []
  > = Src["length"] extends Dst["length"]
    ? Result
    : Src extends [...infer First, infer Last]
    ? InferTail<First, Dst, [Last, ...Result]>
    : never;
  
  type Curried<Args extends any[], Result> = <Provided extends Variants<Args>>(
    ...args: Provided
  ) => Provided["length"] extends Args["length"]
    ? Result
    : (...rest: InferTail<Args, Provided>) => Result;
  
  export function curry<Args extends any[], Result>(
    fn: (...args: Args) => Result,
  ): Curried<Args, Result> {
    const local = fn as any;
    return (...args: any[]) => {
      if (args.length >= fn.length) {
        return local(...args);
      } else {
        return (...rest: any) => local(...args, ...rest);
      }
    };
  }