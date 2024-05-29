import {ContainerAbstract, Refetch} from "@app/extensions-react";
import {MainQuery} from "../interfaces";

type Shape = MainQuery;

export class MainContainer extends ContainerAbstract<Shape>() {
    public readonly me: Shape["adminMe"];

    constructor(data: Shape, refetch: Refetch) {
        super(data, refetch);
        this.me = data.adminMe;
    }

    public static use() {
        return super.use() as MainContainer;
    }
}
