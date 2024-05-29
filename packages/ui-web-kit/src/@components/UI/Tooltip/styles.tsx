import React from "react";
import styled from "styled-components";

const TootltipTrigger = React.memo(() => <>?</>);

const TootltipContent = styled.div`
    display: flex;
    flex-direction: column;
    
    overflow: auto;
    max-width: inherit;
    max-height: inherit;

    color: inherit;
    background-color: white;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 11px;
    border-radius: 0.25rem;
    padding: 0.5rem;
`;

export const TooltipUI = {
    TootltipContent,
    TootltipTrigger,
};
