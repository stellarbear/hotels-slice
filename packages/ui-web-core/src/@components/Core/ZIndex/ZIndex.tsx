import {useIndex} from "@app/extensions-react";
import * as React from "react";
import {IndexHandle} from "./styles";

type Props = React.ComponentPropsWithoutRef<"div"> & {
    zindex?: number;
};

export const ZIndex = React.memo<Props>((props) => {
    const {zindex} = props;
    const index = useIndex();

    return (
        <IndexHandle {...props} zvalue={zindex ?? index} />
    );
});
