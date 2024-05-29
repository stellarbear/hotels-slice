import {Flex} from "@app/ui-web-core";
import {Button, Dialog, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {ActionManagerBookmarkUndoAll} from "../../@actions";
import {queryBookmarkPagination} from "./Bookmarks";
import {BookmarksFormLine} from "./BookmarksFormLine";

export const BookmarksForm = React.memo(() => {
    const [data] = queryBookmarkPagination.use();
    const bookmarks = React.useMemo(() => data.executerGetFavoriteHotels.edges.map(e => e.node), [data]);

    return (
        <Flex.Col>
            <Flex.Row align="center" justify="space-between">
                <Typo.Title>Избранное</Typo.Title>
                <Dialog.Handle button={(
                    <Button
                        color="primary"
                        variant="text">
                        Очистить избранное
                    </Button>
                )}>
                    <ActionManagerBookmarkUndoAll />
                </Dialog.Handle>
            </Flex.Row>
            {bookmarks.map((entry) => (
                <BookmarksFormLine key={entry.id} customer={entry} />
            ))}
        </Flex.Col>
    );
});
