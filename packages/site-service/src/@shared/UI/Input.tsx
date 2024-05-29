import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css} from "styled-components";

const InputFieldCss = css`
    min-height: 40px;
`;

UI.InputUI.InputField = wire.extend(UI.InputUI.InputField, InputFieldCss);
