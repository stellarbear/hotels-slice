import {ExtensionsArray} from "@app/extensions-classes";
import {IconButton} from "@app/ui-icons";
import {Flex} from "@app/ui-web-core";
import {Button, Typo} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";

type Props = {
    accept?: string;
    limit?: number;

    value?: File[];
    onChange: (value: File[]) => void;
};

const defaultValue: File[] = [];
export const ControllerAttachment = React.memo<Props>((props) => {
    const {value = defaultValue, accept = "*", onChange, limit = 0} = props;

    const onFilesSelect = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.files;

        if (!input) {
            return;
        }

        const array = Array.from(input);
        const update = [...value, ...array];
        onChange(limit > 0
            ? update.slice(-limit)
            : update,
        );
    }, [value, limit]);

    const onFileRemove = React.useCallback((entry: File) => () => {
        const result = ExtensionsArray.toggle(value, entry);
        onChange(result);
    }, [value]);

    return (
        <Flex.Col>
            <Button>
                <InputWrapper
                    multiple
                    type="file"
                    accept={accept}
                    onChange={onFilesSelect} />
                <div>Выбрать файлы</div>
            </Button>
            {value.map((entry, index) => (
                <Flex.Row
                    key={`${index}-${entry.name}`}
                    align="center"
                    justify="space-between">
                    <Typo.Label>{entry.name}</Typo.Label>

                    <IconButton icon="close" onClick={onFileRemove(entry)} />
                </Flex.Row>
            ))}
        </Flex.Col>
    );
});

const InputWrapper = styled.input`
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
`;
