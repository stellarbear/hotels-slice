import {sizes, useWindowSize} from "@app/extensions-react";
import React from "react";

type Props<T extends React.JSXElementConstructor<any>> = & {
  component: T;
  children?: React.ReactNode;
}
  & PropsComponent<T>
  & Record<ResponsiveOptions, PropsComponent<T>>;

type PropsComponent<T extends React.JSXElementConstructor<any>> = Partial<React.ComponentPropsWithoutRef<T>>;

type ResponsiveOptions = "mobile" | "desktop";

export const Responsive = <T extends React.JSXElementConstructor<any>>(props: Props<T>) => {
  const {
    component, children,
    mobile, desktop,
    ...rest
  } = props;
  const size = useWindowSize();
  const width = size.window.width;

  const select = width > sizes.sm
    ? desktop
    : mobile;

  return React.createElement(component, {...select, ...rest}, children);
};
