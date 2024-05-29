import {ThemePaletteColors} from "@app/ui-web-core";

export type NotificationConfiguration = {
    label: string;
    timeout?: number;
    color?: ThemePaletteColors;
};

export type NotificationState = {
    id: number;
    configuration: NotificationConfiguration;
};

export type NotificationFn = (label: string, timeout?: number) => void;
