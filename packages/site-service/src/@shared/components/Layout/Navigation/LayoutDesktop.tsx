import * as React from "react";
import styled from "styled-components";
import {NavigationMenu} from "./@components";
import {LayoutNavigation} from "./LayoutNavigation";

type Props = React.ComponentProps<typeof LayoutNavigation>;

export const LayoutDesktop = React.memo<Props>((props) => {
    const {options, children, header} = props;

    return (
        <Container>
            <ContainerNavigation>
                <NavigationMenu options={options} />
            </ContainerNavigation>
            <ContainerHeader>
                {header}
            </ContainerHeader>
            <ContainerBody>
                {children}
            </ContainerBody>
        </Container>
    );
});

const Container = styled.div`
    display: grid;
    grid-gap: 16px;
    height: 100%;
    box-sizing: border-box;
    grid-template-columns: 360px 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 
        "navigation header"
        "navigation body";
`;

const ContainerHeader = styled.div`
    grid-area: header;
    padding: 0.5rem;
`;

const ContainerNavigation = styled.div`
    background-color: #0A0A0A;
    grid-area: navigation;
    overflow-y: auto;
`;

const ContainerBody = styled.div`
    grid-area: body;
    overflow-y: auto;
    padding: 8px;
`;
