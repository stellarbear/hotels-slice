import {useOverlay} from "@app/ui-web-core";
import * as React from "react";
import styled from "styled-components";
import {useDialog} from "./DialogContext";
import {DialogUI} from "./styles";

type Props = {
    children: React.ReactNode;
};

export const DialogHeader = React.memo<Props>((props) => {
    const overlay = useOverlay();
    const dialog = useDialog();

    return (
        <DialogUI.DialogHeaderContainer>
            <DialogUI.DialogHeaderTitle>
                {props.children}
            </DialogUI.DialogHeaderTitle>
            {!dialog.persistent && (
                <DialogIconTrigger onClick={overlay.close} >
                    <DialogUI.DialogHeaderCloseIcon />
                </DialogIconTrigger>
            )}
        </DialogUI.DialogHeaderContainer>
    );
});

const DialogIconTrigger = styled.div`
    cursor: pointer;
`;
