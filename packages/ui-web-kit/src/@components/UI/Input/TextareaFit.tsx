import * as React from "react";
import styled from "styled-components";
import {Textarea} from "./Textarea";

type Props = React.ComponentProps<typeof Textarea>;

export const TextareaFit = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
    const wrap = React.useRef<null | HTMLDivElement>(null);

    const onResizeArea = React.useCallback(() => {
        const element = wrap.current?.querySelector("textarea");
        if (element) {
            element.style.height = "0px";
            element.style.height = `${element.scrollHeight}px`;
        }
    }, []);

    React.useLayoutEffect(() => {
        onResizeArea();
    }, [onResizeArea]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange?.(e);

        onResizeArea();
    }, []);

    return (
        <TextAreaFitContent ref={wrap}>
            <Textarea
                ref={ref}
                {...props}
                onChange={onChange}
            />
        </TextAreaFitContent>
    );
});

const TextAreaFitContent = styled.div`
    width: 100%;
`;
