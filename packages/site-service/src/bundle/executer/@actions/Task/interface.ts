import {ECustomerRateFragment, ETaskFragment} from "../../interfaces";

export type Task = Omit<ETaskFragment, "__typename">;
export type CustomerRating = Omit<ECustomerRateFragment, "__typename">;
