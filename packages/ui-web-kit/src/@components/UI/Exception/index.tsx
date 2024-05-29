import {ExceptionDev} from "./ExceptionDev";
import {ExceptionUser} from "./ExceptionUser";

export const Exception = {
  Dev: ExceptionDev,
  User: ExceptionUser,

  for: (prod: boolean) => (prod ? ExceptionUser : ExceptionDev),
};
