import {ExtensionsApollo} from "@app/extensions-apollo";
import {DateTime} from "@app/extensions-classes";
import {Icon} from "@app/ui-icons";
import {Flex} from "@app/ui-web-core";
import {Button, Calendar, Query, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {TASK_MINE_QUERY} from "../../@query";
import {TaskMineQuery, TaskMineQueryVariables} from "../../interfaces";
import {TasksForm} from "./TasksForm";
import {useQueryParams} from "@app/extensions-react";

export const queryTaskMineAll = ExtensionsApollo.Query
    .from<TaskMineQuery, TaskMineQueryVariables>(TASK_MINE_QUERY)
    .context();

export type TaskCalendar = TaskMineQuery["executerGetIdAndDateAllExecuterStatesByMonth"][number];

export const TasksMine = React.memo(() => {
    const [paramsForm, setParamsForm] = useQueryParams(p => ({
        date: p.date.defaults(new Date()),
    }));

    const [currentDate, setCurrentDate] = React.useState(DateTime.fromDate(paramsForm.date));
    React.useEffect(() => {
        setParamsForm({date: currentDate.toDate()});
    }, [currentDate.dayInEpoch]);

    const onNextMonth = React.useCallback(() =>
        setCurrentDate(prev => prev.setMonthInEpoch(prev.monthInEpoch + 1)), []);
    const onPrevMonth = React.useCallback(() =>
        setCurrentDate(prev => prev.setMonthInEpoch(prev.monthInEpoch - 1)), []);

    const query = queryTaskMineAll
        .query({
            __typename: "Query",
            executerGetIdAndDateAllExecuterStatesByMonth: [],
        })
        .withConfiguration({variables: {input: currentDate.toDate()}})
        .compile();

    return (
        <Flex.Col>
            <Typo.Title>Ваши заявки</Typo.Title>

            <Flex.Row align="center">
                <Button onClick={onPrevMonth} variant="text">
                    <Icon icon="chevron_left" />
                </Button>
                <Button onClick={onNextMonth} variant="text">
                    <Icon icon="chevron_right" />
                </Button>

                <Typo.SubTitle pre>
                    {`${Calendar.dicts.months[currentDate.monthInYear]} ${currentDate.year}`}
                </Typo.SubTitle>
            </Flex.Row>

            <Query.Await query={query}>
                <TasksForm currentDate={currentDate} />
            </Query.Await>
        </Flex.Col >
    );
});
