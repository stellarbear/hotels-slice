import styled from "styled-components";

export const TableRow = styled.tr`
    cursor: pointer;

    &:hover {
        background-color: ${p => p.theme.palette.color("primary", {alpha: 0.2})};
    }
`;
