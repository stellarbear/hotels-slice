import {useScript} from "@app/extensions-react";
import * as React from "react";

/* eslint-disable max-len */
const yandex = (counter: string) => `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(${counter}, "init", {
     clickmap:true,
     trackLinks:true,
     accurateTrackBounce:true,
     webvisor:true
});`;

type Props = {
    counter: string | false;
};

export const Analytics = React.memo<Props>((props) => {
    const {counter} = props;
    useScript(counter && yandex(counter), {type: "content"});

    return null;
});
