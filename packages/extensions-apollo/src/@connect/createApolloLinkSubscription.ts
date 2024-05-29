import {split} from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {ApolloLinkProps, createApolloLink} from "./createApolloLink";

export type ApolloLinkSubscriptionProps = ApolloLinkProps & {
    urlSocket: string;
};

export function createApolloLinkSubscription(config: ApolloLinkSubscriptionProps) {
    const {
        urlSocket,
        urlSchema,
        headers,
    } = config;

    const params = headers
        ? `?${Object.entries(headers).map(([key, value]) => `${key}=${value}`).join("&")}`
        : "";

    const httpLink = createApolloLink(config);

    const wsLink = new WebSocketLink({
        uri: `${urlSocket}/${urlSchema}${params}`,
        options: {
            reconnect: true,
            connectionParams: {headers},
        },
    });

    const link = split(
        ({query}) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpLink,
    );

    return link;
}
