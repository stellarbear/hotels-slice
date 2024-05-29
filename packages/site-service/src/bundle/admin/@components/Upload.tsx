import {useBucketUpload} from "@app/extensions-apollo";
import {ADMIN_UPLOAD_MEDIA_MUTATION} from "../@query";
import {AdminUploadMediaMutation, AdminUploadMediaMutationVariables, TypeDocument} from "../interfaces";

const doc = ADMIN_UPLOAD_MEDIA_MUTATION;
type Mutation = AdminUploadMediaMutation;
type Variables = AdminUploadMediaMutationVariables;

export const useUpload = (type: TypeDocument) => useBucketUpload<Mutation, Variables>({
    doc,
    getUrlAndName: (e => e.adminUploadMedia),
    getVariables: (fileName) => ({input: {fileName, type}}),
});
