import * as React from "react";
import styled from "styled-components";
import {MapContext} from "./MapContext";

type Props = {
    api: string;

    width?: number | string;
    height?: number | string;

    children?: React.ReactNode;
};

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
            <MapHandle id={mapId} />

            <MapContext mapId={mapId} api={api}>
                {children}
            </MapContext>
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
