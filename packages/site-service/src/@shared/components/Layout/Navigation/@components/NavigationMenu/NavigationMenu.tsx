import {Icon} from "@app/ui-icons";
import {Flex} from "@app/ui-web-core";
import {Dialog, Typo} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {AccountLogout} from "../../../../Account";
import {Logo} from "../../../../Logo";
import {Option} from "../../LayoutNavigation";
import {NavigationOption} from "./NavigationOption";
import {NavigationMenuLogo, NavigationOptionContent} from "./styles";

type Props = {
    options: (Option | false)[];
};

export const NavigationMenu = React.memo<Props>((props) => {
    const {options} = props;

    return (
        <Container>
            <ContainerHeader>
                <NavigationMenuLogo>
                    <Logo />
                </NavigationMenuLogo>
                {/* <NavigationMenuLogo icon="logo" /> */}
            </ContainerHeader>
            <ContainerBody>
                <Flex.Col scroll>
                    {options.map((option, index) => (
                        option &&
                        <NavigationOption option={option} key={index} />
                    ))}
                </Flex.Col>
            </ContainerBody>
            <ContainerFooter>
                <Dialog.Handle button={
                    <NavigationOptionContent>
                        <Flex.Row align="center">
                            <Icon icon="logout" />
                            <Typo.p>Выйти</Typo.p>
                        </Flex.Row>
                    </NavigationOptionContent>
                }>
                    <AccountLogout />
                </Dialog.Handle>
            </ContainerFooter>
        </Container>
    );
});

const Container = styled.div`
    display: grid;
    height: 100%;
    grid-gap: 1rem;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
        "header"
        "body"
        "footer";
`;

const ContainerHeader = styled.div`
    grid-area: header;
`;
const ContainerBody = styled.div`
    grid-area: body;
    overflow-y: auto;
`;
const ContainerFooter = styled.div`
    grid-area: footer;
`;
