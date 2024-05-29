import {Dialog, Image, useNotification} from "@app/ui-web-kit";
import React from "react";
import styled from "styled-components";

type Props = {
    value: Image["Shape"][];
    onChange: (value: any[]) => void;
};

export const useImageZoom = (props: Props) => {
    const template = useNotification.template();

    const onZoom = React.useCallback((index: number) => () => {
        template.onOpen(
            <Dialog.Handle>
                <Dialog.Header>
                    Предпросмотр
                </Dialog.Header>
                <Dialog.Content>
                    <ImageContainer src={props.value[index].url} />
                </Dialog.Content>
            </Dialog.Handle>,
        );
    }, [props.value]);

    return onZoom;
};

const ImageContainer = styled.img`
    width: 100%;
    height: 100%;
`;
