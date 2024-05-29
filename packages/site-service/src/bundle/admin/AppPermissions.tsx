import {expect, isString} from "@app/extensions-guard";
import * as React from "react";
import {Outlet} from "react-router";
import {useAuthorization} from "../auth";

type Permissions =
    | "FULL_ACCESS"
    | "MANAGER"
    | "MANAGER_REPORT_USERS_PROFILE";

const isPermissions = expect({
    permissions: isString,
});

//  перетащить процент (только суперадмин может назначать)

type Props = {
    allow: Permissions[] | Permissions;
    children?: React.ReactNode;
};

export const AppPermissions = React.memo<Props>((props) => {
    const {allow, children = <Outlet />} = props;

    const hasPermissions = usePermissions();
    const isAllowed = React.useMemo(() =>
        hasPermissions(...Array.isArray(allow) ? allow : [allow]),
        [allow]);

    if (!isAllowed) {
        return null;
    }

    return (
        <>{children}</>
    );
});

export const usePermissions = () => {
    const auth = useAuthorization();
    const [permissions] = React.useState(() => new Set(
        isPermissions(auth.meta) ? [auth.meta.permissions] : [],
    ));

    const isAllowed = React.useCallback((...allow: Permissions[]) =>
        allow.some(entry => permissions.has(entry)),
        [permissions]);

    return isAllowed;
};
