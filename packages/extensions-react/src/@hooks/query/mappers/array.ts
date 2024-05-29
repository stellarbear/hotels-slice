import {AMapper} from "./abstract";

const separator = ",";
export class MapperArray<T> extends AMapper<T[]> {
    public constructor(
        private readonly mapper: AMapper<T>,
    ) {
        super();
    }
    public serialize(e: T[]) {
        return e.map(entry => this.mapper.serialize(entry)).join(separator);
    }
    public deserialize(e: string) {
        if (e.length === 0) {
            return [];
        }

        const array = e.split(separator);
        const mapped = array.map(e => this.mapper.deserialize(e)).filter(e => typeof e !== null) as T[];
        return mapped;
    }
}
