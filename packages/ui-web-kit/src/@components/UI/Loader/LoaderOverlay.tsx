import React from "react";
import styled from "styled-components";
import {LoaderSpinner} from "./LoaderSpinner";

type Props = {
  loading?: React.ReactNode;

  children: React.ReactNode;
};

export const LoaderOverlay = React.memo<Props>((props) => {
  const {children, loading} = props;
  
  return (
    <LoaderOverlayContent>
      {children}
      {loading &&
        <>
          <LoaderOverlayPlaceholderBlur />
          <LoaderOverlayPlaceholder>
            <LoaderSpinner />
          </LoaderOverlayPlaceholder>
        </>
      }
    </LoaderOverlayContent>
  );
});


const LoaderOverlayContent = styled.div`
  position: relative;
  overflow: auto;
`;

const LoaderOverlayPlaceholder = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const LoaderOverlayPlaceholderBlur = styled.div`
  inset: 0;
  position: absolute;
  backdrop-filter: brightness(0.9);
  border-radius: 0.25rem;
  cursor: not-allowed;
`;
