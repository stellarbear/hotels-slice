import * as React from "react";
import {Button} from "../Button";
import {PaginationUI} from "./styles";
import {usePaginationOptions} from "./usePaginationOptions";

type Props = {
    page: number;
    total: number;

    navigate: (page: number) => void;
    empty?: React.ReactNode;
};

export const Pagination = React.memo<Props>((props) => {
    const {
        page,
        total,
        navigate,
        empty = (
            <span>Записи отсутствуют</span>
        ),
    } = props;

    const options = usePaginationOptions(page, total);
    const onNavigate = React.useCallback((page: number) => () => navigate(page), []);

    if (total === 0 && page === 1) {
        return <>{empty}</>;
    }

    if (options.length === 0) {
        return null;
    }

    return (
        <PaginationUI.PaginationContainer>
            {options.map((i, index) => (
                <React.Fragment key={index}>
                    {(i === null)
                        ? <div>...</div>
                        : (
                            <Button
                                variant={i === page
                                    ? "contained"
                                    : "text"}
                                onClick={onNavigate(i)}>
                                {i}
                            </Button>
                        )}
                </React.Fragment>
            ))}
        </PaginationUI.PaginationContainer>
    );
});
