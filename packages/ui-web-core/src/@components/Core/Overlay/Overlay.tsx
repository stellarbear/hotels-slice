import {useOverlay} from "./Context";
import {OverlayBlur} from "./OverlayBlur";
import {OverlayClick} from "./OverlayClick";
import {OverlayHover} from "./OverlayHover";
import {OverlayOrphan} from "./OverlayOrphan";
import {OverlayUse} from "./OverlayUse";

export const Overlay = {
    Click: OverlayClick,
    Hover: OverlayHover,
    Orphan: OverlayOrphan,

    use: useOverlay,
    Use: OverlayUse,
    Blur: OverlayBlur,
};
