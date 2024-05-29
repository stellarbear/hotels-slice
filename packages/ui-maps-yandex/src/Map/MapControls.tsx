import type {YMapControlsProps} from "@yandex/ymaps3-types";
import * as React from "react";
import {ymaps3, ymapsinstance3} from "../@types";
import {useMap} from "./MapContext";

type Props = {
    position?: YMapControlsProps["position"];
    orientation?: YMapControlsProps["orientation"];

    children: React.ReactNode;
};

const Context = React.createContext({} as [ymaps3.YMapControls, typeof ymaps3.controls]);

export const MapControls = React.memo<Props>((props) => {
    const {
        children,
        position = "right",
        orientation = "vertical",
    } = props;

    const map = useMap();
    const [control] = React.useState(() => new ymapsinstance3.YMapControls({position, orientation}));

    React.useEffect(() => {
        map.addChild(control as any);

        return () => {
            try {
                map.removeChild(control as any);
            } catch {
                // suppress
            }
        };
    }, []);

    const [controls, setControls] = React.useState<typeof ymaps3.controls | null>(null);
    const [_, setError] = React.useState("");

    React.useEffect(() => {
        (ymapsinstance3 as any).import("@yandex/ymaps3-controls@0.0.1")
            .then(setControls)
            .catch((e: unknown) => setError(JSON.stringify(e)));
    }, []);

    if (!controls) {
        return null;
    }

    return (
        <Context.Provider value={[control, controls]}>
            {children}
        </Context.Provider>
    );
});

export const useMapControls = () => React.useContext(Context);

