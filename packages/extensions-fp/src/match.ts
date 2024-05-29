const isObject = (src: any): src is Record<string, unknown> =>
  src !== null && typeof src === "object";
const isArray = (src: any): src is Array<unknown> => Array.isArray(src);
const isFunction = (src: any): src is (...args: any[]) => any => typeof src === "function";

const compare = {
  object: (value: any, input: any): boolean => {
    if (!isObject(input) || !isObject(value)) {
      return false;
    }

    for (const key in input) {
      if (!(key in value)) {
        return false;
      }

      const inputKey = input[key];
      const valueKey = value[key];

      if (isArray(valueKey)) {
        return compare.array(valueKey, inputKey);
      } else if (isObject(valueKey)) {
        return compare.object(valueKey, inputKey);
      } else {
        return compare.primitive(valueKey, inputKey);
      }
    }

    return true;
  },
  array: (value: any, input: any): boolean => {
    if (!isArray(value) || !isArray(input)) {
      return false;
    }

    if (value.length < input.length) {
      return false;
    }

    for (let i = 0; i < input.length; i++) {
      const inputEntry = input[i];
      const valueEntry = value[i];

      if (isArray(valueEntry)) {
        return compare.array(valueEntry, inputEntry);
      } else if (isObject(valueEntry)) {
        return compare.object(valueEntry, inputEntry);
      } else {
        return compare.primitive(valueEntry, inputEntry);
      }
    }

    return true;
  },
  primitive: (value: any, input: any): boolean => {
    if (isFunction(input)) {
      return input(value);
    } else {
      return value === input;
    }
  },
};

export class Match<T, R = any> {
  private readonly options: [any, (e: any) => R][] = [];
  private fallback = (_: T) => void 0 as R;

  private constructor(private readonly value: T) {}

  public static from<T, R = any>(value: T) {
    return new Match<T, R>(value);
  }

  //  TODO: extends might be a problem
  with<U1 extends T>(c1: U1, as: (e: MatchOutput<U1>) => R): Match<T, R>;
  with<U1 extends T, U2 extends T>(c1: U1, c2: U2, as: (e: MatchOutput<U1> | MatchOutput<U2>) => R): Match<T, R>;
  with<U1 extends T, U2 extends T, U3 extends T>(
    c1: U1,
    c2: U2,
    c3: U3,
    as: (e: MatchOutput<U1> | MatchOutput<U2> | MatchOutput<U3>) => R
  ): Match<T, R>;
  public with(...args: any[]) {
    const options = args.slice(0, -1);
    const as = args[args.length - 1];

    for (const option of options) {
      this.options.push([option, as]);
    }

    return this;
  }

  public otherwise(fallback: (e: T) => R) {
    this.fallback = fallback;

    return this;
  }

  public returnType<R>() {
    return this as any as Match<T, R>;
  }

  public compile() {
    for (const [option, as] of this.options) {
      if (compare.array(this.value, option)) {
        return as(this.value);
      } else if (compare.object(this.value, option)) {
        return as(this.value);
      } else if (compare.primitive(this.value, option)) {
        return as(this.value);
      }
    }

    return this.fallback(this.value);
  }
}

type Guard<T> = (src: any) => src is T;

// type MatchInput<T> = T extends {}
//   ? RecordGuardInput<T> & Record<string, unknown>
//   : T extends Array<infer R>
//   ? MatchInput<R>[]
//   : T;

type MatchOutput<T> = T extends Guard<infer R>
  ? R
  : T extends Record<string, any>
  ? { [K in keyof T]: MatchOutput<T[K]> }
  : T extends Array<infer R>
  ? MatchOutput<R>[]
  : T;
