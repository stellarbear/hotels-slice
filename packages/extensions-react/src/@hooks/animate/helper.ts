import React from "react";
import {AnimationConfiguration, AnimationPreset, isAnimationPreset, presets} from "./presets";

export const useConfiguration = <T extends string>(
  style: Record<T, AnimationConfiguration | AnimationPreset>,
  duration: number,
) => {
  const [stylesConfiguration] = React.useState(() => {
    const result = {
      opened: {},
      closed: {},
    } as {
      opened: Record<T, React.CSSProperties>;
      closed: Record<T, React.CSSProperties>;
    };

    for (const key in style) {
      const value = style[key] as AnimationConfiguration | AnimationPreset;
      const configuration: AnimationConfiguration = isAnimationPreset(value)
        ? presets[value]
        : value;

      const base = configuration.base ?? {};
      const opened = configuration.opened;
      const closed = configuration.closed;
      const shared: React.CSSProperties = {
        ...base,
        transitionTimingFunction: configuration.transitionTimingFunction,
        transitionDuration: `${duration}s`,
        transitionProperty: configuration.property,
      };

      result.opened[key] = {...shared, ...opened};
      result.closed[key] = {...shared, ...closed};
    }

    return result;
  });

  return stylesConfiguration;
};
