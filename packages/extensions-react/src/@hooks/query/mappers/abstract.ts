export abstract class AMapper<T = any> {
    public _value: T | null = null;
    public defaults(input: T | null) {
        this._value = input;
        return this;
    }

    abstract serialize(input: T): string;
    abstract deserialize(input: string): T | null;
}
