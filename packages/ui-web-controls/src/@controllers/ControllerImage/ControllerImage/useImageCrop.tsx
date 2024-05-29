import {Dialog, Image, useNotification} from "@app/ui-web-kit";
import React from "react";
import {ImageCropDialog} from "../ImageCrop";
import {ImageCropAspect} from "../ImageCrop/@helpers";

type Props = {
    value: Image["Shape"][];
    onChange: (value: any[]) => void;

    aspect?: ImageCropAspect;
};

export const useImageCrop = (props: Props) => {
    const template = useNotification.template();

    const onCrop = React.useCallback((index: number) => () => {
        const onUpdate = (input: any) => {
            const update = Array.from(props.value);
            update[index] = input;
            props.onChange(update);
        };

        template.onOpen(
            <Dialog.Handle>
                <ImageCropDialog
                    aspect={props.aspect ?? 4/3}
                    image={props.value[index]}
                    onChange={onUpdate}
                />
            </Dialog.Handle>,
        );
    }, [props.value]);

    return onCrop;
};
