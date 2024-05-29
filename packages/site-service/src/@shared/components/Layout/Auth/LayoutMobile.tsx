import {Link} from "@app/ui-web-core";
import * as React from "react";
import styled from "styled-components";
import {Logo} from "../../Logo";

type Props = {
    children: React.ReactNode;
};

export const LayoutMobile = React.memo<Props>((props) => (
    <Container>
        <ContainerLogo>
            <LinkLogo to="/">
                <Logo />
            </LinkLogo>
        </ContainerLogo>
        <ContainerBody>
            {props.children}
        </ContainerBody>
    </Container>
));

const Container = styled.div`
    display: grid;
    grid-gap: 16px;
    height: 100%;
    box-sizing: border-box;
    /* grid-template-rows: auto 1fr; */
    grid-template-areas: 
        "logo"
        "body";
`;

const ContainerLogo = styled.div`
    grid-area: logo;
    margin: auto auto 0px;
`;

const ContainerBody = styled.div`
    grid-area: body;
    overflow-y: auto;
    padding: 8px;
`;

export const LinkLogo = styled(Link)`
    align-self: center;
    color: #B3B3B3;
    width: 146px;
    margin-bottom: 2rem;
    min-height: 80px;
`;
