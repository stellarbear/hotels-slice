import * as React from "react";
import {StepsUI} from "./styles";

type Props = {
    type?: "row" | "column";

    count: number;
    current?: number;

    onClick?: (index: number) => void;
};

export const Steps = React.memo<Props>((props) => {
    const {type = "row", count, current = 0, onClick, ...rest} = props;

    const onButtonClick = React.useCallback((index: number) => () => onClick?.(index), []);

    return (
        <StepsUI.StepsContent type={type} {...rest}>
            {Array.from(Array(count), (_, i) => (
                <StepsUI.StepsButtonContent
                    key={i}
                    type="button"
                    active={i <= current}
                    onClick={onButtonClick(i)}>
                    {i + 1}
                </StepsUI.StepsButtonContent>
            ))}
        </StepsUI.StepsContent>
    );
});
