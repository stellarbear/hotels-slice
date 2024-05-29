import {ImageHandle, ImageVariants} from "./ImageHandle";
import {ImageZoom} from "./ImageZoom";
import {AttachmentShape} from "./type";

export * from "./styles";

export type Image = {
    Shape: AttachmentShape;
    Variants: ImageVariants;
};

export const Image = {
    Handle: ImageHandle,
    Zoom: ImageZoom,
};
