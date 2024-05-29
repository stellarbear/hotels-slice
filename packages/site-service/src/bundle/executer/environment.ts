declare const DEVELOPMENT: boolean;
declare const PRODUCTION: boolean;

declare const HOST_FS: string;
declare const HOST_DOMAIN: string;

declare const YM_COUNTER: string;
declare const MAP_YANDEX_KEY: string;
declare const MAP_2GIS_KEY: string;
declare const DADATA_KEY: string;
declare const CARD_REFERRAL_RU: string;
declare const CARD_REFERRAL_NON_RU: string;
declare const EXECUTER_CHAT_ID: string;
declare const SBER_BUSINESS_PARTNER_ID: string;
declare const SBER_BUSINESS_PARTNER_REF: string;
declare const SENTRY_KEY: string | undefined;

const variables = {
    PRODUCTION,
    DEVELOPMENT,

    URL_FS: `https://${HOST_FS}`,
    URL_DOMAIN: `https://${HOST_DOMAIN}`,

    CARD_REFERRAL_RU,
    CARD_REFERRAL_NON_RU,

    CHAT_ID: PRODUCTION && EXECUTER_CHAT_ID,

    SBER_BUSINESS_PARTNER_ID,
    SBER_BUSINESS_PARTNER_REF,

    MAP_YANDEX_KEY,
    MAP_2GIS_KEY,
    
    DADATA_KEY,
    YM_COUNTER: PRODUCTION && YM_COUNTER,
    SENTRY_KEY: PRODUCTION && SENTRY_KEY,
};

export const environment = () => {
    globalThis.executer = variables;
};

export type EnvironmentVariables = typeof variables;

/* eslint-disable no-var */
declare global {
    var executer: EnvironmentVariables;
}
