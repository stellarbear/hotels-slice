import * as React from "react";
import styled from "styled-components";
import {Dialog} from "../Dialog";

type Props = {
    src?: string;

    children?: React.ReactNode;
};

export const ImageZoom = React.memo<Props>((props: Props) => {
    const {children, src} = props;

    const [ref, setRef] = React.useState<HTMLDivElement | null>(null);
    const image = React.useMemo(() =>
        src ?? ref?.querySelector("img")?.getAttribute("src") ?? undefined, [src, ref]);

    return (
        <Dialog.Handle mount={image !== undefined} button={
            <Container ref={setRef}>
                {children}
            </Container>
        }>
            <Dialog.Header>Предпросмотр</Dialog.Header>
            <Dialog.Content>
                <ImageFullWidth src={image} />
            </Dialog.Content>
        </Dialog.Handle>
    );
});

const Container = styled.div`
    width: inherit;
    height: inherit;
    cursor: pointer;
`;

const ImageFullWidth = styled.img`
    width: 100%;
`;

