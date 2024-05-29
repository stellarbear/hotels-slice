export class NumberFormat {
    private _locale = "ru-RU";
    private constructor(
        private _options: Intl.NumberFormatOptions,
    ) {

    }

    public static get decimal() {
        return new NumberFormat({
            style: "decimal", currency: "RUB",
        });
    }

    public static get currency() {
        return new NumberFormat({
            style: "currency", currency: "RUB",
        });
    }

    public locale(input: string) {
        this._locale = input;
        return this;
    }

    public options(options: Intl.NumberFormatOptions) {
        this._options = options;
        return this;
    }

    public format(value: number) {
        return new Intl.NumberFormat(this._locale, this._options).format(value);
    }
}
