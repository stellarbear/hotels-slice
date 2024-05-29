//  https://dadata.ru/api/suggest/address/

type AddressRequestBound =
    | "country"
    | "region"
    | "area"
    | "city"
    | "settlement"
    | "street"
    | "house";

export type AddressRequest = {
    query: string;
    count?: number;
    language?: string;
    from_bound?: {value: AddressRequestBound};
    to_bound?: {value: AddressRequestBound | "flat"};
};


export type AddressResponse = {
    suggestions: {
        data: {
            value: string;

            country: string;
            city: string;

            geo_lat: string;
            geo_lon: string;

            postal_code: string;
        };

        value: string;
    }[];
};
