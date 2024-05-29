import * as React from "react";
import {ImageUI} from "./styles";
import {AttachmentShape} from "./type";

export type ImageVariants = "default" | "thumbnail" | "circle" | "upload";

type Props = {
    url?: string;
    image?: AttachmentShape | AttachmentShape[];

    variant?: ImageVariants;
    size?: React.CSSProperties["width"];

    children?: React.ReactNode;
};

export const ImageHandle = React.memo<Props>((props) => {
    const {
        url,
        size,
        variant = "default",
        children = null,
        image,
    } = props;

    const handle = Array.isArray(image) ? image[0] : image;

    return (
        <ImageUI.ImageHandleContainer variant={variant} size={size} {...handle}>
            {handle && (
                <ImageUI.ImageHandleMedia
                    loading="lazy"
                    {...handle}
                    // onError={onError}
                    // onLoad={onLoad}
                    alt={handle.fileName}
                    src={url ? `${url}/${handle.url}` : handle.url}
                />
            )}
            {!handle && (children)}
        </ImageUI.ImageHandleContainer>
    );
});
