import styled from "styled-components";

type Props = {
    zvalue: number;
};

export const IndexHandle = styled.div<Props>`
    z-index: ${p => p.zvalue};
    position: relative;
`;
