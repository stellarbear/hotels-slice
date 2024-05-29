import {useAnimate} from "@app/extensions-react";
import * as React from "react";
import {Overlay} from "../../Core";
import {stylesClosed, stylesOpened} from "./helper";
import {DrawerUI} from "./styles";

export type DrawerSide = "left" | "right" | "bottom" | "top";
export type DrawerFill = number | "fit";

type Props = Omit<React.ComponentProps<typeof Overlay.Click>, "side"> & {
    side?: DrawerSide;
    fill?: DrawerFill;
};

export const Drawer = React.memo<Props>((props) => {
    const {
        children,
        fill = 90, side = "left",
        button,
        ...rest
    } = props;

    const animate = useAnimate({
        style: {
            drawer: {
                property: "transform",
                base: {position: "fixed"},
                closed: stylesClosed(side, fill),
                opened: stylesOpened(side, fill),
            },
            blur: "opacity",
        },
    });

    return (
        <Overlay.Click
            {...rest}
            {...animate.state}
            side="none"
            button={button}
            prefix="drawer">
            <DrawerUI.DrawerBlur style={animate.styles.blur} />

            <DrawerUI.DrawerContent side={side} style={animate.styles.drawer}>
                {children}
            </DrawerUI.DrawerContent>
        </Overlay.Click>
    );
});
