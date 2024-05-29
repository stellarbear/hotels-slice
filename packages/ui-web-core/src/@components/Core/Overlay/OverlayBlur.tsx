import React from "react";
import styled from "styled-components";
import {useOverlay} from "./Context";

type Props =
    & React.ComponentPropsWithoutRef<"div">
    & {persistent?: boolean};

export const OverlayBlur = React.memo<Props>((props) => {
    const {persistent = false, ...rest} = props;
    const overlay = useOverlay();

    return (<Blur onClick={persistent ? undefined : overlay.close} {...rest} />);
});

const Blur = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
`;
