import {Flex, Link, useOverlay} from "@app/ui-web-core";
import {Typo} from "@app/ui-web-kit";
import * as React from "react";
import {useLocation} from "react-router";
import {Option} from "../../LayoutNavigation";
import {NavigationOptionContent} from "./styles";

type Props = {
    option: Option;
};

export const NavigationOption = React.memo<Props>((props) => {
    const {option} = props;
    const location = useLocation();
    const overlay = useOverlay();

    return (
        <Link to={option.to} onClick={overlay.close}>
            <NavigationOptionContent active={location.pathname.startsWith(option.to)}>
                <Flex.Row align="center" s={16}>
                    {option.icon}
                    <Typo.SubTitle>{option.title}</Typo.SubTitle>
                </Flex.Row>
            </NavigationOptionContent>
        </Link>
    );
});
