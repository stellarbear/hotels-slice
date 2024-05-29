import {Icon, IconButton} from "@app/ui-icons";
import {Colored, Flex, Link} from "@app/ui-web-core";
import {Button, Card, Dialog, Image, Typo} from "@app/ui-web-kit";
import * as React from "react";
import {Rating} from "../../../../@shared";
import {ActionManagerBookmark, ActionManagerBookmarkUndo} from "../../@actions";
import {MainContainer} from "../../@components";
import {ERoute} from "../../AppRoutes";
import {Customer} from "./Customers";

type Props = {
    customer: Customer;
};

export const CustomersFormEntry = React.memo<Props>((props) => {
    const {customer} = props;
    const {bookmarkedCustomers} = MainContainer.use();

    const isBookmarked = bookmarkedCustomers.has(customer.id);

    return (
        <Card>
            <Flex.Col>
                <Flex.Row justify="space-between">
                    <Flex.Row align="center">
                        <Image.Handle
                            variant="circle"
                            size="2rem"
                            image={customer.profilePic}
                            url={executer.URL_FS}>
                        </Image.Handle>
                        <Typo.p>{customer.nameHotel}</Typo.p>
                    </Flex.Row>
                    {isBookmarked && (
                        <Dialog.Handle
                            button={(
                                <Colored border="primary" color="primary">
                                    <IconButton border icon="bookmark_filled" />
                                </Colored>
                            )}>
                            <ActionManagerBookmarkUndo id={customer.id} />
                        </Dialog.Handle>
                    )}
                    {!isBookmarked && (
                        <Dialog.Handle
                            button={(
                                <Colored border="primary" color="primary">
                                    <IconButton border icon="bookmark" />
                                </Colored>
                            )}>
                            <ActionManagerBookmark id={customer.id} />
                        </Dialog.Handle>
                    )}
                </Flex.Row>
                <Flex.Row justify="space-between">
                    <Colored color="secondary">
                        <Typo.p>Рейтинг</Typo.p>
                    </Colored>
                    <Rating count={5} value={customer.rating} />
                </Flex.Row>
                <Link to={`${ERoute.tasks}/${customer.id}`}>
                    <Button fullwidth>Посмотреть заявки</Button>
                </Link>
            </Flex.Col>
        </Card>
    );
});
