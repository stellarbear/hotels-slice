import {ExtensionsForm} from "@app/extensions-form";
import * as React from "react";
import {FilterBySelect} from "../../@filters";
import {NotificationFilters} from "./Notifications";

type Props = {
    form: ExtensionsForm.Result<NotificationFilters>;
};

export const NotificationsFilter = React.memo<Props>((props) => {
    const {form} = props;

    return (
        <FilterBySelect
            form={form}
            name="type"
            label="Группировка"
            items={[
                {id: "ACCOUNT", name: "Аккаунт"},
                {id: "FINANCE", name: "Финансы"},
                {id: "TASK", name: "Заявки"},
                {id: "OTHER", name: "Другие"},
            ]}
            getId={e => e.id}
            getLabel={e => e.name}
        />
    );
});
