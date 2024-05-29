import React from "react";
import styled from "styled-components";
import {Query, useQuery} from "./QueryContext";
import {QueryUI} from "./styles";

type Props<T> = {
  query?: Query<T>;

  loader?: React.ReactNode;
  children: React.ReactNode;
};

export const QueryOverlay = <T,>(props: Props<T>) => {
  const {children, query, loader = null} = props;
  const context = query ?? useQuery();

  return (
    <QueryOverlayContent>
      {context.loading &&
        <>
          <QueryUI.QueryOverlayPlaceholderBlur />
          <QueryUI.QueryOverlayPlaceholder>
            {loader}
          </QueryUI.QueryOverlayPlaceholder>
        </>
      }
      {children}
    </QueryOverlayContent>
  );
};

const QueryOverlayContent = styled.div`
    position: relative;
    overflow: auto;
`;
