/**
 * Events that can be emitted from the EventSender instance for the purpose
 * of gaining insight into the success rate of logged events, and to understand
 * if there are issues with the backend.
 */
export var UploadEvent;
(function (UploadEvent) {
    /**
     * Emitted when one or more events were successfully uploaded.
     */
    UploadEvent["UPLOAD_SUCCEEDED"] = "upload_succeeded";
    /**
     * Emitted when one or more events did not successfully upload.
     * Retry will be attempted for transient errors but not for non-transient.
     */
    UploadEvent["UPLOAD_FAILED"] = "upload_failed";
    /**
     * Emitted when the upload request fails with a non-200 with a status code.
     */
    UploadEvent["UPLOAD_REQUEST_FAILED"] = "upload_request_failed";
})(UploadEvent || (UploadEvent = {}));
//# sourceMappingURL=upload_event.js.map