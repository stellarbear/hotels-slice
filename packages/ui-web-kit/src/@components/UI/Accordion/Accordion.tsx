import {useAnimate} from "@app/extensions-react";
import * as React from "react";
import {Flex} from "../../Core";
import {Typo} from "../Typography";
import {AccordionUI} from "./styles";

type Props = {
    title: React.ReactNode;
    suffix?: React.ReactNode;
    expanded?: boolean;
    children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"div">, "title">;

export const Accordion = React.memo<Props>((props) => {
    const {
        title,
        suffix,
        children,
        expanded = false,
        ...rest
    } = props;

    const animate = useAnimate({
        state: expanded,
        style: {
            accordion: {
                base: {transformOrigin: "top"},
                closed: {transform: "scaleY(0.0)", opacity: 0},
                opened: {transform: "scaleY(1.0)", opacity: 1},
            },
        },
    });

    const toggle = React.useCallback(() => animate.state.setOpened((prev) => !prev), []);

    return (
        <AccordionUI.AccordionContent {...rest}>
            <AccordionUI.AccordionContentTitle onClick={toggle}>
                <Flex.Row align="center">
                    <AccordionUI.AccordionIconToggle opened={animate.state.opened}>
                        <AccordionUI.AccordionIcon />
                    </AccordionUI.AccordionIconToggle>
                    <Typo.p>{title}</Typo.p>
                </Flex.Row>

                <Typo.p>{suffix}</Typo.p>
            </AccordionUI.AccordionContentTitle>
            {animate.visible && (
                <AccordionUI.AccordionContentBody style={animate.styles.accordion}>
                    {children}
                </AccordionUI.AccordionContentBody>
            )}
        </AccordionUI.AccordionContent>
    );
});
