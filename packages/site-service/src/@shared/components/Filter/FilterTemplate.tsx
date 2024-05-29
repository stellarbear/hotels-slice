import {fp} from "@app/extensions-fp";
import {Icon} from "@app/ui-icons";
import {Flex, Overlay} from "@app/ui-web-core";
import {Button, Dropdown, Typo} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";

type Props = {
    label: React.ReactNode;
    filled?: boolean;
    onReset: () => void;
    children: React.ReactNode;
};

export const FilterTemplate = React.memo<Props>((props) => {
    const {label, onReset, filled = false, children} = props;

    return (
        <Dropdown.Handle button={
            <Button variant="text"
                color={filled ? "error" : "primary"}>
                <Flex.Row>
                    <Typo.Label>{label}</Typo.Label>
                    <Icon icon="filter" />
                </Flex.Row>
            </Button>
        }>
            <Container>
                <ContainerInput>
                    {children}
                </ContainerInput>
                <ContainerReset>
                    <Overlay.Use>
                        {(overlay) => (
                            <Button
                                fullwidth
                                variant="text"
                                onClick={fp.apply(onReset, overlay.close)} >
                                <Typo.Caption>
                                    Сбросить
                                </Typo.Caption>
                            </Button>
                        )}
                    </Overlay.Use>
                </ContainerReset>
            </Container>
        </Dropdown.Handle>
    );
});

const Container = styled.div`
    display: grid;
    overflow: auto;
    grid-template-rows: 1fr auto;
    grid-template-areas: 
        "filter-input"
        "filter-reset";
`;

const ContainerInput = styled.div`
    grid-area: filter-input;
    overflow: auto;
`;

const ContainerReset = styled.div`
    grid-area: filter-reset;
`;
