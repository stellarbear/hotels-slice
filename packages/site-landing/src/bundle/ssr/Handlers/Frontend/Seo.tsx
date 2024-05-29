import React from "react";
import {HelmetData} from "react-helmet";

type Props = {
    helmet: HelmetData;
};

export const Seo = React.memo<Props>(({helmet}) => (
    <>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
    </>
));
