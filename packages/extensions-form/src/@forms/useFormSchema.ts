import {isBoolean, isFunction, isString} from "@app/extensions-guard";
import * as React from "react";
import {DeepPartial, UseFormProps} from "react-hook-form";
import {Constraint, useForm} from "./useForm";

type PickKeysByType<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never
}[keyof T];

type MapInputByType<Input, Result> = ((data: Input) => Result);

type SchemaMapping<Output, Input> = {
    [P in keyof Required<Output>]: (
        P extends keyof Input
        ? MapInputByType<Input, Output[P]> | PickKeysByType<Input, Output[P]> | true
        : MapInputByType<Input, Output[P]> | PickKeysByType<Input, Output[P]>
    )
};

const convert = <T, U extends {}>(src: U, schema: SchemaMapping<T, U>): DeepPartial<T> => {
    const has = (key: any): key is keyof U => key in src;

    return (
        (Object.keys(schema) as ((keyof typeof schema)[]))
            .reduce((acc, cur) => {
                const value = schema[cur];
                const result = acc as any;

                if (has(cur) && isBoolean(value)) {
                    result[cur] = src[cur];
                } else if (isString(value)) {
                    result[cur] = src[schema[cur] as keyof U];
                } else if (isFunction(value)) {
                    result[cur] = value(src);
                }

                return acc;
            }, {} as DeepPartial<T>)
    );
};

export const useFormSchema = <U extends {}>(data?: U | null) =>
    <T extends Constraint>(schema: SchemaMapping<T, U>, props?: UseFormProps<T>) => {

        const converted = React.useMemo(() =>
            data
                ? ({...props, values: {...props?.values, ...convert(data, schema)}}) as UseFormProps<T>
                : {...props}, [JSON.stringify(data)]);

        return useForm<T>(converted);
    };
