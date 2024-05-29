import {readFileSync} from "fs";
import {resolve} from "path";

export const getDotEnvironmentVariables = () => {
    try {
        const dotenvPath = resolve(process.cwd(), "../../.env");
        const input = readFileSync(dotenvPath, {encoding: "utf-8"});
        const result = parse(input);

        const projectName = result.PROJECT_NAME;
        const projectEnv = result.PROJECT_ENV;
        if (projectName && projectEnv) {
            const projectPathBase = resolve(process.cwd(), `../../packages/${projectName}/env/.base`);
            const projectPathExt = resolve(process.cwd(), `../../packages/${projectName}/env/.${projectEnv}`);

            return ({
                ...result,
                ...parse(readFileSync(projectPathBase, {encoding: "utf-8"})),
                ...parse(readFileSync(projectPathExt, {encoding: "utf-8"})),
            });
        }
        
        return result;
    } catch {
        return {};
    }
};

const KEY_VALUE = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const NEWLINES_MATCH = /\r\n|\n|\r/;

const parse = (input: string) => {
    const result = {} as Record<string, any>;

    const lines = input.split(NEWLINES_MATCH);
    for (const line of lines) {
        const entry = line.match(KEY_VALUE);
        if (entry) {
            const [, key, value] = entry;
            result[key] = (value || "").trim();
        }
    }

    return result;
};
