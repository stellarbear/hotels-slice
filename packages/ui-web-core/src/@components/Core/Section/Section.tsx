import {Size, sizes} from "@app/extensions-react";
import React from "react";
import styled, {css} from "styled-components";

type Test = number | `${string}px` | `${string}rem`;

type Props = {
    size?: Size;

    p?: Test;
    m?: Test;

    children: React.ReactNode;
};

export const Section = React.memo<Props>((props) => {
    const {
        p = "0.75rem",
        m, children, 
        size,
    } = props;

    return (
        <SectionContainer p={p} m={m} size={size}>
            {children}
        </SectionContainer>
    );
});

const SectionContainer = styled.div<Props>`
    position: relative;
    padding: 0.75rem;
    overflow: auto;

    //  margin & padding
    ${p => p.m && css`
        margin: ${p.m};
    `}
    ${p => p.p && css`
        padding: ${p.p};
    `}

    ${p => p.size && css`
        margin: 0 auto;
        max-width: ${sizes[p.size]}px;
    `}
`;
