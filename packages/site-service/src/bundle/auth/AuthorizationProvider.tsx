import {ApolloConnect} from "@app/extensions-apollo";
import * as React from "react";
import {FCM} from "../../@shared";
import {AuthorizationProviderToken} from "./AuthorizationProviderToken";

type Props = {
    expect?: string;
    children: React.ReactNode;
};

export const AuthorizationProvider = React.memo<Props>((props) => {
    const {children, expect} = props;
    FCM.use();

    return (
        <ApolloConnect
            urlGraph={auth.URL_GRAPHQL}
            urlSchema={auth.URL_GRAPHQL_SCHEMA}>
            <AuthorizationProviderToken expect={expect}>
                {children}
            </AuthorizationProviderToken>
        </ApolloConnect>
    );
});
