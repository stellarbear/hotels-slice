import {Icon} from "@app/ui-icons";
import {Flex, Routing} from "@app/ui-web-core";
import {Breadcrumbs} from "@app/ui-web-kit";
import * as React from "react";
import {Navigate} from "react-router";
import {LayoutNavigation} from "../../@shared";
import {MainContainer} from "./@components";
import {AppPermissions, usePermissions} from "./AppPermissions";
import {Customer, Document, Executer, Information, News, Payment, Report, Settings, Task} from "./Pages";

export enum ERoute {
    document = "/document",
    information = "/information",
    payment = "/payment",
    executer = "/executer",
    report = "/report",
    news = "/news",
    customer = "/customer",
    settings = "/settings",
    task = "/task"
}

export const AppRoutes = React.memo(() => {
    const {me} = MainContainer.use();
    const allow = usePermissions();

    const [options] = React.useState(() => [
        {title: "Отчеты", to: ERoute.report, icon: <Icon icon="doc" />},
        {title: "Заказчики", to: ERoute.customer, icon: <Icon icon="customer" />},
        {title: "Исполнители", to: ERoute.executer, icon: <Icon icon="executer" />},
        {title: "Заявки", to: ERoute.task, icon: <Icon icon="task" />},
        allow("FULL_ACCESS", "MANAGER_REPORT_USERS_PROFILE") &&
        {title: "Документы", to: ERoute.document, icon: <Icon icon="doc" />},
        allow("FULL_ACCESS") &&
        {title: "Выплаты", to: ERoute.payment, icon: <Icon icon="doc" />},
        allow("FULL_ACCESS") &&
        {title: "Настройки", to: ERoute.settings, icon: <Icon icon="settings" />},
        {title: "Новости", to: ERoute.news, icon: <Icon icon="news" />},
        {title: "Помощь", to: ERoute.information, icon: <Icon icon="help" />},

    ]);

    return (
        <LayoutNavigation
            header={
                <Flex.Row justify="space-between" align="center" flex>
                    <Breadcrumbs.Header />
                    <>{me.name}</>
                </Flex.Row>
            }
            options={options} >
            <Routing.Routes>
                <Routing.Route path={ERoute.news} element={<News />} />
                <Routing.Route path={ERoute.report} element={<Report />} />
                <Routing.Route path={ERoute.information} element={<Information />} />
                <Routing.Route path={`${ERoute.executer}/*`} element={<Executer />} />
                <Routing.Route path={`${ERoute.customer}/*`} element={<Customer />} />
                <Routing.Route path={`${ERoute.task}/*`} element={<Task />} />


                <Routing.Route element={<AppPermissions allow={["FULL_ACCESS", "MANAGER_REPORT_USERS_PROFILE"]} />}>
                    <Routing.Route path={`${ERoute.document}/*`} element={<Document />} />
                </Routing.Route>

                <Routing.Route element={<AppPermissions allow="FULL_ACCESS" />}>
                    <Routing.Route path={`${ERoute.payment}/*`} element={<Payment />} />
                    <Routing.Route path={`${ERoute.settings}/*`} element={<Settings />} />
                </Routing.Route>

                <Routing.Route path="*" element={<Navigate to={ERoute.customer} replace />} />
            </Routing.Routes>
        </LayoutNavigation>
    );
});
