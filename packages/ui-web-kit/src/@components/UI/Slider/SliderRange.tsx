import * as React from "react";
import {ThemePaletteColors} from "../../Core";
import {SliderUI} from "./styles";

type Props = {
    left?: number;
    right?: number;
    step?: number;

    points?: boolean;
    labels?: (e: number) => string;
    color?: ThemePaletteColors;

    value: [number, number];
    onChange: (value: [number, number]) => void;
};

export const SliderRange = React.memo<Props>((props) => {
    const {
        left: min = 0,
        right: max = 100,
        step = 1,
        value,
        points = false,
        labels,
        onChange,
        color = "primary",
    } = props;


    const stepCount = React.useMemo(() => (max - min) / step, [max, min, step]);
    const stepLength = React.useMemo(() => 100 / stepCount, [stepCount]);

    const mouse = React.useRef<boolean>(false);
    const slider = React.useRef<HTMLDivElement | null>(null);

    const scalePecentage = React.useMemo(() => {
        const shift = (value: number) =>
            Math.floor((value - min) * 100 / (max - min));

        return ([
            shift(props.value[0]),
            shift(props.value[1]),
        ]);
    }, [props.value, min, max]);

    const mouseDown = React.useCallback(() => mouse.current = true, []);
    const mouseUp = React.useCallback(() => mouse.current = false, []);

    const getUpdate = React.useCallback((left: number, right: number, current: number) => {
        const point = Math.min(Math.max(current, left), right);

        const stepLength = (right - left) / ((max - min) / step);
        const steps = Math.round((point - left) / stepLength);
        const update = min + steps * step;

        const leftPoint = left + (props.value[0] - min) * stepLength;
        const rightPoint = left + (props.value[1] - min) * stepLength;

        const data: [number, number] =
            (Math.abs(current - leftPoint) >
                Math.abs(current - rightPoint))
                ? [props.value[0], update]
                : [update, props.value[1]];

        return data;
    }, [value, min, max, step]);

    const onMove = React.useCallback(
        (current: number) => {
            if (slider.current) {
                const bounds = slider.current.getBoundingClientRect();
                const [left, right] = [bounds.left, bounds.left + bounds.width];
                const update = getUpdate(left, right, current);

                if (JSON.stringify(update) !== JSON.stringify(value)) {
                    onChange(update as any);
                }
            }
        }, [slider, value, getUpdate]);

    const onClick = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            onMove(e.clientX ?? 0);
        }, [onMove]);

    const onMoveTouch = React.useCallback(
        (e: React.TouchEvent<HTMLSpanElement>) => {
            onMove(e.touches?.[0]?.clientX ?? 0);
        }, [onMove]);

    const onMoveMouse = React.useCallback(
        (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
            if (mouse.current) {
                onMove(e.clientX ?? 0);
            }
        }, [onMove]);

    return (
        <SliderUI.SliderContent ref={slider}
            onClick={onClick}
            onMouseUp={mouseUp}
            onMouseLeave={mouseUp}
            onMouseDown={mouseDown}
            onTouchMove={onMoveTouch}
            onMouseMove={onMoveMouse}>
            <SliderUI.SliderRail />
            <SliderUI.SliderTrack
                color={color}
                left={scalePecentage[0]}
                width={scalePecentage[1] - scalePecentage[0]} />

            <SliderUI.SliderThumb
                left={scalePecentage[0]}
                color={color} />
            <SliderUI.SliderThumb
                left={scalePecentage[1]}
                color={color} />

            {points && (
                Array.from(Array(Math.floor(stepCount + 1)), (_, index) => (
                    <SliderUI.SliderPoint
                        key={index}
                        left={index * stepLength}
                        color={color} />
                ))
            )}
            {labels && (
                Array.from(Array(Math.floor(stepCount + 1)), (_, index) => (
                    <SliderUI.SliderLabel key={index} left={index * stepLength}>
                        <div> {labels(index)} </div>
                    </SliderUI.SliderLabel>
                ))
            )}
        </SliderUI.SliderContent>
    );
});
