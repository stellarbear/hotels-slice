import * as React from "react";
import {useTimer} from "../timer";
import {useConfiguration} from "./helper";
import {AnimationConfiguration, AnimationPreset} from "./presets";

const isBoolean = (src: any): src is boolean => typeof src === "boolean";

type Props<T extends string> = {
  state?: boolean | [boolean, React.Dispatch<React.SetStateAction<boolean>>];

  duration?: number;
  onStart?: () => void;
  onEnd?: () => void;

  style: Record<T, AnimationConfiguration | AnimationPreset>;
};

export const useAnimate = <const T extends string>(props: Props<T>) => {
  

  return {
    visible,
    styles,
    state: {
      opened: visible,
      setOpened,
    },
  };
};
