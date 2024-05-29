import {
    ApolloError, DefaultContext, MutationHookOptions,
    OperationVariables,
    useMutation
} from "@apollo/client";
import {DocumentNode} from "graphql";

export type Options<M, V> = MutationHookOptions<M, V, DefaultContext>;
export type ExtensionFN = <M, V>(options: Options<M, V>) => Options<M, V>;

export class Mutation<M, V> {
    private static rewire?: (options: Options<any, any>) => void;
    public static wire(fn: (options: Options<any, any>) => void) {
        this.rewire = fn;
    }

    private constructor(
        private readonly doc: DocumentNode,
        private readonly options: Options<M, V>,
        private readonly overrides: Options<M, V> = {},
    ) { }

    public static from<M, V = OperationVariables>(
        doc: DocumentNode,
        options: Options<M, V> = {},
    ) {
        return new Mutation(doc, options);
    }

    public withConfiguration(options: Options<M, V>) {
        Object.assign(this.overrides, options);

        return this;
    }

    public onSuccess(fn: ((data: M) => void)) {
        this.overrides.onCompleted = fn;

        return this;
    }

    public onError(fn: ((error: ApolloError) => void)) {
        this.overrides.onError = fn;

        return this;
    }

    public compile() {
        Mutation.rewire?.(this.options);
        const options: Options<M, V> = {
            ...this.options,
            ...this.overrides,
            onCompleted: (data: M) => {
                this.options.onCompleted?.(data);
                this.overrides.onCompleted?.(data);
            },
            onError: (error: ApolloError) => {
                this.options.onError?.(error);
                this.overrides.onError?.(error);
                throw error;
            },
            refetchQueries: "active",
            // awaitRefetchQueries: true,
            // refetchQueries: Array.from(client.getObservableQueries().values()).map(e => e.query),
        };

        return useMutation<M, V>(this.doc, options);
    }
}
