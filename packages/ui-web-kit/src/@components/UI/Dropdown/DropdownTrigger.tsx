import * as React from "react";
import {DropdownUI} from "./styles";

type Props = React.ComponentPropsWithoutRef<"button"> & {
    children: React.ReactNode;
};

export const DropdownTrigger = React.memo<Props>((props) => {
    const {children, ...rest} = props;
    
    return (
        <DropdownUI.DropdownTriggerContent {...rest}>
            <span>{children}</span>
            <DropdownUI.DropdownTriggerIcon />
        </DropdownUI.DropdownTriggerContent>
    );
});
