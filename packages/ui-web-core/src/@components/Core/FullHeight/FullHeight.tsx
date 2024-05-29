import {useWindowSize} from "@app/extensions-react";
import * as React from "react";
import styled from "styled-components";

type Props = {
    children: React.ReactNode;
};

const FullHeightContent = styled.div`
    /* > * {
        height: 100%;
    } */
`;

export const FullHeight = React.memo<Props>((props) => {
    const {children} = props;
    const ref = React.useRef<HTMLDivElement | null>(null);
    const size = useWindowSize();

    const [minHeight, setMinHeight] = React.useState(0);

    React.useLayoutEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();

            setMinHeight(window.innerHeight - rect.top - 16);
        }
    }, [size.dimensions]);


    return (
        <FullHeightContent style={{minHeight}} ref={ref}>
            {children}
        </FullHeightContent>
    );
});
