import {PluginBuild} from "esbuild";
import * as fs from "fs";
import {PluginAbstract} from "../PluginAbstract";

export class StaticLoader extends PluginAbstract<[string, string][]> {
    constructor(config: [string, string][] = []) {
        super(config);
    }

    protected connect(build: PluginBuild): void {
        const paths = this.config;

        build.onEnd(() => {
            paths.forEach(([src, dst]) => {
                fs.cpSync(src, dst, {force: true, recursive: true});
            });
        });
    }
}

export default StaticLoader;
