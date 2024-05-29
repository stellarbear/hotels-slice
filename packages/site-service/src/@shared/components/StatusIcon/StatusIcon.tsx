import * as React from "react";
import {IconFailure, IconSuccess} from "./styles";

type Props = {
    type: "success" | "failure";
};

export const StatusIcon = React.memo<Props>(props => {
    const {type} = props;

    switch (type) {
        case "success":
            return <IconSuccess />;
        case "failure":
            return <IconFailure />;
    }
});
