import {Controller, ExtensionsForm, FieldValues, Path, useWatch} from "@app/extensions-form";
import {isDefined} from "@app/extensions-guard";
import {ControllerDate} from "@app/ui-web-controls";
import {Section} from "@app/ui-web-core";
import {Typo} from "@app/ui-web-kit";
import * as React from "react";
import {FilterTemplate} from "./FilterTemplate";

type Props<T extends FieldValues> = {
    form: ExtensionsForm.Result<T>;
    name: Path<T>;
    label?: string;
    reset?: unknown;
};

export const FilterByDate = <T extends FieldValues>(props: Props<T>) => {
    const {form, label = "Период", name, reset = null} = props;

    const data = useWatch({control: form.control});
    const value = data[name];
    const filled = isDefined(value);

    const onReset = React.useCallback(() => form.setValue(name, reset as any), []);

    return (
        <FilterTemplate
            label={label}
            filled={filled}
            onReset={onReset}>
            <Section>
                <Typo.Label>Дата</Typo.Label>
                <Controller
                    control={form.control}
                    name={name}
                    rules={{
                        validate: form.op.validate(
                            form.op.validators.required,
                        ),
                    }}
                    render={({field: {value, onChange}}) => (
                        <ControllerDate
                            as="date"
                            value={value}
                            onChange={onChange}
                        />
                    )} />
            </Section>
        </FilterTemplate>
    );
};

