import {Icon, IconButton} from "@app/ui-icons";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Card, Dialog, Image, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {Rating} from "../../../../@shared";
import {ActionManagerBookmark, ActionManagerBookmarkUndo} from "../../@actions";
import {MainContainer} from "../../@components";
import {ERoute} from "../../AppRoutes";
import {Bookmark} from "./Bookmarks";
import {ImagePlaceholder} from "./style";

type Props = {
    customer: Bookmark;
};

export const BookmarksFormLine = React.memo<Props>((props) => {
    const {customer} = props;
    const {id} = customer;

    const context = MainContainer.use();
    const isBookmarked = context.bookmarkedCustomers.has(id);

    return (
        <Card>
            <Flex.Row>
                <Link to={`${ERoute.tasks}/${customer.id}`}>
                    <Flex.Row>
                        <Image.Zoom>
                            <Image.Handle
                                variant="thumbnail"
                                image={customer.profilePic}
                                url={executer.URL_FS}>
                                <ImagePlaceholder>
                                    <Icon icon="hotel" />
                                </ImagePlaceholder>
                            </Image.Handle>
                        </Image.Zoom>
                        <Flex.Col flex>
                            <Typo.p>{customer.nameHotel}</Typo.p>
                            <Rating
                                value={Math.round(customer.rating)}
                                count={5}
                            />
                        </Flex.Col>
                    </Flex.Row>
                </Link>

                <Flex.Cell flex />

                <div>
                    {isBookmarked && (
                        <Dialog.Handle
                            button={(
                                <Colored border="primary" color="primary">
                                    <IconButton border icon="bookmark_filled" />
                                </Colored>
                            )}>
                            <ActionManagerBookmarkUndo id={id} {...context} />
                        </Dialog.Handle>
                    )}
                    {!isBookmarked && (
                        <Dialog.Handle
                            button={(
                                <Colored border="primary" color="primary">
                                    <IconButton border icon="bookmark" />
                                </Colored>
                            )}>
                            <ActionManagerBookmark id={id} {...context} />
                        </Dialog.Handle>
                    )}
                </div>
            </Flex.Row>
        </Card >
    );
});
