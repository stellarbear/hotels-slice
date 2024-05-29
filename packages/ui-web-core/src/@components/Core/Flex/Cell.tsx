import * as React from "react";
import {Flex, Width} from "./spacing";
import {CellContent} from "./styles";

export type CellProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
    s?: number;

    flex?: boolean | Flex;
    percentage?: boolean | Width;

    flexwrap?: boolean;
    flexgrow?: boolean;
    flexshrink?: boolean;

    scroll?: boolean;
    disabled?: boolean;
    relative?: boolean;

    fullheight?: boolean;
    fullwidth?: boolean;

    equal?: boolean;

    self?: React.CSSProperties["alignSelf"];
    align?: React.CSSProperties["alignItems"];
    justify?: React.CSSProperties["justifyContent"];
};

export const Cell = React.memo(React.forwardRef<HTMLDivElement, CellProps>((props, ref) => {
    const {children, ...rest} = props;

    return (
        <CellContent {...rest} ref={ref}>
            {children}
        </CellContent>
    );
}));
