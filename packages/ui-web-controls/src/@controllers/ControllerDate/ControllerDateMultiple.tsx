import {DateTime, ExtensionsArray, Plural} from "@app/extensions-classes";
import {ThemePaletteColors} from "@app/ui-web-core";
import {Dropdown, Input} from "@app/ui-web-kit";
import * as React from "react";
import {CalendarIcon} from "./CalendarIcon";
import {DateDropdownMultiple} from "./Date";

type Props = {
    value?: any[];
    onChange: (...event: any[]) => void;

    color?: ThemePaletteColors;
    discard?: boolean;
};

export const ControllerDateMultiple = React.memo<Props>((props) => {
    const {value = [], onChange} = props;

    const dateTimeList = React.useMemo(() => value.map(DateTime.fromDate),
        [JSON.stringify(value.map(e => new Date(e).toDateString()))]);

    const onToggleDateTime = React.useCallback((value: DateTime) => {
        const result = ExtensionsArray.toggle(dateTimeList, value, (e1, e2) => e1.compareDate(e2));
        onChange(result.map(e => e.toDate()));
    }, [dateTimeList]);

    return (
        <Dropdown.Handle
            button={
                <Input
                    value={dateTimeList.length === 0
                        ? "Выберите даты"
                        : Plural.from(dateTimeList.length)
                            .few("Выбрано * даты")
                            .many("Выбрано * дат")
                            .one("Выбрана * дата")
                            .get()
                    }
                    right={
                        <CalendarIcon />
                    }
                    readOnly
                />
            }
        >
            <DateDropdownMultiple
                dateTimeList={dateTimeList}
                onToggleDateTime={onToggleDateTime}
            />
        </Dropdown.Handle>
    );
});
