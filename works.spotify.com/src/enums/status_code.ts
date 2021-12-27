/**
 * HTTP Status Codes
 *
 * @enum {number}
 */
export var StatusCode;
(function (StatusCode) {
    // This status code is usually seen in the browser when the XMLHttpRequest
    // cannot properly complete the request.
    StatusCode[StatusCode["UNKNOWN"] = 0] = "UNKNOWN";
    // 2xx Family = Success
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    StatusCode[StatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    StatusCode[StatusCode["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    // 3xx Family = Redirect
    // Status-codes are not exported as they are handled automatically by
    // the browser.
    // 4xx Family = Client Error
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    StatusCode[StatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    StatusCode[StatusCode["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    StatusCode[StatusCode["TIMED_OUT"] = 408] = "TIMED_OUT";
    StatusCode[StatusCode["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    StatusCode[StatusCode["CONFLICT"] = 409] = "CONFLICT";
    StatusCode[StatusCode["GONE"] = 410] = "GONE";
    StatusCode[StatusCode["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    StatusCode[StatusCode["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    StatusCode[StatusCode["REQUEST_ENTITY_TOO_LARGE"] = 413] = "REQUEST_ENTITY_TOO_LARGE";
    StatusCode[StatusCode["REQUEST_URI_TOO_LONG"] = 414] = "REQUEST_URI_TOO_LONG";
    StatusCode[StatusCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    StatusCode[StatusCode["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
    StatusCode[StatusCode["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    // 5xx Family = Server Error
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    StatusCode[StatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    StatusCode[StatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    StatusCode[StatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    StatusCode[StatusCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    StatusCode[StatusCode["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
})(StatusCode || (StatusCode = {}));
//# sourceMappingURL=status_code.js.map