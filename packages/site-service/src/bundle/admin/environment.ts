declare const DEVELOPMENT: boolean;
declare const PRODUCTION: boolean;

declare const HOST_FS: string;
declare const SENTRY_KEY: string | undefined;

const variables = {
    PRODUCTION,
    DEVELOPMENT,

    URL_FS: `https://${HOST_FS}`,
    SENTRY_KEY: PRODUCTION && SENTRY_KEY,
};

export const environment = () => {
    globalThis.admin = variables;
};

export type EnvironmentVariables = typeof variables;

/* eslint-disable no-var */
declare global {
    var admin: EnvironmentVariables;
}
