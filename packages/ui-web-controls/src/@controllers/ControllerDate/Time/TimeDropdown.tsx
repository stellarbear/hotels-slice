import {Calendar, Typo} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {pad} from "../@helpers";
import {DateTimeStateProps} from "../ControllerDate";

type Props = DateTimeStateProps;

export const TimeDropdown = React.memo<Props>((props) => {
    const {dateTime, setDateTime} = props;

    const onClick = React.useCallback((value: Calendar["Time"]) => {
        setDateTime(dateTime.setHour(value.hour).setMinute(value.minute));
    }, [dateTime]);

    const isActive = React.useCallback((entry: Calendar["Time"]) =>
        entry.hour === dateTime.hour &&
        entry.minute === dateTime.minute,
        [dateTime]);

    return (
        <TimeDropdownContent>
            <Typo.p>
                {`${pad(2)(dateTime.hour)} : ${pad(2)(dateTime.minute)}`}
            </Typo.p>
            <Calendar.Time
                current={dateTime}
                onClick={onClick}
                isActive={isActive}
            />
        </TimeDropdownContent>
    );
});


const TimeDropdownContent = styled.div`
    display: grid;
    grid-gap: 8px;
    grid-template-rows: auto 240px;
    padding: 0.75rem;
    min-width: 180px;
`;
