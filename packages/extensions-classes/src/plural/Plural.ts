const intl = new Intl.PluralRules("ru-RU");

export class Plural {
    private readonly rules: Record<Intl.LDMLPluralRule, string> = {
        "few": "",
        "many": "",
        "one": "",
        "other": "",
        "two": "",
        "zero": "",
    };

    private constructor(
        private readonly count: number) {}

    public static from(count: number) {
        return new Plural(count);
    }

    public many(input: string) {
        this.rules.many = input;
        return this;
    }

    public one(input: string) {
        this.rules.one = input;
        return this;
    }

    public few(input: string) {
        this.rules.few = input;
        return this;
    }

    public get(at = "*") {
        const howMuch = intl.select(this.count);

        return this.rules[howMuch].replace(at, this.count.toString());
    }
}
