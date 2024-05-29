export {Mutation} from "./Mutation";
export {Query} from "./Query";
export {omitTypename} from "./helpers";

import {Context} from "./Context";

type ContextResult = ReturnType<typeof Context<any, any>>;
export type ResultContext<T extends ContextResult> =
    ReturnType<T["use"]>[0];
