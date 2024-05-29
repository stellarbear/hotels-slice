import AUTH_CODE_SEND_MUTATION from "./AuthCodeSendMutation.graphql";
import AUTH_CODE_VERIFY_QUERY from "./AuthCodeVerifyQuery.graphql";
import AUTH_DEACTIVATE_EXECUTER_MUTATION from "./AuthDeactivateExecuterMutation.graphql";
import AUTH_RECOVERY_MUTATION from "./AuthRecoveryMutation.graphql";
import AUTH_SIGN_IN_EXECUTER_MUTATION from "./AuthSignInExecuterMutation.graphql";
import AUTH_SIGN_UP_EXECUTER_MUTATION from "./AuthSignUpExecuterMutation.graphql";

import CUSTOMER_BOOKMARK_MUTATION from "./CustomerBookmarkMutation.graphql";
import CUSTOMER_BOOKMARK_UNDO_ALL_MUTATION from "./CustomerBookmarkUndoAllMutation.graphql";
import CUSTOMER_BOOKMARK_UNDO_MUTATION from "./CustomerBookmarkUndoMutation.graphql";
import CUSTOMER_GET_ALL_QUERY from "./CustomerGetAllQuery.graphql";
import CUSTOMER_GET_BOOKMARKS_QUERY from "./CustomerGetBookmarksQuery.graphql";
import CUSTOMER_GET_BY_ID from "./CustomerGetByIdQuery.graphql";
import CUSTOMER_RATE_MUTATION from "./CustomerRateMutation.graphql";

import EXECUTER_DOCUMENTS_QUERY from "./ExecuterDocumentsQuery.graphql";
import EXECUTER_DOCUMENTS_UPSERT_MUTATION from "./ExecuterDocumentsUpsertMutation.graphql";
import EXECUTER_PASSPORT_QUERY from "./ExecuterPassportQuery.graphql";
import EXECUTER_PASSPORT_UPSERT_MUTATION from "./ExecuterPassportUpsertMutation.graphql";
import EXECUTER_PASSWORD_SET_MUTATION from "./ExecuterPasswordSetMutation.graphql";
import EXECUTER_REQUISITES_QUERY from "./ExecuterRequisitesQuery.graphql";
import EXECUTER_REQUISITES_UPSERT_MUTATION from "./ExecuterRequisitesUpsertMutation.graphql";
import EXECUTER_UPDATE_MUTATION from "./ExecuterUpdateMutation.graphql";
import EXECUTER_UPDATE_AVATAR_MUTATION from "./ExecuterUpdateAvatarMutation.graphql";
import EXECUTER_UPLOAD_MEDIA_MUTATION from "./ExecuterUploadMediaMutation.graphql";
import EXECUTER_VERIFICATION_QUERY from "./ExecuterVerificationQuery.graphql";
import EXECUTER_VERIFICATION_REQUEST_MUTATION from "./ExecuterVerificationRequestMutation.graphql";
import EXECUTER_VERIFICATION_CONFIRM_MUTATION from "./ExecuterVerificationConfirmMutation.graphql";

import DOCUMENT_ALL_QUERY from "./DocumentAllQuery.graphql";
import DOCUMENT_NOTICE_GET_ALL_QUERY from "./DocumentNoticeGetAllQuery.graphql";

import MAIN_QUERY from "./MainQuery.graphql";

import INFORMATION_ALL_QUERY from "./InformationAllQuery.graphql";
import NEWS_ALL_QUERY from "./NewsAllQuery.graphql";

import NOTIFICATION_ALL_QUERY from "./NotificationAllQuery.graphql";
import NOTIFICATION_READ_MUTATION from "./NotificationReadMutation.graphql";
import NOTIFICATION_SUBSCRIPTION from "./NotificationSubscription.graphql";

import REPORT_CREATE_MUTATION from "./ReportCreateMutation.graphql";
import REPORT_GET_QUERY from "./ReportGetQuery.graphql";

import TASK_CANCEL_MUTATION from "./TaskCancelMutation.graphql";
import TASK_MINE_QUERY from "./TaskMineQuery.graphql";
import TASK_QUERY from "./TaskQuery.graphql";
import TASK_GET_BY_ID_QUERY from "./TaskGetByIdQuery.graphql";
import TASK_GET_CURRENT_QUERY from "./TaskGetCurrentQuery.graphql";
import TASK_REQUEST_MUTATION from "./TaskRequestMutation.graphql";

export {
    AUTH_CODE_SEND_MUTATION,
    AUTH_CODE_VERIFY_QUERY,
    AUTH_SIGN_IN_EXECUTER_MUTATION,
    AUTH_RECOVERY_MUTATION,
    AUTH_SIGN_UP_EXECUTER_MUTATION,
    AUTH_DEACTIVATE_EXECUTER_MUTATION,

    DOCUMENT_ALL_QUERY,
    DOCUMENT_NOTICE_GET_ALL_QUERY,

    MAIN_QUERY,

    NEWS_ALL_QUERY,
    INFORMATION_ALL_QUERY,

    NOTIFICATION_ALL_QUERY,
    NOTIFICATION_READ_MUTATION,
    NOTIFICATION_SUBSCRIPTION,

    EXECUTER_UPDATE_MUTATION,
    EXECUTER_UPDATE_AVATAR_MUTATION,
    EXECUTER_PASSPORT_QUERY,
    EXECUTER_PASSPORT_UPSERT_MUTATION,
    EXECUTER_REQUISITES_QUERY,
    EXECUTER_REQUISITES_UPSERT_MUTATION,
    EXECUTER_DOCUMENTS_QUERY,
    EXECUTER_DOCUMENTS_UPSERT_MUTATION,
    EXECUTER_UPLOAD_MEDIA_MUTATION,
    EXECUTER_VERIFICATION_QUERY,
    EXECUTER_PASSWORD_SET_MUTATION,
    EXECUTER_VERIFICATION_CONFIRM_MUTATION,
    EXECUTER_VERIFICATION_REQUEST_MUTATION,

    REPORT_CREATE_MUTATION,
    REPORT_GET_QUERY,

    TASK_QUERY,
    TASK_MINE_QUERY,
    TASK_CANCEL_MUTATION,
    TASK_GET_CURRENT_QUERY,
    TASK_REQUEST_MUTATION,
    TASK_GET_BY_ID_QUERY,

    CUSTOMER_GET_BOOKMARKS_QUERY,
    CUSTOMER_RATE_MUTATION,
    CUSTOMER_BOOKMARK_MUTATION,
    CUSTOMER_BOOKMARK_UNDO_MUTATION,
    CUSTOMER_BOOKMARK_UNDO_ALL_MUTATION,
    CUSTOMER_GET_ALL_QUERY,
    CUSTOMER_GET_BY_ID,
};
