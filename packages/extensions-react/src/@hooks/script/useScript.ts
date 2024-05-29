import {useEffect, useState} from "react";

const isString = (src: any): src is string => typeof src === "string";

type ConfigBase = {
    skip?: boolean;
};

type ConfigUrl = {
    type: "src";
};

type ConfigScript = {
    type: "content";
};

type Config = ConfigBase & (ConfigUrl | ConfigScript);

const defaultConfig: Config = {type: "src"};

const cache = new Set<string>();
export const useScript = (src: string | null | false | undefined, config: Config = defaultConfig) => {
    const [state, setState] = useState({
        loaded: false,
        error: false,
    });

    useEffect(
        () => {
            if (!isString(src) || config.skip) {
                return;
            }

            if (cache.has(src)) {
                setState({
                    loaded: true,
                    error: false,
                });
            } else {

                const script = document.createElement("script");

                const onScriptLoad = () => {
                    cache.add(src);
                    setState({loaded: true, error: false});
                };

                const onScriptError = () => {
                    cache.delete(src);
                    setState({loaded: true, error: true});
                };

                switch (config.type) {
                    case "src":
                        script.src = src;
                        script.async = true;
                        break;
                    case "content":
                        script.innerHTML = src;
                        script.type = "text/javascript";
                        break;
                }

                script.addEventListener("load", onScriptLoad);
                script.addEventListener("error", onScriptError);

                document.body.appendChild(script);

                return () => {
                    script.removeEventListener("load", onScriptLoad);
                    script.removeEventListener("error", onScriptError);
                    // document.body.removeChild(script);
                };
            }
        },
        [src],
    );

    return {...state};
};
