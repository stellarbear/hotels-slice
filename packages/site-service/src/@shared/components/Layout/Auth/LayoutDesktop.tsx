import {Link, Typo} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {Logo} from "../../Logo";
import background from "./icon/background.png";
import preview from "./icon/preview.png";

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
            {props.children}
        </ContainerBody>
        <ContainerCover>
            <LayoutDesktopContentPreview />
            <LayoutDesktopContentBackground1 />
            <LayoutDesktopContentBackground2 />
            <Typo.Title align="center">
                Hotel Operation Supply
            </Typo.Title>
            <Typo.SubTitle align="center">
                Маркетплейс для гостиниц, ресторанов, туристических досуговых мест
            </Typo.SubTitle>
        </ContainerCover>
    </Container>
));

const Container = styled.div`
    max-width: 1920px;
    margin: auto;
    display: grid;
    grid-gap: 16px;
    height: 100%;
    grid-template-columns: min(40%, 500px) 1fr;
    box-sizing: border-box;
    grid-template-areas: 
        "logo cover"
        "body cover";
`;

const ContainerCover = styled.div`
    grid-area: cover;
    margin: auto;
`;

const ContainerLogo = styled.div`
    grid-area: logo;
    margin: auto auto 0;
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
    height: 64px;
`;

export const LayoutDesktopContentPreview = styled.div`
    height: 50vh;
    background-image: url(${preview});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const LayoutDesktopContentBackground = styled.div`
    position: fixed;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: center;
    width: 40vh !important;
    height: 40vh;
    background-size: 40vh;
    pointer-events: none;
    z-index: -1;
`;

export const LayoutDesktopContentBackground1 = styled(LayoutDesktopContentBackground)`
    transform: translate(50%, 50%);
    bottom: 0;
    right: 0;
`;

export const LayoutDesktopContentBackground2 = styled(LayoutDesktopContentBackground)`
    transform: translate(-50%, -50%);
    top: 0;
    left: 0;
`;
