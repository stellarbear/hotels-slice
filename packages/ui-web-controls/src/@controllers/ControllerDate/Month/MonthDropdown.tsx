import {Calendar, Typo} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {DateTimeStateProps} from "../ControllerDate";

type Props = DateTimeStateProps;

export const MonthDropdown = React.memo<Props>((props) => {
    const {dateTime, setDateTime} = props;

    const onClick = React.useCallback((value: Calendar["Month"]) => {
        setDateTime(dateTime.setYear(value.year).setMonthInYear(value.monthInYear));
    }, [dateTime]);

    const isActive = React.useCallback((entry: Calendar["Month"]) =>
        entry.year === dateTime.year &&
        entry.monthInYear === dateTime.monthInYear, [dateTime]);

    return (
        <MonthDropdownContent>
            <Typo.p>
                {`${dateTime.year} ${Calendar.dicts.months[dateTime.monthInYear]}`}
            </Typo.p>

            <Calendar.Month
                current={dateTime.monthInEpoch}
                onClick={onClick}
                isActive={isActive}
            />
        </MonthDropdownContent>
    );
});

const MonthDropdownContent = styled.div`
    display: grid;
    grid-gap: 8px;
    grid-template-rows: auto 240px;
    padding: 0.75rem;
    min-width: 180px;
`;
