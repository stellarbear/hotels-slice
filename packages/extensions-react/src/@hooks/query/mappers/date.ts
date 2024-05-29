import {AMapper} from "./abstract";

const isDateValid = (src: Date) => src.getTime() === src.getTime();
export class MapperDate extends AMapper<Date> {
    public serialize(e: Date) {
        return `${+e}`;
    }
    public deserialize(e: string) {
        const parsed = new Date(parseFloat(e));
        return isDateValid(parsed) ? parsed : null;
    }
}
