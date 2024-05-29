import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css} from "styled-components";

const CardCss = css`
    border-color:#BCC3D080;
    padding: 24px 32px;
    border-radius: 36px;
`;

UI.CardUI.CardContent = wire.extend(UI.CardUI.CardContent, CardCss);
