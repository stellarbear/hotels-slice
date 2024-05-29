import * as React from "react";
import {useMapControls} from "./MapControls";

export const MapControlsZoom = React.memo(() => {
    const [control, controls] = useMapControls();
    const [child] = React.useState(() => new controls.YMapZoomControl());

    React.useEffect(() => {
        control.addChild(child);

        return () => {
            try {
                control.removeChild(child);
            } catch {
                // suppress
            }
        };
    }, [child]);

    return null;
});
