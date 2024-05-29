import {useTimer} from "@app/extensions-react";
import {ThemePaletteColors, Colored} from "@app/ui-web-core";
import React from "react";
import styled from "styled-components";
import {Alert} from "../../Alert";
import {Progress} from "../../Progress";
import {NotificationConfiguration} from "./interface";

type Props = {
    unmount: () => void;
    configuration: NotificationConfiguration;
};

export const SnackbarOption = React.memo<Props>((props) => {
    const {configuration, unmount} = props;
    const {timeout = 0, color = "primary", label} = configuration;

    const timer = useTimer();
    const temporal = timeout > 0;

    React.useEffect(() => {
        if (temporal) {
            timer.call(unmount, timeout);
        }
    }, []);

    const [active, setActive] = React.useState(temporal);
    const onLeave = React.useCallback(() => {
        timer.resume(unmount);
        setActive(true);
    }, []);
    const onEnter = React.useCallback(() => {
        timer.pause();
        setActive(false);
    }, []);
    const onToggle = React.useCallback(() => (active ? onEnter() : onLeave()), [active]);

    return (
        <SnackbarOptionContainer
            color={color}
            onMouseLeave={temporal ? onLeave : undefined}
            onMouseEnter={temporal ? onEnter : undefined}
            onClick={temporal ? onToggle : undefined}>
            <Alert color={color} onClose={unmount}>
                {label}
            </Alert>
            {temporal && (
                <ProgressTimerContent>
                    <Colored background={color}>
                        <Progress.ProgressTimer
                            state={active ? "running" : "paused"}
                            timeout={timeout} />
                    </Colored>
                </ProgressTimerContent>
            )}
        </SnackbarOptionContainer>
    );
});

const ProgressTimerContent = styled.div`
    position: absolute;
    width: auto;
    bottom: 0;
    left: 0;
    right: 0;
`;

const SnackbarOptionContainer = styled.div<{color: ThemePaletteColors}>`
    position: relative;
`;
