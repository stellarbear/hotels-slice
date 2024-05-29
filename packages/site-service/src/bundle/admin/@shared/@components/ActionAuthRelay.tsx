import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsForm} from "@app/extensions-form";
import {useOverlay} from "@app/ui-web-core";
import {Dialog, Form} from "@app/ui-web-kit";
import * as React from "react";
import {AUTH_SIGN_IN_RELAY_MUTATION} from "../../@query";
import {AuthSignInRelayMutation, AuthSignInRelayMutationVariables} from "../../interfaces";

const doc = AUTH_SIGN_IN_RELAY_MUTATION;
type Mutation = AuthSignInRelayMutation;
type Variables = AuthSignInRelayMutationVariables;
type InputForm = Variables["input"];

const mutationAuthRelay = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export type AuthRole = "executer" | "manager";

const originMap: Record<AuthRole, string> = {
    "executer": "e",
    "manager": "m",
};

type Props = {
    role: AuthRole;
    id: string;
};

export const ActionAuthRelay = React.memo<Props>((props) => {
    const {role, id} = props;

    const overlay = useOverlay();
    const [mutation, {loading}] = mutationAuthRelay
        .onSuccess(() => {
            overlay.close();
        })
        .compile();

    const form = ExtensionsForm.useForm<InputForm>({
        defaultValues: {id, role},
    });

    const onSubmit = React.useCallback(async (input: InputForm) => {
        const response = await mutation({variables: {input}});
        const token = response.data?.adminGetAccessByRoleAndId.token;

        if (token) {
            const origin = window.origin.replace("//a.", `//${originMap[role]}.`);
            const link = `${origin}/relay/${token}`;

            //  This won't work on some browsers 
            //  as well will override the previous tab
            // window.open(link, "_newtab");

            const container = document.createElement("a");
            container.rel = "noreferrer";
            container.href = link;
            container.target = "self";

            document.body.appendChild(container);
            container.click();
            document.body.removeChild(container);
        }
    }, []);

    return (
        <Form.Handle onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.Header>Авторизоваться?</Dialog.Header>
            <Dialog.Content loading={loading}>
                <div>Вы будете перенаправлены в профиль авторизуемого объекта</div>
            </Dialog.Content>

            <Dialog.Actions loading={loading}>
                <Dialog.ButtonCancel />
                <Dialog.ButtonSubmit />
            </Dialog.Actions>
        </Form.Handle>
    );
});
