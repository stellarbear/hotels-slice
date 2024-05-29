import {ExtensionsDate} from "@app/extensions-classes";
import {Card, Image, Typo} from "@app/ui-web-kit";
import {MarkdownViewer} from "@app/ui-web-markdown";
import * as React from "react";
import {NewsPost} from "./News";

type Props = {
    post: NewsPost;
};

export const NewsFormCard = React.memo<Props>((props) => {
    const {post} = props;

    return (
        <Card key={post.id}>
            <Typo.SubTitle>{post.title}</Typo.SubTitle>
            <Typo.p>{ExtensionsDate.format("d.m.y", post.updateAt)}</Typo.p>

            <MarkdownViewer>{post.content}</MarkdownViewer>
            <Image.Zoom>
                <Image.Handle image={post.files} url={executer.URL_FS} />
            </Image.Zoom>
        </Card>
    );
});
