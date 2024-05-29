import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import styled, {keyframes} from "styled-components";

type Props = wire.PropsStyled<typeof UI.Loader["Spinner"]>;
type Size = Exclude<Props["size"], undefined>;

const sizes: Record<Size, string> = {
    "sm": "1.5rem",
    "md": "3rem",
};

const spinAround = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;


const LoaderSpinner = styled.div<Props>`
    border-radius: 290486px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-top-color: transparent;
    color: ${p => p.theme.palette.color("primary")};

    animation: ${spinAround} 1000ms infinite linear;
    content: "";

    height: ${p => sizes[p.size ?? "sm"]};
    width: ${p => sizes[p.size ?? "sm"]};
`;

UI.Loader.Spinner = LoaderSpinner;
