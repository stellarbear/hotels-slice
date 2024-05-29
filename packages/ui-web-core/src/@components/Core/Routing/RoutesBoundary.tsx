import React from "react";
import {Route, Routes} from "react-router";
import {Outlet, useLocation} from "react-router-dom";
import {ErrorBoundary} from "../ErrorBoundary";

const ErrorBoundaryRouter = () => {
  const location = useLocation();

  return (
    <ErrorBoundary.Catch reset={location.pathname}>
      <Outlet />
    </ErrorBoundary.Catch>
  );
};

export const RoutesBoundary = (props: {children: React.ReactNode}) => (
  <Routes>
    <Route element={<ErrorBoundaryRouter />}  >
      {props.children}
    </Route>
  </Routes>
);
