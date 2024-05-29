import React from "react";
import {AddressRequest, AddressResponse} from "./type";

export type Address = {
    latitude: number;
    longitude: number;
    label: string;
    address: string;
};

export const useGeoDaData = (api: string) => {
    const [suggestions, setSuggestions] = React.useState<Address[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    const suggest = React.useCallback(async (search: string) => {
        if (search.length < 3) {
            return;
        }

        const body: AddressRequest = {
            query: search,
            count: 5,
            from_bound: {"value": "house"},
            to_bound: {"value": "house"},
        };

        try {
            setError(null);
            setLoading(true);

            const response = await fetch(
                "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + api,
                },
                body: JSON.stringify(body),
            });
            const parsed: AddressResponse = await response.json();

            if (parsed.suggestions.length === 0) {
                setSuggestions([]);
                setError("Для отображения результатов укажите улицу и дом");
            } else {
                setSuggestions(parsed.suggestions.map((e) => ({
                    latitude: parseFloat(e.data.geo_lat),
                    longitude: parseFloat(e.data.geo_lon),
                    address: e.value,
                    label: search,
                })));
            }
        } catch {
            setError("Ошибка при выполнении запроса. Попробуйте позже или обратитесь в поддержку");
        } finally {
            setLoading(false);
        }
    }, []);


    return {
        suggestions,
        loading,
        error,
        suggest,
    };
};
