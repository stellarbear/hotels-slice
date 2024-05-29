import {TableCell} from "./TableCell";
import {TableFactory} from "./TableFactory";
import {TableHandle} from "./TableHandle";
import {TableHead} from "./TableHead";
import {TableRow} from "./TableRow";

export * from "./styles";
export const Table = {
    Handle: TableHandle,

    Head: TableHead,
    Cell: TableCell,
    Row: TableRow,

    Factory: TableFactory,
};
