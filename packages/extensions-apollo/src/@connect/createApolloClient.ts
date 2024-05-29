import {ApolloClient, ApolloLink, InMemoryCache} from "@apollo/client";

export type ApolloClientProps = {
    link: ApolloLink;
    ssr?: boolean;
};

export function createApolloClient(config: ApolloClientProps) {
    const {
        link,
        ssr,
    } = config;

    const defaultOptions: Record<string, any> = {fetchPolicy: "cache-and-network"};

    return new ApolloClient({
        ssrMode: ssr,
        defaultOptions,
        connectToDevTools: true,
        link,
        ssrForceFetchDelay: 100,
        cache: ssr
            ? new InMemoryCache()
            : new InMemoryCache().restore((window as any)?.apollo ?? {}),
    });
}
