import {ExtensionsArray, ExtensionsObject} from "@app/extensions-classes";
import {Flex} from "@app/ui-web-core";
import {Accordion, Carousel, Image, Typo} from "@app/ui-web-kit";
import {MarkdownViewer} from "@app/ui-web-markdown";
import React from "react";
import {queryInforamtionAll} from "./Information";

type Props = {
};

export const InformationList = React.memo<Props>(() => {
    const [data] = queryInforamtionAll.use();
    const information = data.allGetInfoBlocks;

    const sections = React.useMemo(() =>
        ExtensionsArray.toRecordArray(information, e => e.category),
        [information]);

    return (
        <Flex.Col>
            <Typo.Title>Помощь</Typo.Title>
            {ExtensionsObject.entries(sections).map(([category, items], index) => (
                <Accordion key={index} title={category} id={category}>
                    {items.map((item, index) => (
                        <Accordion key={index} title={item.title}>
                            <MarkdownViewer>{item.content}</MarkdownViewer>
                            <Carousel items={item.files}>
                                {image => (
                                    <Image.Zoom>
                                        <Image.Handle image={image} url={executer.URL_FS} />
                                    </Image.Zoom>
                                )}
                            </Carousel>
                        </Accordion>
                    ))}
                </Accordion>
            ))}
        </Flex.Col>
    );
});
