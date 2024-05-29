import React from "react";
import styled from "styled-components";
import {ThemePaletteColors} from "../../Core";
import {BadgePosition, BadgeUI} from "./styles";

type Props = {
    notification?: boolean | number | React.ReactNode;
    position?: BadgePosition;
    color?: ThemePaletteColors;

    children: React.ReactNode;
};

export const Badge = React.memo<Props>((props) => {
    const {
        children,
        color = "primary",
        position = "right-top",
        notification = false,
    } = props;

    const show = React.useMemo(() => shouldShow(notification), [notification]);

    return (
        <BadgeContainer>
            {children}
            {show && (
                <BadgeUI.BadgeNotification position={position} color={color}>
                    {notification}
                </BadgeUI.BadgeNotification>
            )}
        </BadgeContainer>
    );
});

const shouldShow = (notification: boolean | number | React.ReactNode) => {
    if (typeof notification === "boolean") {
        return notification;
    } else if (typeof notification === "number") {
        return notification > 0;
    } else {
        return true;
    }
};

const BadgeContainer = styled.div`
    position: relative;
`;
