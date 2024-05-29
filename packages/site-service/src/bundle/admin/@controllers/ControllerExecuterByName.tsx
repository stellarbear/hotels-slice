import {ExtensionsApollo} from "@app/extensions-apollo";
import {ControllerInputSearch} from "@app/ui-web-controls";
import {Typo} from "@app/ui-web-kit";
import * as React from "react";
import {getFullName} from "../../../@shared";
import {EXECUTER_GET_BY_NAME_QUERY} from "../@query";
import {ExecuterGetByNameQuery, ExecuterGetByNameQueryVariables} from "../interfaces";

const doc = EXECUTER_GET_BY_NAME_QUERY;
type Query = ExecuterGetByNameQuery;
type Variables = ExecuterGetByNameQueryVariables;
const queryFilterExecuter = ExtensionsApollo.Query
    .from<Query, Variables>(doc);

type Props = {
    value?: string | null;
    onChange: (...event: any[]) => void;

    variables?: Partial<Variables["input"]>;
};
/**
 * @deprecated since version 2.0.0
 */
export const ControllerExecuterByName = React.memo<Props>((props) => {
    const {value, onChange} = props;

    const [query] = queryFilterExecuter
        .lazy();

    const handle = React.useCallback((variables: Variables) =>
        query({variables}).then(e => e.data?.adminGetExecuterByName ?? []), []);

    return (
        <ControllerInputSearch
            query={handle}
            value={value}
            getId={e => e.id}
            onChange={onChange}
            variables={name => ({input: {...props.variables, name}})}
            getLabel={e => (
                <div>
                    <div>{getFullName(e)}</div>
                    <Typo.Caption>{e.inn}</Typo.Caption>
                </div>
            )}
            placeholder="Имя исполнителя (от 3 символов)"
        />
    );
});

