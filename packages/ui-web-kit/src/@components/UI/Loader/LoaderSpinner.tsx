import styled, {keyframes} from "styled-components";

const pulsate = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;


export type SizeLoader = "sm" | "md";

type LoaderContentProps = {
  size?: SizeLoader;
};

export const LoaderSpinner = styled.div<LoaderContentProps>`
  position: relative;
  display: block;
  margin: 4px;

  &::after {
    content: "***";
    animation: ${pulsate} 1s linear infinite;
  } 
`;
