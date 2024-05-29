import * as React from "react";
import styled from "styled-components";

const url = () => "https://partners.dasreda.ru/landing/self-employed?"
    + `partnerID=${executer.SBER_BUSINESS_PARTNER_ID}&`
    + `erid=${executer.SBER_BUSINESS_PARTNER_REF}`;


const IFrame = styled.iframe`
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
`;

export const AccountSelfEmployedFrame = React.memo(() => (
    <IFrame src={url()} />
));
