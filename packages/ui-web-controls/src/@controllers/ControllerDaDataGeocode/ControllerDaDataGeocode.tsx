import {useEffectDeferred} from "@app/extensions-react";
import {Dropdown, Input} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {useGeoDaData} from "./useGeoDaData";

type Address = {
    latitude: number;
    longitude: number;
    label: string;
    address: string;
};

type Props = {
    api: string;
    value: Address | null;
    onChange: (address: Address) => void;
};

export const ControllerDaDataGeocode = React.memo<Props>((props) => {
    const {value, onChange, api} = props;

    const geo = useGeoDaData(api);

    const [input, setInput] = React.useState<string>(value?.address ?? "");
    useEffectDeferred(500, () => {
        geo.suggest(input);
    }, [input]);

    const [opened, setOpened] = React.useState(false);
    const onFocus = React.useCallback(() => setOpened(true), []);
    const onBlur = React.useCallback(() => setOpened(false), []);

    const onClickChangeEvent = React.useCallback((entry: Address) => () => {
        setInput(entry.address);
        onChange(entry);
    }, [onChange]);

    const onInputChangeEvent = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);

    return (
        <div>
            <Dropdown.Handle
                opened={opened}
                button={
                    <Input
                        value={input}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onChange={onInputChangeEvent}
                        right={geo.loading && <InformationLabel>Загрузка</InformationLabel>}
                    />
                }>
                {geo.suggestions.map((entry) => (
                    <Dropdown.Item
                        closeOnClick
                        key={entry.address}
                        onClick={onClickChangeEvent(entry)}>
                        {entry.address}
                    </Dropdown.Item>
                ))}
            </Dropdown.Handle>
            {geo.error && <InformationLabel>{geo.error}</InformationLabel>}
        </div>
    );
});

const InformationLabel = styled.div`
    font-size: 12px;
    opacity: 0.8;
`;
