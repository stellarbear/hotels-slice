import {dirname, join} from "path";
import * as logger from "../internal/logger";

export class PackageResourceConfig {
    public readonly source: string;
    public readonly config: Record<string, string[]>;

    constructor(source: string, config: Record<string, string[]>) {
        this.config = config;
        this.source = source;
    }

    public static resolve(path: string) {
        try {
            /* eslint-disable @typescript-eslint/no-var-requires*/
            return new PackageResourceConfig(path, require(path));
        } catch (error) {
            logger.error(error);
            return new PackageResourceConfig(path, {});
        }
    }

    public getResourcesBy(type: string) {
        const resources = this.config[type] ?? [];
        return resources.map((resource) => join(dirname(this.source), resource));
    }
}
