import {FullHeight} from "@app/ui-web-core";
import * as React from "react";
import {AccountSelfEmployedFrame} from "./AccountSelfEmployedFrame";
import {AccountSelfEmployedInfo} from "./AccountSelfEmployedInfo";


export const AccountSelfEmployed = React.memo(() => {
    const [showFrame, setShowFrame] = React.useState(false);
    const onSubmit = React.useCallback(() => setShowFrame(true), []);

    return (
        <FullHeight>
            {!showFrame && (<AccountSelfEmployedInfo onSubmit={onSubmit}/>)}
            {showFrame && (<AccountSelfEmployedFrame />)}
        </FullHeight>
    );
});
