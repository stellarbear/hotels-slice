import {ViewportSide, useAnimate} from "@app/extensions-react";
import React from "react";
import {Overlay} from "../../Core";
import {TooltipUI} from "./styles";

type Props = Omit<React.ComponentProps<typeof Overlay.Hover>, "button" | "behavior"> & {
    side?: ViewportSide;
    button?: React.ReactNode;
};

export const Tooltip = React.memo<Props>((props) => {
    const {
        button = <TooltipUI.TootltipTrigger />,
        children,
        side = "bottom-auto",
        ...rest
    } = props;

    const animate = useAnimate({
        style: {
            select: "opacity",
        },
    });

    return (
        <Overlay.Hover
            {...rest}
            side={side}
            {...animate.state}
            prefix="tooltip"
            button={button}>
            <TooltipUI.TootltipContent style={animate.styles.select}>
                {children}
            </TooltipUI.TootltipContent>
        </Overlay.Hover>
    );
});
