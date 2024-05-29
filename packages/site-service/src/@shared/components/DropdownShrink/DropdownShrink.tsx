import {Icon} from "@app/ui-icons";
import {Flex} from "@app/ui-web-core";
import {Dropdown} from "@app/ui-web-kit";
import React from "react";

type Props = {
    children: React.ReactNode;
};

export const DropdownShrink = React.memo<Props>((props) => {
    const {children} = props;
    const [first, ...rest] = React.Children.toArray(children);

    if (!first) {
        return null;
    }

    return (
        <Flex.Row>
            <>{first}</>
            {rest.length > 0 && (
                <Dropdown.Handle button={<Icon icon="arrow_down" />}>
                    {rest.map((entry, index) => (
                        <Dropdown.Item key={index}>
                            {entry}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Handle>
            )}
        </Flex.Row>
    );
});
