import {Controller, ExtensionsForm, Path} from "@app/extensions-form";
import {ControllerDate} from "@app/ui-web-controls";
import {Form} from "@app/ui-web-kit";
import * as React from "react";

type Props<T extends ExtensionsForm.Constraint> = {
    form: ExtensionsForm.Result<T>;

    start: Path<T>;
    end: Path<T>;
};

export const ReportTemplateDates = <T extends ExtensionsForm.Constraint>(props: Props<T>) => {
    const {form, start, end} = props;

    return (
        <Form.Row>
            <Form.Field>
                <Form.Label>Дата начала</Form.Label>
                <Controller
                    control={form.control}
                    rules={{
                        validate: form.op.validate(
                            form.op.validators.required,
                        ),
                    }}
                    name={start}
                    render={({field: {value, onChange}}) => (
                        <ControllerDate
                            as="date"
                            value={value as any}
                            onChange={onChange}
                        />
                    )} />
                <Form.Error>{form.op.error(start)}</Form.Error>
            </Form.Field>
            <Form.Field>
                <Form.Label>Дата окончания</Form.Label>
                <Controller
                    control={form.control}
                    rules={{
                        validate: form.op.validate(
                            form.op.validators.required,
                        ),
                    }}
                    name={end}
                    render={({field: {value, onChange}}) => (
                        <ControllerDate
                            as="date"
                            value={value as any}
                            onChange={onChange}
                        />
                    )} />
                <Form.Error>{form.op.error(end)}</Form.Error>
            </Form.Field>
        </Form.Row>
    );
};
