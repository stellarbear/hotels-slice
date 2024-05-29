import {ExtensionsDate} from "@app/extensions-classes";
import {ExtensionsForm} from "@app/extensions-form";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Table} from "@app/ui-web-kit";
import React from "react";
import {FilterByDate, FilterBySelect, getFullName} from "../../../../../@shared";
import {FilterByString} from "../../../@filters";
import {ExecuterDocumentsFilters, queryExecuterDocuments} from "./ExecuterDocuments";

type Props = {
    form: ExtensionsForm.Result<ExecuterDocumentsFilters>;
};

export const ExecuterDocumentsTable = React.memo<Props>((props) => {
    const {form} = props;

    const [data] = queryExecuterDocuments.use();
    const activity = React.useMemo(() =>
        data.adminAllExecuters.edges.map(e => e.node), [data]);

    const Factory = Table.Factory(activity);

    return (
        <Factory.Body items={activity} view="full-width">
            <Factory.Column name="id" title={
                <FilterByString label="ID" form={form} name="id" />
            } />
            <Factory.Column align="left" title={
                <FilterByString label="ФИО" form={form} name="fullName" />
            }>
                {(executer) => (
                    <Colored color="primary">
                        <Link to={`../entry/${executer.id}`}>
                            <b>
                                {getFullName(executer)}
                            </b>
                        </Link>
                    </Colored>
                )}
            </Factory.Column>
            <Factory.Column align="left" title={
                <FilterByDate form={form} name="agreementDatetime" label="Дата подписания" />
            } >
                {(executer) => (
                    ExtensionsDate.format("d.m.y", executer.agreementDatetime, "-")
                )}
            </Factory.Column>
            <Factory.Column align="left" title={
                <FilterBySelect
                    items={["Российская Федерация", "Иное"]}
                    getId={((e)=>e)}
                    getLabel={((e)=>e)}
                    form={form}
                    name="citizenship"
                    label="Гражданство" />
            } name="citizenship" />
            <Factory.Column title="Уведомления">
                {({notice}) => (
                    <Flex.Col>
                        {notice?.files.map((file, index) => (
                            <Colored color="primary" key={index}>
                                <Link external to={file.url}>
                                    <b>
                                        {file.fileName}
                                    </b>
                                </Link>
                            </Colored>
                        ))}
                    </Flex.Col>
                )}
            </Factory.Column>
        </Factory.Body>
    );
});
