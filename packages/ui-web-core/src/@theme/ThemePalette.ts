export const palette = {
    primary: "#40bf95",
    secondary: "#808080",

    error: "#DF2020",
    success: "#29A352",
    information: "#4763EB",
    expectation: "#FF8105",
};

export type ThemePaletteColors = keyof typeof palette;

export type ThemePaletteWire = Record<ThemePaletteColors, string>;
// declare module '@app/ui-web-core' {
//     interface ThemePaletteWire {
//       custom: string
//     }
//   }

type ColorAdjust = {
    saturation: number;
    lightness: number;
    alpha: number;
};

type ColorContrast = {
    light?: string;
    dark?: string;
};

export class ThemePalette {
    private constructor() { }
    private static getVariableNames<T extends ThemePaletteColors>(key: T) {
        
    }

    private static hexToHsl(color: string) {
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5, 7), 16);

        r /= 255;
        g /= 255;
        b /= 255;
        const cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin;
        let h = 0,
            s = 0,
            l = 0;

        if (delta === 0) h = 0;
        else if (cmax === r) h = ((g - b) / delta) % 6;
        else if (cmax === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        if (h < 0) h += 360;

        l = (cmax + cmin) / 2;
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        // debugger

        return {h, s, l} as const;
    }
}
