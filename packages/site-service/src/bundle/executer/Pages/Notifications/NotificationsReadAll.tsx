import {ExtensionsApollo} from "@app/extensions-apollo";
import * as React from "react";
import {NOTIFICATION_READ_MUTATION} from "../../@query";
import {useStoreNotifications} from "../../@subscription";
import {NotificationReadMutation} from "../../interfaces";

const doc = NOTIFICATION_READ_MUTATION;
type Mutation = NotificationReadMutation;

const mutationNotificationsReadAll = ExtensionsApollo.Mutation
    .from<Mutation>(doc);

export const NotificationsReadAll = React.memo(() => {
    const reset = useStoreNotifications(s => s.reset);
    const [read] = mutationNotificationsReadAll
        .onSuccess(reset)
        .compile();

    React.useEffect(() => {
        read();
    }, []);

    return null;
});
