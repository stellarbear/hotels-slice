import {Size, useAnimate} from "@app/extensions-react";
import {Overlay} from "@app/ui-web-core";
import * as React from "react";
import {DialogContext} from "./DialogContext";
import {DialogHandleKeys} from "./DialogHandleKeys";
import {DialogUI} from "./styles";

type Props = Omit<React.ComponentProps<typeof Overlay.Click>, "button"> & {
    mount?: boolean;
    button?: React.ReactNode;
    size?: Size;

    onClose?: () => void;
    onOpen?: () => void;
    persistent?: boolean;
};

export const DialogHandle = React.memo<Props>((props) => {
    const {
        persistent = false,
        mount = true,
        onClose,
        onOpen,
        children,
        button,
        size = "sm",
        ...rest
    } = props;

    const context = React.useMemo(() => ({persistent}), [persistent]);

    const animate = useAnimate({
        state: button ? false : true,
        onEnd: onClose,
        onStart: onOpen,
        style: {
            dialog: "opacity",
            blur: "opacity",
        },
    });

    if (!mount) {
        return <>{button}</>;
    }

    return (
        <Overlay.Click
            {...rest}
            prefix="dialog"
            {...animate.state}
            button={button ?? <div />}>
            <DialogContext.Provider value={context}>
                <DialogUI.DialogBlur
                    style={animate.styles.blur} persistent={persistent} />

                <DialogHandleKeys style={animate.styles.dialog}>
                    <DialogUI.DialogContainer size={size}>
                        {children}
                    </DialogUI.DialogContainer>
                </DialogHandleKeys>
            </DialogContext.Provider>
        </Overlay.Click>
    );
});
