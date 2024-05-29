import {ExtensionsApollo} from "@app/extensions-apollo";
import {useAsyncOp} from "@app/extensions-react";
import {Icon} from "@app/ui-icons";
import {Flex} from "@app/ui-web-core";
import {Button, useNotification} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {useUpload} from "../@components";
import {DOCUMENT_UPSERT_MUTATION} from "../@query";
import {DocumentUpsertMutation, DocumentUpsertMutationVariables, TypeAgreement} from "../interfaces";

const doc = DOCUMENT_UPSERT_MUTATION;
type Mutation = DocumentUpsertMutation;
type Variables = DocumentUpsertMutationVariables;

type Props = {
    type: TypeAgreement;
};

const mutationDocumentUpload = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const UploadDocument = React.memo<Props>((props) => {
    const {type} = props;

    const {upload} = useUpload(type as any);
    const [file, setFile] = React.useState<File | null>(null);

    const notification = useNotification.snackbar();
    const [mutation] = mutationDocumentUpload
        .onSuccess(() => notification.success("Документ загружен"))
        .compile();

    const onReset = React.useCallback(() => {
        setFile(null);
    }, []);

    const onChange = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.files?.[0];

        if (input) {
            setFile(input);
        }
    }, []);

    const [onUpload, ready] = useAsyncOp(async () => {
        if (!file) {
            return;
        }

        const response = await upload(file);
        await mutation({
            variables: {
                input: {
                    type,
                    file: response,
                },
            },
        });

        onReset();
    }, [file, type]);

    if (!file) {
        return (
            <Button>
                <InputWrapper
                    accept=".html"
                    type="file"
                    onChange={onChange} />
                <div>Загрузить файл</div>
                <Icon icon="plus" />
            </Button>
        );
    }

    return (
        <Flex.Row>
            <Button onClick={onUpload} loading={!ready}>
                Опубликовать
            </Button>
            <Button onClick={onReset} loading={!ready}>
                Удалить
            </Button>
        </Flex.Row>
    );
});

const InputWrapper = styled.input`
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
`;
