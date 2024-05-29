import {Icon} from "@app/ui-icons";
import {Button, Image, Typo} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {ImageCropAspect} from "../ImageCrop/@helpers";
import {extract} from "./extract";
import {useImageAdd} from "./useImageAdd";
import {useImageCrop} from "./useImageCrop";
import {useImageDelete} from "./useImageDelete";
import {useImageZoom} from "./useImageZoom";
import {Flex} from "@app/ui-web-core";

type Props = {
    limit?: number;
    accept?: string;
    disabled?: boolean;

    url: string;

    variant?: Image["Variants"];
    aspect?: ImageCropAspect;

    value: Image["Shape"][];
    onChange: (value: Image["Shape"][]) => void;

    crop?: boolean | ((file: File) => boolean);
};

export const ControllerImage = React.memo<Props>((props) => {
    const {
        url,
        disabled,
        variant = "upload",
        limit = 1,
        accept,
        aspect = 4 / 3,

        onChange,
        crop = false,
    } = props;

    const value = (props.value ?? []).map(extract.srcFromImage(url));

    const onDelete = useImageDelete({value, onChange});
    const onCrop = useImageCrop({value, onChange});
    const onZoom = useImageZoom({value, onChange});
    const onAdd = useImageAdd({value, onChange});

    return (
        <Flex.Row disabled={disabled} flexwrap>
            {value.map((src, index) => src && (
                <ImageContainer key={index}>
                    <Image.Handle image={src} variant={variant} />

                    <ImageConatinerRemove>
                        <Button onClick={onDelete(index)} variant="text">
                            <Icon icon="trash" />
                        </Button>
                    </ImageConatinerRemove>

                    {crop && (
                        <ImageConatinerCrop>
                            <Button onClick={onCrop(index)} variant="text">
                                <Icon icon="redo" />
                            </Button>
                        </ImageConatinerCrop>
                    )}

                    <ImageConatinerZoom>
                        <Button onClick={onZoom(index)} variant="text">
                            <Icon icon="eye" />
                        </Button>
                    </ImageConatinerZoom>
                </ImageContainer>
            ))}
            {(value.length < limit) && (
                <Image.Handle variant={variant}>
                    <ImageContainerInput
                        accept={accept}
                        onChange={onAdd}
                        type="file" />
                    <ImageContainerPlaceholder>
                        <Typo.Caption>
                            Добавить
                            <br />
                            изображение
                        </Typo.Caption>
                    </ImageContainerPlaceholder>
                </Image.Handle>
            )}
        </Flex.Row>
    );
});

const ImageContainer = styled.div`
    position: relative;
`;

const ImageConatinerRemove = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`;
const ImageConatinerZoom = styled.div`
    position: absolute;
    left: 0;
    top: 0;
`;
const ImageConatinerCrop = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`;

const ImageContainerInput = styled.input`
    height: 100%;
    left: 0;
    opacity: 0;
    outline: none;
    position: absolute;
    top: 0;
    width: 100%;
    cursor: pointer;
`;

const ImageContainerPlaceholder = styled.div`
    position: absolute;
    pointer-events: none;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
`;
