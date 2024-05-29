import {DateTime, ExtensionsDate} from "@app/extensions-classes";
import {Badge, Button, Calendar, Dialog, Modal} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {queryTaskMineAll} from "./Tasks";
import {TasksFormList} from "./TasksFormList";

type Props = {
    currentDate: DateTime;
};

export const TasksForm = React.memo<Props>((props) => {
    const {currentDate} = props;

    const [data] = queryTaskMineAll.use();
    const tasks = data.executerGetIdAndDateAllExecuterStatesByMonth;

    const dataMap = React.useMemo(() => {
        const result = new Map<number, string[]>();
        for (const entry of tasks) {
            const date = DateTime.fromDate(entry.startAt).dayInEpoch;
            const update = result.get(date) ?? [];
            update.push(entry.id);

            result.set(date, update);
        }

        return result;
    }, [tasks]);

    const getTasks = React.useCallback((entry: Calendar["Day"]) => (
        dataMap.get(entry.dayInEpoch) ?? []
    ), [dataMap]);

    const getCount = React.useCallback((entry: Calendar["Day"]) => (
        getTasks(entry).length
    ), [getTasks]);

    const isActive = React.useCallback((entry: Calendar["Day"]) => (
        getCount(entry) > 0
    ), [getCount]);

    return (
        <OverflowAuto>
            <Calendar.Day
                current={currentDate.monthInEpoch}
                isActive={isActive}>
                {(entry) => (
                    <Badge notification={getCount(entry)}>
                        <Modal
                            button={(
                                <ButtonSlim
                                    disabled={!entry.current || getTasks(entry).length === 0}
                                    variant="text"
                                    color="secondary">
                                    {getCount(entry) > 0
                                        ? <b>{ExtensionsDate.format("d", entry.date)}</b>
                                        : <>{ExtensionsDate.format("d", entry.date)}</>}
                                </ButtonSlim>
                            )}>
                            <Dialog.Header>
                                Заявки на {ExtensionsDate.format("d.m.y", entry.date)}
                            </Dialog.Header>
                            <Dialog.Content>
                                <TasksFormList ids={getTasks(entry)} />
                            </Dialog.Content>
                        </Modal>
                    </Badge>
                )}
            </Calendar.Day>
        </OverflowAuto>
    );
});

const ButtonSlim = styled(Button)`
    padding: 0.5rem 0.75rem;
`;

const OverflowAuto = styled.div`
    overflow: auto;
`;
