export const variables = {
    animation: "0.3s",
    disabled: "0.4",

    background: "#ffffff",
    foreground: "#000000",
    overlay: "rgba(0, 0, 0, 0.50)",
    input: "#414141",

    surface: "rgba(255, 255, 255, 0.05)",
    divider: "rgba(0, 0, 0, 0.1)",
};

export type ThemeVariablesKey = keyof typeof variables;

export type ThemeVariablesWire = Record<ThemeVariablesKey, string>;
// declare module '@app/ui-web-core' {
//     interface ThemeVariablesWire {
//       custom: string
//     }
//   }

export class ThemeVariables {
    private constructor() { }

    public static wire<T extends ThemeVariablesWire>(overrides: Partial<T>) {
        for (const key in overrides) {
            const variable = key as ThemeVariablesKey;
            const value = overrides[variable];

            if (value) {
                variables[variable] = value;
            }
        }
    }

    public static get instance() {
        return variables;
    }
}
