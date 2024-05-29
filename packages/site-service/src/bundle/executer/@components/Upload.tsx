import {useBucketUpload} from "@app/extensions-apollo";
import {EXECUTER_UPLOAD_MEDIA_MUTATION} from "../@query";
import {ExecuterUploadMediaMutation, ExecuterUploadMediaMutationVariables, TypeMedia} from "../interfaces";

const doc = EXECUTER_UPLOAD_MEDIA_MUTATION;
type Mutation = ExecuterUploadMediaMutation;
type Variables = ExecuterUploadMediaMutationVariables;

export const useUpload = (type: TypeMedia) => useBucketUpload<Mutation, Variables>({
    doc,
    getUrlAndName: (e => e.executerUploadMedia),
    getVariables: (fileName) => ({input: {fileName, type}}),
});
