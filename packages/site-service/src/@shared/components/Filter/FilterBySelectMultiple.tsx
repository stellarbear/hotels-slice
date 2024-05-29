import {ExtensionsArray} from "@app/extensions-classes";
import {ExtensionsForm, FieldValues, Path, useWatch} from "@app/extensions-form";
import {isDefined} from "@app/extensions-guard";
import {Checkbox, Dropdown} from "@app/ui-web-kit";
import * as React from "react";
import {FilterTemplate} from "./FilterTemplate";

type Props<T extends FieldValues, U> = {
    form: ExtensionsForm.Result<T>;
    name: Path<T>;

    label: string;
    items: U[];
    getId: (e: U) => string;
    getLabel: (e: U) => React.ReactNode;
};

export const FilterBySelectMultiple = <T extends FieldValues, U>(props: Props<T, U>) => {
    const {form, name, label, items, getId, getLabel} = props;

    const data = useWatch({control: form.control});
    const value = (data[name] ?? []) as any[];
    const filled = isDefined(value) && value.length > 0;

    const onChange = React.useCallback((entry: U) => () => {
        const update = ExtensionsArray.toggle(value, getId(entry));
        form.setValue(name, update as any);
    }, []);
    const onReset = React.useCallback(() => form.setValue(name, null as any), []);

    return (
        <FilterTemplate
            label={label}
            filled={filled}
            onReset={onReset}>
            {items.map((entry, index) => (
                <Dropdown.Item key={index}>
                    <Checkbox
                        key={index}
                        checked={value.includes(getId(entry))}
                        onChange={onChange(entry)}>
                        {getLabel(entry)}
                    </Checkbox>
                </Dropdown.Item>
            ))}
        </FilterTemplate>
    );
};

