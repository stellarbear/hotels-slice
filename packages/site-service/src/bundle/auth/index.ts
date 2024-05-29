import {useAuthorization} from "./AuthorizationProviderToken";
import {environment} from "./environment";

environment();

export * from "./AuthorizationProvider";
export * from "./AuthorizationSection";
export {useAuthorization};

