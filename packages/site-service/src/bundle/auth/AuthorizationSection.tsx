import {ApolloConnect} from "@app/extensions-apollo";
import {Alert, Loader} from "@app/ui-web-kit";
import * as React from "react";
import {useAuthorization} from "./AuthorizationProviderToken";

type Props = {
    anonymous?: React.ReactNode;
    children: React.ReactNode;
};

export const AuthorizationSection = React.memo<Props>((props) => {
    const {children, anonymous = <Alert color="error">Не авторизовано</Alert>} = props;
    const {token, loading} = useAuthorization();

    if (loading) {
        return <Loader.Spinner />;
    }

    if (token) {
        return (
            <ApolloConnect
                bearer={token}
                urlGraph={auth.URL_GRAPHQL}
                urlSchema={auth.URL_GRAPHQL_SCHEMA}
                urlSocket={auth.URL_GRAPHQL_SOCKET}>
                {children}
            </ApolloConnect>
        );
    }

    return (
        <>
            {anonymous}
        </>
    );
});
