import styled, {css} from "styled-components";
import {CellProps} from "./Cell";
import {from} from "./spacing";

type CellContentProps = CellProps;

export const CellContent = styled.div<CellContentProps>`
    display: flex;
    position: relative;
    flex: 0 1 auto;

    align-self: ${p => p.self};
    align-items: ${p => p.align};
    justify-content: ${p => p.justify};

    //  @deprecated: change to margin
    gap: ${p => p.s ?? 8}px;

    ${p => p.flex && css`
        flex-grow: ${from(p.flex, 1)};
    `}
    ${p => p.percentage && css`
        width: ${from(p.percentage, 100)}%;
    `}

    ${p => p.flexwrap && css`flex-wrap: wrap;`}
    ${p => p.flexgrow && css`flex-grow: 1;`}
    ${p => p.flexshrink && css`flex-shrink: 1;`}

    ${p => p.scroll && css`overflow: auto;`}
    ${p => p.relative && css`position: relative;`}

    ${p => p.fullheight && css`
        box-sizing: border-box;
        height: 100%;
    `}
    ${p => p.fullwidth && css`
        box-sizing: border-box;
        width: 100%;
    `}

    ${p => p.disabled && css`
        pointer-events: none;
        opacity: 0.4;
    `}

    ${p => p.equal && css`
        > * {
            flex: 1;
        }
    `}
`;
