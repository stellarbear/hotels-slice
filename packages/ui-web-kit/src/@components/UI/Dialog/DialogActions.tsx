import {Flex} from "@app/ui-web-core";
import React from "react";
import {Loader} from "../Loader";
import {DialogUI} from "./styles";

type Props = {
    loading?: boolean;
    children: React.ReactNode;
};

export const DialogActions = React.memo<Props>((props) => {
    const {loading = false, children} = props;

    return (
        <DialogUI.DialogActionsContainer $loading={loading}>
            {loading && <Loader.Spinner />}
            {!loading && <div />}

            <Flex.Row>
                {children}
            </Flex.Row>
        </DialogUI.DialogActionsContainer>
    );
});
