import {ExtensionsArray} from "@app/extensions-classes";
import {Controller, ExtensionsForm} from "@app/extensions-form";
import {Icon, IconName} from "@app/ui-icons";
import {ControllerDiscard, ControllerSelect} from "@app/ui-web-controls";
import {Flex} from "@app/ui-web-core";
import {Button, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {Link} from "react-router-dom";
import {MainContainer} from "../../@components";
import {ERoute} from "../../AppRoutes";
import {Sort, SortFields} from "../../interfaces";
import {TaskFilters} from "./TasksForm";
import {Customer} from "./TasksFormHotel";

type Props = {
    customer: Customer | null;
    form: ExtensionsForm.Result<TaskFilters>;
};

type SortOption = {
    field: SortFields;
    sort: Sort;
};

const sortFieldMap: Record<SortFields, string> = {
    "rent": "Стоимость",
    "start_at": "Дата начала",
};

const dataSortOptions: SortOption[] = [
    {field: "rent", sort: "ASC"},
    {field: "rent", sort: "DESC"},
    {field: "start_at", sort: "ASC"},
    {field: "start_at", sort: "DESC"},
];

type InputForm = {
    type: [SortFields, Sort];
};

const sortMap: Record<Sort, IconName> = {
    "ASC": "sort_ascending",
    "DESC": "sort_descending",
};

export const TasksFormListFilters = React.memo<Props>((props) => {
    const {form, customer} = props;
    const {me: {professions}} = MainContainer.use();

    const professionRecord = React.useMemo(() => ExtensionsArray.toRecord(professions, e => e.id), []);

    const formLocal = ExtensionsForm.useForm<InputForm>({
        defaultValues: {
            type: [form.getValues("fields"), form.getValues("sort")],
        },
        onChange: ({type}) => {
            form.setValue("fields", type[0]);
            form.setValue("sort", type[1]);
        },
    });

    return (
        <Flex.Col>
            <Flex.Row justify="space-between">
                <Controller
                    name="type"
                    control={formLocal.control}
                    render={({field: {value, onChange}}) => (
                        <ControllerSelect
                            value={value}
                            onChange={onChange}
                            items={dataSortOptions}
                            getId={e => [e.field, e.sort]}
                            getLabel={e => (
                                <Flex.Row>
                                    <div>{sortFieldMap[e.field]}</div>
                                    <Icon icon={sortMap[e.sort]} />
                                </Flex.Row>
                            )}
                            button={(
                                <Button variant="text">
                                    <Flex.Row align="center">
                                        <Typo.Label>{sortFieldMap[value[0]]}</Typo.Label>
                                        <Icon icon={sortMap[value[1]]} />
                                    </Flex.Row>
                                </Button>
                            )}
                        />
                    )} />
                <Controller
                    name="id"
                    control={form.control}
                    render={({field: {value, onChange}}) => (
                        <Flex.Row s={0}>
                            <ControllerSelect
                                value={value}
                                onChange={onChange}
                                items={professions}
                                getId={e => e.id}
                                getLabel={e => e.name}
                                button={(
                                    <Button variant="text">
                                        <Flex.Row align="center">
                                            <Typo.Label pre>
                                                {value && (value in professionRecord)
                                                    ? professionRecord[value].name
                                                    : "Профессия"}
                                            </Typo.Label>
                                            <Icon icon="filter" />
                                        </Flex.Row>
                                    </Button>
                                )}
                            />
                            <ControllerDiscard
                                value={value}
                                onChange={onChange}
                            />
                        </Flex.Row>
                    )} />
            </Flex.Row>
            {customer && (
                <Link to={ERoute.tasks}>
                    <Button variant="text">
                        <Typo.p >{customer.nameHotel}</Typo.p >
                        <div><Icon icon="close" /></div>
                    </Button>
                </Link>
            )}
        </Flex.Col>
    );
});
