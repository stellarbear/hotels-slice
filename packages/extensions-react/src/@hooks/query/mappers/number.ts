import {AMapper} from "./abstract";

export class MapperNumber extends AMapper<number> {
    public serialize(e: number) {
        return `${e}`;
    }
    public deserialize(e: string) {
        const parsed = parseFloat(e);
        return Number.isNaN(parsed) ? null : parsed;
    }
}
