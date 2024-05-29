import * as http from "http";

type RequestMethod = "GET" | "POST" | "DELETE" | "PUT";
type RequestHandlerRoute = {
    method: RequestMethod;
    url: string | RegExp;
    action: (
        request: http.IncomingMessage,
        response: http.ServerResponse
    ) => void;
};

export class RequestHandler {
    private readonly routes = [] as RequestHandlerRoute[];

    private constructor(
        private readonly request: http.IncomingMessage,
        private readonly response: http.ServerResponse,
    ) { }

    public static from(
        request: http.IncomingMessage,
        response: http.ServerResponse,
    ) {
        return new RequestHandler(request, response);
    }

    public endpoint(options: RequestHandlerRoute) {
        this.routes.push(options);
        return this;
    }

    public compile() {
        try {
            for (const route of this.routes) {
                if ((this.request.method === route.method) &&
                    new RegExp(route.url).test(this.request.url ?? "")) {
                    return route.action(this.request, this.response);
                }
            }

            this.response.writeHead(404);
            this.response.end("Unknown request");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";

            this.response.writeHead(500);
            this.response.end(`Internal server error: ${message}`);
        }
    }
}
