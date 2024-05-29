import styled, {css} from "styled-components";

type TableHeadContentProps = {
    align: "left" | "right" | "center";
};

const TableHeadContent = styled.div<TableHeadContentProps>`
    display: flex;
    justify-content: ${p => p.align};
    padding: 1em 0.75rem;
    vertical-align: middle;
    overflow: auto;
`;

type TableCellContentProps = {
    align: "left" | "right" | "center";
};

const TableCellContent = styled.div<TableCellContentProps>`
    display: flex;
    justify-content: ${p => p.align};
    padding: 1em 0.75rem;
    vertical-align: middle;
    overflow: auto;
`;

type TableHandleContentProps = {
    view: "compact" | "full-width";
};

const TableHandleContent = styled.table<TableHandleContentProps>`
    ${p => p.view === "compact" && css`
        width: fit-content;
    `}
    ${p => p.view === "full-width" && css`
        width: 100%;
    `}
`;

export const TableUI = {
    TableHeadContent,
    TableCellContent,
    TableHandleContent,
};
