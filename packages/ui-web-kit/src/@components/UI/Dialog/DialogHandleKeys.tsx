import * as React from "react";
import styled from "styled-components";
import {useOverlay} from "../../Core";
import {useDialog} from "./DialogContext";

type Props = React.ComponentPropsWithoutRef<"div">;

export const DialogHandleKeys = React.memo<Props>((props) => {
    const dialog = useDialog();

    const [ref, setRef] = React.useState<HTMLDivElement | null>(null);

    const overlay = useOverlay();
    const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.code) {
            case "Escape": {
                return !dialog.persistent && overlay.close();
            }
            case "Enter": {
                const submit = Array.from(ref?.querySelectorAll("button[type='submit']") ?? []);

                if (submit.length === 1) {
                    event.stopPropagation();
                    (submit[0] as HTMLElement).click();
                }
            }
        }
    }, [ref]);

    React.useEffect(() => {
        ref?.focus();
    }, [ref]);

    return (
        <DialogContainer
            ref={setRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            {...props}
        >
            {props.children}
        </DialogContainer>
    );
});

const DialogContainer = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    pointer-events: none;
    z-index: inherit;
`;
