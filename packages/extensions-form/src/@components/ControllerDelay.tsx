import React from "react";

type Child = {
  value: any;
  onChange: (...event: any[]) => void;
};

type Props<T extends React.JSXElementConstructor<Child>> = {
  as: T;
  delay?: number;
} & React.ComponentProps<T>;

export const ControllerDelay = <T extends React.JSXElementConstructor<Child>>(props: Props<T>) => {
  const {delay = 500, as, value, onChange, ...rest} = props;

  const timer = React.useRef<NodeJS.Timeout | null>(null);
  const clear = React.useCallback(() => {
    timer.current && clearTimeout(timer.current);
  }, []);

  const [valueDelayed, setValueDelayed] = React.useState<any>(undefined);

  React.useEffect(() => {
    setValueDelayed(value);
  }, [value]);

  React.useEffect(() => clear, []);

  const onChangeDelayed = React.useCallback(
    (value: any) => {
      setValueDelayed(value);

      clear();
      timer.current = setTimeout(() => {
        onChange(value);
      }, delay);
    },
    [delay],
  );

  return React.createElement(as, {
    ...rest,
    value: valueDelayed,
    onChange: onChangeDelayed,
  });
};
