import {Flex} from "@app/ui-web-core";
import {Typo} from "@app/ui-web-kit";
import * as React from "react";
import {queryNotificationAllPagination} from "./Notifications";

export const NotificationsForm = React.memo(() => {
    const [data] = queryNotificationAllPagination.use();
    const notifications = React.useMemo(() =>
        data.getReadNotifications.edges.map(e => e.node), [data]);

    return (
        <Flex.Col>
            {notifications.map((entry, index) => (
                <div key={index}>
                    <Typo.p>
                        {entry.text}
                    </Typo.p>

                    <Typo.Caption color="secondary">
                        {new Date(entry.createdAt).toLocaleString()}
                    </Typo.Caption>
                </div>
            ))}
        </Flex.Col>
    );
});
