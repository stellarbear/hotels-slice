import {useSubscription} from "@apollo/client";
import React from "react";
import {NOTIFICATION_SUBSCRIPTION} from "../../@query";
import {NotificationSubscription} from "../../interfaces";
import {useStoreNotifications} from "./store";

const doc = NOTIFICATION_SUBSCRIPTION;
type Subscription = NotificationSubscription;

type Props = {
    current?: number;
};

export const SubscriptionNotification = React.memo<Props>((props) => {
    const {current} = props;
    const notifications = useStoreNotifications();

    React.useEffect(() => {
        notifications.init(current);
    }, [current]);

    useSubscription<Subscription>(doc, {
        onData: () => {
            notifications.modify(1);
        },
    });

    return null;
});
