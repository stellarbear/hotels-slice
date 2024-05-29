import {wire} from "../../Core";
import {Typography} from "./Typography";

export * from "./styles";
export const Typo = {
    h1: wire.bake(Typography, {as: "h1"}),
    h2: wire.bake(Typography, {as: "h2"}),
    h3: wire.bake(Typography, {as: "h3"}),
    h4: wire.bake(Typography, {as: "h4"}),
    h5: wire.bake(Typography, {as: "h5"}),
    p: wire.bake(Typography, {as: "p"}),
    div: wire.bake(Typography, {as: "div"}),
    span: wire.bake(Typography, {as: "span"}),

    Title: wire.bake(Typography, {as: "h1", fs: 24, fw: 600}),
    SubTitle: wire.bake(Typography, {as: "h3", fs: 22, fw: 500}),
    Label: wire.bake(Typography, {as: "p", fs: 18, fw: 500}),
    Caption: wire.bake(Typography, {as: "p", fs: 12, fw: 400}),
};
