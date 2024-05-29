import { Flex, Section } from "@app/ui-web-core";
import { Button, Dialog } from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import { AccountLogout } from "../../Account";
import { Logo } from "../../Logo";
import { LayoutNavigationContext } from "./LayoutNavigationContext";

type Props = {
    children: React.ReactNode;
};

export const LayoutNavigation = React.memo<Props>((props) => {
    const { children } = props;

    const [stack, setStack] = React.useState<React.ReactNode[]>([]);
    const mount = React.useCallback((node: React.ReactNode) => {
        setStack(prev => [...prev, node]);
    }, []);
    const unmount = React.useCallback(() => {
        setStack((prev) => prev.splice(-1));
    }, []);

    const context = React.useMemo(() => ({ mount, unmount }), []);
    const node = stack[stack.length - 1] ?? null;

    return (
        <LayoutNavigationContainer>
            <LayoutNavigationContainerHeader>
                <Section size="lg">
                    <Flex.Row align="center" justify="space-between">
                        <Logo />

                        <Flex.Row>
                            {node}
                        </Flex.Row>

                        <Dialog.Handle button={
                            <Button variant="text">Выйти</Button>
                        }>
                            <AccountLogout />
                        </Dialog.Handle>
                    </Flex.Row>
                </Section>
            </LayoutNavigationContainerHeader>
            <LayoutNavigationContainerContent size="lg">
                <LayoutNavigationContext.Provider value={context}>
                    {children}
                </LayoutNavigationContext.Provider>
            </LayoutNavigationContainerContent>
        </LayoutNavigationContainer>
    );
});

const LayoutNavigationContainer = styled.div`
    display: grid;
    height: 100%;
    grid-template-rows: auto 1fr;
    grid-template-areas: 
        "layout-navigation-header"
        "layout-navigation-contnet";
`;

const LayoutNavigationContainerHeader = styled.nav`
    grid-area: layout-navigation-header;
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.12);
`;

const LayoutNavigationContainerContent = styled(Section)`
    grid-area: layout-navigation-contnet;

    height: 100%;
    width: 100%;
    box-sizing: border-box;
`;
