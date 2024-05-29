import {ExtensionsApollo} from "@app/extensions-apollo";
import {useAsyncOp} from "@app/extensions-react";
import {ControllerImage} from "@app/ui-web-controls";
import {Flex, Responsive} from "@app/ui-web-core";
import {useNotification} from "@app/ui-web-kit";
import * as React from "react";
import {MainContainer, useUpload} from "../../../@components";
import {EXECUTER_UPDATE_AVATAR_MUTATION} from "../../../@query";
import {ExecuterUpdateAvatarMutation, ExecuterUpdateAvatarMutationVariables} from "../../../interfaces";

const doc = EXECUTER_UPDATE_AVATAR_MUTATION;
type Mutation = ExecuterUpdateAvatarMutation;
type Variables = ExecuterUpdateAvatarMutationVariables;
export type InputForm = Variables["input"];

const mutationAccountAvatarUpdate = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const AccountAvatar = React.memo(() => {
    const {uploadMultiple} = useUpload("AVATAR");
    const {me} = MainContainer.use();

    const notification = useNotification.snackbar();
    const [mutation] = mutationAccountAvatarUpdate
        .onSuccess(() => notification.success("Изменения сохранены"))
        .compile();

    const [onSubmit, ready] = useAsyncOp(async (input: InputForm["avatar"]) => {
        await mutation({
            variables: {
                input: {
                    avatar: await uploadMultiple(input),
                },
            },
        });
    }, []);

    return (
        <Responsive
            component={Flex.Row}
            mobile={{justify: "center"}}
            desktop={{justify: "flex-start"}}>
            <ControllerImage
                url={executer.URL_FS}
                variant="circle"
                value={me.profilePic}
                onChange={onSubmit}
                disabled={!ready}
            />
        </Responsive>
    );
});
