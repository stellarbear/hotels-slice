import {ExtensionsApollo} from "@app/extensions-apollo";
import {Flex} from "@app/ui-web-core";
import {Alert, Button, Loader} from "@app/ui-web-kit";
import * as React from "react";
import {Link, useParams} from "react-router-dom";
import {EXECUTER_VERIFICATION_CONFIRM_MUTATION} from "../../../@query";
import {ExecuterVerificationConfirmMutation, ExecuterVerificationConfirmMutationVariables} from "../../../interfaces";

const doc = EXECUTER_VERIFICATION_CONFIRM_MUTATION;
type Mutation = ExecuterVerificationConfirmMutation;
type Variables = ExecuterVerificationConfirmMutationVariables;

type Params = "paymentid";

const executerVerificationConfirmMutation = ExtensionsApollo.Mutation
    .from<Mutation, Variables>(doc);

export const AccountVerificationConfirm = React.memo(() => {
    const params = useParams<Params>();
    const paymentId = params.paymentid;

    const [mutation, handle] = executerVerificationConfirmMutation
        .compile();

    React.useEffect(() => {
        mutation({variables: {paymentId}});
    }, [paymentId]);

    return (
        <Flex.Col>
            {(!handle.called || handle.loading) && (
                <Alert color="secondary">
                    <Flex.Row justify="space-between" align="center" flex>
                        <div>
                            <div>Проверяем платеж</div>
                            <div>Не закрывайте страницу</div>
                        </div>
                        <Loader.Spinner />
                    </Flex.Row>
                </Alert>
            )}

            {handle.error && (
                <Alert color="error">
                    {handle.error.message}
                </Alert>
            )}

            {handle.data && (
                <Flex.Col>
                    <Alert color="primary">
                        <div>Платеж успешно подтвержден</div>
                    </Alert>
                    <Button>
                        <Link to="..">
                            Вернуться в аккаунт
                        </Link>
                    </Button>
                </Flex.Col>
            )}
        </Flex.Col>
    );
});
