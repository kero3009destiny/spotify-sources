import { AllowsPayload } from '../../enums/allows_payload';
import { StatusCode } from '../../enums/status_code';
import { FetchHeaders } from './headers';
import { HTTPResponse } from '../response';
/**
 * An map of all responseType values that can be polyfilled in case the browser
 * does not support XHR2.
 */
const AllowedResponseTypes = {
    json: true,
    text: true,
    arraybuffer: true,
    blob: true,
};
export function isSupported() {
    return typeof fetch === 'function';
}
export function request(httpRequest) {
    if (!isSupported()) {
        return Promise.reject(new TypeError('Fetch is not supported'));
    }
    if (!httpRequest.url) {
        return Promise.reject(new TypeError('Request URL cannot be blank.'));
    }
    const method = httpRequest.method || 'GET';
    let _url = httpRequest.url;
    // Set body
    let sendParams = null;
    if (method in AllowsPayload && httpRequest.payload) {
        // The method can accept bodies, so we will send the payload using the
        // send() method.
        sendParams = httpRequest.payload;
    }
    else if (httpRequest.payload) {
        // The method does not allow a body, so we'll set the payload as a
        // query-string parameter.
        _url += `?${httpRequest.payload}`;
    }
    if (httpRequest.options.responseType &&
        !(httpRequest.options.responseType in AllowedResponseTypes)) {
        return Promise.reject(new TypeError('Cannot set responseType: not supported in browser.'));
    }
    const fetchOptions = {
        mode: httpRequest.options.mode || 'cors',
        credentials: httpRequest.options.credentials || 'same-origin',
        redirect: httpRequest.options.redirect || 'follow',
        method: method,
    };
    // We add these options separately to the object because MS browsers seem to
    // error out if we give them "empty values".
    if (httpRequest.headers.count()) {
        fetchOptions.headers = httpRequest.headers.toJSON();
    }
    if (sendParams) {
        fetchOptions.body = sendParams;
    }
    const startTime = Date.now();
    return fetch(_url, fetchOptions)
        .then(function (resp) {
        let bodyPromise;
        if (httpRequest.options.ignoreResponseBody ||
            resp.status === StatusCode.NO_CONTENT) {
            bodyPromise = null;
        }
        else if (httpRequest.options.responseType === 'json') {
            bodyPromise = resp.json().catch(function () {
                // The fetch API will throw an error if the body is not proper JSON.
                // However, to maintain compatibility with the original API, we want
                // to return null on the body if it's not proper JSON.
                return null;
            });
        }
        else if (httpRequest.options.responseType === 'arraybuffer') {
            bodyPromise = resp.arrayBuffer();
        }
        else if (httpRequest.options.responseType === 'blob') {
            bodyPromise = resp.blob();
        }
        else {
            bodyPromise = resp.text();
        }
        const responseHeaders = httpRequest.options.parseResponseHeaders || resp.status > 299
            ? new FetchHeaders(resp.headers)
            : null;
        return Promise.all([resp.url, resp.status, responseHeaders, bodyPromise]);
    })
        .then(function ([respUrl, status, fetchHeaders, body]) {
        const response = new HTTPResponse(respUrl, status);
        response.body = body;
        response.headers = fetchHeaders;
        if (httpRequest.options.timing) {
            const duration = Date.now() - startTime;
            response.timing = { completed: duration };
        }
        return response;
    })
        .catch(function () {
        // Fetch does not provide really good errors..
        const response = new HTTPResponse(_url);
        if (httpRequest.options.timing) {
            const duration = Date.now() - startTime;
            response.timing = { completed: duration };
        }
        return response;
    })
        .then(function (response) {
        // Set the offline flag if available.
        if (httpRequest.options.connectionObserver) {
            response.offline = !httpRequest.options.connectionObserver.isOnline();
        }
        return response;
    });
}
//# sourceMappingURL=index.js.map