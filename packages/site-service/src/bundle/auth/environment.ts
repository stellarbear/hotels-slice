declare const DEVELOPMENT: boolean;
declare const PRODUCTION: boolean;

declare const HOST_GRAPHQL: string;

const variables = {
    PRODUCTION,
    DEVELOPMENT,
    
    URL_GRAPHQL: `https://${HOST_GRAPHQL}`,
    URL_GRAPHQL_SOCKET: `wss://${HOST_GRAPHQL}`,
    URL_GRAPHQL_SCHEMA: "graphql/",
};

export const environment = () => {
    globalThis.auth = variables;
};

export type EnvironmentVariables = typeof variables;

/* eslint-disable no-var */
declare global {
    var auth: EnvironmentVariables;
}
