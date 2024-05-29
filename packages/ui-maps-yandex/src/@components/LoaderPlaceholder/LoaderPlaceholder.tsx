import * as React from "react";
import styled from "styled-components";

const LoaderContents = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 1rem;
`;

type Props = {
    text: string;
};

export const LoaderPlaceholder = React.memo<Props>((props) => (
    <LoaderContents>
        <div>{props.text}</div>
    </LoaderContents>
));
