import {ContainerAbstract, Refetch} from "@app/extensions-react";
import {MainQuery} from "../interfaces";

type Shape = MainQuery;

export class MainContainer extends ContainerAbstract<Shape>() {
    public readonly me: Shape["executerMe"];
    public readonly professions: Shape["professions"];
    public readonly bookmarkedCustomers: Set<string>;

    constructor(data: Shape, refetch: Refetch) {
        super(data, refetch);
        this.me = data.executerMe;
        this.professions = data.professions;
        this.bookmarkedCustomers = new Set(data.executerMe.favoriteHotels);
    }

    public static use() {
        return super.use() as MainContainer;
    }
}
