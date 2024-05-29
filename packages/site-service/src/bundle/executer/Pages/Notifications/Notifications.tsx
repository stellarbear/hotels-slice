import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {fp} from "@app/extensions-fp";
import {usePagination, useQueryParams} from "@app/extensions-react";
import {Flex} from "@app/ui-web-core";
import {Breadcrumbs, Pagination, Query, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {NOTIFICATION_ALL_QUERY} from "../../@query";
import {ERoute} from "../../AppRoutes";
import {NotificationAllQuery, NotificationAllQueryVariables} from "../../interfaces";
import {NotificationsFilter} from "./NotificationsFilter";
import {NotificationsForm} from "./NotificationsForm";
import {NotificationsReadAll} from "./NotificationsReadAll";


const doc = NOTIFICATION_ALL_QUERY;
type Query = NotificationAllQuery;
type Variables = NotificationAllQueryVariables;
export type NotificationFilters = Variables["input"];

export const queryNotificationAllPagination = ExtensionsApollo.Query
    .from<Query, Variables>(doc)
    .context();

export const Notifications = React.memo(() => {
    Breadcrumbs.add({to: ERoute.notifications, crumb: "Уведомления"});

    const [paramsPagination, setParamsPagination] = useQueryParams(p => ({
        first: p.number.defaults(10),
        offset: p.number,
    }));
    const pagination = usePagination({
        onChange: setParamsPagination,
        defaults: paramsPagination,
    });

    const [paramsForm, setParamsForm] = useQueryParams(p => ({
        type: p.union(
            "ACCOUNT",
            "FINANCE",
            "OTHER",
            "TASK",
        ).defaults(null),
    }));

    const form = ExtensionsForm.useForm<NotificationFilters>({
        defaultValues: paramsForm,
        onChange: fp.apply(setParamsForm, pagination.reset),
    });

    const query = queryNotificationAllPagination
        .query({
            __typename: "Query",
            getReadNotifications: {
                totalCount: 0,
                edges: [],
            },
        })
        .withConfiguration({variables: {input: form.getValues(), ...pagination.state}})
        .compile();

    pagination.register(query.data?.getReadNotifications.totalCount);

    return (
        <>
            <Flex.Col>
                <Flex.Row align="center" justify="space-between">
                    <Typo.Title>Уведомления</Typo.Title>
                    <NotificationsFilter form={form} />
                </Flex.Row>

                <Query.Async query={query}>
                    <Query.Overlay>
                        <NotificationsForm />
                    </Query.Overlay>

                    <Query.Await>
                        <Pagination {...pagination} />
                    </Query.Await>
                </Query.Async>
            </Flex.Col>

            <NotificationsReadAll />
        </>
    );
});
