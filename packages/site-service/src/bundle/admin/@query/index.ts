/* eslint-disable max-len */

import AUTH_SIGN_IN_ADMIN_MUTATION from "./AuthSignInAdminMutation.graphql";
import AUTH_SIGN_IN_RELAY_MUTATION from "./AuthSignInRelayMutation.graphql";

import MAIN_QUERY from "./MainQuery.graphql";

import ADMIN_ALL_QUERY from "./AdminAllQuery.graphql";
import ADMIN_GET_BY_NAME_QUERY from "./AdminGetByNameQuery.graphql";
import ADMIN_UPSERT_MUTATION from "./AdminUpsertMutation.graphql";
import ADMIN_DEACTIVATE_MUTATION from "./AdminDeactivateMutation.graphql";
import ADMIN_UPLOAD_MEDIA_MUTATION from "./AdminUploadMediaMutation.graphql";
import ADMIN_PASSWORD_RESET_MUTATION from "./AdminPasswordResetMutation.graphql";

import DOCUMENT_AGREEMENT_ALL_QUERY from "./DocumentAgreementAllQuery.graphql";
import DOCUMENT_OFFER_ALL_QUERY from "./DocumentOfferAllQuery.graphql";
import DOCUMENT_UPSERT_MUTATION from "./DocumentUpsertMutation.graphql";

import DOCUMENT_NOTICE_CUSTOMER_ALL_QUERY from "./DocumentNoticeCustomerAllQuery.graphql";
import DOCUMENT_NOTICE_CUSTOMER_ARCHIVE_MUTATION from "./DocumentNoticeCustomerArchiveMutation.graphql";
import DOCUMENT_NOTICE_CUSTOMER_ARCHIVE_UNDO_MUTATION from "./DocumentNoticeCustomerArchiveUndoMutation.graphql";
import DOCUMENT_NOTICE_CUSTOMER_CREATE_MUTATION from "./DocumentNoticeCustomerCreateMutation.graphql";
import DOCUMENT_NOTICE_CUSTOMER_GET_BY_ID_QUERY from "./DocumentNoticeCustomerGetByIdQuery.graphql";
import DOCUMENT_NOTICE_CUSTOMER_SEND_MUTATION from "./DocumentNoticeCustomerSendMutation.graphql";

import DOCUMENT_NOTICE_EXECUTER_ALL_QUERY from "./DocumentNoticeExecuterAllQuery.graphql";
import DOCUMENT_NOTICE_EXECUTER_CREATE_MUTATION from "./DocumentNoticeExecuterCreateMutation.graphql";
import DOCUMENT_NOTICE_EXECUTER_DELETE_MUTATION from "./DocumentNoticeExecuterDeleteMutation.graphql";
import DOCUMENT_NOTICE_EXECUTER_GET_BY_ID_QUERY from "./DocumentNoticeExecuterGetByIdQuery.graphql";

import DOCUMENT_ACT_ALL_QUERY from "./DocumentActAllQuery.graphql";
import DOCUMENT_ACT_ARCHIVE_MUTATION from "./DocumentActArchiveMutation.graphql";
import DOCUMENT_ACT_MARK_AS_PAID_MUTATION from "./DocumentActMarkAsPaidMutation.graphql";
import DOCUMENT_ACT_ARCHIVE_UNDO_MUTATION from "./DocumentActArchiveUndoMutation.graphql";
import DOCUMENT_ACT_CREATE_MUTATION from "./DocumentActCreateMutation.graphql";
import DOCUMENT_ACT_GET_BY_ID_QUERY from "./DocumentActGetByIdQuery.graphql";
import DOCUMENT_ACT_SEND_MUTATION from "./DocumentActSendMutation.graphql";
import DOCUMENT_ACT_RESTRICT_PERIOD_MUTATION from "./DocumentActRestrictPeriodMutation.graphql";

import NEWS_ALL_QUERY from "./NewsAllQuery.graphql";
import NEWS_UPSERT_MUTATION from "./NewsUpsertMutation.graphql";
import NEWS_PUBLISH_MUTATION from "./NewsPublishMutation.graphql";
import NEWS_DELETE_MUTATION from "./NewsDeleteMutation.graphql";
import NEWS_PUBLISH_UNDO_MUTATION from "./NewsPublishUndoMutation.graphql";

