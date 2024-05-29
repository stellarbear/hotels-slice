import {DateTime} from "@app/extensions-classes";
import {Dropdown, Input, Tab} from "@app/ui-web-kit";
import * as React from "react";
import {CalendarIcon} from "./CalendarIcon";
import {DateDropdown} from "./Date";
import {DateInput} from "./Input";
import {MonthDropdown} from "./Month";
import {TimeDropdown} from "./Time";

export type DateInputType = "date" | "time" | "datetime" | "month";
export type DateTimeStateProps = {
    dateTime: DateTime;
    setDateTime: (value: DateTime) => void;
};

type Props = React.ComponentProps<typeof Input> & {
    value?: any;
    onChange: (...event: any[]) => void;

    discard?: boolean;
    as?: DateInputType;
};

export const ControllerDate = React.memo<Props>((props) => {
    const {value, onChange, as = "datetime", discard, ...rest} = props;

    const dateTime = React.useMemo(() => DateTime.fromDate(value), [JSON.stringify(value)]);
    const setDateTime = React.useCallback((value: DateTime) => onChange(value?.toDate()), [dateTime]);

    return (
        <DateInput
            {...rest}
            as={as}
            value={value}

            dateTime={dateTime}
            setDateTime={setDateTime}

            right={
                <Dropdown.Handle button={<CalendarIcon />} >
                    <>
                        {(as === "month") && (
                            <MonthDropdown
                                dateTime={dateTime}
                                setDateTime={setDateTime} />
                        )}
                        {(as === "time") && (
                            <TimeDropdown
                                dateTime={dateTime}
                                setDateTime={setDateTime} />
                        )}
                        {(as === "date") && (
                            <DateDropdown
                                dateTime={dateTime}
                                setDateTime={setDateTime}
                            />
                        )}
                        {(as === "datetime") && (
                            <Tab.Handle>
                                <Tab.Item title="Дата">
                                    <DateDropdown
                                        dateTime={dateTime}
                                        setDateTime={setDateTime}
                                    />
                                </Tab.Item>
                                <Tab.Item title="Время">
                                    <TimeDropdown
                                        dateTime={dateTime}
                                        setDateTime={setDateTime}
                                    />
                                </Tab.Item>
                            </Tab.Handle>
                        )}
                    </>
                </Dropdown.Handle>
            }
        />
    );
});
