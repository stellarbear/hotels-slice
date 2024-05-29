import {Flex} from "@app/ui-web-core";
import * as React from "react";
import styled from "styled-components";
import {Input} from "../Input";
import {InputUI} from "./styles";

type Props = React.ComponentProps<typeof Input> & {
    show?: boolean;
};

export const InputHidden = React.memo(React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const {show = false, type, ...rest} = props;
    const [visible, setVisible] = React.useState(show);

    const toggleVisibility = React.useCallback(() => setVisible((prev) => !prev), []);

    return (
        <Flex.Row>
            <Input
                ref={ref}
                type={visible ? type : "password"}
                right={
                    <InputHiddenAdornment onClick={toggleVisibility}>
                        <InputUI.InputHiddenIcon />
                    </InputHiddenAdornment>
                }
                {...rest} />
        </Flex.Row>
    );
}));

const InputHiddenAdornment = styled.div`
    cursor: pointer;
    display: contents;
`;
