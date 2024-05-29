import {
    ApolloError,
    OperationVariables,
    QueryHookOptions,
    QueryResult,
    useLazyQuery,
    useQuery
} from "@apollo/client";
import {DocumentNode} from "graphql";
import {Context} from "./Context";

export type Options<M, V extends OperationVariables> = 
    & QueryHookOptions<M, V>;

export class Query<Q, V extends OperationVariables> {
    private static rewire?: (options: Options<any, any>) => void;
    public static wire(fn: (options: Options<any, any>) => void) {
        this.rewire = fn;
    }

    private constructor(
        public readonly doc: DocumentNode,
        public readonly options: Options<Q, V>,
        private readonly overrides: Options<Q, V> = {},
    ) { }

    public static from<M, V extends OperationVariables = OperationVariables>(
        doc: DocumentNode,
        options: Options<M, V> = {},
    ) {
        return new Query(doc, options);
    }

    public withConfiguration(options: Options<Q, V>) {
        Object.assign(this.overrides, options);

        return this;
    }

    public onSuccess(fn: ((data: Q) => void)) {
        if (!this.overrides.onCompleted) {
            this.overrides.onCompleted = fn;
        }

        return this;
    }

    public onError(fn: ((error: ApolloError) => void)) {
        if (!this.overrides.onError) {
            this.overrides.onError = fn;
        }

        return this;
    }

    public __intercept__ = (_: QueryResult<Q, V>) => {};

    public compile() {
        Query.rewire?.(this.options);

        const options: Options<Q, V> = {
            fetchPolicy: "cache-and-network",
            ...this.options,
            ...this.overrides,
            onCompleted: (data: Q) => {
                this.options.onCompleted?.(data);
                this.overrides.onCompleted?.(data);
            },
            onError: (error: ApolloError) => {
                this.options.onError?.(error);
                this.overrides.onError?.(error);
            },
        };

        const result = useQuery<Q, V>(this.doc, options);
        this.__intercept__(result);
        return result;
    }

    public lazy() {
        Query.rewire?.(this.options);

        const options: Options<Q, V> = {
            fetchPolicy: "network-only",
            ...this.options,
            ...this.overrides,
            onCompleted: (data: Q) => {
                this.options.onCompleted?.(data);
                this.overrides.onCompleted?.(data);
            },
            onError: (error: ApolloError) => {
                this.options.onError?.(error);
                this.overrides.onError?.(error);
            },
        };

        const result = useLazyQuery(this.doc, options);
        this.__intercept__(result[1]);
        return result;
    }

    public context() {
        return Context<Q, V>(this);
    }
}
