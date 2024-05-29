import {Context, createContext, useContext} from "react";

export type Refetch = () => Promise<any>;

export function ContainerAbstract<T>() {
    abstract class ContainerAbstract {
        public static readonly _context = createContext<any>(null);
        public readonly data: T;
        public readonly refetch: Refetch;

        constructor(data: T, refetch: Refetch) {
            this.data = data;
            this.refetch = refetch;
        }

        public static context(): Context<ContainerAbstract> {
            return this._context;
        }

        public static use(): ContainerAbstract {
            return useContext<ContainerAbstract>(this._context);
        }
    }

    return ContainerAbstract;
}
