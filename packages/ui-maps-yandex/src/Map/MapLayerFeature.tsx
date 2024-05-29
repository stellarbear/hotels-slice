import * as React from "react";
import {useMap} from "./MapContext";

export const MapLayerFeature = () => {
    const map = useMap();
    const [child] = React.useState(() => new ymaps3.YMapDefaultFeaturesLayer({}));

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
