import * as React from "react";

type Props = {
    content: string;
    // state: NormalizedCacheObject;
};

export const Body = React.memo<Props>((props) => {
    return (
        <body>
            <div id="root" dangerouslySetInnerHTML={{__html: props.content}} />
            {/* <script dangerouslySetInnerHTML={{
                __html: `window.apollo=${JSON.stringify(props.state).replace(/</g, "\\u003c")};`,
            }} /> */}
        </body>
    );
});
