import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css} from "styled-components";

const TableHandleContentCss = css`
    > thead th {
        border-bottom: 1px solid ${p => p.theme.variables.divider};
        border-top: 1px solid ${p => p.theme.variables.divider};

        &:first-child {
            border-top-left-radius: 16px;
            border-bottom-left-radius: 16px;
            border-left: 1px solid ${p => p.theme.variables.divider};
        }

        &:last-child {
            border-top-right-radius: 16px;
            border-bottom-right-radius: 16px;
            border-right: 1px solid ${p => p.theme.variables.divider};
        }
    }
`;

UI.TableUI.TableHandleContent = wire.extend(UI.TableUI.TableHandleContent, TableHandleContentCss);
