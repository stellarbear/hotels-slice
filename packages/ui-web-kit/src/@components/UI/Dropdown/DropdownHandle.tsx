import {ViewportSide, useAnimate} from "@app/extensions-react";
import {Overlay} from "@app/ui-web-core";
import * as React from "react";
import {DropdownUI} from "./styles";

type Props = Omit<React.ComponentProps<typeof Overlay.Click>, "button" | "behavior"> & {
    side?: ViewportSide;
    button?: React.ReactNode;
};

export const DropdownHandle = React.memo<Props>((props) => {
    const {
        children,
        button = <DropdownUI.DropdownIcon />,
        side = "bottom-auto",
        ...rest
    } = props;

    const animate = useAnimate({
        style: {
            select: "opacity",
        },
    });

    return (
        <Overlay.Click
            {...rest}
            side={side}
            hideOnContentClick
            {...animate.state}
            prefix="dropdown"
            button={button}>
            <DropdownUI.DropdownBlur />

            <DropdownUI.DropdownContent style={animate.styles.select}>
                {children}
            </DropdownUI.DropdownContent>
        </Overlay.Click>
    );
});
