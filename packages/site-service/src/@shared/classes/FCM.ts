import {expect, isString} from "@app/extensions-guard";
import {useWindowEvent} from "@app/extensions-react";

const validate = expect({
    value: isString,
    type: isString,
});

const LS_FCM_TOKEN = "fcm_token";

export class FCM {
    public static set(value: string) {
        return localStorage.setItem(LS_FCM_TOKEN, value);
    }

    public static get() {
        return localStorage.getItem(LS_FCM_TOKEN);
    }

    public static use() {
        useWindowEvent("message", (message) => {
            const data = message.data;

            if (validate(data) && data.type === "token") {
                localStorage.setItem(LS_FCM_TOKEN, data.value);
            }
        });
    }
}
