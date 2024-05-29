
/* eslint-disable max-len */
export function omit<T, K1 extends keyof T>(src: T, key1: K1): Omit<T, K1>;
export function omit<T, K1 extends keyof T, K2 extends keyof T>(src: T, key1: K1, key2: K2): Omit<T, K1 | K2>;
export function omit<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3): Omit<T, K1 | K2 | K3>;
export function omit<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4): Omit<T, K1 | K2 | K3 | K4>;
export function omit<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5): Omit<T, K1 | K2 | K3 | K4 | K5>;
export function omit<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5, key6: K6): Omit<T, K1 | K2 | K3 | K4 | K5 | K6>;
export function omit<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T, K7 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5, key6: K6, key7: K7): Omit<T, K1 | K2 | K3 | K4 | K5 | K6 | K7>;
export function omit<T, K1 extends keyof T, K2 extends keyof T, K3 extends keyof T, K4 extends keyof T, K5 extends keyof T, K6 extends keyof T, K7 extends keyof T, K8 extends keyof T>(src: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5, key6: K6, key7: K7, key8: K8): Omit<T, K1 | K2 | K3 | K4 | K5 | K6 | K7 | K8>;
export function omit<T, K extends keyof T>(src: T, ...keys: K[]): Omit<T, K> {
    const result = {...src};
    keys.forEach(key => delete result[key]);
    return result;
}
