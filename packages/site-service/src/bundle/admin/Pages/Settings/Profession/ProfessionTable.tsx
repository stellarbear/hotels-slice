import {Flex, SwitchUnion} from "@app/ui-web-core";
import {Button, Dialog, Dropdown, Table} from "@app/ui-web-kit";
import * as React from "react";
import {ActionProfessionUpsert} from "../../../@actions";
import {queryProfessionAll} from "./Profession";

type Props = {
};

export const ProfessionTable = React.memo<Props>(() => {
    const [data] = queryProfessionAll.use();
    const professions = data.professions;

    const Factory = Table.Factory(professions);

    return (
        <Flex.Col>
            <Flex.Row justify="flex-end">
                <Dialog.Handle button={<Button>Создать</Button>}>
                    <ActionProfessionUpsert />
                </Dialog.Handle>
            </Flex.Row>

            <Factory.Body items={professions} view="full-width">
                <Factory.Column name="name" title="Название" align="left" />
                <Factory.Column name="description" title="Описание услуги" />
                <Factory.Column title="Цена">
                    {({rateMax, rateMin, rateStep}) => (
                        `${rateMin} -> ${rateMax} с шагом ${rateStep}`
                    )}
                </Factory.Column>
                <Factory.Column name="percent" title="Процент" />
                <Factory.Column title="Исчисление">
                    {(data) => (
                        <SwitchUnion
                            value={data.numerate}
                            as={[
                                ["HOUR", () => "Часы"],
                                ["SUIT", () => "Номера"],
                            ]} />

                    )}
                </Factory.Column>
                <Factory.Column title="Действия" align="center">
                    {(record) => (
                        <Dropdown.Handle>
                            <Dialog.Handle
                                button={
                                    <Dropdown.Item>
                                        Редактировать
                                    </Dropdown.Item>
                                }>
                                <ActionProfessionUpsert record={record} />
                            </Dialog.Handle>
                        </Dropdown.Handle>
                    )}
                </Factory.Column>
            </Factory.Body>
        </Flex.Col>
    );
});
