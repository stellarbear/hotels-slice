import {ExtensionsArray} from "@app/extensions-classes";
import {ExtensionsForm, FieldValues, Path, useWatch} from "@app/extensions-form";
import {isDefined} from "@app/extensions-guard";
import {Dropdown} from "@app/ui-web-kit";
import * as React from "react";
import {FilterTemplate} from "./FilterTemplate";

type Props<T extends FieldValues, U> = {
    form: ExtensionsForm.Result<T>;
    name: Path<T>;

    label: string;
    items: U[];

    getId: (e: U) => string;
    getLabel: (e: U) => React.ReactNode;
    reset?: unknown;
};

export const FilterBySelect = <T extends FieldValues, U>(props: Props<T, U>) => {
    const {form, name, reset = null, label, items, getId, getLabel} = props;

    const data = useWatch({control: form.control});
    const value = data[name] as any;
    const filled = isDefined(value);

    const dict = React.useMemo(() => ExtensionsArray.toRecord(items, e => getId(e), e => getLabel(e)), []);

    const onValue = React.useCallback((value: U) => () => form.setValue(name, getId(value) as any), []);
    const onReset = React.useCallback(() => form.setValue(name, reset as any), []);

    return (
        <FilterTemplate
            label={(value in dict)
                ? dict[value]
                : label}
            filled={filled}
            onReset={onReset}>
            {items.map((entry, index) => (
                <Dropdown.Item
                    key={index}
                    active={value === getId(entry)}
                    onClick={onValue(entry)}>
                    {getLabel(entry)}
                </Dropdown.Item>
            ))}
        </FilterTemplate>
    );
};

