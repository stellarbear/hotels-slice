import {ExtensionsReact} from "@app/extensions-react";
import {Adaptive} from "./Adaptive";

export * from "./Adaptive";
export * from "./Responsive";
export * from "./media";

export const Mobile = ExtensionsReact.bakeComponent(Adaptive, {to: "sm"});
export const Desktop = ExtensionsReact.bakeComponent(Adaptive, {from: "sm"});

