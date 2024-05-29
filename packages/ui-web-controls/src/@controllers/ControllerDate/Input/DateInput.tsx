import {ExtensionsArray} from "@app/extensions-classes";
import {isDefined, isNumber} from "@app/extensions-guard";
import {Input} from "@app/ui-web-kit";
import * as React from "react";
import {DateInputType, DateTimeStateProps} from "..";
import {ControllerInputMask} from "../../ControllerInput";
import {onJoin, onParse, onUpdateInputOnValue, onValidChange} from "./helper";

type Props = React.ComponentProps<typeof Input> & DateTimeStateProps & {
    value?: any;
    as: DateInputType;
};

const masks: Record<DateInputType, (string | RegExp)[]> = {
    "date": [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/],
    "month": [/\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/],
    "time": [/\d/, /\d/, ":", /\d/, /\d/],
    "datetime": [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, ":", /\d/, /\d/],
};

const separators: Record<DateInputType, (string)[]> = {
    "date": ["д", "д", "м", "м", "г", "г", "г", "г"],
    "month": ["м", "м", "г", "г", "г", "г"],
    "time": ["ч", "ч", "м", "м"],
    "datetime": ["д", "д", "м", "м", "г", "г", "г", "г", "ч", "ч", "м", "м"],
};

export const DateInput = React.memo<Props>((props) => {
    const {value, onChange, as, dateTime, setDateTime, ...rest} = props;
    const [input, setInput] = React.useState("");

    const updateInputOnValue = React.useCallback((value: any) => {
        if (isDefined(value) && String(value).length > 0) {
            const timestamp = Date.parse(value);

            if (!Number.isNaN(timestamp)) {
                const update = onUpdateInputOnValue(as)(new Date(timestamp));
                setInput(onJoin(as)(update));
            }
        } else {
            setInput("");
        }
    }, [as]);

    React.useEffect(() => {
        updateInputOnValue(value);
    }, [value]);

    const onBlur = React.useCallback(() => {
        updateInputOnValue(value);
    }, [value]);

    const onInputChange = React.useCallback((value?: string) => {
        const update = onParse(as)(value ?? "");
        setInput(onJoin(as)(update));

        if (update.every(isNumber)) {
            const narrowed = ExtensionsArray.filter(isNumber)(update);
            const change = onValidChange(as, narrowed, dateTime);

            setDateTime(change);
        }
    }, [as, dateTime]);

    return (
        <ControllerInputMask
            {...rest}
            mask={masks[as]}
            inputMode="numeric"
            separator={separators[as]}
            value={input}
            onBlur={onBlur}
            onChange={onInputChange}
        />
    );
});
