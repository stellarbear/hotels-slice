import * as React from "react";

export const useMouseScroll = <T extends Element>(containerRef: React.MutableRefObject<T | null>) => {
    const containerPositionRef = React.useRef<[number, number]>([0, 0]);
    const mouseDownPositionRef = React.useRef<null | [number, number]>(null);

    const onMouseDown = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        mouseDownPositionRef.current = [event.pageX, event.pageY];
        containerPositionRef.current = [containerRef.current?.scrollLeft ?? 0, containerRef.current?.scrollTop ?? 0];
    }, []);

    const onMouseUp = React.useCallback(() =>
        mouseDownPositionRef.current = null, []);

    const onMouseMove = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (mouseDownPositionRef.current && containerRef.current) {
            const [currentX, currentY] = mouseDownPositionRef.current;

            const deltaX = event.pageX - currentX;
            const deltaY = event.pageY - currentY;

            containerRef.current.scrollTo({
                top: containerPositionRef.current[1] - deltaY,
                left: containerPositionRef.current[0] - deltaX,
            });
        }
    }, []);

    const events = React.useMemo(() =>
        ({onMouseDown, onMouseUp, onMouseMove}),
        [onMouseDown, onMouseUp, onMouseMove]);

    return events;
};
