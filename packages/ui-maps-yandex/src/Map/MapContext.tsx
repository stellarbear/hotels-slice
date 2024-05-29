import * as React from "react";
import {LoaderPlaceholder} from "../@components";
import {ymaps3, ymapsinstance3} from "../@types";

type Props =  {
    mapId: string;
    children?: React.ReactNode;
};

export const Context = React.createContext({} as ymaps3.YMap);

export const MapContext = React.memo<Props>((props) => {
    const {
        mapId,
        children,
    } = props;

    const [map, setMap] = React.useState<ymaps3.YMap | null>(null);
    const [error, setError] = React.useState("");
    
    React.useEffect(() => {
        const element = document.getElementById(mapId);
        
        element && ymapsinstance3.ready
            .then(() => {
                const map = new ymapsinstance3.YMap(
                    element,
                    {
                        location: {
                            zoom: 10,
                            center: [37.573856, 55.751574],
                        },
                    },
                );
                setMap(map);
            })
            .catch((e) => setError(JSON.stringify(e)));
    }, []);

    if (!map) {
        return <LoaderPlaceholder text="Инициализация карты" />;
    }

    if (error) {
        return <LoaderPlaceholder text="Ошибка инициализации карты" />;
    }

    return (
        <Context.Provider value={map}>
            {children}
        </Context.Provider>
    );
});

export const useMap = () => React.useContext(Context);
