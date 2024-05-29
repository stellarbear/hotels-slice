import {ExtensionsApollo} from "@app/extensions-apollo";
import {ControllerInputSearch} from "@app/ui-web-controls";
import {Typo} from "@app/ui-web-kit";
import * as React from "react";
import {CUSTOMER_GET_BY_NAME_OR_INN_QUERY} from "../@query";
import {
    CustomerGetByNameOrInnQuery,
    CustomerGetByNameOrInnQueryVariables
} from "../interfaces";

type Props = {
    value?: string | null;
    onChange: (...event: any[]) => void;
};

const doc = CUSTOMER_GET_BY_NAME_OR_INN_QUERY;
type Query = CustomerGetByNameOrInnQuery;
type Variables = CustomerGetByNameOrInnQueryVariables;

const queryFilterCustomer = ExtensionsApollo.Query
    .from<Query, Variables>(doc);
/**
 * @deprecated since version 2.0.0
 */
export const ControllerCustomerByInnOrName = React.memo<Props>((props) => {
    const {value, onChange} = props;

    const [query] = queryFilterCustomer
        .lazy();

    const handle = React.useCallback((variables: Variables) =>
        query({variables}).then(e => e.data?.adminGetHotelByNameOrInn ?? []), []);

    return (
        <ControllerInputSearch
            query={handle}
            value={value}
            getId={e => e.id}
            onChange={onChange}
            variables={nameOrInn => ({input: {nameOrInn}})}
            getLabel={e => (
                <div>
                    <div>{e.nameHotel}</div>
                    <Typo.Caption>{e.inn}</Typo.Caption>
                </div>
            )}
            placeholder="ИНН или название заказчика (от 3 символов)"
        />
    );
});

