import * as React from "react";
import {Button} from "../Button";
import {CarouselUI} from "./styles";

type Props<T> = {
    items: T[];
    children: (item: T) => React.ReactNode;
};

export const Carousel = <T,>(props: Props<T>) => {
    const {
        items,
        children,
    } = props;

    const [current, setCurrent] = React.useState(0);
    const onNext = React.useCallback(() => {
        setCurrent((prev) => Math.min(items.length - 1, prev + 1));
    }, []);
    const onPrevious = React.useCallback(() => {
        setCurrent((prev) => Math.max(0, prev - 1));
    }, []);

    return (
        <CarouselUI.CarouselImageContainer>
            {items.length > 1 && (
                <CarouselUI.IconArrowLeft>
                    <Button variant="text"
                        disabled={current === 0}
                        onClick={onPrevious}>
                        <CarouselUI.IconArrow />
                    </Button>
                </CarouselUI.IconArrowLeft>
            )}
            {children(items[current])}
            {items.length > 1 && (
                <CarouselUI.IconArrowRight>
                    <Button variant="text"
                        disabled={current === items.length - 1}
                        onClick={onNext}>
                        <CarouselUI.IconArrow />
                    </Button>
                </CarouselUI.IconArrowRight>
            )}
            {items.length > 1 && (
                <CarouselUI.CarouselDotsContainer>
                    {items.map((_, index) => (
                        <CarouselUI.DotCounter
                            key={index}
                            active={index === current}
                        />
                    ))}
                </CarouselUI.CarouselDotsContainer>
            )}
        </CarouselUI.CarouselImageContainer>
    );
};
