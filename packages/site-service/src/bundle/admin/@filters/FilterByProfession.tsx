import {ExtensionsApollo} from "@app/extensions-apollo";
import {ExtensionsArray} from "@app/extensions-classes";
import {isDefined} from "@app/extensions-guard";
import {Checkbox, Dropdown, Loader} from "@app/ui-web-kit";
import * as React from "react";
import {PROFESSION_ALL_QUERY} from "../@query";
import {
    ProfessionAllQuery
} from "../interfaces";
import {FilterTemplate} from "./base";

type Props = {
    value?: string[] | null;
    onChange: (...event: any[]) => void;
};

const doc = PROFESSION_ALL_QUERY;
type Query = ProfessionAllQuery;
type Profession = Query["professions"][number];

const queryFilterProfession = ExtensionsApollo.Query
    .from<Query>(doc);

export const FilterByProfession = React.memo<Props>((props) => {
    const {value, onChange} = props;
    const input = value ?? [];
    const filled = isDefined(input) && input.length > 0;

    const query = queryFilterProfession
        .compile();

    const onReset = React.useCallback(() => onChange(null), []);
    const onChangeEvent = React.useCallback((data: Profession) => () => {
        const update = ExtensionsArray.toggle(input, data.id);
        onChange(update);
    }, [input]);

    return (
        <FilterTemplate
            filled={filled}
            label="Профессии"
            onReset={onReset}>
            {!query.data && <Loader.Spinner />}
            {query.data && query.data.professions.map((entry, index) => (
                <Dropdown.Item key={index}>
                    <Checkbox
                        key={index}
                        checked={input.includes(entry.id)}
                        onChange={onChangeEvent(entry)}>
                        {entry.name}
                    </Checkbox>
                </Dropdown.Item>
            ))}
        </FilterTemplate>
    );
});

