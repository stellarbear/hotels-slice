import * as http from "http";
import {ERoute} from "../../../landing/AppRoutes";

type SitemapConfig = {
    loc: string;
    priority?: number;
    lastmod?: string;
    changefreq?: string;
};

const urls: SitemapConfig[] = [
    {loc: "/user_agreement.html", lastmod: "2024-03-25", changefreq: "daily", priority: 0.9},
];

const template = (input: SitemapConfig) => {
    const lines = Object.keys(input).map(key =>
        `<${key}>${input[key as keyof SitemapConfig]}</${key}>`);
    return `<url>\n${lines.join("\n")}</url>`;
};

const schema = (input: SitemapConfig[]) => `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${input.map(template)}
    </urlset>
`;

export const sitemap = (
    request: http.IncomingMessage,
    response: http.ServerResponse,
) => {
    const origin = "https://" + request.headers.origin;
    const options = urls.map(url => ({...url, loc: `${origin}${url.loc}`}));

    response.statusCode = 200;
    response.setHeader("Content-Type", "text/xml; charset=UTF-8");
    response.end(schema(options));
};
