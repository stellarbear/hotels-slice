import {isFunction} from "@app/extensions-guard";
import * as React from "react";
import {DictionaryUI} from "./styles";

type ShapeFn<T> = (v: T) => React.ReactNode;

type Shape<T> = keyof T | ShapeFn<T>;

const isShapeFn = <T,>(src: Shape<T>): src is ShapeFn<T> => isFunction(src);
const getValue = <T,>(data: T) => (value: Shape<T>) => isShapeFn(value) ? value(data) : data[value];


type Props<K extends string, T> = {
    object?: T;
    as: Record<K, Shape<T>>;

    renderKey?: (key: K) => React.ReactNode;
};

export const Dictionary = <K extends string, T>(props: Props<K, T>) => {
    const {object, as, renderKey = (e) => <span>{e}</span>} = props;

    const keys = React.useMemo(() => Object.keys(as), []);

    return (
        <>
            {keys.map((key: any, index) => (
                <div key={index}>
                    <DictionaryUI.DictionaryKey>
                        {renderKey(key)}
                    </DictionaryUI.DictionaryKey>
                    <DictionaryUI.DictionaryValue>
                        <>{getValue(object)((as as any)[key]) || "-"}</>
                    </DictionaryUI.DictionaryValue>
                </div>
            ))}
        </>
    );
};
