import {Flex} from "@app/ui-web-core";
import {Typo} from "@app/ui-web-kit";
import * as React from "react";
import {queryNewsPagination} from "./News";
import {NewsFormCard} from "./NewsFormCard";


export const NewsForm = React.memo(() => {
    const [data] = queryNewsPagination.use();
    const news = React.useMemo(() => data.allGetPosts.edges.map(e => e.node), [data]);

    return (
        <Flex.Col>
            <Typo.Title>Новости</Typo.Title>

            {news.map((entry, index) => (
                <NewsFormCard key={index} post={entry} />
            ))}
        </Flex.Col>
    );
});
