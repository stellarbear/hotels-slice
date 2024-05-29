import {Link, Section} from "@app/ui-web-core";
import * as React from "react";
import styled from "styled-components";
import {Logo} from "../../Logo";
import background from "./icon/background.png";

type Props = {
    children: React.ReactNode;
};

export const LayoutDesktop = React.memo<Props>((props) => (
    <Container>
        <ContainerLogo>
            <LinkLogo to="/">
                <Logo />
            </LinkLogo>
        </ContainerLogo>
        <ContainerBody>
            <Section size="sm">
                {props.children}
            </Section>
        </ContainerBody>

        <ContainerCover />
    </Container>
));

const Container = styled.div`
    display: grid;
    grid-gap: 16px;
    height: 100%;
    grid-template-rows: auto 1fr;
    grid-template-columns: min(40%, 500px) 1fr;
    box-sizing: border-box;
    grid-template-areas: 
        "cover logo"
        "cover body";
`;

const ContainerCover = styled.div`
    grid-area: cover;
    margin: auto;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    pointer-events: none;
    width: 100%;
    height: 100%;
`;

const ContainerLogo = styled.div`
    grid-area: logo;
    margin: auto auto 0;
    padding: 4rem 0;
`;

const ContainerBody = styled.div`
    grid-area: body;
    overflow-y: auto;
    padding: 8px;
    align-self: center;
`;

export const LinkLogo = styled(Link)`
    align-self: center;
    color: #B3B3B3;
    width: 146px;
    height: 64px;
`;
