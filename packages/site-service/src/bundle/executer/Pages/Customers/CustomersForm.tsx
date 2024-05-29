import {MapYandex} from "@app/ui-maps-yandex";
import {Flex, Overlay, Section} from "@app/ui-web-core";
import {Modal, useNotification, Image} from "@app/ui-web-kit";
import * as React from "react";
import styled from "styled-components";
import {Chat, MainContainer} from "../../@components";
import {useStoreCustomerMapMarks} from "../../@stores";
import {queryCustomersAll} from "./Customers";
import {CustomersFormEntry} from "./CustomersFormEntry";

type Props = {
};

export const CustomersForm = React.memo<Props>(() => {
    const [data] = queryCustomersAll.use();
    const customersAll = data.executerGetCustomerLocationList;

    const {info} = useNotification.snackbar();
    const {bookmarkedCustomers} = MainContainer.use();
    const {showBookmarks} = useStoreCustomerMapMarks();

    React.useEffect(() => useStoreCustomerMapMarks.subscribe(
        state => {
            info(state.showBookmarks
                ? "Отображатся избранные заказчики"
                : "Отображаются все заказчики");
        },
    ), []);

    const customersBookmarked = React.useMemo(() =>
        customersAll.filter(e => bookmarkedCustomers.has(e.id)), 
        [customersAll, bookmarkedCustomers]);

    const customers = showBookmarks
        ? customersBookmarked
        : customersAll;

    return (
        <>
            <Chat />
            
            <MapYandex.Map api={executer.MAP_YANDEX_KEY}>
                <MapYandex.MapCluster
                    items={customers}
                    coordinates={e => e.coordinates}
                    marker={customer => (
                        <Modal button={
                            <Overlay.Use>
                                {(overlay) => (
                                    <IconContainer opened={overlay.opened}>
                                        <Image.Handle
                                            variant="circle"
                                            size="2rem"
                                            image={customer.profilePic}
                                            url={executer.URL_FS}>
                                            <MapYandex.MapMarkerIcon />
                                        </Image.Handle>
                                    </IconContainer>
                                )}
                            </Overlay.Use>
                        }>
                            <CustomersFormEntry customer={customer} />
                        </Modal>
                    )}
                    cluster={customers => (
                        <Modal button={
                            <CustomerCluster>
                                {customers.length}
                            </CustomerCluster>
                        }>
                            <Section>
                                <Flex.Col>
                                    {customers.map((customer, index) => (
                                        <CustomersFormEntry
                                            key={index}
                                            customer={customer} />
                                    ))}
                                </Flex.Col>
                            </Section>
                        </Modal>
                    )}
                />
            </MapYandex.Map>
        </>
    );
});

const IconContainer = styled.div<{opened: boolean}>`
    img {
        box-sizing: border-box;
        border: 2px solid ${p => p.theme.palette.color("primary")};
    }

    transform: scale(${p => p.opened ? 1.5 : 1.0});
`;

const CustomerCluster = styled.div`
    width: 2rem;
    height: 2rem;
    border: 4px solid #28B083;
    border-radius: 50%;
    background-color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`;
