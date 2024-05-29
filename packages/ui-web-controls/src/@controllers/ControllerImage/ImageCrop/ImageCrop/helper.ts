import {ImageCropDimensions} from "../@helpers";

export const isDefinedDimension = (data: ImageCropDimensions) =>
    data.height > 0 && data.width > 0;
