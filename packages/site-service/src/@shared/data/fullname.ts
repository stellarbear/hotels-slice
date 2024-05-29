import {isString} from "@app/extensions-guard";

type BaseType = {
    middleName: string;
    firstName: string;
    secondName?: string | null;
};

export const getFullName = <T extends BaseType>(me: T) => {
    return ([
        me.middleName,
        me.firstName,
        me.secondName,
    ]
        .filter(isString)
        .join(" "));
};
