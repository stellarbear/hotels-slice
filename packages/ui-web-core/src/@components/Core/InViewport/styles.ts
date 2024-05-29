import styled from "styled-components";

export const InViewportContent = styled.div`
    overflow: auto;
    transition-duration: 0.3s;
    transition-property: max-height, max-width, translate-x, translate-y, translate;
`;
