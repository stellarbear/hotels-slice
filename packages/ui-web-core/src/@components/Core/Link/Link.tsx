import * as React from "react";
import {Link as RouterLink} from "react-router-dom";
import {LinkUI} from "./styles";

type Props = React.DOMAttributes<HTMLAnchorElement> & {
    to: string;
    blank?: boolean;
    external?: boolean;
};

export const Link = React.memo<Props>((props) => {
    const {
        to,
        blank = false,
        external = false,
        children,
        ...rest
    } = props;

    const target = blank ? "_blank" : "_self";

    return (
        <LinkUI.LinkContent
            {...rest}
            target={target}
            rel="noreferrer"
            as={external ? "a" : RouterLink}
            href={external ? to : undefined}
            to={external ? undefined : to}>
            {props.children}
        </LinkUI.LinkContent>
    );
});
