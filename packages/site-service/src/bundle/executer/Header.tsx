import {Icon, IconButton} from "@app/ui-icons";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Badge, Image, Modal, Typo} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {ActionExecuterRatingInfo} from "./@actions";
import {MainContainer} from "./@components";
import {useStoreCustomerMapMarks} from "./@stores";
import {useStoreNotifications} from "./@subscription";
import {ERoute} from "./AppRoutes";

export const Header = React.memo(() => {
    const context = MainContainer.use();
    const {showBookmarks, toggleShowBookmarks} = useStoreCustomerMapMarks();
    const notifications = useStoreNotifications(s => s.count);

    return (
        <Flex.Row justify="flex-end" flex align="center">
            <Colored color="primary">
                <IconButton
                    onClick={toggleShowBookmarks}
                    icon={showBookmarks ? "bookmark_filled" : "bookmark"} />
            </Colored>

            <Link to={ERoute.notifications}>
                <Badge notification={notifications > 0}>
                </Badge>
            </Link>

            {context.me.rating && (
                <Modal button={
                    <RatingSection>
                        <Flex.Row s={0} align="center">
                            <Icon icon="star" />
                            <Typo.Caption>{context.me.rating}</Typo.Caption>
                        </Flex.Row>
                    </RatingSection>
                }>
                    <ActionExecuterRatingInfo rating={context.me.rating} />
                </Modal>
            )}
            <Link to={ERoute.account}>
                <IconButton
                    icon={
                        <Image.Handle
                            variant="circle"
                            size="1.5rem"
                            image={context.me.profilePic}
                            url={executer.URL_FS}>
                            {context.me.firstName.slice(0, 1).toUpperCase()}
                        </Image.Handle>
                    } />
            </Link>
        </Flex.Row>
    );
});

const RatingSection = styled.div`
    border: 1px solid ${p => p.theme.palette.color("primary")};
    border-radius: 4px;
    padding: 2px 6px 2px 2px;
`;
