import {useInterval, useTimer} from "@app/extensions-react";
import * as React from "react";
import {Button} from "./Button";

type Props = React.ComponentProps<typeof Button> & {
    delay?: number;
    behavior?: "mount" | "click";
};

export const ButtonDelay = React.memo<Props>((props) => {
    const {delay = 10, behavior = "click", onClick, loading, disabled, children, ...rest} = props;
    const [clicked, setClicked] = React.useState(false);
    const [left, setLeft] = React.useState(delay);

    const interval = useInterval(1000);
    const timer = useTimer(delay * 1000);

    React.useEffect(() => {
        if (behavior === "mount") {
            onDelay();
        }
    }, []);

    const onDelay = React.useCallback(() => {
        setClicked(true);
        setLeft(delay);

        timer.call(() => {
            setClicked(false);
            interval.clear();
        });
        interval.call(() => {
            setLeft((prev) => Math.max(0, prev - 1));
        });
    }, [delay]);

    const onDelayClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onDelay();
        onClick?.(e);
    }, [onClick, delay]);

    return (
        <Button
            {...rest}
            loading={clicked || loading}
            disabled={clicked || disabled}
            onClick={onDelayClick}
        >
            {clicked
                ? <span>{`${left} сек.`}</span>
                : <div>{children}</div>
            }
        </Button>
    );
});
