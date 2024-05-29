import React from "react";
import {TableUI} from "./styles";

type Props = {
    align?: "left" | "right" | "center";
} & React.ComponentPropsWithoutRef<"div">;

export const TableCell = React.memo<Props>((props) => {
    const {align = "center", ...rest} = props;

    return (
        <td>
            <TableUI.TableCellContent {...rest} align={align} />
        </td>
    );
});
