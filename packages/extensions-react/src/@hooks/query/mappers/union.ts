import {AMapper} from "./abstract";

export class MapperUnion<T> extends AMapper<T> {
    private readonly values: T[];
    public constructor(...values: T[]) {
        super();
        this.values = values;
    }
    public serialize(e: T) {
        return `${e}`;
    }
    public deserialize(e: string) {
        if (this.values.includes(e as any)) {
            return e as T;
        } else {
            return null;
        }
    }
}
