import {DialogActions} from "./DialogActions";
import {DialogButtonCancel} from "./DialogButtonCancel";
import {DialogButtonSubmit} from "./DialogButtonSubmit";
import {DialogContent} from "./DialogContent";
import {DialogHandle} from "./DialogHandle";
import {DialogHeader} from "./DialogHeader";

export * from "./styles";
export const Dialog = {
    Handle: DialogHandle,
    Header: DialogHeader,
    Content: DialogContent,
    
    Actions: DialogActions,
    ButtonCancel: DialogButtonCancel,
    ButtonSubmit: DialogButtonSubmit,
};