import INFORMATION_ALL_QUERY from "./InformationAllQuery.graphql";
import INFORMATION_UPSERT_MUTATION from "./InformationUpsertMutation.graphql";
import INFORMATION_DELETE_MUTATION from "./InformationDeleteMutation.graphql";
import INFORMATION_PUBLISH_MUTATION from "./InformationPublishMutation.graphql";
import INFORMATION_ALL_CATEGORY_QUERY from "./InformationAllCategoryQuery.graphql";
import INFORMATION_PUBLISH_UNDO_MUTATION from "./InformationPublishUndoMutation.graphql";

import PAYMENT_ALL_QUERY from "./PaymentAllQuery.graphql";
import PAYMENT_ARCHIVE_MUTATION from "./PaymentArchiveMutation.graphql";
import PAYMENT_ARCHIVE_UNDO_MUTATION from "./PaymentArchiveUndoMutation.graphql";
import PAYMENT_CONFIRM_EXECUTER_MUTATION from "./PaymentConfirmExecuterMutation.graphql";
import PAYMENT_CREATE_MUTATION from "./PaymentCreateMutation.graphql";
import PAYMENT_DELETE_MUTATION from "./PaymentDeleteMutation.graphql";
import PAYMENT_CREATE_RECEIPT_MUTATION from "./PaymentCreateReceiptMutation.graphql";
import PAYMENT_GET_BY_ID_QUERY from "./PaymentGetByIdQuery.graphql";
import PAYMENT_DOWNLOAD_RECIPE_MUTATION from "./PaymentDownloadRecipeMutation.graphql";
import PAYMENT_MOBILE_ALL_QUERY from "./PaymentMobileAllQuery.graphql";
import PAYMENT_MOBILE_CREATE_MUTATION from "./PaymentMobileCreateMutation.graphql";

import PROFESSION_ALL_QUERY from "./ProfessionAllQuery.graphql";
import PROFESSION_UPSERT_MUTATION from "./ProfessionUpsertMutation.graphql";

import CUSTOMER_ALL_QUERY from "./CustomerAllQuery.graphql";
import CUSTOMER_GET_BY_ID_QUERY from "./CustomerGetByIdQuery.graphql";
import CUSTOMER_GET_BY_INN_QUERY from "./CustomerGetByInnQuery.graphql";
import CUSTOMER_GET_BY_NAME_OR_INN_QUERY from "./CustomerGetByNameOrInnQuery.graphql";
import CUSTOMER_GET_BY_NAME_QUERY from "./CustomerGetByNameQuery.graphql";
import CUSTOMER_GET_LOGO_QUERY from "./CustomerGetLogoQuery.graphql";
import CUSTOMER_LOGO_UPSERT_MUTATION from "./CustomerLogoEditMutation.graphql";
import CUSTOMER_VERIFY_CONFIRM_MUTATION from "./CustomerVerifyConfirmMutation.graphql";
import CUSTOMER_MARK_AS_TEST_MUTATION from "./CustomerMarkAsTestMutation.graphql";
import CUSTOMER_VERIFY_DECLINE_MUTATION from "./CustomerVerifyDeclineMutation.graphql";
import CUSTOMER_GET_MANAGER_ALL_QUERY from "./CustomerGetManagerAllQuery.graphql";
import CUSTOMER_MANAGER_CURATOR_ADD_MUTATION from "./CustomerManagerCuratorAddMutation.graphql";
import CUSTOMER_MANAGER_CURATOR_REMOVE_MUTATION from "./CustomerManagerCuratorRemoveMutation.graphql";
import CUSTOMER_SETTINGS_SET_MUTATION from "./CustomerSettingsSetMutation.graphql";

