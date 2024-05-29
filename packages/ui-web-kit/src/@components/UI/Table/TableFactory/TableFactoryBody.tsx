import * as React from "react";
import styled from "styled-components";
import {Table} from "..";
import {useTableFactoryConfiguration} from "./useTableFactoryConfiguration";

export type TableFactoryBodyProps<T> =
    & React.ComponentProps<typeof Table["Handle"]>
    & {
        items: T[];
        children: React.ReactNode;
    };

export const TableFactoryBody = <T,>(props: TableFactoryBodyProps<T>) => {
    const {children, items, ...rest} = props;

    const config = React.useMemo(() => useTableFactoryConfiguration(children), [children]);

    return (
        <TableFactoryContent>
            <Table.Handle {...rest} cellPadding={0} cellSpacing={0}>
                <thead>
                    <Table.Row>
                        {config.map((head, index) => (
                            <Table.Head
                                key={index}
                                align={head.align}
                                onClick={head.onClick}>
                                <>{head.title}</>
                            </Table.Head>
                        ))}
                    </Table.Row>
                </thead>

                <tbody>
                    {items.map((row, indexRow) => (
                        <Table.Row key={indexRow}>
                            {config.map((cell, indexCell) => (
                                <Table.Cell
                                    key={indexCell}
                                    align={cell.align}
                                    onClick={cell.onClick}>
                                    {("children" in cell) && (
                                        cell.children(row, indexRow)
                                    )}
                                    {("name" in cell) && (
                                        String(row[cell.name])
                                    )}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </tbody>
            </Table.Handle>
        </TableFactoryContent>
    );
};

const TableFactoryContent = styled.div`
    overflow: auto;
    padding-bottom: 0.5rem;
`;
