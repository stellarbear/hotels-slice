/**
 * @deprecated since version 2.0.0
 */
export function toArray<K extends PropertyKey, V, R>(src: Record<K, V>, fn: (key: K, value: V) => R) {
    const keys = Object.keys(src) as K[];
    return keys.map((key) => fn(key, src[key]));
}
