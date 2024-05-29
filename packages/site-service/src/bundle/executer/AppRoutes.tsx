import {ExtensionsSentry} from "@app/extensions-sentry";
import {Icon} from "@app/ui-icons";
import {Routing} from "@app/ui-web-core";
import * as React from "react";
import {LayoutNavigation, getFullName} from "../../@shared";
import {MainContainer} from "./@components";
import {Header} from "./Header";
import {
    Account, Bookmarks, Customers, Document,
    Information, News, Notifications, Report, Tasks, TasksMine
} from "./Pages";

export enum ERoute {
    account = "/account",
    tasks = "/tasks",
    personal = "/personal",
    reports = "/reports",
    information = "/information",
    bookmarks = "/bookmarks",
    documents = "/documents",
    notifications = "/notifications",
    debug = "/debug",
    main = "/home",
    news = "/news",
}

const options = [
    {title: "Главная страница", to: ERoute.main, icon: <Icon icon="main" />},
    {title: "Заявки", to: ERoute.tasks, icon: <Icon icon="task" />},
    {title: "Принятые заявки", to: ERoute.personal, icon: <Icon icon="task_accepted" />},
    {title: "Избранное", to: ERoute.bookmarks, icon: <Icon icon="bookmark_filled" />},
    {title: "Отчеты", to: ERoute.reports, icon: <Icon icon="report" />},
    {title: "Новости", to: ERoute.news, icon: <Icon icon="news" />},
    {title: "Документы", to: ERoute.documents, icon: <Icon icon="doc" />},
    {title: "Помощь", to: ERoute.information, icon: <Icon icon="help" />},
];

export const AppRoutes = React.memo(() => {
    const {me} = MainContainer.use();

    React.useEffect(() => {
        ExtensionsSentry.Tracker.use((sentry) => {
            sentry.setUser({
                id: me.id,
                username: `e: [${me.id}]: ${getFullName(me)}`,
                email: me.email,
            });
        });
    }, []);

    return (
        <LayoutNavigation
            header={<Header />}
            options={options}>
            <Routing.Routes>
                <Routing.Route path={`${ERoute.main}/*`} element={<Customers />} />
                <Routing.Route path={`${ERoute.tasks}/*`} element={<Tasks />} />
                <Routing.Route path={`${ERoute.account}/*`} element={<Account />} />

                <Routing.Route path={ERoute.personal} element={<TasksMine />} />
                <Routing.Route path={ERoute.reports} element={<Report />} />
                <Routing.Route path={ERoute.information} element={<Information />} />
                <Routing.Route path={ERoute.bookmarks} element={<Bookmarks />} />
                <Routing.Route path={ERoute.documents} element={<Document />} />
                <Routing.Route path={ERoute.news} element={<News />} />
                <Routing.Route path={ERoute.notifications} element={<Notifications />} />

                <Routing.Route path="*" element={<Routing.Navigate to={ERoute.main} replace />} />
            </Routing.Routes>
        </LayoutNavigation>
    );
});
