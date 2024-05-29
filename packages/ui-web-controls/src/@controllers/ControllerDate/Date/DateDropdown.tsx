import {DateTime} from "@app/extensions-classes";
import {ExtensionsReact} from "@app/extensions-react";
import {useOverlay} from "@app/ui-web-core";
import {Calendar} from "@app/ui-web-kit";
import * as React from "react";
import {DateTimeStateProps} from "../ControllerDate";

export enum Selector {
    Year,
    Day
}

type Props = DateTimeStateProps;
export type CurrentDateTimeStateProps = ExtensionsReact.ReactStateProps<DateTime, "currentDateTime">;

export const DateDropdown = React.memo<Props>((props) => {
    const {dateTime, setDateTime} = props;
    const [currentDateTime, setCurrentDateTime] = React.useState<DateTime>(dateTime.clone());

    React.useEffect(() => {
        setCurrentDateTime(dateTime.clone());
    }, [dateTime]);

    const isActive = React.useCallback((entry: Calendar["Day"]) =>
    (entry.dayInMonth === dateTime.dayInMonth &&
        entry.monthInEpoch === dateTime.monthInEpoch), [dateTime]);

    const overlay = useOverlay();
    const onClick = React.useCallback((entry: Calendar["Day"]) => {
        setDateTime(dateTime
            .setMonthInEpoch(entry.monthInEpoch)
            .setDayInMonth(entry.dayInMonth));
        overlay.close();
    }, [dateTime]);

    return (
        <Calendar.Handle
            isActive={isActive}
            onClick={onClick}
            date={currentDateTime} />
    );
});
