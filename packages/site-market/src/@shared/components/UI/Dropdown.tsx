import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css} from "styled-components";

const DropdownContentCss = css`
    border-radius: 24px;
`;

const DropdownItemContentCss = css`
    padding: 0.5rem 2rem;
`;

UI.DropdownUI.DropdownContent = wire.extend(UI.DropdownUI.DropdownContent, DropdownContentCss);
UI.DropdownUI.DropdownItemContent = wire.extend(UI.DropdownUI.DropdownItemContent, DropdownItemContentCss);
