import React from "react";
import {Loader} from "../Loader";
import {DialogUI} from "./styles";

type Props = {
    loading?: boolean;
    children: React.ReactNode;
};

export const DialogContent = React.memo<Props>((props) => {
    const {loading = false, children} = props;

    return (
        <DialogUI.DialogContentContainer>
            <Loader.Overlay loading={loading}>
                {children}
            </Loader.Overlay>
        </DialogUI.DialogContentContainer>
    );
});
