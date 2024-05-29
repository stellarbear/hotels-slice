import {ExtensionsDate} from "@app/extensions-classes";
import {Flex, Mobile} from "@app/ui-web-core";
import {Button, Dialog, Divider, Form, Input, Modal, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {useAuthorization} from "../../../auth";
import {ActionExecuterDeactivate, ActionExecuterPasswordSet} from "../../@actions";
import {MainContainer} from "../../@components";

export const AccountSecurity = React.memo(() => {
    const {me} = MainContainer.use();
    const {logOut} = useAuthorization();

    return (
        <Flex.Col>
            <Form.Handle>
                <Form.Body>
                    <Form.Field>
                        <Form.Label>Пароль</Form.Label>
                        <Flex.Row justify="space-between">
                            <div>
                                <Typo.Caption>Дата последнего изменения:</Typo.Caption>
                                {ExtensionsDate.format("y.m.d H:M", me.updatePasswordAt)}
                            </div>
                            <Modal button={
                                <Button>Изменить пароль</Button>
                            }>
                                <ActionExecuterPasswordSet />
                            </Modal>
                        </Flex.Row>
                    </Form.Field>
                </Form.Body>
            </Form.Handle>

            <Divider />

            <Form.Handle>
                <Form.Body>
                    <Form.Field>
                        <Form.Label>Телефон</Form.Label>
                        <Input
                            readOnly
                            value={me.phoneNumber}
                        />
                    </Form.Field>
                </Form.Body>

                <Mobile>
                    <Flex.Cell flex />
                </Mobile>

                <Form.Body>
                    <Form.Field>
                        <Dialog.Handle button={<Button color="error" variant="text">Удалить аккаунт</Button>}>
                            <ActionExecuterDeactivate onDeactivate={logOut} />
                        </Dialog.Handle>
                    </Form.Field>
                </Form.Body>
            </Form.Handle>
        </Flex.Col>
    );
});
