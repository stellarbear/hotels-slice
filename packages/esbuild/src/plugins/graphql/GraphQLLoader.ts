import {PluginBuild} from "esbuild";
import * as fs from "fs";
import {PluginAbstract} from "../PluginAbstract";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loader = require("graphql-tag/loader");

export class GraphQLLoader extends PluginAbstract<{ filter: RegExp }> {
    constructor(config = {filter: /\.(graphql|gql)$/}) {
        super(config);
    }

    protected connect(build: PluginBuild): void {
        const {filter} = this.config;
        build.onLoad({filter}, (args) => {
            const content = fs.readFileSync(args.path, {encoding: "utf-8"});
            return {
                contents: loader.call({cacheable: () => void 0}, content),
                loader: "js",
            };
        });
    }
}

export default GraphQLLoader;
