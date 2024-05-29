import {TableFactoryBody, TableFactoryBodyProps} from "./TableFactoryBody";
import {TableFactoryColumn, TableFactoryColumnProps} from "./TableFactoryColumn";

export type TableFactory<T> = {
    Body: React.FC<TableFactoryBodyProps<T>>;
    Column: React.FC<TableFactoryColumnProps<T>>;
};

export const TableFactory = <T,>(_: T[]): TableFactory<T> => ({
    Body: TableFactoryBody,
    Column: TableFactoryColumn,
});
