import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css} from "styled-components";

const CardContentCss = css`
    padding: 0.5rem;
    border-color: rgba(0, 0, 0, 0.1);
`;

UI.CardUI.CardContent = wire.extend(UI.CardUI.CardContent, CardContentCss);
