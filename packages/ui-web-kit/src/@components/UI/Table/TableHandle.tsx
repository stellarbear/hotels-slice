import React from "react";
import {TableUI} from "./styles";

type Props = {
    view?: "compact" | "full-width";
} & React.ComponentPropsWithoutRef<"table">;

export const TableHandle = React.memo<Props>((props) => {
    const {view = "compact", ...rest} = props;

    return (
        <TableUI.TableHandleContent {...rest} view={view} />
    );
});
