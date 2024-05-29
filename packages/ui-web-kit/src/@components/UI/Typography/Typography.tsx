import * as React from "react";
import {TypoUI, TypographyContentProps} from "./styles";

/* eslint-disable max-len */
//  https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/#:~:text=Let%E2%80%99s%20take%20these%20values

type Props =
    & TypographyContentProps
    & React.ComponentPropsWithoutRef<"div">
    & {
        as?: React.ElementType;
        children: React.ReactNode;
    };

export const Typography = React.memo<Props>((props) => {
    const {children, as = "p", ...rest} = props;

    return (
        <TypoUI.TypographyContent as={as} {...rest}>
            {children}
        </TypoUI.TypographyContent>
    );
});
