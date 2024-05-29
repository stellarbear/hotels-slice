import {Flex, useOverlay} from "@app/ui-web-core";
import {Button, Dialog, Image, Loader} from "@app/ui-web-kit";
import * as React from "react";
import {ImageCropAspect, ImageCropShape, imageToBlob} from "../@helpers";
import {ImageCrop} from "../ImageCrop";
import {RotateIconLeft, RotateIconRight} from "./RotateIcon";

type Props = {
    image: Image["Shape"];
    aspect: ImageCropAspect;

    onChange: (image: Image["Shape"]) => void;
};

export const ImageCropDialog = React.memo<Props>((props) => {
    const {image, aspect = 4 / 3, onChange} = props;

    const overlay = useOverlay();

    const [crop, setCrop] = React.useState<ImageCropShape | null>(null);
    const [rotation, setRotation] = React.useState(0);

    const [buffer, setBuffer] = React.useState<string | null>(null);

    React.useEffect(() => {
        setBuffer(image.url);
    }, [image]);

    const rotateLeft = React.useCallback(() => setRotation((prev) => prev - 90), []);
    const rotateRight = React.useCallback(() => setRotation((prev) => prev + 90), []);

    const onCrop = React.useCallback(async () => {
        if (buffer && crop) {
            const blob = await imageToBlob(image.url, crop, rotation, image.mimeType);

            if (blob !== null) {
                onChange({...image, url: blob});
                overlay.close();
            }
        }
    }, [buffer, crop, rotation, image]);

    if (!buffer) {
        return <Loader.Spinner />;
    }

    return (
        <>
            <Dialog.Header>
                Кадрирование и поворот
            </Dialog.Header>
            <Dialog.Content>
                <ImageCrop
                    aspect={aspect}
                    image={buffer}
                    rotation={rotation}
                    setCrop={setCrop}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Flex.Row s={0}>
                    <Button variant="text" onClick={rotateLeft}>
                        <RotateIconLeft />
                    </Button>
                    <Button variant="text" onClick={rotateRight}>
                        <RotateIconRight />
                    </Button>
                </Flex.Row>
                <Button onClick={onCrop}>Выбрать</Button>
            </Dialog.Actions>
        </>
    );
});
