import React from "react";
import {useSearchParams} from "react-router-dom";
import {AMapper, Mapper, MapperInfer, mappers} from "./mappers";

type Optional<T> = {[K in keyof T]?: T[K] | null | undefined};
const isNull = (src: any): src is null => src === null;
const isUndefined = (src: any): src is undefined => src === undefined;
const isDefined = <T>(src: T | null | undefined): src is T => !(isNull(src) || isUndefined(src));

const parseDefaults = <T extends Record<string, AMapper<any>>>(src: T) => {
    const result = {} as Record<string, string>;
    for (const key in src) {
        const mapper = src[key];
        if (!isNull(mapper._value)) {
            result[key] = mapper.serialize(mapper._value);
        }
    }

    return result;
};

// //  Type is set explicitly
// export function useQueryParams<T>(
//     configuration: (mapper: Mapper) => T
// ): [T, (input: Optional<T>) => void];
// //  Type is inferred
// export function useQueryParams<T extends Record<string, AMapper<any>>>(
//     configuration: (mapper: Mapper) => T
// ): [MapperInfer<T>, (input: Optional<MapperInfer<T>>) => void];
export function useQueryParams<T extends Record<string, AMapper<any>>>(
    configuration: (mapper: Mapper) => T,
) {
    const [defaults] = React.useState(() => configuration(mappers));
    const [keys] = React.useState(() => Object.keys(defaults));
    const [values] = React.useState(() => parseDefaults(defaults));
    const [params, setSearchParams] = useSearchParams(values);

    const state = React.useMemo(() => {
        return keys.reduce((acc, key) => {
            const result = acc as Record<string, any>;
            const value = params.get(key);

            if (!isNull(value)) {
                const mapper = defaults[key];
                result[key] = mapper.deserialize(value);
            }

            return result as MapperInfer<T>;
        }, {} as MapperInfer<T>);
    }, [params]);

    const setState = React.useCallback(
        (input: Optional<MapperInfer<T>>) => {
            const previous = Object.fromEntries(params.entries());

            const update = {...previous};
            for (const key of keys) {
                if (key in input && isDefined(input[key])) {
                    const mapper = defaults[key];
                    update[key] = mapper.serialize(input[key]);
                } else {
                    params.delete(key);
                    delete update[key];
                }
            }

            setSearchParams(update, {replace: true});
        },
        [params, setSearchParams],
    );

    return [state, setState] as const;
}
