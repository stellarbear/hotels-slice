import {CalendarDay, CalendarDayUI} from "./CalendarDay";
import {CalendarHandle, CalendarHandleUI} from "./CalendarHandle";
import {CalendarMonth, CalendarMonthUI} from "./CalendarMonth";
import {CalendarTime, CalendarTimeUI} from "./CalendarTime";
import {CalendarYear, CalendarYearUI} from "./CalendarYear";

import {dicts} from "./dicts";

export const Calendar = {
    Handle: CalendarHandle,
    Day: CalendarDay,
    Month: CalendarMonth,
    Time: CalendarTime,
    Year: CalendarYear,

    DayUI: CalendarDayUI,
    YearUI: CalendarYearUI,
    TimeUI: CalendarTimeUI,
    MonthUI: CalendarMonthUI,
    HandleUI: CalendarHandleUI,

    dicts,
};

export type Calendar = {
    Month: CalendarMonth;
    Day: CalendarDay;
    Year: CalendarYear;
    Time: CalendarTime;
};
