import {DateTime} from "@app/extensions-classes";
import {Calendar} from "@app/ui-web-kit";
import * as React from "react";

type Props = {
    dateTimeList: DateTime[];
    onToggleDateTime: (entry: DateTime) => void;
};

export const DateDropdownMultiple = React.memo<Props>((props) => {
    const {dateTimeList, onToggleDateTime} = props;

    const isActive = React.useCallback((dateTime: Calendar["Day"]) =>
        dateTimeList.some(entry =>
            (entry.dayInEpoch === dateTime.dayInEpoch)), [dateTimeList]);

    const onClick = React.useCallback((entry: Calendar["Day"]) => {
        onToggleDateTime(DateTime.fromDate(entry.date));
    }, [onToggleDateTime]);

    return (
        <Calendar.Handle
            isActive={isActive}
            onClick={onClick}
            date={dateTimeList[0] ?? new Date()} />
    );
});
