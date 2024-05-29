
/* eslint-disable max-len */
export function pick<T, K1 extends keyof T>(src: T, key1: K1): Pick<T, K1>;
export function pick<T, K1 extends keyof T, K2 extends keyof T>(src: T, key1: K1, key2: K2): Pick<T, K1 | K2>;
export function pick<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3): Pick<T, K1 | K2 | K3>;
export function pick<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4): Pick<T, K1 | K2 | K3 | K4>;
export function pick<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5): Pick<T, K1 | K2 | K3 | K4 | K5>;
export function pick<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5, key6: K6): Pick<T, K1 | K2 | K3 | K4 | K5 | K6>;
export function pick<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T, K7 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5, key6: K6, key7: K7): Pick<T, K1 | K2 | K3 | K4 | K5 | K6 | K7>;
export function pick<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T, K7 extends keyof T, K8 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5, key6: K6, key7: K7, key8: K8): Pick<T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8>;
export function pick<T, K extends keyof T>(src: T, ...keys: K[]): Pick<T, K> {
    return keys.reduce((acc, cur) => ({...acc, [cur]: src[cur]}), {} as Pick<T, K>);
}
