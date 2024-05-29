import React from "react";
import * as ReactDOM from "react-dom";
import {useMap} from "./MapContext";
import {MapMarkerIcon} from "./MapMarkerIcon";

type Props = {
    latitude: number;
    longitude: number;

    children?: React.ReactNode;
};

export const MapMarker = React.memo<Props>((props) => {
    const [map, mapGl] = useMap();
    const {latitude, longitude, children = <MapMarkerIcon />} = props;

    const [child, portal] = React.useMemo(() => {
        const div = document.createElement("div");
        div.style.transform = "translate(-50%, -100%)";

        const marker = new mapGl.HtmlMarker(map, {
            coordinates: [longitude, latitude],
            html: div,
        });

        const portal = ReactDOM.createPortal(<>{children}</>, div);

        return [marker, portal] as const;
    }, [latitude, longitude, children]);

    React.useEffect(() => {
        return () => {
            child.destroy();
        };
    }, [child]);

    return <>{portal}</>;
});
