const global = (globalThis as any);

import * as ymaps3 from "./ymap3";
export const ymapsinstance3: typeof ymaps3 = new Proxy(global, {
    get(target, prop) {
        return target.ymaps3[prop];
    },
});
export {ymaps3};
