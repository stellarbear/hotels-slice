import {Icon} from "@app/ui-icons";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Card, Typo} from "@app/ui-web-kit";
import React from "react";
import {TypeAgreement} from "../../../interfaces";
import {queryDocumentsAll} from "./DocumentList";

const docs: TypeAgreement[] = [
    "OFFER",
    "PERSONAL_DATA_AGREEMENT",
];

const dataDocumentAgreement: Record<TypeAgreement, string> = {
    "LICENSE_AGREEMENT": "Лицензионное соглашение",
    "OFFER": "Договор-оферта",
    "PERSONAL_DATA_AGREEMENT": "Согласие на обработку персональных данных",
    "USER_AGREEMENT": "Пользовательское соглашение",
};

type Props = {
};

export const DocumentListForm = React.memo<Props>(() => {
    const [data] = queryDocumentsAll.use();
    const documents = data.allGetAgreementsTypes;

    const available = React.useMemo(() => new Set(documents), [documents]);
    const filtered = React.useMemo(() => docs.filter(o => available.has(o)), []);

    return (
        <Flex.Col>
            {filtered.map((doc, index) => (
                <Card key={index}>
                    <Link blank external to={`${executer.URL_DOMAIN}/document/${doc}`} >
                        <Flex.Row>
                            <Colored color="success">
                                <Icon icon="doc" />
                            </Colored>
                            <Typo.p>
                                {dataDocumentAgreement[doc]}
                            </Typo.p>
                        </Flex.Row>
                    </Link>
                </Card>
            ))}
        </Flex.Col>
    );
});
