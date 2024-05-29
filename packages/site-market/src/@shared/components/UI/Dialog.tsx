import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css} from "styled-components";

const DialogContainerCss = css`
    border-radius: 24px;
`;

UI.DialogUI.DialogContainer = wire.extend(UI.DialogUI.DialogContainer, DialogContainerCss);
