import {ExtensionsApollo} from "@app/extensions-apollo";
import {useStateLocal} from "@app/extensions-react";
import * as React from "react";
import {FCM} from "../../@shared";
import {AUTH_VALIDATE_TOKEN_QUERY} from "./@query";
import {AuthValidateTokenQuery, AuthValidateTokenQueryVariables} from "./interfaces";
import {isString} from "@app/extensions-guard";

type Props = {
    expect?: string;

    children: React.ReactNode;
};

const LS_TOKEN = "$";
const doc = AUTH_VALIDATE_TOKEN_QUERY;
type Query = AuthValidateTokenQuery;
type Variables = AuthValidateTokenQueryVariables;

type AuthorizationContext = {
    token: string | null;
    meta: Record<string, unknown>;
    loading: boolean;

    logOut: () => void;
    update: (token: string) => void;
};

const AuthorizationContext = React.createContext({} as AuthorizationContext);

const validateTokenQuery = ExtensionsApollo.Query
    .from<Query, Variables>(doc);

export const AuthorizationProviderToken = React.memo<Props>((props) => {
    const {children, expect} = props;

    const [token, setToken] = useStateLocal(LS_TOKEN, null, isString);
    const logOut = React.useCallback(() => setToken(null), []);

    const query = validateTokenQuery
        .withConfiguration({
            skip: !token,
            variables: {
                input: {
                    token: token ?? "skip",
                    fcmToken: FCM.get(),
                },
            },
        })
        .onError(logOut)
        .compile();

    const validated = token && query.data?.validateToken.type === expect;

    const context = React.useMemo(() => ({
        logOut,
        update: setToken,

        loading: query.loading,
        meta: validated ? (query.data?.validateToken.meta ?? {}) : {},
        token: validated ? token : null,
    }), [query, logOut, setToken, token, validated]);

    return (
        <AuthorizationContext.Provider value={context}>
            {children}
        </AuthorizationContext.Provider>
    );
});

export const useAuthorization = () => React.useContext(AuthorizationContext);
