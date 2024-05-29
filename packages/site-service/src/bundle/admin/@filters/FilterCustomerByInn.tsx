import {ExtensionsApollo} from "@app/extensions-apollo";
import {isDefined} from "@app/extensions-guard";
import {ControllerInputSearch} from "@app/ui-web-controls";
import {Section} from "@app/ui-web-core";
import * as React from "react";
import {CUSTOMER_GET_BY_INN_QUERY} from "../@query";
import {
    CustomerGetByInnQuery, CustomerGetByInnQueryVariables
} from "../interfaces";
import {FilterTemplate} from "./base";

type Props = {
    value?: string | null;
    onChange: (...event: any[]) => void;
};

const doc = CUSTOMER_GET_BY_INN_QUERY;
type Query = CustomerGetByInnQuery;
type Variables = CustomerGetByInnQueryVariables;

const queryFilterCustomer = ExtensionsApollo.Query
    .from<Query, Variables>(doc);

export const FilterCustomerByInn = React.memo<Props>((props) => {
    const {value, onChange} = props;
    const filled = isDefined(value) && value.length > 0;

    const [query] = queryFilterCustomer
        .lazy();

    const handle = React.useCallback((variables: Variables) =>
        query({variables}).then(e => e.data?.adminGetHotelByInn ?? []), []);

    const onReset = React.useCallback(() => onChange(null), []);

    return (
        <FilterTemplate
            label="ИНН"
            filled={filled}
            onReset={onReset}>
            <Section>
                <ControllerInputSearch
                    query={handle}
                    value={value}
                    getId={e => e.id}
                    onChange={onChange}
                    variables={inn => ({input: {inn}})}
                    getLabel={e => (
                        <div>
                            {e.inn}
                        </div>
                    )}
                    placeholder="ИНН"
                />
            </Section>
        </FilterTemplate>
    );
});

