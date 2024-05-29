import {Input} from "@app/ui-web-kit";
import React from "react";

type Props = Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & {
  value?: number | null;
  onChange?: (...args: any[]) => void;

  min?: number;
  max?: number;

  format?: (src: string) => string;
};

const numberToString = <T,>(src: T) => (Number.isFinite(src) ? String(src) : "");

export const ControllerInputNumberInteger = (props: Props) => {
  const {
    value,
    onChange,
    format = String,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    ...rest
  } = props;

  const [focused, setFocused] = React.useState(false);
  const [text, setText] = React.useState(numberToString(value));

  React.useEffect(() => {
    setText(numberToString(value));
  }, [value, focused]);

  const onParse = React.useCallback((value: string) => {
    const result = value ? Math.min(max, Math.max(min, parseInt(value, 10))) : NaN;
    return Number.isNaN(result) ? null : result;
  }, [max, min]);

  const onFocus = React.useCallback(() => setFocused(true), []);

  const onBlur = React.useCallback(() => {
    onChange?.(onParse(text));
    setFocused(false);
  }, [value, text, onChange, min, max]);

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<any>) => {
      const input = String(e.target.value);
      if ((!Number.isFinite(Number(input)) && input !== "-") ||
        input.includes(".")) {
        return;
      }

      setText(input);
      const parsed = onParse(input);
      if (input === parsed?.toString()) {
        onChange?.(parsed);
      }
    },
    [onChange, onParse],
  );

  return (
    <Input
      inputMode="numeric"
      {...rest}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onInputChange}
      value={focused ? text : format(text)}
    />
  );
};
