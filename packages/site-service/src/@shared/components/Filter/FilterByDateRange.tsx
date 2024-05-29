import {Controller, ExtensionsForm, FieldValues, Path, useWatch} from "@app/extensions-form";
import {isDefined} from "@app/extensions-guard";
import {ControllerDate} from "@app/ui-web-controls";
import {Flex, Section} from "@app/ui-web-core";
import {Typo} from "@app/ui-web-kit";
import * as React from "react";
import {FilterTemplate} from "./FilterTemplate";

type Props<T extends FieldValues> = {
    form: ExtensionsForm.Result<T>;
    startDate: Path<T>;
    endDate: Path<T>;
    label?: string;
};

export const FilterByDateRange = <T extends FieldValues>(props: Props<T>) => {
    const {form, startDate, endDate, label = "Период"} = props;

    const data = useWatch({control: form.control});
    const valueStart = data[startDate];
    const valueEnd = data[endDate];
    const filled = isDefined(valueStart) || isDefined(valueEnd);

    const onReset = React.useCallback(() => {
        form.setValue(startDate, null as any);
        form.setValue(endDate, null as any);
    }, []);

    return (
        <FilterTemplate
            label={label}
            filled={filled}
            onReset={onReset}>
            <Section>
                <Flex.Col s={8}>
                    <div>
                        <Typo.Label>Дата начала</Typo.Label>
                        <Controller
                            control={form.control}
                            name={startDate}
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
                    </div>
                    <div>
                        <Typo.Label>Дата окончания</Typo.Label>
                        <Controller
                            control={form.control}
                            name={endDate}
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
                    </div>
                </Flex.Col>
            </Section>
        </FilterTemplate>
    );
};

