import {ExtensionsReact, sizes} from "@app/extensions-react";
import {Overlay, ThemeMount} from "@app/ui-web-core";
import * as React from "react";
import {createRoot} from "react-dom/client";
import styled from "styled-components";
import {SnackbarOption} from "./SnackbarOption";
import {NotificationConfiguration, NotificationState} from "./interface";

export class NotificationSnackbar {
    private static id = "notification-snackbar";
    private static mounted = false;

    private static iteration = 0;
    private static notifications = [] as NotificationState[];
    private static setNotifications: React.Dispatch<React.SetStateAction<NotificationState[]>>;

    private static notify(configuration: NotificationConfiguration) {
        const id = NotificationSnackbar.iteration++ + 1;

        if (NotificationSnackbar.setNotifications) {
            NotificationSnackbar.setNotifications((prev) => [...prev, {id, configuration}]);
        } else {
            //  We can't wait for mount in R18, thus we have a default state
            NotificationSnackbar.notifications.push({id, configuration});
        }
    }

    public static use() {
        if (!NotificationSnackbar.mounted) {
            NotificationSnackbar.mount();
        }

        return {
            success: (label: string, timeout = 4_000) =>
                NotificationSnackbar.notify({color: "success", label, timeout}),
            info: (label: string, timeout = 5_000) =>
                NotificationSnackbar.notify({color: "secondary", label, timeout}),
            error: (label: string, timeout = 5_000) =>
                NotificationSnackbar.notify({color: "error", label, timeout}),
        };
    }

    public static mount(id: string = NotificationSnackbar.id) {
        NotificationSnackbar.id = id;
        NotificationSnackbar.mounted = true;
        const Component = NotificationSnackbar.component;

        return createRoot(ExtensionsReact.getDomNode(id)).render(
            <ThemeMount>
                <Component />
            </ThemeMount>,
        );
    }

    private static component() {
        const [notifications, setNotifications] = React.useState(NotificationSnackbar.notifications);
        NotificationSnackbar.setNotifications = setNotifications;

        const unmount = React.useCallback(
            (id: number) => () => {
                setNotifications((prev) => prev.filter((e) => e.id !== id));
            },
            [],
        );

        return (
            <Overlay.Orphan prefix="notification-snackbar" opened zindex={30000}>
                <SnackbarContent>
                    {notifications.map(({id, configuration}) => (
                        <SnackbarOption key={id} configuration={configuration} unmount={unmount(id)} />
                    ))}
                </SnackbarContent>
            </Overlay.Orphan>
        );
    }
}


const SnackbarContent = styled.div`
    position: fixed;
    display: flex;
    max-width: calc(100vw - 3rem);
    right: 1.5rem;
    z-index: 1000;
    gap: 0.5rem;

    @media (max-width: ${sizes.sm}px) {
        flex-direction: column-reverse;
        top: 1.5rem;
    }
    @media (min-width: ${sizes.sm}px) {
        flex-direction: column;
        bottom: 1.5rem;
    }
`;
