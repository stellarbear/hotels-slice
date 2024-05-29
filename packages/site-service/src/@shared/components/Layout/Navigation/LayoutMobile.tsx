import {Icon} from "@app/ui-icons";
import {Flex} from "@app/ui-web-core";
import {Button, Drawer} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {NavigationMenu} from "./@components";
import {LayoutNavigation} from "./LayoutNavigation";

type Props = React.ComponentProps<typeof LayoutNavigation>;

export const LayoutMobile = React.memo<Props>((props) => {
    const {options, header, children} = props;

    return (
        <Container>
            <ContainerHeader>
                <Flex.Row align="center">
                    <Drawer
                        button={
                            <Button variant="text">
                                <Icon icon="bars" />
                            </Button>
                        }
                    >
                        <DrawerContent>
                            <NavigationMenu options={options} />
                        </DrawerContent>
                    </Drawer>
                    {header}
                </Flex.Row>
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
    grid-template-rows: auto 1fr;
    grid-template-areas: 
        "header"
        "body";
`;

const ContainerHeader = styled.div`
    grid-area: header;
    padding: 0.5rem;
`;

const ContainerBody = styled.div`
    grid-area: body;
    overflow-y: auto;
    padding: 8px;
`;

export const DrawerContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    background-color: #0A0A0A;
`;
