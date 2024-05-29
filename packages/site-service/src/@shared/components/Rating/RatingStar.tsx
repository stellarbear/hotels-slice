import {Icon} from "@app/ui-icons";
import {Colored} from "@app/ui-web-core";
import * as React from "react";
import styled from "styled-components";

type Props = {
    active?: boolean | number | null;
    onClick?: () => void;
};

export const RatingStar = React.memo<Props>((props) => {
    const {active, onClick} = props;

    return (
        <Container onClick={onClick}>
            <Colored color="success">
                {active
                    ? <Icon icon="star_filled" />
                    : <Icon icon="star" />}
            </Colored>
        </Container>
    );
});

const Container = styled.div`
    cursor: pointer;
`;
