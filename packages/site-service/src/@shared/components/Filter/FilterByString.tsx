import {ExtensionsForm, FieldValues, Path, useWatch} from "@app/extensions-form";
import {useTimer} from "@app/extensions-react";
import {Section} from "@app/ui-web-core";
import {Input} from "@app/ui-web-kit";
import * as React from "react";
import {FilterTemplate} from "./FilterTemplate";

type Props<T extends FieldValues> = {
    form: ExtensionsForm.Result<T>;
    name: Path<T>;
    label: string;
};

export const FilterByString = <T extends FieldValues>(props: Props<T>) => {
    const {form, name, label} = props;

    const data = useWatch({control: form.control});
    const [value, setValue] = React.useState<string>(data[name] ?? "");
    React.useEffect(() => {setValue(data[name] ?? "");}, [data[name]]);

    const timer = useTimer(500);
    const onReset = React.useCallback(() => {
        timer.clear();
        form.setValue(name, null as any);
    }, []);
    const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        timer.clear();

        const value = event.target.value as any;
        setValue(value);
        timer.call(() => form.setValue(name, value));
    }, []);

    return (
        <FilterTemplate
            label={label}
            filled={value.length > 0}
            onReset={onReset}>
            <Section>
                <Input
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                />
            </Section>
        </FilterTemplate>
    );
};
