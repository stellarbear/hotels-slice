import * as React from "react";
import {getCrop, getDimensions, getTranslate, ImageCropAspect, ImageCropShape} from "../@helpers";
import {useMove, useZoom} from "../@hooks";
import {isDefinedDimension} from "./helper";
import {ImageEditContainer, ImageEditContainerCrop, ImageEditContainerMedia} from "./styles";

type Props = {
    image: string;
    aspect: ImageCropAspect;
    rotation?: number;

    setCrop: (crop: ImageCropShape) => void;
};

export const ImageCrop = React.memo<Props>((props) => {
    const {image, aspect: ratio, setCrop, rotation = 0} = props;
    const aspect = ratio === "circle" ? 1 : ratio;

    const refImage = React.useRef<HTMLImageElement | null>(null);
    const refContainer = React.useRef<HTMLDivElement | null>(null);

    const [zoom] = useZoom(refContainer);
    const [translate, setTranslate] = useMove(refContainer);
    const [dimensions, setDimensions] = React.useState({width: 0, height: 0});

    React.useLayoutEffect(() => {
        setTranslate(getTranslate({refImage, translate, dimensions, zoom, rotation}));
    }, [zoom, dimensions, translate.x, translate.y, rotation]);

    React.useEffect(() => {
        setCrop(getCrop({refImage, translate, dimensions, zoom, rotation}));
    }, [zoom, dimensions, translate.x, translate.y, rotation]);

    const onLoad = React.useCallback(() => {
        setDimensions(getDimensions({refImage, refContainer, aspect, rotation}));
    }, [aspect, rotation]);

    const transform = React.useMemo(() => (
        `translate(${translate.x}px, ${translate.y}px) rotate(${rotation}deg) scale(${zoom})`
    ), [translate, zoom, rotation]);

    return (
        <ImageEditContainer
            ref={refContainer}>
            <ImageEditContainerMedia
                src={image}
                ref={refImage}
                onLoad={onLoad}
                style={{transform}}
            />
            {isDefinedDimension(dimensions) && (
                <ImageEditContainerCrop
                    style={dimensions}
                />
            )}
        </ImageEditContainer>
    );
});
