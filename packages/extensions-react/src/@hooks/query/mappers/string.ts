import {AMapper} from "./abstract";

export class MapperString extends AMapper<string> {
    public serialize(e: string) {
        return e;
    }
    public deserialize(e: string) {
        return e;
    }
}
