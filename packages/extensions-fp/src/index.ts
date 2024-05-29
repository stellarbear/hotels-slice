import {apply} from "./apply";
import {either} from "./either";
import {option} from "./option";
import {pipe} from "./pipe";
import {flow} from "./flow";
import {Match} from "./match";
import {predicate} from "./predicate";

export type {Either, Right} from "./either";

export const fp = {
    either,
    option,
    predicate,

    match: Match,
    pipe,
    apply,
    flow,
};

