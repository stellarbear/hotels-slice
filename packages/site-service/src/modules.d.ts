declare module "phone"
declare module "*.svg"
declare module "*.png"
declare module "*.graphql" {
    import {DocumentNode} from "graphql";
    const defaults: DocumentNode;
    export default defaults;
}
