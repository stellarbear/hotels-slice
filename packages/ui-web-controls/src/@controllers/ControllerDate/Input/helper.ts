import {DateTime} from "@app/extensions-classes";
import {DateInputType} from "..";
import {pad} from "../@helpers";

export const onJoin = (as: DateInputType) => (data: (number | string)[]) => {
    const asArray = () => {
        switch (as) {
            case "date": {
                const [day, month, year] = data;
                return [pad(2)(day), pad(2)(month), pad(4)(year)];
            }
            case "time": {
                const [hour, minute] = data;
                return [pad(2)(hour), pad(2)(minute)];
            }
            case "datetime": {
                const [day, month, year, hour, minute] = data;
                return [pad(2)(day), pad(2)(month), pad(4)(year), pad(2)(hour), pad(2)(minute)];
            }
            case "month": {
                const [month, year] = data;
                return [pad(2)(month), pad(4)(year)];
            }
            default: {
                return [];
            }
        }
    };

    return asArray().join("");
};

export const onUpdateInputOnValue = (as: DateInputType) => (date: Date) => {
    const {monthInYear, year, dayInMonth, hour, minute} = DateTime.fromDate(date);

    switch (as) {
        case "date": {
            return [dayInMonth, monthInYear + 1, year];
        }
        case "time": {
            return [hour, minute];
        }
        case "datetime": {
            return [dayInMonth, monthInYear + 1, year, hour, minute];
        }
        case "month": {
            return [monthInYear + 1, year];
        }
        default: {
            return [];
        }
    }

};

export const onParse = (as: DateInputType) => (value: string) => {
    const validate = (from: number, to: number) => (src: string, length: number) => {
        if (src.length < length) {
            return src;
        }
        const input = parseInt(src);
        const validated = Number.isNaN(input) ? from : input;
        return Math.min(Math.max(validated, from), to);
    };

    switch (as) {
        case "date": {
            const day = validate(0, 31)(value.slice(0, 2), 2);
            const month = validate(0, 12)(value.slice(2, 4), 2);
            const year = validate(1900, 2099)(value.slice(4, 8), 4);
            return [day, month, year];
        }
        case "time": {
            const hour = validate(0, 23)(value.slice(0, 2), 2);
            const minute = validate(0, 59)(value.slice(2, 4), 2);
            return [hour, minute];
        }
        case "datetime": {
            const day = validate(0, 31)(value.slice(0, 2), 2);
            const month = validate(0, 12)(value.slice(2, 4), 2);
            const year = validate(1900, 2099)(value.slice(4, 8), 4);
            const hour = validate(0, 23)(value.slice(8, 10), 2);
            const minute = validate(0, 59)(value.slice(10, 12), 2);
            return [day, month, year, hour, minute];
        }
        case "month": {
            const month = validate(0, 12)(value.slice(0, 2), 2);
            const year = validate(1900, 2099)(value.slice(2, 6), 4);
            return [month, year];
        }
        default: {
            return [];
        }
    }
};


export const onValidChange = (as: DateInputType, input: number[], handle: DateTime): DateTime => {
    switch (as) {
        case "date": {
            const [day, month, year] = input;
            return handle
                .setYear(year)
                .setMonthInYear(month - 1)
                .setDayInMonth(day);
        }
        case "time": {
            const [hour, minute] = input;
            return handle
                .setHour(hour)
                .setMinute(minute);
        }
        case "datetime": {
            const [day, month, year, hour, minute] = input;
            return handle
                .setYear(year)
                .setMonthInYear(month - 1)
                .setDayInMonth(day)
                .setHour(hour)
                .setMinute(minute);
        }
        case "month": {
            const [month, year] = input;
            return handle
                .setYear(year)
                .setMonthInYear(month - 1);
        }
        default: {
            return handle;
        }
    }
};
