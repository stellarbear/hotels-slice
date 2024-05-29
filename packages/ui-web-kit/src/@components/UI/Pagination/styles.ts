
import styled from "styled-components";

const PaginationContainer = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    width: fit-content;
    padding: 0.25rem 0.75rem;
    border: 1px solid ${p => p.theme.variables.divider};
    border-radius: 0.25rem;
`;

// const PaginationButton = styled.button`
//     min-height: unset;
//     height: 2rem;
//     width: 1rem;
//     border: none;
// `;

export const PaginationUI = {
    PaginationContainer,
    /* PaginationButton, */
};
