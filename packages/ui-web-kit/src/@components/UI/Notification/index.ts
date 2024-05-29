import {NotificationSnackbar} from "./Snackbar";
import {NotificationTemplate} from "./Template";

export const Notification = {
    Snackbar: NotificationSnackbar,
    Template: NotificationTemplate,
};

export const useNotification = {
    snackbar: () => NotificationSnackbar.use(),
    template: () => NotificationTemplate.use(),
};
