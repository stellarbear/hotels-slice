export function fromMap<K, V, R>(src: Map<K, V>, fn: (key: K, value: V) => R) {
    return Array.from(src.entries()).map(([k, v]) => fn(k, v));
}
