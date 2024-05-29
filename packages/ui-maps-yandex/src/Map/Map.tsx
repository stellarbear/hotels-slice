import * as React from "react";
import styled from "styled-components";
import {LoaderScript} from "../@components";
import {MapContext} from "./MapContext";
import {MapControls} from "./MapControls";
import {MapControlsGeolocation} from "./MapControlsGeolocation";
import {MapControlsZoom} from "./MapControlsZoom";
import {MapLayerFeature} from "./MapLayerFeature";
import {MapLayerSchema} from "./MapLayerSchema";
import {MapObserver} from "./MapObserver";

type Props = {
    api: string;

    width?: number | string;
    height?: number | string;

    children?: React.ReactNode;
};

const ymUrl = (api: string) =>
    `https://api-maps.yandex.ru/v3/?apikey=${api}&lang=ru_RU`;

export const Map = React.memo<Props>((props) => {
    const {
        api,
        width = "100%",
        height = "100%",
        children,
    } = props;

    const mapId = React.useId();
    const dimensions = React.useMemo(() => ({width, height}), [width, height]);

    return (
        <MapContent style={dimensions}>
            <LoaderScript src={ymUrl(api)}>
                <MapHandle id={mapId} />

                <MapContext mapId={mapId}>
                    <MapObserver />

                    <MapLayerFeature />
                    <MapLayerSchema />

                    <MapControls>
                        <MapControlsZoom />
                        <MapControlsGeolocation />
                    </MapControls>

                    {children}
                </MapContext>
            </LoaderScript>
        </MapContent>
    );
});

const MapHandle = styled.div`
    height: inherit;
    width: inherit;
`;

const MapContent = styled.div`
    position: relative;
    border-radius: 0.25rem;
    backdrop-filter: brightness(0.9);
    overflow: hidden;
`;

