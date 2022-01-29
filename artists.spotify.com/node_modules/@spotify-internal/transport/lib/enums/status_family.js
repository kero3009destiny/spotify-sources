/**
 * Status Family for HTTP Responses.
 *
 * @enum {number}
 */
export var StatusFamily;
(function (StatusFamily) {
    /**
     * An error in the user agent prevents the client from fetching the actual
     * status code, so a 0 is used instead.
     */
    StatusFamily[StatusFamily["CONNECTION_ERROR"] = 0] = "CONNECTION_ERROR";
    /**
     * An informational status code in the 1xx range.
     */
    StatusFamily[StatusFamily["INFORMATIONAL"] = 1] = "INFORMATIONAL";
    /**
     * A successful status code in the 2xx range.
     */
    StatusFamily[StatusFamily["SUCCESS"] = 2] = "SUCCESS";
    /**
     * A redirectional status code in the 3xx range.
     */
    StatusFamily[StatusFamily["REDIRECTION"] = 3] = "REDIRECTION";
    /**
     * A client error status code in the 4xx range.
     */
    StatusFamily[StatusFamily["CLIENT_ERROR"] = 4] = "CLIENT_ERROR";
    /**
     * A server error status code in the 5xx range.
     */
    StatusFamily[StatusFamily["SERVER_ERROR"] = 5] = "SERVER_ERROR";
})(StatusFamily || (StatusFamily = {}));
//# sourceMappingURL=status_family.js.map