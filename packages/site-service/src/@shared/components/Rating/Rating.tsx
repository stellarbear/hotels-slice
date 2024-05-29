import {ExtensionsArray} from "@app/extensions-classes";
import {Flex} from "@app/ui-web-core";
import * as React from "react";
import {RatingStar} from "./RatingStar";

type Props = {
    value?: number | null;
    count?: number;

    onClick?: (entry: number) => void;
};

export const Rating = React.memo<Props>((props) => {
    const {value = 0, onClick, count = 5} = props;

    const onStarClick = React.useCallback((entry: number) => () => {
        onClick?.(entry);
    }, []);

    return (
        <Flex.Row>
            {ExtensionsArray.sequence(count, (e) => (
                <RatingStar
                    key={e}
                    active={e + 1 <= (value ?? 0)}
                    onClick={onStarClick(e + 1)}
                />
            ))}
        </Flex.Row>
    );
});
