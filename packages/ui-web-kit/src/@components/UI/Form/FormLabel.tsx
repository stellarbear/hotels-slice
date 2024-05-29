import React from "react";
import styled from "styled-components";
import {Typo} from "../Typography";

type Props = {
    children: React.ReactNode;
};

export const FormLabel = React.memo<Props>((props) => (
    <FormLabelContainer>
        <Typo.Label>{props.children}</Typo.Label>
    </FormLabelContainer>
)); 

const FormLabelContainer = styled.div`
    margin-bottom: 2px;
`;
