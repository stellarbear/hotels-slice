import {useOverlay} from "@app/ui-web-core";
import * as React from "react";
import {DropdownUI} from "./styles";

type Props = React.ComponentPropsWithoutRef<"button"> & {
    active?: boolean;
    disabled?: boolean;
    closeOnClick?: boolean;
};

export const DropdownItem = React.memo<Props>((props) => {
    const {
        closeOnClick = false,
        active = false,
        onClick,
        ...rest} = props;
    const overlay = useOverlay();

    const onClickHandler = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick?.(event);

        if (closeOnClick) {
            overlay.close();
        }
    }, [onClick, closeOnClick]);

    return (
        <DropdownUI.DropdownItemContent
            {...rest}
            onClick={onClickHandler}
            active={active}
        />
    );
});
