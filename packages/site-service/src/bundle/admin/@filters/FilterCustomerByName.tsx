import {ExtensionsApollo} from "@app/extensions-apollo";
import {isDefined} from "@app/extensions-guard";
import {ControllerInputSearch} from "@app/ui-web-controls";
import {Section} from "@app/ui-web-core";
import * as React from "react";
import {CUSTOMER_GET_BY_NAME_QUERY} from "../@query";
import {
    CustomerGetByNameQuery, CustomerGetByNameQueryVariables
} from "../interfaces";
import {FilterTemplate} from "./base";

type Props = {
    value?: string | null;
    onChange: (...event: any[]) => void;
};

const doc = CUSTOMER_GET_BY_NAME_QUERY;
type Query = CustomerGetByNameQuery;
type Variables = CustomerGetByNameQueryVariables;

const queryFilterCustomer = ExtensionsApollo.Query
    .from<Query, Variables>(doc);

export const FilterCustomerByName = React.memo<Props>((props) => {
    const {value, onChange} = props;
    const filled = isDefined(value) && value.length > 0;

    const [query] = queryFilterCustomer
        .lazy();

    const handle = React.useCallback((variables: Variables) =>
        query({variables}).then(e => e.data?.adminGetHotelByName ?? []), []);

    const onReset = React.useCallback(() => onChange(null), []);

    return (
        <FilterTemplate
            label="Заказчик"
            filled={filled}
            onReset={onReset}>
            <Section>
                <ControllerInputSearch
                    query={handle}
                    value={value}
                    getId={e => e.id}
                    onChange={onChange}
                    variables={nameHotel => ({input: {nameHotel}})}
                    getLabel={e => (
                        <div>
                            {e.nameHotel}
                        </div>
                    )}
                    placeholder="Заказчик"
                />
            </Section>
        </FilterTemplate>
    );
});

