import * as fs from "fs";
import * as http from "http";
import mime from "mime";
import * as path from "path";
import * as React from "react";
import {renderToString} from "react-dom/server";
import {Helmet} from "react-helmet";
import {StaticRouter} from "react-router-dom/server";
import {ServerStyleSheet} from "styled-components";
import {parse} from "url";
import {App} from "../../../landing/App";
import {Body} from "./Body";
import {Seo} from "./Seo";

const dist = (file: string) => path.resolve(__dirname, "../landing", file.replace(/(^\/)/, ""));
const index = fs.readFileSync(path.resolve(dist("index.html")), {encoding: "utf-8"});

export const frontend = (
    request: http.IncomingMessage,
    response: http.ServerResponse,
) => {

    const {pathname = "/"} = parse(request.url ?? "");
    if (/((^\/(assets|js|downloads)\/)|\.(js|ico|svg|png|[a-z0-9]+)$)/.test(pathname ?? "")) {
        // console.log(`serve ( file=${pathname} )`);

        if (!pathname || !fs.existsSync(path.resolve(dist(pathname)))) {
            // console.error(`404 for ( file=${pathname} )`);

            response.writeHead(404);
            return response.end(`File not found: ${pathname}`);
        }

        const type = mime.getType(path.extname(pathname));
        // console.log({mime: type});
        if (type) {
            response.setHeader("Content-Type", type);
        }

        return fs.createReadStream(path.resolve(dist(pathname)))
            .pipe(response);
    }

    // const link = createApolloLink({urlGraph: board.URL_GRAPHQL, urlSchema: board.URL_GRAPHQL_SCHEMA})
    // const client = createApolloClient({link, ssr: true})
    // global.window = {} as any;
    // getDataFromTree(app).then((content) => {

    const sheet = new ServerStyleSheet();
    const app = sheet.collectStyles(
        <StaticRouter location={request.url ?? "/"}>
            <App />
        </StaticRouter>,
    );

    const body = <Body content={renderToString(app)} />;
    const helmet = Helmet.renderStatic();

    const seo = <Seo helmet={helmet} />;
    const styles = sheet.getStyleTags();
    sheet.seal();

    const meta = helmet.meta.toString();
    const status = meta.match(/status:(.*):/)?.[1] ?? "200";
    response.statusCode = parseInt(status, 10);

    response.setHeader("Content-Type", "text/html; charset=UTF-8");

    response.end(index
        .replace("<meta name=\"helmet\">", renderToString(seo))
        .replace("<meta name=\"styled\">", styles)
        .replace("<body>", renderToString(body)),
    );
};
