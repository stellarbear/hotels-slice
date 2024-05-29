import React from "react";
import styled from "styled-components";
import {Typo} from "../Typography";

type Props = {
    children: React.ReactNode;
};

export const FormError = React.memo<Props>((props) => (
    <FormErrorContainer>
        <Typo.Caption>{props.children}</Typo.Caption>
    </FormErrorContainer>
)); 

const FormErrorContainer = styled.div`
    color: #ec3b03;

    margin-top: 4px;
`;
