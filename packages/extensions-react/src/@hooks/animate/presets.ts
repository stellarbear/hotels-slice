export type AnimationConfiguration = {
  property?: React.CSSProperties["transitionProperty"];
  transitionTimingFunction?: React.CSSProperties["transitionTimingFunction"];

  base?: React.CSSProperties;
  opened: React.CSSProperties;
  closed: React.CSSProperties;
};

export type AnimationPreset = keyof typeof presets;
export const isAnimationPreset = (src: any): src is AnimationPreset => src in presets;

export const presets = {
  opacity: {
    base: {},
    property: "opacity",
    opened: {opacity: 1},
    closed: {opacity: 0},
  },
} satisfies Record<string, AnimationConfiguration>;
