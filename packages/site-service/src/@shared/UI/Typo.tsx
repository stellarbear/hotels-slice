import {wire} from "@app/ui-web-core";
import * as UI from "@app/ui-web-kit";

UI.Typo.Title = wire.bake(UI.Typo.Title, {fs: 36});
UI.Typo.Label = wire.bake(UI.Typo.Label, {fs: 14});
