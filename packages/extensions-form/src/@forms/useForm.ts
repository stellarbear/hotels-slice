import * as React from "react";
import {
    FieldValues, Path, UseFormProps, UseFormReturn,
    useForm as useReactHookForm,
    get as useReactHookGet
} from "react-hook-form";
import { isFunction, isString } from "./guard";
import { validators } from "./validators";

export type ValidateFN = (v: any) => true | string;
export type Rule = ValidateFN | boolean | null | undefined;

export type Constraint = FieldValues;
export type Result<T extends Constraint> = UseFormReturn<T> & {
    op: {
        validators: typeof validators;
        validate: (...keys: Rule[]) => ValidateFN;
        color: (key: Path<T>) => "error" | "primary";
        error: (key: Path<T>) => string | undefined;
        effect: (key: Path<T>, cb: () => void) => void;
    };
};

export type FormProps<T extends Constraint> = UseFormProps<T> & {
    onChange?: (input: T) => any;
};

export function useForm<T extends Constraint>(
    props: FormProps<T>,
): Result<T> {
    const defaultValues = React.useMemo(() => props.defaultValues, []);
    const form = useReactHookForm<T>({ ...props, defaultValues });

    React.useEffect(() => {
        const subscription = form.watch((data) =>
            props.onChange?.(data as T));
        return () => subscription.unsubscribe();
    }, [form.watch, props.onChange]);

    const result = form as Result<T>;

    const error = React.useCallback((key: Path<T>) => {
        const result = useReactHookGet(form.formState.errors, key);

        if (result && ("message" in result)) {
            return result.message;
        } else {
            return undefined;
        }
    }, [form]);

    const color = React.useCallback((key: Path<T>) => {
        const result = error(key);

        return isString(result) ? "error" : "primary";
    }, [error]);

    const validate = React.useCallback((...options: Rule[]) => (v: any) =>
        options.filter(isFunction)
            .map(option => option(v))
            .filter(isString).join(", ") || true, []);

    const effect = React.useCallback((key: Path<T>, cb: () => void) => {
        const value = form.watch(key);

        React.useEffect(() => { cb(); }, [value]);
    }, []);

    const op = React.useMemo(() =>
        ({ error, color, validate, validators, effect }),
        [error, color, validate, validators, effect]);


    result.op = op;

    // React.memo breaks on form pass
    // https://github.com/react-hook-form/react-hook-form/blob/master/src/useFormContext.tsx
    // context is an alternative, but in nutshell it just reconstructs an object
    return { ...result } as const;
}
