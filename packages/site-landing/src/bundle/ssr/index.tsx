import * as http from "http";
import {environment} from "../landing/environment";
import * as handlers from "./Handlers";
import {RequestHandler} from "./handler";

environment();

const server = http.createServer((req, res) => RequestHandler.from(req, res)
    .endpoint({
        method: "GET",
        url: "/sitemap.xml",
        action: handlers.sitemap,
    })
    .endpoint({
        method: "GET",
        url: /.*/,
        action: handlers.frontend,
    }).compile());

server.listen(8088, () => console.log("Listening on 8088"));

export const Signals: NodeJS.Signals[] = ["SIGINT", "SIGQUIT", "SIGTERM"];
for (const signal of Signals) {
    process.on(signal, () => server.close());
    process.on(signal, () => console.log(signal));
}
