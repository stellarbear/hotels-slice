import styled, {css} from "styled-components";

export type TypographyContentProps = {
    fs?: number;
    fw?: number;
    lh?: number;
    ls?: number;

    align?: React.CSSProperties["textAlign"];
    wrap?: React.CSSProperties["whiteSpace"];
    ellipsis?: boolean;
    pre?: boolean;
    noselect?: boolean;
};

const TypographyContent = styled.div<TypographyContentProps>`
    --scale: 0.8;

    margin: unset;
    padding: unset;
    /* margin-block-start: unset;
    margin-block-end: unset;
    margin-inline-start: unset;
    margin-inline-end: unset; */
    
    ${p => p.fs && css`
        font-size: clamp(calc(${p.fs}px * var(--scale)), 2vw, ${p.fs}px);
    `}
    ${p => p.fw && css`font-weight: ${p.fw};`}
    ${p => p.lh && css`line-height: ${p.lh};`}
    ${p => p.ls && css`letter-spacing: ${p.ls}px;`}
    ${p => p.pre && css`white-space: pre;`}

    ${p => p.noselect && css`user-select: none;`}
    ${p => p.align && css`text-align: ${p.align};`}
    ${p => p.wrap && css`white-space: ${p.wrap};`}
    ${p => p.ellipsis && css`
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `}
`;

export const TypoUI = {
    TypographyContent,
};
