import React from "react";
import {useMap} from "./MapContext";

export const MapLayerSchema = () => {
    const map = useMap();
    const [child] = React.useState(() => new ymaps3.YMapDefaultSchemeLayer({}));

    React.useEffect(() => {
        map.addChild(child);

        return () => {
            try {
                map.removeChild(child);
            } catch {
                // suppress
            }
        };
    }, [child]);
    
    return null;
};
