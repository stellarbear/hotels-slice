import {ExtensionsForm, FieldValues, Path, useWatch} from "@app/extensions-form";
import {isNumber} from "@app/extensions-guard";
import {useTimer} from "@app/extensions-react";
import {ControllerInputNumberInteger} from "@app/ui-web-controls";
import {Section} from "@app/ui-web-core";
import * as React from "react";
import {FilterTemplate} from "./FilterTemplate";

type Props<T extends FieldValues> = {
    form: ExtensionsForm.Result<T>;
    name: Path<T>;
    label: string;
};

export const FilterByNumber = <T extends FieldValues>(props: Props<T>) => {
    const {form, name, label} = props;

    const data = useWatch({control: form.control});
    const [value, setValue] = React.useState<number>(data[name]);
    React.useEffect(() => {setValue(data[name]);}, [data[name]]);

    const timer = useTimer(500);
    const onReset = React.useCallback(() => {
        timer.clear();
        form.setValue(name, null as any);
    }, []);
    const onChange = React.useCallback((value: any) => {
        timer.clear();
        
        setValue(value);
        timer.call(() => form.setValue(name, value));
    }, []);

    return (
        <FilterTemplate
            label={label}
            filled={isNumber(value)}
            onReset={onReset}>
            <Section>
                <ControllerInputNumberInteger
                    value={value}
                    onChange={onChange}
                    placeholder={label}
                />
            </Section>
        </FilterTemplate>
    );
};
