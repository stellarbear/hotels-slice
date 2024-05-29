import {Flex} from "@app/ui-web-core";
import {Tab, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {useNavigate, useParams} from "react-router";
import {ERoute} from "../../AppRoutes";
import {ExecuterActivity} from "./ExecuterActivity";
import {ExecuterDocuments} from "./ExecuterDocuments";
import {ExecuterList} from "./ExecuterList";

export enum ERoutesExecuter {
    activity = "activity",
    documents = "documents",
    list = "list",
}

type Params = {
    type: ERoutesExecuter;
};

export const ExecuterTabs = React.memo(() => {
    const params = useParams<Params>();
    const navigate = useNavigate();

    const urlReplace = React.useCallback((type?: string) =>
        type && navigate(`${ERoute.executer}/${type}`), []);

    return (
        <Flex.Col>
            <Typo.Title>Исполнители</Typo.Title>
            
            <Tab.Handle onTabChange={urlReplace} defaultId={params.type}>
                <Tab.Item title="Список исполнителей" id={ERoutesExecuter.list}>
                    <ExecuterList />
                </Tab.Item>
                <Tab.Item title="Активность исполнителей" id={ERoutesExecuter.activity}>
                    <ExecuterActivity />
                </Tab.Item>
                <Tab.Item title="Документы исполнителей" id={ERoutesExecuter.documents}>
                    <ExecuterDocuments />
                </Tab.Item>
            </Tab.Handle>
        </Flex.Col>
    );
});
