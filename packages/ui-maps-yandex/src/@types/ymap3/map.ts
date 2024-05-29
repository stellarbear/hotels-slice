/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-namespace */

import type {YMapControlsProps, YMapLocationRequest, YMapMarkerProps, YMapProps} from "@yandex/ymaps3-types";

export declare class YMapObject {
    removeChild(child: any): void;
    addChild(child: any): void;
}

export declare class YMap extends YMapObject {
    constructor(rootContainer: HTMLElement, props: YMapProps);
    
    get container(): HTMLElement;
    setLocation(location: YMapLocationRequest): void;
}

export declare class YMapDefaultSchemeLayer {
    constructor();
}

export declare class YMapDefaultFeaturesLayer {
    constructor();
}

export declare class YMapControls extends YMapObject {
    constructor(input: YMapControlsProps);
}

export declare class YMapZoomControlI {
    constructor();
}

export declare class YMapMarker {
    constructor(input: YMapMarkerProps, ref?: HTMLElement);
}

