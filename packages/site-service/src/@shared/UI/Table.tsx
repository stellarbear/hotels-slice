import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";
import {css} from "styled-components";

const TableHeadContentCss = css`
  th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

UI.TableUI.TableHandleContent = wire.extend(UI.TableUI.TableHandleContent, TableHeadContentCss);
