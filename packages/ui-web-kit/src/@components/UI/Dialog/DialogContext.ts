import React from "react";

type DialogContext = {
    persistent: boolean;
};
 
export const DialogContext = React.createContext({} as DialogContext);
export const useDialog = () => React.useContext(DialogContext);
