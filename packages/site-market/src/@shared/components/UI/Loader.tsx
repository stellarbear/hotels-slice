import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css, keyframes} from "styled-components";

type Props = wire.PropsStyled<typeof UI.Loader["Spinner"]>;
type Size = Exclude<Props["size"], undefined>;

const sizes: Record<Size, string> = {
    "sm": "2rem",
    "md": "4rem",
};

const animloader = keyframes`
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(0.5);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
`;

const LoaderSpinnerCss = css<Props>`
    height: ${p => sizes[p.size ?? "sm"]};
    width: ${p => sizes[p.size ?? "sm"]};

    display: inline-block;
    position: relative;
    
    &::after,
    &::before {
        content: '';  
        opacity: 0;
        box-sizing: border-box;
        height: ${p => sizes[p.size ?? "sm"]};
        width: ${p => sizes[p.size ?? "sm"]};
        border-radius: 50%;
        border: 2px solid currentColor;
        position: absolute;
        left: 0;
        top: 0;
        animation: ${animloader} 2s linear infinite;
    }

    &::after {
        animation-delay: 1s;
    }
`;

UI.Loader.Spinner = wire.extend(UI.Loader.Spinner, LoaderSpinnerCss);