import EXECUTER_ALL_QUERY from "./ExecuterAllQuery.graphql";
import EXECUTER_DOCUMENTS_QUERY from "./ExecuterDocumentsQuery.graphql";
import EXECUTER_ACTIVITY_QUERY from "./ExecuterActivityQuery.graphql";
import EXECUTER_GET_PAYMENT_ALL_QUERY from "./ExecuterGetPaymentAllQuery.graphql";
import EXECUTER_GET_BY_ID_QUERY from "./ExecuterGetByIdQuery.graphql";
import EXECUTER_RESET_PASSWORD_MUTATION from "./ExecuterResetPasswordMutation.graphql";
import EXECUTER_MARK_AS_TEST_MUTATION from "./ExecuterMarkAsTestMutation.graphql";
import EXECUTER_SEND_PUSH_NOTIFICATION_BY_FILTERS_MUTATION from "./ExecuterSendPushNotificationByFiltersMutation.graphql";
import EXECUTER_SEND_PUSH_NOTIFICATION_BY_ID_MUTATION from "./ExecuterSendPushNotificationByIdMutation.graphql";
import EXECUTER_CHECK_FNS_QUERY from "./ExecuterCheckFNSQuery.graphql";
import EXECUTER_GET_BY_NAME_QUERY from "./ExecuterGetByNameQuery.graphql";
import EXECUTER_VERIFY_DECLINE_MUTATION from "./ExecuterVerifyDeclineMutation.graphql";
import EXECUTER_VERIFY_CONFIRM_MUTATION from "./ExecuterVerifyConfirmMutation.graphql";
import EXECUTER_VERIFY_CANCEL_MUTATION from "./ExecuterVerifyCancelMutation.graphql";
import EXECUTER_GET_TASK_CURRENT_BY_ID_QUERY from "./ExecuterGetTaskCurrentByIdQuery.graphql";
import EXECUTER_SYNC_JUMP_MUTATION from "./ExecuterSyncJumpMutation.graphql";
import EXECUTER_SET_AGREEMENT_DATE_MUTATION from "./ExecuterSetAgreementDateMutation.graphql";


import REPORT_CREATE_MUTATION from "./ReportCreateMutation.graphql";
import REPORT_GET_QUERY from "./ReportGetQuery.graphql";

import TASK_GET_BY_ID_QUERY from "./TaskGetByIdQuery.graphql";
import TASK_EXECUTER_REMOVE_MUTATION from "./TaskExecuterRemoveMutation.graphql";
import TASK_EXECUTER_ADD_MUTATION from "./TaskExecuterAddMutation.graphql";
import TASK_MOVE_MUTATION from "./TaskMoveMutation.graphql";
import TASK_ALL_QUERY from "./TaskAllQuery.graphql";

