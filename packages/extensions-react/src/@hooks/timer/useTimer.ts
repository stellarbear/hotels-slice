import * as React from "react";

export const useTimer = (defaultDelay?: number) => {
  const timer = React.useRef<NodeJS.Timer | null>(null);

  const timeMountRef = React.useRef(performance.now());
  const timeLeftRef = React.useRef(defaultDelay ?? 0);

  const clear = React.useCallback(() => {
    timer.current && clearTimeout(timer.current);
  }, []);

  const pause = React.useCallback(() => {
    clear();

    const timeElapsed = performance.now() - timeMountRef.current;
    timeLeftRef.current -= timeElapsed;
  }, []);

  const resume = React.useCallback((cb: () => void) => {
    clear();

    timeMountRef.current = performance.now();
    timer.current = setTimeout(cb, Math.max(timeLeftRef.current, 0));
  }, []);

  React.useEffect(() => clear, []);

  const call = React.useCallback((cb: () => void, defaultDelay?: number) => {
    clear();

    timeLeftRef.current = defaultDelay ?? timeLeftRef.current;
    timeMountRef.current = performance.now();
    timer.current = setTimeout(cb, defaultDelay ?? timeLeftRef.current);
  }, []);

  return {call, clear, pause, resume} as const;
};
