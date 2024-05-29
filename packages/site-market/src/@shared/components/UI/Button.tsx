import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css} from "styled-components";

const ButtonContentCss = css`
    padding: 0px 24px;
    min-height: 48px;
    border-radius: 8px;
`;

UI.ButtonUI.ButtonContent = wire.extend(UI.ButtonUI.ButtonContent, ButtonContentCss);
