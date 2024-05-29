import {ExtensionsDate} from "@app/extensions-classes";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form, Input} from "@app/ui-web-kit";
import * as React from "react";
import {downloadAsLink} from "../../download";

type Props = {
    url: string;
    fs: string;
};

type InputForm = {
    name: string;
};

export const DialogDownload = React.memo<Props>((props) => {
    const {url, fs} = props;

    const overlay = useOverlay();
    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {
            name: `Отчет от ${ExtensionsDate.format("y-m-d H:M:S", new Date())}`,
        },
    });

    const onSubmit = React.useCallback((input: InputForm) => {
        downloadAsLink(`${fs}/${url}`, input.name);
        overlay.close();
    }, []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Скачать файл</Dialog.Header>
            <Dialog.Content>
                <Form.Field>
                    <Form.Label>Имя файла</Form.Label>
                    <Input {...form.register("name", {
                        validate: form.op.validate(
                            form.op.validators.required,
                        ),
                    })}
                        autoComplete={"off"} />
                    <Form.Error>{form.op.error("name")}</Form.Error>
                </Form.Field>
            </Dialog.Content>

            <Dialog.Actions>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
