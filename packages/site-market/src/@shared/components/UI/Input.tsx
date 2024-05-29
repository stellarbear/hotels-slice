import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css} from "styled-components";

const InputContentCss = css`
    background: #BCC3D080;
    border-color: #BCC3D080;
`;

const InputFieldCss = css`
    min-height: 48px;
`;

UI.InputUI.InputContent = wire.extend(UI.InputUI.InputContent, InputContentCss);
UI.InputUI.InputField = wire.extend(UI.InputUI.InputField, InputFieldCss);
