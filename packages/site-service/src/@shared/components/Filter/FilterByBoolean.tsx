import {ExtensionsForm, FieldValues, Path, useWatch} from "@app/extensions-form";
import {isBoolean} from "@app/extensions-guard";
import {Dropdown} from "@app/ui-web-kit";
import * as React from "react";
import {FilterTemplate} from "./FilterTemplate";

type Props<T extends FieldValues> = {
    form: ExtensionsForm.Result<T>;
    name: Path<T>;
    label: string;
    
    true: string;
    false: string;
    reset?: unknown;
};

export const FilterByBoolean = <T extends FieldValues>(props: Props<T>) => {
    const {form, name, true: onTrue, false: onFalse, reset = null, label} = props;

    const data = useWatch({control: form.control});
    const value = data[name];
    const filled = isBoolean(value);

    const onValue = React.useCallback((value: boolean) => () => form.setValue(name, value as any), []);
    const onReset = React.useCallback(() => form.setValue(name, reset as any), []);

    return (
        <FilterTemplate
            label={label}
            filled={filled}
            onReset={onReset}>
            <Dropdown.Item
                active={value === false}
                onClick={onValue(false)}
                closeOnClick>
                {onFalse}
            </Dropdown.Item>
            <Dropdown.Item
                active={value === true}
                onClick={onValue(true)}
                closeOnClick>
                {onTrue}
            </Dropdown.Item>
        </FilterTemplate>
    );
};

