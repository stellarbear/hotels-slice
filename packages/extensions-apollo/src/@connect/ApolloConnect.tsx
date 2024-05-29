import {ApolloProvider} from "@apollo/client";
import * as React from "react";
import {createApolloClient} from "./createApolloClient";
import {createApolloLink} from "./createApolloLink";
import {createApolloLinkSubscription} from "./createApolloLinkSubscription";

type Props = {
    children: React.ReactNode;
    headers?: Record<string, string>;
    bearer?: string | null;

    urlGraph: string;
    urlSchema: string;
    urlSocket?: string;

    ssr?: boolean;
};

export const ApolloConnect = React.memo<Props>((props) => {
    const {headers = {}, children, bearer, urlSocket, ssr, ...rest} = props;

    if (bearer) {
        headers.authorization = `Bearer ${bearer}`;
    }
    if (typeof window !== "undefined") {
        headers.origin = window.location.origin;
    }

    const link = React.useMemo(() =>
        urlSocket
            ? createApolloLinkSubscription({...rest, headers, urlSocket})
            : createApolloLink({...rest, headers}), [bearer]);
        
    const client = createApolloClient({link, ssr});

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
});
