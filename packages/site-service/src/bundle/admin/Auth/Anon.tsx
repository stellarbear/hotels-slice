import {Flex} from "@app/ui-web-core";
import {Typo} from "@app/ui-web-kit";
import * as React from "react";
import {LayoutAuth} from "../../../@shared";
import {SignIn} from "./SignIn";

export const Anon = React.memo(() => (
    <LayoutAuth>
        <Flex.Col>
            <Typo.SubTitle>Администратор</Typo.SubTitle>
            <SignIn />
        </Flex.Col>
    </LayoutAuth>
));
