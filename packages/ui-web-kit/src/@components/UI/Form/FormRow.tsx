import styled from "styled-components";

export const FormRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;

    > * {
        display: block;
        min-width: min(100%, 185px);
        flex: 1;
    }
`;
