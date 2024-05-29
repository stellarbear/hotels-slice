import * as React from "react";
import styled from "styled-components";
import {AlertColor, AlertUI} from "./styles";

type Props = React.ComponentPropsWithoutRef<"div"> & {
    color?: AlertColor;
    children: React.ReactNode;
    onClose?: () => void;
};

export const Alert = React.memo<Props>((props) => {
    const {color = "primary", children, onClose, ...rest} = props;

    return (
        <AlertUI.AlertContent {...rest} color={color}>
            {children}

            {onClose && (
                <AlertContentIcon onClick={onClose}>
                    <AlertUI.AlertIcon />
                </AlertContentIcon>
            )}
        </AlertUI.AlertContent>
    );
});

const AlertContentIcon = styled.div`
    padding-left: 0.5rem;
    cursor: pointer;
`;

