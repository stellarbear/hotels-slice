import {AMapper} from "./abstract";

export class MapperBoolean extends AMapper<boolean> {
    public serialize(e: boolean) {
        return `${e}`;
    }
    public deserialize(e: string) {
        switch (e) {
            case "false": return false;
            case "true": return true;
            default: return null;
        }
    }
}
