import {HttpLink} from "@apollo/client";
import fetch from "isomorphic-fetch";

export type ApolloLinkProps = {
    urlSchema: string;
    urlGraph: string;

    headers?: Record<string, string>;
};

export function createApolloLink(config: ApolloLinkProps) {
    const {
        urlSchema,
        urlGraph,
        headers,
    } = config;

    const credentials = "include";
    const httpLink = new HttpLink({
        headers,
        fetch,
        credentials,
        uri: `${urlGraph}/${urlSchema}`,
    });

    return httpLink;
}