export {
    AUTH_SIGN_IN_ADMIN_MUTATION,
    AUTH_SIGN_IN_RELAY_MUTATION,

    MAIN_QUERY,

    ADMIN_ALL_QUERY,
    ADMIN_UPSERT_MUTATION,
    ADMIN_DEACTIVATE_MUTATION,
    ADMIN_GET_BY_NAME_QUERY,
    ADMIN_UPLOAD_MEDIA_MUTATION,
    ADMIN_PASSWORD_RESET_MUTATION,

    DOCUMENT_OFFER_ALL_QUERY,
    DOCUMENT_AGREEMENT_ALL_QUERY,
    DOCUMENT_UPSERT_MUTATION,

    DOCUMENT_NOTICE_CUSTOMER_ALL_QUERY,
    DOCUMENT_NOTICE_CUSTOMER_CREATE_MUTATION,
    DOCUMENT_NOTICE_CUSTOMER_SEND_MUTATION,
    DOCUMENT_NOTICE_CUSTOMER_GET_BY_ID_QUERY,
    DOCUMENT_NOTICE_CUSTOMER_ARCHIVE_MUTATION,
    DOCUMENT_NOTICE_CUSTOMER_ARCHIVE_UNDO_MUTATION,

    DOCUMENT_NOTICE_EXECUTER_ALL_QUERY,
    DOCUMENT_NOTICE_EXECUTER_CREATE_MUTATION,
    DOCUMENT_NOTICE_EXECUTER_DELETE_MUTATION,
    DOCUMENT_NOTICE_EXECUTER_GET_BY_ID_QUERY,

    DOCUMENT_ACT_ALL_QUERY,
    DOCUMENT_ACT_GET_BY_ID_QUERY,
    DOCUMENT_ACT_CREATE_MUTATION,
    DOCUMENT_ACT_SEND_MUTATION,
    DOCUMENT_ACT_MARK_AS_PAID_MUTATION,
    DOCUMENT_ACT_ARCHIVE_MUTATION,
    DOCUMENT_ACT_ARCHIVE_UNDO_MUTATION,
    DOCUMENT_ACT_RESTRICT_PERIOD_MUTATION,


    NEWS_ALL_QUERY,
    NEWS_UPSERT_MUTATION,
    NEWS_PUBLISH_MUTATION,
    NEWS_DELETE_MUTATION,
    NEWS_PUBLISH_UNDO_MUTATION,

    INFORMATION_ALL_QUERY,
    INFORMATION_UPSERT_MUTATION,
    INFORMATION_DELETE_MUTATION,
    INFORMATION_PUBLISH_MUTATION,
    INFORMATION_PUBLISH_UNDO_MUTATION,
    INFORMATION_ALL_CATEGORY_QUERY,

    PAYMENT_ALL_QUERY,
    PAYMENT_GET_BY_ID_QUERY,
    PAYMENT_CREATE_MUTATION,
    PAYMENT_DELETE_MUTATION,
    PAYMENT_ARCHIVE_MUTATION,
    PAYMENT_ARCHIVE_UNDO_MUTATION,
    PAYMENT_CONFIRM_EXECUTER_MUTATION,
    PAYMENT_CREATE_RECEIPT_MUTATION,
    PAYMENT_DOWNLOAD_RECIPE_MUTATION,
    PAYMENT_MOBILE_ALL_QUERY,
    PAYMENT_MOBILE_CREATE_MUTATION,

    PROFESSION_ALL_QUERY,
    PROFESSION_UPSERT_MUTATION,

    CUSTOMER_ALL_QUERY,
    CUSTOMER_GET_BY_ID_QUERY,
    CUSTOMER_GET_BY_INN_QUERY,
    CUSTOMER_GET_BY_NAME_QUERY,
    CUSTOMER_VERIFY_CONFIRM_MUTATION,
    CUSTOMER_VERIFY_DECLINE_MUTATION,
    CUSTOMER_LOGO_UPSERT_MUTATION,
    CUSTOMER_MARK_AS_TEST_MUTATION,
    CUSTOMER_GET_BY_NAME_OR_INN_QUERY,
    CUSTOMER_GET_MANAGER_ALL_QUERY,
    CUSTOMER_MANAGER_CURATOR_ADD_MUTATION,
    CUSTOMER_MANAGER_CURATOR_REMOVE_MUTATION,
    CUSTOMER_GET_LOGO_QUERY,
    CUSTOMER_SETTINGS_SET_MUTATION,

    EXECUTER_ALL_QUERY,
    EXECUTER_ACTIVITY_QUERY,
    EXECUTER_DOCUMENTS_QUERY,
    EXECUTER_GET_BY_ID_QUERY,
    EXECUTER_RESET_PASSWORD_MUTATION,
    EXECUTER_VERIFY_CONFIRM_MUTATION,
    EXECUTER_VERIFY_DECLINE_MUTATION,
    EXECUTER_VERIFY_CANCEL_MUTATION,
    EXECUTER_SEND_PUSH_NOTIFICATION_BY_ID_MUTATION,
    EXECUTER_SEND_PUSH_NOTIFICATION_BY_FILTERS_MUTATION,
    EXECUTER_CHECK_FNS_QUERY,
    EXECUTER_MARK_AS_TEST_MUTATION,
    EXECUTER_GET_BY_NAME_QUERY,
    EXECUTER_GET_PAYMENT_ALL_QUERY,
    EXECUTER_GET_TASK_CURRENT_BY_ID_QUERY,
    EXECUTER_SYNC_JUMP_MUTATION,
    EXECUTER_SET_AGREEMENT_DATE_MUTATION,

    REPORT_CREATE_MUTATION,
    REPORT_GET_QUERY,

    TASK_GET_BY_ID_QUERY,
    TASK_ALL_QUERY,
    TASK_EXECUTER_REMOVE_MUTATION,
    TASK_EXECUTER_ADD_MUTATION,
    TASK_MOVE_MUTATION,
};
