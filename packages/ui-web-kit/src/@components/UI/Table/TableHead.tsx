import React from "react";
import {TableUI} from "./styles";
import {Typo} from "../Typography";

type Props = {
    align?: "left" | "right" | "center";
} & React.ComponentPropsWithoutRef<"div">;

export const TableHead = React.memo<Props>((props) => {
    const {align = "center", children, ...rest} = props;

    return (
        <th>
            <TableUI.TableHeadContent align={align} {...rest}>
                <Typo.Label>
                    {children}
                </Typo.Label>
            </TableUI.TableHeadContent>
        </th>
    );
});
