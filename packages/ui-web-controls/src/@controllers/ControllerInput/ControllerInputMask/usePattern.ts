import React from "react";
import {masks} from "./masks";

const isRegexp = (src: any): src is RegExp => src instanceof RegExp;
const isString = (src: any): src is string => typeof src === "string";

type MaskRaw = (string | RegExp)[];
type MaskPreset = (dict: typeof masks) => MaskRaw;
export type Mask = MaskRaw | MaskPreset;

export const usePattern = (mask: Mask, separator: string | string[]) => {

    return {
        mask: patternMask,
        regexp: patternRegexp,

        input,
        updateCaret,
        extract,
        validate,
        apply,
    };
};
