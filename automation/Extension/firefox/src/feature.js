/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./feature.js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../webext-instrumentation/build/module/background/cookie-instrument.js":
/*!******************************************************************************!*\
  !*** ../webext-instrumentation/build/module/background/cookie-instrument.js ***!
  \******************************************************************************/
/*! exports provided: transformCookieObjectToMatchOpenWPMSchema, CookieInstrument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformCookieObjectToMatchOpenWPMSchema", function() { return transformCookieObjectToMatchOpenWPMSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieInstrument", function() { return CookieInstrument; });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "../webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");



const transformCookieObjectToMatchOpenWPMSchema = (cookie) => {
    const javascriptCookie = {};
    // Expiry time (in seconds)
    // May return ~Max(int64). I believe this is a session
    // cookie which doesn't expire. Sessions cookies with
    // non-max expiry time expire after session or at expiry.
    const expiryTime = cookie.expirationDate; // returns seconds
    let expiryTimeString;
    const maxInt64 = 9223372036854776000;
    if (!cookie.expirationDate || expiryTime === maxInt64) {
        expiryTimeString = "9999-12-31T21:59:59.000Z";
    }
    else {
        const expiryTimeDate = new Date(expiryTime * 1000); // requires milliseconds
        expiryTimeString = expiryTimeDate.toISOString();
    }
    javascriptCookie.expiry = expiryTimeString;
    javascriptCookie.is_http_only = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(cookie.httpOnly);
    javascriptCookie.is_host_only = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(cookie.hostOnly);
    javascriptCookie.is_session = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(cookie.session);
    javascriptCookie.host = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.domain);
    javascriptCookie.is_secure = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(cookie.secure);
    javascriptCookie.name = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.name);
    javascriptCookie.path = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.path);
    javascriptCookie.value = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.value);
    javascriptCookie.same_site = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.sameSite);
    javascriptCookie.first_party_domain = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.firstPartyDomain);
    javascriptCookie.store_id = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(cookie.storeId);
    javascriptCookie.time_stamp = new Date().toISOString();
    return javascriptCookie;
};
class CookieInstrument {
    constructor(dataReceiver) {
        this.dataReceiver = dataReceiver;
    }
    run(crawlID) {
        // Instrument cookie changes
        this.onChangedListener = async (changeInfo) => {
            const eventType = changeInfo.removed ? "deleted" : "added-or-changed";
            const update = {
                record_type: eventType,
                change_cause: changeInfo.cause,
                crawl_id: crawlID,
                extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"],
                event_ordinal: Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])(),
                ...transformCookieObjectToMatchOpenWPMSchema(changeInfo.cookie),
            };
            this.dataReceiver.saveRecord("javascript_cookies", update);
        };
        browser.cookies.onChanged.addListener(this.onChangedListener);
    }
    async saveAllCookies(crawlID) {
        const allCookies = await browser.cookies.getAll({});
        await Promise.all(allCookies.map((cookie) => {
            const update = {
                record_type: "manual-export",
                crawl_id: crawlID,
                extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"],
                ...transformCookieObjectToMatchOpenWPMSchema(cookie),
            };
            return this.dataReceiver.saveRecord("javascript_cookies", update);
        }));
    }
    cleanup() {
        if (this.onChangedListener) {
            browser.cookies.onChanged.removeListener(this.onChangedListener);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLWluc3RydW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFja2dyb3VuZC9jb29raWUtaW5zdHJ1bWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSzlELE1BQU0sQ0FBQyxNQUFNLHlDQUF5QyxHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDMUUsTUFBTSxnQkFBZ0IsR0FBRyxFQUFzQixDQUFDO0lBRWhELDJCQUEyQjtJQUMzQixzREFBc0Q7SUFDdEQscURBQXFEO0lBQ3JELHlEQUF5RDtJQUN6RCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsa0JBQWtCO0lBQzVELElBQUksZ0JBQWdCLENBQUM7SUFDckIsTUFBTSxRQUFRLEdBQUcsbUJBQW1CLENBQUM7SUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLElBQUksVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUNyRCxnQkFBZ0IsR0FBRywwQkFBMEIsQ0FBQztLQUMvQztTQUFNO1FBQ0wsTUFBTSxjQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsd0JBQXdCO1FBQzVFLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNqRDtJQUNELGdCQUFnQixDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztJQUMzQyxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzRCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxR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

/***/ }),

/***/ "../webext-instrumentation/build/module/background/http-instrument.js":
/*!****************************************************************************!*\
  !*** ../webext-instrumentation/build/module/background/http-instrument.js ***!
  \****************************************************************************/
/*! exports provided: HttpInstrument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpInstrument", function() { return HttpInstrument; });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "../webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/http-post-parser */ "../webext-instrumentation/build/module/lib/http-post-parser.js");
/* harmony import */ var _lib_pending_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/pending-request */ "../webext-instrumentation/build/module/lib/pending-request.js");
/* harmony import */ var _lib_pending_response__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/pending-response */ "../webext-instrumentation/build/module/lib/pending-response.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");






/**
 * Note: Different parts of the desired information arrives in different events as per below:
 * request = headers in onBeforeSendHeaders + body in onBeforeRequest
 * response = headers in onCompleted + body via a onBeforeRequest filter
 * redirect = original request headers+body, followed by a onBeforeRedirect and then a new set of request headers+body and response headers+body
 * Docs: https://developer.mozilla.org/en-US/docs/User:wbamberg/webRequest.RequestDetails
 */
class HttpInstrument {
    constructor(dataReceiver) {
        this.pendingRequests = {};
        this.pendingResponses = {};
        this.dataReceiver = dataReceiver;
    }
    run(crawlID, saveContentOption) {
        const allTypes = [
            "beacon",
            "csp_report",
            "font",
            "image",
            "imageset",
            "main_frame",
            "media",
            "object",
            "object_subrequest",
            "ping",
            "script",
            // "speculative",
            "stylesheet",
            "sub_frame",
            "web_manifest",
            "websocket",
            "xbl",
            "xml_dtd",
            "xmlhttprequest",
            "xslt",
            "other",
        ];
        const filter = { urls: ["<all_urls>"], types: allTypes };
        const requestStemsFromExtension = details => {
            return (details.originUrl && details.originUrl.indexOf("moz-extension://") > -1);
        };
        /*
         * Attach handlers to event listeners
         */
        this.onBeforeRequestListener = (details) => {
            const blockingResponseThatDoesNothing = {};
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return blockingResponseThatDoesNothing;
            }
            const pendingRequest = this.getPendingRequest(details.requestId);
            pendingRequest.resolveOnBeforeRequestEventDetails(details);
            const pendingResponse = this.getPendingResponse(details.requestId);
            pendingResponse.resolveOnBeforeRequestEventDetails(details);
            if (this.shouldSaveContent(saveContentOption, details.type)) {
                pendingResponse.addResponseResponseBodyListener(details);
            }
            return blockingResponseThatDoesNothing;
        };
        browser.webRequest.onBeforeRequest.addListener(this.onBeforeRequestListener, filter, this.isContentSavingEnabled(saveContentOption)
            ? ["requestBody", "blocking"]
            : ["requestBody"]);
        this.onBeforeSendHeadersListener = details => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            const pendingRequest = this.getPendingRequest(details.requestId);
            pendingRequest.resolveOnBeforeSendHeadersEventDetails(details);
            this.onBeforeSendHeadersHandler(details, crawlID, Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])());
        };
        browser.webRequest.onBeforeSendHeaders.addListener(this.onBeforeSendHeadersListener, filter, ["requestHeaders"]);
        this.onBeforeRedirectListener = details => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            this.onBeforeRedirectHandler(details, crawlID, Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])());
        };
        browser.webRequest.onBeforeRedirect.addListener(this.onBeforeRedirectListener, filter, ["responseHeaders"]);
        this.onCompletedListener = details => {
            // Ignore requests made by extensions
            if (requestStemsFromExtension(details)) {
                return;
            }
            const pendingResponse = this.getPendingResponse(details.requestId);
            pendingResponse.resolveOnCompletedEventDetails(details);
            this.onCompletedHandler(details, crawlID, Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])(), saveContentOption);
        };
        browser.webRequest.onCompleted.addListener(this.onCompletedListener, filter, ["responseHeaders"]);
    }
    cleanup() {
        if (this.onBeforeRequestListener) {
            browser.webRequest.onBeforeRequest.removeListener(this.onBeforeRequestListener);
        }
        if (this.onBeforeSendHeadersListener) {
            browser.webRequest.onBeforeSendHeaders.removeListener(this.onBeforeSendHeadersListener);
        }
        if (this.onBeforeRedirectListener) {
            browser.webRequest.onBeforeRedirect.removeListener(this.onBeforeRedirectListener);
        }
        if (this.onCompletedListener) {
            browser.webRequest.onCompleted.removeListener(this.onCompletedListener);
        }
    }
    isContentSavingEnabled(saveContentOption) {
        if (saveContentOption === true) {
            return true;
        }
        if (saveContentOption === false) {
            return false;
        }
        return this.saveContentResourceTypes(saveContentOption).length > 0;
    }
    saveContentResourceTypes(saveContentOption) {
        return saveContentOption.split(",");
    }
    /**
     * We rely on the resource type to filter responses
     * See: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
     *
     * @param saveContentOption
     * @param resourceType
     */
    shouldSaveContent(saveContentOption, resourceType) {
        if (saveContentOption === true) {
            return true;
        }
        if (saveContentOption === false) {
            return false;
        }
        return this.saveContentResourceTypes(saveContentOption).includes(resourceType);
    }
    getPendingRequest(requestId) {
        if (!this.pendingRequests[requestId]) {
            this.pendingRequests[requestId] = new _lib_pending_request__WEBPACK_IMPORTED_MODULE_3__["PendingRequest"]();
        }
        return this.pendingRequests[requestId];
    }
    getPendingResponse(requestId) {
        if (!this.pendingResponses[requestId]) {
            this.pendingResponses[requestId] = new _lib_pending_response__WEBPACK_IMPORTED_MODULE_4__["PendingResponse"]();
        }
        return this.pendingResponses[requestId];
    }
    /*
     * HTTP Request Handler and Helper Functions
     */
    /*
    // TODO: Refactor to corresponding webext logic or discard
    private get_stack_trace_str() {
      // return the stack trace as a string
      // TODO: check if http-on-modify-request is a good place to capture the stack
      // In the manual tests we could capture exactly the same trace as the
      // "Cause" column of the devtools network panel.
      const stacktrace = [];
      let frame = components.stack;
      if (frame && frame.caller) {
        // internal/chrome callers occupy the first three frames, pop them!
        frame = frame.caller.caller.caller;
        while (frame) {
          // chrome scripts appear as callers in some cases, filter them out
          const scheme = frame.filename.split("://")[0];
          if (["resource", "chrome", "file"].indexOf(scheme) === -1) {
            // ignore chrome scripts
            stacktrace.push(
              frame.name +
                "@" +
                frame.filename +
                ":" +
                frame.lineNumber +
                ":" +
                frame.columnNumber +
                ";" +
                frame.asyncCause,
            );
          }
          frame = frame.caller || frame.asyncCaller;
        }
      }
      return stacktrace.join("\n");
    }
    */
    async onBeforeSendHeadersHandler(details, crawlID, eventOrdinal) {
        /*
        console.log(
          "onBeforeSendHeadersHandler (previously httpRequestHandler)",
          details,
          crawlID,
        );
        */
        const tab = details.tabId > -1
            ? await browser.tabs.get(details.tabId)
            : { windowId: undefined, incognito: undefined, url: undefined };
        const update = {};
        update.incognito = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(tab.incognito);
        update.crawl_id = crawlID;
        update.extension_session_uuid = _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"];
        update.event_ordinal = eventOrdinal;
        update.window_id = tab.windowId;
        update.tab_id = details.tabId;
        update.frame_id = details.frameId;
        // requestId is a unique identifier that can be used to link requests and responses
        update.request_id = details.requestId;
        // const stacktrace_str = get_stack_trace_str();
        // update.req_call_stack = escapeString(stacktrace_str);
        const url = details.url;
        update.url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(url);
        const requestMethod = details.method;
        update.method = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(requestMethod);
        const current_time = new Date(details.timeStamp);
        update.time_stamp = current_time.toISOString();
        let encodingType = "";
        let referrer = "";
        const headers = [];
        let isOcsp = false;
        if (details.requestHeaders) {
            details.requestHeaders.map(requestHeader => {
                const { name, value } = requestHeader;
                const header_pair = [];
                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(name));
                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(value));
                headers.push(header_pair);
                if (name === "Content-Type") {
                    encodingType = value;
                    if (encodingType.indexOf("application/ocsp-request") !== -1) {
                        isOcsp = true;
                    }
                }
                if (name === "Referer") {
                    referrer = value;
                }
            });
        }
        update.referrer = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(referrer);
        if (requestMethod === "POST" && !isOcsp /* don't process OCSP requests */) {
            const pendingRequest = this.getPendingRequest(details.requestId);
            const resolved = await pendingRequest.resolvedWithinTimeout(1000);
            if (!resolved) {
                this.dataReceiver.logError("Pending request timed out waiting for data from both onBeforeRequest and onBeforeSendHeaders events");
            }
            else {
                const onBeforeRequestEventDetails = await pendingRequest.onBeforeRequestEventDetails;
                const requestBody = onBeforeRequestEventDetails.requestBody;
                if (requestBody) {
                    const postParser = new _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_2__["HttpPostParser"](
                    // details,
                    onBeforeRequestEventDetails, this.dataReceiver);
                    const postObj = postParser
                        .parsePostRequest();
                    // Add (POST) request headers from upload stream
                    if ("post_headers" in postObj) {
                        // Only store POST headers that we know and need. We may misinterpret POST data as headers
                        // as detection is based on "key:value" format (non-header POST data can be in this format as well)
                        const contentHeaders = [
                            "Content-Type",
                            "Content-Disposition",
                            "Content-Length",
                        ];
                        for (const name in postObj.post_headers) {
                            if (contentHeaders.includes(name)) {
                                const header_pair = [];
                                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(name));
                                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(postObj.post_headers[name]));
                                headers.push(header_pair);
                            }
                        }
                    }
                    // we store POST body in JSON format, except when it's a string without a (key-value) structure
                    if ("post_body" in postObj) {
                        update.post_body = postObj.post_body;
                    }
                    if ("post_body_raw" in postObj) {
                        update.post_body_raw = postObj.post_body_raw;
                    }
                }
            }
        }
        update.headers = JSON.stringify(headers);
        // Check if xhr
        const isXHR = details.type === "xmlhttprequest";
        update.is_XHR = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(isXHR);
        // Check if frame OR full page load
        const isFullPageLoad = details.frameId === 0;
        const isFrameLoad = details.type === "sub_frame";
        update.is_full_page = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(isFullPageLoad);
        update.is_frame_load = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(isFrameLoad);
        // Grab the triggering and loading Principals
        let triggeringOrigin;
        let loadingOrigin;
        if (details.originUrl) {
            const parsedOriginUrl = new URL(details.originUrl);
            triggeringOrigin = parsedOriginUrl.origin;
        }
        if (details.documentUrl) {
            const parsedDocumentUrl = new URL(details.documentUrl);
            loadingOrigin = parsedDocumentUrl.origin;
        }
        update.triggering_origin = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(triggeringOrigin);
        update.loading_origin = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(loadingOrigin);
        // loadingDocument's href
        // The loadingDocument is the document the element resides, regardless of
        // how the load was triggered.
        const loadingHref = details.documentUrl;
        update.loading_href = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(loadingHref);
        // resourceType of the requesting node. This is set by the type of
        // node making the request (i.e. an <img src=...> node will set to type "image").
        // Documentation:
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType
        update.resource_type = details.type;
        /*
        // TODO: Refactor to corresponding webext logic or discard
        const ThirdPartyUtil = Cc["@mozilla.org/thirdpartyutil;1"].getService(
                               Ci.mozIThirdPartyUtil);
        // Do third-party checks
        // These specific checks are done because it's what's used in Tracking Protection
        // See: http://searchfox.org/mozilla-central/source/netwerk/base/nsChannelClassifier.cpp#107
        try {
          const isThirdPartyChannel = ThirdPartyUtil.isThirdPartyChannel(details);
          const topWindow = ThirdPartyUtil.getTopWindowForChannel(details);
          const topURI = ThirdPartyUtil.getURIFromWindow(topWindow);
          if (topURI) {
            const topUrl = topURI.spec;
            const channelURI = details.URI;
            const isThirdPartyToTopWindow = ThirdPartyUtil.isThirdPartyURI(
              channelURI,
              topURI,
            );
            update.is_third_party_to_top_window = isThirdPartyToTopWindow;
            update.is_third_party_channel = isThirdPartyChannel;
          }
        } catch (anError) {
          // Exceptions expected for channels triggered or loading in a
          // NullPrincipal or SystemPrincipal. They are also expected for favicon
          // loads, which we attempt to filter. Depending on the naming, some favicons
          // may continue to lead to error logs.
          if (
            update.triggering_origin !== "[System Principal]" &&
            update.triggering_origin !== undefined &&
            update.loading_origin !== "[System Principal]" &&
            update.loading_origin !== undefined &&
            !update.url.endsWith("ico")
          ) {
            this.dataReceiver.logError(
              "Error while retrieving additional channel information for URL: " +
              "\n" +
              update.url +
              "\n Error text:" +
              JSON.stringify(anError),
            );
          }
        }
        */
        update.top_level_url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(this.getDocumentUrlForRequest(details));
        update.parent_frame_id = details.parentFrameId;
        update.frame_ancestors = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(JSON.stringify(details.frameAncestors));
        this.dataReceiver.saveRecord("http_requests", update);
    }
    /**
     * Code taken and adapted from
     * https://github.com/EFForg/privacybadger/pull/2198/files
     *
     * Gets the URL for a given request's top-level document.
     *
     * The request's document may be different from the current top-level document
     * loaded in tab as requests can come out of order:
     *
     * @param {WebRequestOnBeforeSendHeadersEventDetails} details
     *
     * @return {?String} the URL for the request's top-level document
     */
    getDocumentUrlForRequest(details) {
        let url = "";
        if (details.type === "main_frame") {
            // Url of the top-level document itself.
            url = details.url;
        }
        else if (details.hasOwnProperty("frameAncestors")) {
            // In case of nested frames, retrieve url from top-most ancestor.
            // If frameAncestors == [], request comes from the top-level-document.
            url = details.frameAncestors.length
                ? details.frameAncestors[details.frameAncestors.length - 1].url
                : details.documentUrl;
        }
        else {
            // type != 'main_frame' and frameAncestors == undefined
            // For example service workers: https://bugzilla.mozilla.org/show_bug.cgi?id=1470537#c13
            url = details.documentUrl;
        }
        return url;
    }
    async onBeforeRedirectHandler(details, crawlID, eventOrdinal) {
        /*
        console.log(
          "onBeforeRedirectHandler (previously httpRequestHandler)",
          details,
          crawlID,
        );
        */
        // Save HTTP redirect events
        // Events are saved to the `http_redirects` table
        /*
        // TODO: Refactor to corresponding webext logic or discard
        // Events are saved to the `http_redirects` table, and map the old
        // request/response channel id to the new request/response channel id.
        // Implementation based on: https://stackoverflow.com/a/11240627
        const oldNotifications = details.notificationCallbacks;
        let oldEventSink = null;
        details.notificationCallbacks = {
          QueryInterface: XPCOMUtils.generateQI([
            Ci.nsIInterfaceRequestor,
            Ci.nsIChannelEventSink,
          ]),
    
          getInterface(iid) {
            // We are only interested in nsIChannelEventSink,
            // return the old callbacks for any other interface requests.
            if (iid.equals(Ci.nsIChannelEventSink)) {
              try {
                oldEventSink = oldNotifications.QueryInterface(iid);
              } catch (anError) {
                this.dataReceiver.logError(
                  "Error during call to custom notificationCallbacks::getInterface." +
                    JSON.stringify(anError),
                );
              }
              return this;
            }
    
            if (oldNotifications) {
              return oldNotifications.getInterface(iid);
            } else {
              throw Cr.NS_ERROR_NO_INTERFACE;
            }
          },
    
          asyncOnChannelRedirect(oldChannel, newChannel, flags, callback) {
    
            newChannel.QueryInterface(Ci.nsIHttpChannel);
    
            const httpRedirect: HttpRedirect = {
              crawl_id: crawlID,
              old_request_id: oldChannel.channelId,
              new_request_id: newChannel.channelId,
              time_stamp: new Date().toISOString(),
            };
            this.dataReceiver.saveRecord("http_redirects", httpRedirect);
    
            if (oldEventSink) {
              oldEventSink.asyncOnChannelRedirect(
                oldChannel,
                newChannel,
                flags,
                callback,
              );
            } else {
              callback.onRedirectVerifyCallback(Cr.NS_OK);
            }
          },
        };
        */
        const responseStatus = details.statusCode;
        const responseStatusText = details.statusLine;
        const tab = details.tabId > -1
            ? await browser.tabs.get(details.tabId)
            : { windowId: undefined, incognito: undefined };
        const httpRedirect = {
            incognito: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(tab.incognito),
            crawl_id: crawlID,
            old_request_url: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(details.url),
            old_request_id: details.requestId,
            new_request_url: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(details.redirectUrl),
            new_request_id: null,
            extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"],
            event_ordinal: eventOrdinal,
            window_id: tab.windowId,
            tab_id: details.tabId,
            frame_id: details.frameId,
            response_status: responseStatus,
            response_status_text: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(responseStatusText),
            time_stamp: new Date(details.timeStamp).toISOString(),
        };
        this.dataReceiver.saveRecord("http_redirects", httpRedirect);
    }
    /*
     * HTTP Response Handlers and Helper Functions
     */
    async logWithResponseBody(details, update) {
        const pendingResponse = this.getPendingResponse(details.requestId);
        try {
            const responseBodyListener = pendingResponse.responseBodyListener;
            const respBody = await responseBodyListener.getResponseBody();
            const contentHash = await responseBodyListener.getContentHash();
            this.dataReceiver.saveContent(respBody, Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(contentHash));
            update.content_hash = contentHash;
            this.dataReceiver.saveRecord("http_responses", update);
        }
        catch (err) {
            /*
            // TODO: Refactor to corresponding webext logic or discard
            dataReceiver.logError(
              "Unable to retrieve response body." + JSON.stringify(aReason),
            );
            update.content_hash = "<error>";
            dataReceiver.saveRecord("http_responses", update);
            */
            this.dataReceiver.logError("Unable to retrieve response body." +
                "Likely caused by a programming error. Error Message:" +
                err.name +
                err.message +
                "\n" +
                err.stack);
            update.content_hash = "<error>";
            this.dataReceiver.saveRecord("http_responses", update);
        }
    }
    // Instrument HTTP responses
    async onCompletedHandler(details, crawlID, eventOrdinal, saveContent) {
        /*
        console.log(
          "onCompletedHandler (previously httpRequestHandler)",
          details,
          crawlID,
          saveContent,
        );
        */
        const tab = details.tabId > -1
            ? await browser.tabs.get(details.tabId)
            : { windowId: undefined, incognito: undefined };
        const update = {};
        update.incognito = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(tab.incognito);
        update.crawl_id = crawlID;
        update.extension_session_uuid = _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"];
        update.event_ordinal = eventOrdinal;
        update.window_id = tab.windowId;
        update.tab_id = details.tabId;
        update.frame_id = details.frameId;
        // requestId is a unique identifier that can be used to link requests and responses
        update.request_id = details.requestId;
        const isCached = details.fromCache;
        update.is_cached = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["boolToInt"])(isCached);
        const url = details.url;
        update.url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeUrl"])(url);
        const requestMethod = details.method;
        update.method = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(requestMethod);
        // TODO: Refactor to corresponding webext logic or discard
        // (request headers are not available in http response event listener object,
        // but the referrer property of the corresponding request could be queried)
        //
        // let referrer = "";
        // if (details.referrer) {
        //   referrer = details.referrer.spec;
        // }
        // update.referrer = escapeString(referrer);
        const responseStatus = details.statusCode;
        update.response_status = responseStatus;
        const responseStatusText = details.statusLine;
        update.response_status_text = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(responseStatusText);
        const current_time = new Date(details.timeStamp);
        update.time_stamp = current_time.toISOString();
        const headers = [];
        let location = "";
        if (details.responseHeaders) {
            details.responseHeaders.map(responseHeader => {
                const { name, value } = responseHeader;
                const header_pair = [];
                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(name));
                header_pair.push(Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(value));
                headers.push(header_pair);
                if (name.toLowerCase() === "location") {
                    location = value;
                }
            });
        }
        update.headers = JSON.stringify(headers);
        update.location = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_5__["escapeString"])(location);
        if (this.shouldSaveContent(saveContent, details.type)) {
            this.logWithResponseBody(details, update);
        }
        else {
            this.dataReceiver.saveRecord("http_responses", update);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvaHR0cC1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxjQUFjLEVBQXFCLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUkxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVd6RTs7Ozs7O0dBTUc7QUFFSCxNQUFNLE9BQU8sY0FBYztJQWF6QixZQUFZLFlBQVk7UUFYaEIsb0JBQWUsR0FFbkIsRUFBRSxDQUFDO1FBQ0MscUJBQWdCLEdBRXBCLEVBQUUsQ0FBQztRQU9MLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFFTSxHQUFHLENBQUMsT0FBTyxFQUFFLGlCQUFvQztRQUN0RCxNQUFNLFFBQVEsR0FBbUI7WUFDL0IsUUFBUTtZQUNSLFlBQVk7WUFDWixNQUFNO1lBQ04sT0FBTztZQUNQLFVBQVU7WUFDVixZQUFZO1lBQ1osT0FBTztZQUNQLFFBQVE7WUFDUixtQkFBbUI7WUFDbkIsTUFBTTtZQUNOLFFBQVE7WUFDUixpQkFBaUI7WUFDakIsWUFBWTtZQUNaLFdBQVc7WUFDWCxjQUFjO1lBQ2QsV0FBVztZQUNYLEtBQUs7WUFDTCxTQUFTO1lBQ1QsZ0JBQWdCO1lBQ2hCLE1BQU07WUFDTixPQUFPO1NBQ1IsQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLFlB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

/***/ }),

/***/ "../webext-instrumentation/build/module/background/javascript-instrument.js":
/*!**********************************************************************************!*\
  !*** ../webext-instrumentation/build/module/background/javascript-instrument.js ***!
  \**********************************************************************************/
/*! exports provided: JavascriptInstrument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JavascriptInstrument", function() { return JavascriptInstrument; });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "../webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");



class JavascriptInstrument {
    constructor(dataReceiver) {
        this.configured = false;
        this.pendingRecords = [];
        this.dataReceiver = dataReceiver;
    }
    /**
     * Converts received call and values data from the JS Instrumentation
     * into the format that the schema expects.
     * @param data
     * @param sender
     */
    static processCallsAndValues(data, sender) {
        const update = {};
        update.extension_session_uuid = _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"];
        update.event_ordinal = Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])();
        update.page_scoped_event_ordinal = data.ordinal;
        update.window_id = sender.tab.windowId;
        update.tab_id = sender.tab.id;
        update.frame_id = sender.frameId;
        update.script_url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeUrl"])(data.scriptUrl);
        update.script_line = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.scriptLine);
        update.script_col = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.scriptCol);
        update.func_name = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.funcName);
        update.script_loc_eval = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.scriptLocEval);
        update.call_stack = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.callStack);
        update.symbol = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.symbol);
        update.operation = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.operation);
        update.value = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(data.value);
        update.time_stamp = data.timeStamp;
        update.incognito = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["boolToInt"])(sender.tab.incognito);
        // document_url is the current frame's document href
        // top_level_url is the top-level frame's document href
        update.document_url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeUrl"])(sender.url);
        update.top_level_url = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeUrl"])(sender.tab.url);
        if (data.operation === "call" && data.args.length > 0) {
            update.arguments = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_2__["escapeString"])(JSON.stringify(data.args));
        }
        return update;
    }
    /**
     * Start listening for messages from page/content/background scripts injected to instrument JavaScript APIs
     */
    listen() {
        this.onMessageListener = (message, sender) => {
            // console.debug("javascript-instrumentation background listener", {message, sender}, this.configured);
            if (message.namespace &&
                message.namespace === "javascript-instrumentation") {
                this.handleJsInstrumentationMessage(message, sender);
            }
        };
        browser.runtime.onMessage.addListener(this.onMessageListener);
    }
    /**
     * Either sends the log data to the dataReceiver or store it in memory
     * as a pending record if the JS instrumentation is not yet configured
     * @param message
     * @param sender
     */
    handleJsInstrumentationMessage(message, sender) {
        switch (message.type) {
            case "logCall":
            case "logValue":
                const update = JavascriptInstrument.processCallsAndValues(message.data, sender);
                if (this.configured) {
                    update.crawl_id = this.crawlID;
                    this.dataReceiver.saveRecord("javascript", update);
                }
                else {
                    this.pendingRecords.push(update);
                }
                break;
        }
    }
    /**
     * Starts listening if haven't done so already, sets the crawl ID,
     * marks the JS instrumentation as configured and sends any pending
     * records that have been received up until this point.
     * @param crawlID
     */
    run(crawlID) {
        if (!this.onMessageListener) {
            this.listen();
        }
        this.crawlID = crawlID;
        this.configured = true;
        this.pendingRecords.map(update => {
            update.crawl_id = this.crawlID;
            this.dataReceiver.saveRecord("javascript", update);
        });
    }
    async registerContentScript(testing, modules) {
        const contentScriptConfig = {
            testing,
            modules,
        };
        if (contentScriptConfig) {
            // TODO: Avoid using window to pass the content script config
            await browser.contentScripts.register({
                js: [
                    {
                        code: `window.openWpmContentScriptConfig = ${JSON.stringify(contentScriptConfig)};`,
                    },
                ],
                matches: ["<all_urls>"],
                allFrames: true,
                runAt: "document_start",
                matchAboutBlank: true,
            });
        }
        return browser.contentScripts.register({
            js: [{ file: "/content.js" }],
            matches: ["<all_urls>"],
            allFrames: true,
            runAt: "document_start",
            matchAboutBlank: true,
        });
    }
    cleanup() {
        this.pendingRecords = [];
        if (this.onMessageListener) {
            browser.runtime.onMessage.removeListener(this.onMessageListener);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvamF2YXNjcmlwdC1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3pFLE1BQU0sT0FBTyxvQkFBb0I7SUE0Qy9CLFlBQVksWUFBWTtRQUpoQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLG1CQUFjLEdBQTBCLEVBQUUsQ0FBQztRQUlqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBN0NEOzs7OztPQUtHO0lBQ0ssTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxNQUFxQjtRQUM5RCxNQUFNLE1BQU0sR0FBRyxFQUF5QixDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxzQkFBc0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNyRCxNQUFNLENBQUMsYUFBYSxHQUFHLHVCQUF1QixFQUFFLENBQUM7UUFDakQsTUFBTSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDaEQsTUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxNQUFNLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFdB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

/***/ }),

/***/ "../webext-instrumentation/build/module/background/navigation-instrument.js":
/*!**********************************************************************************!*\
  !*** ../webext-instrumentation/build/module/background/navigation-instrument.js ***!
  \**********************************************************************************/
/*! exports provided: transformWebNavigationBaseEventDetailsToOpenWPMSchema, NavigationInstrument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformWebNavigationBaseEventDetailsToOpenWPMSchema", function() { return transformWebNavigationBaseEventDetailsToOpenWPMSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationInstrument", function() { return NavigationInstrument; });
/* harmony import */ var _lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/extension-session-event-ordinal */ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js");
/* harmony import */ var _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/extension-session-uuid */ "../webext-instrumentation/build/module/lib/extension-session-uuid.js");
/* harmony import */ var _lib_pending_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/pending-navigation */ "../webext-instrumentation/build/module/lib/pending-navigation.js");
/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");
/* harmony import */ var _lib_uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/uuid */ "../webext-instrumentation/build/module/lib/uuid.js");





const transformWebNavigationBaseEventDetailsToOpenWPMSchema = async (crawlID, details) => {
    const tab = details.tabId > -1
        ? await browser.tabs.get(details.tabId)
        : {
            windowId: undefined,
            incognito: undefined,
            cookieStoreId: undefined,
            openerTabId: undefined,
            width: undefined,
            height: undefined,
        };
    const window = tab.windowId
        ? await browser.windows.get(tab.windowId)
        : { width: undefined, height: undefined, type: undefined };
    const navigation = {
        crawl_id: crawlID,
        incognito: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["boolToInt"])(tab.incognito),
        extension_session_uuid: _lib_extension_session_uuid__WEBPACK_IMPORTED_MODULE_1__["extensionSessionUuid"],
        process_id: details.processId,
        window_id: tab.windowId,
        tab_id: details.tabId,
        tab_opener_tab_id: tab.openerTabId,
        frame_id: details.frameId,
        window_width: window.width,
        window_height: window.height,
        window_type: window.type,
        tab_width: tab.width,
        tab_height: tab.height,
        tab_cookie_store_id: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["escapeString"])(tab.cookieStoreId),
        uuid: Object(_lib_uuid__WEBPACK_IMPORTED_MODULE_4__["makeUUID"])(),
        url: Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["escapeUrl"])(details.url),
    };
    return navigation;
};
class NavigationInstrument {
    constructor(dataReceiver) {
        this.pendingNavigations = {};
        this.dataReceiver = dataReceiver;
    }
    static navigationId(processId, tabId, frameId) {
        return `${processId}-${tabId}-${frameId}`;
    }
    run(crawlID) {
        this.onBeforeNavigateListener = async (details) => {
            const navigationId = NavigationInstrument.navigationId(details.processId, details.tabId, details.frameId);
            const pendingNavigation = this.instantiatePendingNavigation(navigationId);
            const navigation = await transformWebNavigationBaseEventDetailsToOpenWPMSchema(crawlID, details);
            navigation.parent_frame_id = details.parentFrameId;
            navigation.before_navigate_event_ordinal = Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])();
            navigation.before_navigate_time_stamp = new Date(details.timeStamp).toISOString();
            pendingNavigation.resolveOnBeforeNavigateEventNavigation(navigation);
        };
        browser.webNavigation.onBeforeNavigate.addListener(this.onBeforeNavigateListener);
        this.onCommittedListener = async (details) => {
            const navigationId = NavigationInstrument.navigationId(details.processId, details.tabId, details.frameId);
            const navigation = await transformWebNavigationBaseEventDetailsToOpenWPMSchema(crawlID, details);
            navigation.transition_qualifiers = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["escapeString"])(JSON.stringify(details.transitionQualifiers));
            navigation.transition_type = Object(_lib_string_utils__WEBPACK_IMPORTED_MODULE_3__["escapeString"])(details.transitionType);
            navigation.committed_event_ordinal = Object(_lib_extension_session_event_ordinal__WEBPACK_IMPORTED_MODULE_0__["incrementedEventOrdinal"])();
            navigation.committed_time_stamp = new Date(details.timeStamp).toISOString();
            // include attributes from the corresponding onBeforeNavigation event
            const pendingNavigation = this.getPendingNavigation(navigationId);
            if (pendingNavigation) {
                pendingNavigation.resolveOnCommittedEventNavigation(navigation);
                const resolved = await pendingNavigation.resolvedWithinTimeout(1000);
                if (resolved) {
                    const onBeforeNavigateEventNavigation = await pendingNavigation.onBeforeNavigateEventNavigation;
                    navigation.parent_frame_id =
                        onBeforeNavigateEventNavigation.parent_frame_id;
                    navigation.before_navigate_event_ordinal =
                        onBeforeNavigateEventNavigation.before_navigate_event_ordinal;
                    navigation.before_navigate_time_stamp =
                        onBeforeNavigateEventNavigation.before_navigate_time_stamp;
                }
            }
            this.dataReceiver.saveRecord("navigations", navigation);
        };
        browser.webNavigation.onCommitted.addListener(this.onCommittedListener);
    }
    cleanup() {
        if (this.onBeforeNavigateListener) {
            browser.webNavigation.onBeforeNavigate.removeListener(this.onBeforeNavigateListener);
        }
        if (this.onCommittedListener) {
            browser.webNavigation.onCommitted.removeListener(this.onCommittedListener);
        }
    }
    instantiatePendingNavigation(navigationId) {
        this.pendingNavigations[navigationId] = new _lib_pending_navigation__WEBPACK_IMPORTED_MODULE_2__["PendingNavigation"]();
        return this.pendingNavigations[navigationId];
    }
    getPendingNavigation(navigationId) {
        return this.pendingNavigations[navigationId];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1pbnN0cnVtZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JhY2tncm91bmQvbmF2aWdhdGlvbi1pbnN0cnVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFRdkMsTUFBTSxDQUFDLE1BQU0scURBQXFELEdBQUcsS0FBSyxFQUN4RSxPQUFPLEVBQ1AsT0FBc0MsRUFDakIsRUFBRTtJQUN2QixNQUFNLEdBQUcsR0FDUCxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztZQUNFLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUM7SUFDUixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUTtRQUN6QixDQUFDLENBQUMsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDN0QsTUFBTSxVQUFVLEdBQWU7UUFDN0IsUUFBUSxFQUFFLE9BQU87UUFDakIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ25DLHNCQUFzQixFQUFFLG9CQUFvQjtRQUM1QyxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBQVM7UUFDN0IsU0FBUyxFQUFFLEdBQUcsQ0FBQyxRQUFRO1FBQ3ZCLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSztRQUNyQixpQkFBaUIsRUFBRSxHQUFHLENBQUMsV0FBVztRQUNsQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDekIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxLQUFLO1FBQzFCLGFBQWEsRUFBRSxNQUFNLENBQUMsTUFBTTtRQUM1QixXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUk7UUFDeEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1FBQ3BCLFVBQVUsRUFBRSxHQUFHLENBQUMsTUFBTTtRQUN0QixtQkFBbUIsRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUNwRCxJQUFJLEVBQUUsUUFBUSxFQUFFO1FBQ2hCLEdBQUcsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztLQUM1QixDQUFDO0lBQ0YsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxPQUFPLG9CQUFvQjtJQVcvQixZQUFZLFlBQVk7UUFKaEIsdUJBQWtCLEdBRXRCLEVBQUUsQ0FBQztRQUdMLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ25DLENBQUM7SUFaTSxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTztRQUNsRCxPQUFPLEdBQUcsU0FBUyxJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBWU0sR0FBRyxDQUFDLE9BQU87UUFDaEIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssRUFDbkMsT0FBa0QsRUFDbEQsRUFBRTtZQUNGLE1BQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDLFlBQVksQ0FDcEQsT0FBTyxDQUFDLFNBQVMsRUFDakIsT0FBTyxDQUFDLEtBQUssRUFDYixPQUFPLENBQUMsT0FBTyxDQUNoQixDQUFDO1lBQ0YsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUUsTUFBTSxVQUFVLEdBQWUsTUFBTSxxREFBcUQsQ0FDeEYsT0FBTyxFQUNQLE9BQU8sQ0FDUixDQUFDO1lBQ0YsVUFBVSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ25ELFVBQVUsQ0FBQyw2QkFBNkIsR0FBRyx1QkFBdUIsRUFBRSxDQUFDO1lBQ3JFLFVBQVUsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLElBQUksQ0FDOUMsT0FBTyxDQUFDLFNBQVMsQ0FDbEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoQixpQkFBaUIsQ0FBQyxzQ0FBc0MsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FDaEQsSUFBSSxDQUFDLHdCQUF3QixDQUM5QixDQUFDO1FBQ0YsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssRUFDOUIsT0FBNkMsRUFDN0MsRUFBRTtZQUNGLE1BQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDLFlBQVksQ0FDcEQsT0FBTyxDQUFDLFNBQVMsRUFDakIsT0FBTyxDQUFDLEtBQUssRUFDYixPQUFPLENBQUMsT0FBTyxDQUNoQixDQUFDO1lBQ0YsTUFBTSxVQUFVLEdBQWUsTUFBTSxxREFBcUQsQ0FDeEYsT0FBTyxFQUNQLE9BQU8sQ0FDUixDQUFDO1lBQ0YsVUFBVSxDQUFDLHFCQUFxQixHQUFHLFlBQVksQ0FDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FDN0MsQ0FBQztZQUNGLFVBQVUsQ0FBQyxlQUFlLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNsRSxVQUFVLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLEVBQUUsQ0FBQztZQUMvRCxVQUFVLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxJQUFJLENBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQ2xCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFaEIscUVBQXFFO1lBQ3JFLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xFLElBQUksaUJBQWlCLEVBQUU7Z0JBQ3JCLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNLFFBQVEsR0FBRyxNQUFNLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLFFBQVEsRUFBRTtvQkFDWixNQUFNLCtCQUErQixHQUFHLE1BQU0saUJBQWlCLENBQUMsK0JBQStCLENBQUM7b0JBQ2hHLFVBQVUsQ0FBQyxlQUFlO3dCQUN4QiwrQkFBK0IsQ0FBQyxlQUFlLENBQUM7b0JBQ2xELFVBQVUsQ0FBQyw2QkFBNkI7d0JBQ3RDLCtCQUErQixDQUFDLDZCQUE2QixDQUFDO29CQUNoRSxVQUFVLENBQUMsMEJBQTBCO3dCQUNuQywrQkFBK0IsQ0FBQywwQkFBMEIsQ0FBQztpQkFDOUQ7YUFDRjtZQUVELElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLElBQUksQ0FBQyx3QkFBd0IsRUFBRTtZQUNqQyxPQUFPLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FDbkQsSUFBSSxDQUFDLHdCQUF3QixDQUM5QixDQUFDO1NBQ0g7UUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQzlDLElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVPLDRCQUE0QixDQUNsQyxZQUFvQjtRQUVwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ2hFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxZQUFvQjtRQUMvQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "../webext-instrumentation/build/module/content/javascript-instrument-content-scope.js":
/*!*********************************************************************************************!*\
  !*** ../webext-instrumentation/build/module/content/javascript-instrument-content-scope.js ***!
  \*********************************************************************************************/
/*! exports provided: injectJavascriptInstrumentPageScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectJavascriptInstrumentPageScript", function() { return injectJavascriptInstrumentPageScript; });
/* harmony import */ var _lib_instrument_fingerprinting_apis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/instrument-fingerprinting-apis */ "../webext-instrumentation/build/module/lib/instrument-fingerprinting-apis.js");
/* harmony import */ var _lib_js_instruments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/js-instruments */ "../webext-instrumentation/build/module/lib/js-instruments.js");
/* harmony import */ var _javascript_instrument_page_scope__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./javascript-instrument-page-scope */ "../webext-instrumentation/build/module/content/javascript-instrument-page-scope.js");



function getPageScriptAsString() {
    return (_lib_js_instruments__WEBPACK_IMPORTED_MODULE_1__["jsInstruments"] +
        "\n" +
        _lib_instrument_fingerprinting_apis__WEBPACK_IMPORTED_MODULE_0__["instrumentFingerprintingApis"] +
        "\n" +
        "(" +
        _javascript_instrument_page_scope__WEBPACK_IMPORTED_MODULE_2__["pageScript"] +
        "({jsInstruments, instrumentFingerprintingApis}));");
}
function insertScript(text, data) {
    const parent = document.documentElement, script = document.createElement("script");
    script.text = text;
    script.async = false;
    for (const key in data) {
        script.setAttribute("data-" + key.replace("_", "-"), data[key]);
    }
    parent.insertBefore(script, parent.firstChild);
    parent.removeChild(script);
}
function emitMsg(type, msg) {
    msg.timeStamp = new Date().toISOString();
    browser.runtime.sendMessage({
        namespace: "javascript-instrumentation",
        type,
        data: msg,
    });
}
const event_id = Math.random();
// listen for messages from the script we are about to insert
document.addEventListener(event_id.toString(), function (e) {
    // pass these on to the background page
    const msgs = e.detail;
    if (Array.isArray(msgs)) {
        msgs.forEach(function (msg) {
            emitMsg(msg.type, msg.content);
        });
    }
    else {
        emitMsg(msgs.type, msgs.content);
    }
});
function injectJavascriptInstrumentPageScript(contentScriptConfig) {
    insertScript(getPageScriptAsString(), {
        event_id,
        ...contentScriptConfig,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtY29udGVudC1zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRWhFLFNBQVMscUJBQXFCO0lBQzVCLE9BQU8sQ0FDTCxhQUFhO1FBQ2IsSUFBSTtRQUNKLDRCQUE0QjtRQUM1QixJQUFJO1FBQ0osR0FBRztRQUNILFVBQVU7UUFDVixtREFBbUQsQ0FDcEQsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSTtJQUM5QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZUFBZSxFQUNyQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUVyQixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtRQUN0QixNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNqRTtJQUVELE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRztJQUN4QixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDMUIsU0FBUyxFQUFFLDRCQUE0QjtRQUN2QyxJQUFJO1FBQ0osSUFBSSxFQUFFLEdBQUc7S0FDVixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRS9CLDZEQUE2RDtBQUM3RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVMsQ0FBYztJQUNwRSx1Q0FBdUM7SUFDdkMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN0QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFTLEdBQUc7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTTtRQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNsQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLG9DQUFvQyxDQUFDLG1CQUFtQjtJQUN0RSxZQUFZLENBQUMscUJBQXFCLEVBQUUsRUFBRTtRQUNwQyxRQUFRO1FBQ1IsR0FBRyxtQkFBbUI7S0FDdkIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/content/javascript-instrument-page-scope.js":
/*!******************************************************************************************!*\
  !*** ../webext-instrumentation/build/module/content/javascript-instrument-page-scope.js ***!
  \******************************************************************************************/
/*! exports provided: pageScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageScript", function() { return pageScript; });
// Code below is not a content script: no Firefox APIs should be used
// Also, no webpack/es6 imports may be used in this file since the script
// is exported as a page script as a string
const pageScript = function ({ jsInstruments, instrumentFingerprintingApis, }) {
    // messages the injected script
    function sendMessagesToLogger($event_id, messages) {
        document.dispatchEvent(new CustomEvent($event_id, {
            detail: messages,
        }));
    }
    const event_id = document.currentScript.getAttribute("data-event-id");
    const { instrumentObject, instrumentObjectProperty } = jsInstruments(event_id, sendMessagesToLogger);
    const testing = document.currentScript.getAttribute("data-testing") === "true";
    if (testing) {
        console.log("OpenWPM: Currently testing");
        window.instrumentObject = instrumentObject;
    }
    /*
     * Start Instrumentation
     */
    const modules = document.currentScript.getAttribute("data-modules")
        ? document.currentScript.getAttribute("data-modules").split(",")
        : [];
    if (modules.includes("fingerprinting")) {
        instrumentFingerprintingApis({
            instrumentObjectProperty,
            instrumentObject,
        });
    }
    if (testing) {
        console.log("OpenWPM: Content-side javascript instrumentation started", { modules }, new Date().toISOString());
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamF2YXNjcmlwdC1pbnN0cnVtZW50LXBhZ2Utc2NvcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtcGFnZS1zY29wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxRUFBcUU7QUFDckUseUVBQXlFO0FBQ3pFLDJDQUEyQztBQUUzQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsVUFBUyxFQUNqQyxhQUFhLEVBQ2IsNEJBQTRCLEdBQzdCO0lBQ0MsK0JBQStCO0lBQy9CLFNBQVMsb0JBQW9CLENBQUMsU0FBUyxFQUFFLFFBQVE7UUFDL0MsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQ3pCLE1BQU0sRUFBRSxRQUFRO1NBQ2pCLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXRFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSx3QkFBd0IsRUFBRSxHQUFHLGFBQWEsQ0FDbEUsUUFBUSxFQUNSLG9CQUFvQixDQUNyQixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQ1gsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEtBQUssTUFBTSxDQUFDO0lBQ2pFLElBQUksT0FBTyxFQUFFO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3pDLE1BQWMsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztLQUNyRDtJQUVEOztPQUVHO0lBQ0gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFUCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUN0Qyw0QkFBNEIsQ0FBQztZQUMzQix3QkFBd0I7WUFDeEIsZ0JBQWdCO1NBQ2pCLENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUNULDBEQUEwRCxFQUMxRCxFQUFFLE9BQU8sRUFBRSxFQUNYLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQ3pCLENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQyJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/index.js":
/*!*******************************************************!*\
  !*** ../webext-instrumentation/build/module/index.js ***!
  \*******************************************************/
/*! exports provided: transformCookieObjectToMatchOpenWPMSchema, CookieInstrument, HttpInstrument, JavascriptInstrument, transformWebNavigationBaseEventDetailsToOpenWPMSchema, NavigationInstrument, injectJavascriptInstrumentPageScript, HttpPostParser, encode_utf8, escapeString, escapeUrl, Uint8ToBase64, boolToInt, dateTimeUnicodeFormatString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background_cookie_instrument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background/cookie-instrument */ "../webext-instrumentation/build/module/background/cookie-instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformCookieObjectToMatchOpenWPMSchema", function() { return _background_cookie_instrument__WEBPACK_IMPORTED_MODULE_0__["transformCookieObjectToMatchOpenWPMSchema"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CookieInstrument", function() { return _background_cookie_instrument__WEBPACK_IMPORTED_MODULE_0__["CookieInstrument"]; });

/* harmony import */ var _background_http_instrument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background/http-instrument */ "../webext-instrumentation/build/module/background/http-instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpInstrument", function() { return _background_http_instrument__WEBPACK_IMPORTED_MODULE_1__["HttpInstrument"]; });

/* harmony import */ var _background_javascript_instrument__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background/javascript-instrument */ "../webext-instrumentation/build/module/background/javascript-instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JavascriptInstrument", function() { return _background_javascript_instrument__WEBPACK_IMPORTED_MODULE_2__["JavascriptInstrument"]; });

/* harmony import */ var _background_navigation_instrument__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./background/navigation-instrument */ "../webext-instrumentation/build/module/background/navigation-instrument.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformWebNavigationBaseEventDetailsToOpenWPMSchema", function() { return _background_navigation_instrument__WEBPACK_IMPORTED_MODULE_3__["transformWebNavigationBaseEventDetailsToOpenWPMSchema"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavigationInstrument", function() { return _background_navigation_instrument__WEBPACK_IMPORTED_MODULE_3__["NavigationInstrument"]; });

/* harmony import */ var _content_javascript_instrument_content_scope__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content/javascript-instrument-content-scope */ "../webext-instrumentation/build/module/content/javascript-instrument-content-scope.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "injectJavascriptInstrumentPageScript", function() { return _content_javascript_instrument_content_scope__WEBPACK_IMPORTED_MODULE_4__["injectJavascriptInstrumentPageScript"]; });

/* harmony import */ var _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/http-post-parser */ "../webext-instrumentation/build/module/lib/http-post-parser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpPostParser", function() { return _lib_http_post_parser__WEBPACK_IMPORTED_MODULE_5__["HttpPostParser"]; });

/* harmony import */ var _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encode_utf8", function() { return _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__["encode_utf8"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeString", function() { return _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__["escapeString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeUrl", function() { return _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__["escapeUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Uint8ToBase64", function() { return _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__["Uint8ToBase64"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "boolToInt", function() { return _lib_string_utils__WEBPACK_IMPORTED_MODULE_6__["boolToInt"]; });

/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./schema */ "../webext-instrumentation/build/module/schema.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateTimeUnicodeFormatString", function() { return _schema__WEBPACK_IMPORTED_MODULE_7__["dateTimeUnicodeFormatString"]; });









//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxnQ0FBZ0MsQ0FBQztBQUMvQyxjQUFjLDhCQUE4QixDQUFDO0FBQzdDLGNBQWMsb0NBQW9DLENBQUM7QUFDbkQsY0FBYyxvQ0FBb0MsQ0FBQztBQUNuRCxjQUFjLCtDQUErQyxDQUFDO0FBQzlELGNBQWMsd0JBQXdCLENBQUM7QUFDdkMsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLFVBQVUsQ0FBQyJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js":
/*!*************************************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/extension-session-event-ordinal.js ***!
  \*************************************************************************************/
/*! exports provided: incrementedEventOrdinal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "incrementedEventOrdinal", function() { return incrementedEventOrdinal; });
/**
 * This enables us to keep information about the original order
 * in which events arrived to our event listeners.
 */
let eventOrdinal = 0;
const incrementedEventOrdinal = () => {
    return eventOrdinal++;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckIsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxFQUFFO0lBQzFDLE9BQU8sWUFBWSxFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDIn0=

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/extension-session-uuid.js":
/*!****************************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/extension-session-uuid.js ***!
  \****************************************************************************/
/*! exports provided: extensionSessionUuid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extensionSessionUuid", function() { return extensionSessionUuid; });
/* harmony import */ var _uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uuid */ "../webext-instrumentation/build/module/lib/uuid.js");

/**
 * This enables us to access a unique reference to this browser
 * session - regenerated any time the background process gets
 * restarted (which should only be on browser restarts)
 */
const extensionSessionUuid = Object(_uuid__WEBPACK_IMPORTED_MODULE_0__["makeUUID"])();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLXNlc3Npb24tdXVpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWxDOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxRQUFRLEVBQUUsQ0FBQyJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/http-post-parser.js":
/*!**********************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/http-post-parser.js ***!
  \**********************************************************************/
/*! exports provided: HttpPostParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpPostParser", function() { return HttpPostParser; });
/* harmony import */ var _string_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string-utils */ "../webext-instrumentation/build/module/lib/string-utils.js");
// Incorporates code from: https://github.com/redline13/selenium-jmeter/blob/6966d4b326cd78261e31e6e317076569051cac37/content/library/recorder/HttpPostParser.js
// import { escapeString, escapeUrl } from "./string-utils";

class HttpPostParser {
    /*
    private hasheaders: boolean;
    private seekablestream;
    private stream;
    private postBody;
    private postLines;
    private postHeaders;
    private body;
    */
    constructor(
    // onBeforeSendHeadersEventDetails: WebRequestOnBeforeSendHeadersEventDetails,
    onBeforeRequestEventDetails, dataReceiver) {
        // this.onBeforeSendHeadersEventDetails = onBeforeSendHeadersEventDetails;
        this.onBeforeRequestEventDetails = onBeforeRequestEventDetails;
        this.dataReceiver = dataReceiver;
        /*
        console.log(
          "HttpPostParser",
          // onBeforeSendHeadersEventDetails,
          onBeforeRequestEventDetails,
        );
        */
    }
    /**
     * @param encodingType from the HTTP Request headers
     */
    parsePostRequest( /*encodingType*/) {
        // const requestHeaders = this.onBeforeSendHeadersEventDetails.requestHeaders;
        const requestBody = this.onBeforeRequestEventDetails.requestBody;
        if (requestBody.error) {
            this.dataReceiver.logError("Exception: Upstream failed to parse POST: " + requestBody.error);
        }
        if (requestBody.formData) {
            return {
                // TODO: requestBody.formData should probably be transformed into another format
                post_body: Object(_string_utils__WEBPACK_IMPORTED_MODULE_0__["escapeString"])(JSON.stringify(requestBody.formData)),
            };
        }
        if (requestBody.raw) {
            return {
                post_body_raw: JSON.stringify(requestBody.raw.map(x => [
                    x.file,
                    Object(_string_utils__WEBPACK_IMPORTED_MODULE_0__["Uint8ToBase64"])(new Uint8Array(x.bytes)),
                ])),
            };
        }
        // Return empty response until we have all instrumentation converted
        return {};
        /*
        this.dataReceiver.logDebug(
          "Exception: Instrumentation to parse POST requests without formData is not yet restored",
        );
    
        // TODO: Refactor to corresponding webext logic or discard
        try {
          this.setupStream();
          this.parseStream();
        } catch (e) {
          this.dataReceiver.logError("Exception: Failed to parse POST: " + e);
          return {};
        }
    
        const postBody = this.postBody;
    
        if (!postBody) {
          // some scripts strangely sends empty post bodies (confirmed with the developer tools)
          return {};
        }
    
        let isMultiPart = false; // encType: multipart/form-data
        const postHeaders = this.postHeaders; // request headers from upload stream
        // See, http://stackoverflow.com/questions/16548517/what-is-request-headers-from-upload-stream
    
        // add encodingType from postHeaders if it's missing
        if (!encodingType && postHeaders && "Content-Type" in postHeaders) {
          encodingType = postHeaders["Content-Type"];
        }
    
        if (encodingType.indexOf("multipart/form-data") !== -1) {
          isMultiPart = true;
        }
    
        let jsonPostData = "";
        let escapedJsonPostData = "";
        if (isMultiPart) {
          jsonPostData = this.parseMultiPartData(postBody /*, encodingType* /);
          escapedJsonPostData = escapeString(jsonPostData);
        } else {
          jsonPostData = this.parseEncodedFormData(postBody, encodingType);
          escapedJsonPostData = escapeString(jsonPostData);
        }
        return { post_headers: postHeaders, post_body: escapedJsonPostData };
        */
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1wb3N0LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvaHR0cC1wb3N0LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnS0FBZ0s7QUFNaEssNERBQTREO0FBRTVELE9BQU8sRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFVN0QsTUFBTSxPQUFPLGNBQWM7SUFJekI7Ozs7Ozs7O01BUUU7SUFFRjtJQUNFLDhFQUE4RTtJQUM5RSwyQkFBa0UsRUFDbEUsWUFBWTtRQUVaLDBFQUEwRTtRQUMxRSxJQUFJLENBQUMsMkJBQTJCLEdBQUcsMkJBQTJCLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakM7Ozs7OztVQU1FO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0ksZ0JBQWdCLEVBQUMsZ0JBQWdCO1FBQ3RDLDhFQUE4RTtRQUM5RSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsV0FBVyxDQUFDO1FBQ2pFLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FDeEIsNENBQTRDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FDakUsQ0FBQztTQUNIO1FBQ0QsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3hCLE9BQU87Z0JBQ0wsZ0ZBQWdGO2dCQUNoRixTQUFTLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlELENBQUM7U0FDSDtRQUNELElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNuQixPQUFPO2dCQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUMzQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN2QixDQUFDLENBQUMsSUFBSTtvQkFDTixhQUFhLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN2QyxDQUFDLENBQ0g7YUFDRixDQUFDO1NBQ0g7UUFFRCxvRUFBb0U7UUFDcEUsT0FBTyxFQUFFLENBQUM7UUFDVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUE0Q0U7SUFDSixDQUFDO0NBMlRGIn0=

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/instrument-fingerprinting-apis.js":
/*!************************************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/instrument-fingerprinting-apis.js ***!
  \************************************************************************************/
/*! exports provided: instrumentFingerprintingApis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instrumentFingerprintingApis", function() { return instrumentFingerprintingApis; });
function instrumentFingerprintingApis({ instrumentObjectProperty, instrumentObject, }) {
    // Access to navigator properties
    const navigatorProperties = [
        "appCodeName",
        "appName",
        "appVersion",
        "buildID",
        "cookieEnabled",
        "doNotTrack",
        "geolocation",
        "language",
        "languages",
        "onLine",
        "oscpu",
        "platform",
        "product",
        "productSub",
        "userAgent",
        "vendorSub",
        "vendor",
    ];
    navigatorProperties.forEach(function (property) {
        instrumentObjectProperty(window.navigator, "window.navigator", property);
    });
    // Access to screen properties
    // instrumentObject(window.screen, "window.screen");
    // TODO: why do we instrument only two screen properties
    const screenProperties = ["pixelDepth", "colorDepth"];
    screenProperties.forEach(function (property) {
        instrumentObjectProperty(window.screen, "window.screen", property);
    });
    // Access to plugins
    const pluginProperties = [
        "name",
        "filename",
        "description",
        "version",
        "length",
    ];
    for (let i = 0; i < window.navigator.plugins.length; i++) {
        const pluginName = window.navigator.plugins[i].name;
        pluginProperties.forEach(function (property) {
            instrumentObjectProperty(window.navigator.plugins[pluginName], "window.navigator.plugins[" + pluginName + "]", property);
        });
    }
    // Access to MIMETypes
    const mimeTypeProperties = ["description", "suffixes", "type"];
    for (let i = 0; i < window.navigator.mimeTypes.length; i++) {
        const mimeTypeName = window.navigator.mimeTypes[i].type; // note: upstream typings seems to be incorrect
        mimeTypeProperties.forEach(function (property) {
            instrumentObjectProperty(window.navigator.mimeTypes[mimeTypeName], "window.navigator.mimeTypes[" + mimeTypeName + "]", property);
        });
    }
    // Name, localStorage, and sessionsStorage logging
    // Instrumenting window.localStorage directly doesn't seem to work, so the Storage
    // prototype must be instrumented instead. Unfortunately this fails to differentiate
    // between sessionStorage and localStorage. Instead, you'll have to look for a sequence
    // of a get for the localStorage object followed by a getItem/setItem for the Storage object.
    const windowProperties = ["name", "localStorage", "sessionStorage"];
    windowProperties.forEach(function (property) {
        instrumentObjectProperty(window, "window", property);
    });
    instrumentObject(window.Storage.prototype, "window.Storage");
    // Access to document.cookie
    instrumentObjectProperty(window.document, "window.document", "cookie", {
        logCallStack: true,
    });
    // Access to document.referrer
    instrumentObjectProperty(window.document, "window.document", "referrer", {
        logCallStack: true,
    });
    // Access to canvas
    instrumentObject(window.HTMLCanvasElement.prototype, "HTMLCanvasElement");
    const excludedProperties = [
        "quadraticCurveTo",
        "lineTo",
        "transform",
        "globalAlpha",
        "moveTo",
        "drawImage",
        "setTransform",
        "clearRect",
        "closePath",
        "beginPath",
        "canvas",
        "translate",
    ];
    instrumentObject(window.CanvasRenderingContext2D.prototype, "CanvasRenderingContext2D", { excludedProperties });
    // Access to webRTC
    instrumentObject(window.RTCPeerConnection.prototype, "RTCPeerConnection");
    // Access to Audio API
    instrumentObject(window.AudioContext.prototype, "AudioContext");
    instrumentObject(window.OfflineAudioContext.prototype, "OfflineAudioContext");
    instrumentObject(window.OscillatorNode.prototype, "OscillatorNode");
    instrumentObject(window.AnalyserNode.prototype, "AnalyserNode");
    instrumentObject(window.GainNode.prototype, "GainNode");
    instrumentObject(window.ScriptProcessorNode.prototype, "ScriptProcessorNode");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdHJ1bWVudC1maW5nZXJwcmludGluZy1hcGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9pbnN0cnVtZW50LWZpbmdlcnByaW50aW5nLWFwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLDRCQUE0QixDQUFDLEVBQzNDLHdCQUF3QixFQUN4QixnQkFBZ0IsR0FDakI7SUFDQyxpQ0FBaUM7SUFDakMsTUFBTSxtQkFBbUIsR0FBRztRQUMxQixhQUFhO1FBQ2IsU0FBUztRQUNULFlBQVk7UUFDWixTQUFTO1FBQ1QsZUFBZTtRQUNmLFlBQVk7UUFDWixhQUFhO1FBQ2IsVUFBVTtRQUNWLFdBQVc7UUFDWCxRQUFRO1FBQ1IsT0FBTztRQUNQLFVBQVU7UUFDVixTQUFTO1FBQ1QsWUFBWTtRQUNaLFdBQVc7UUFDWCxXQUFXO1FBQ1gsUUFBUTtLQUNULENBQUM7SUFDRixtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBUyxRQUFRO1FBQzNDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0UsQ0FBQyxDQUFDLENBQUM7SUFFSCw4QkFBOEI7SUFDOUIsb0RBQW9EO0lBQ3BELHdEQUF3RDtJQUN4RCxNQUFNLGdCQUFnQixHQUFHLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3RELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7UUFDeEMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDLENBQUM7SUFFSCxvQkFBb0I7SUFDcEIsTUFBTSxnQkFBZ0IsR0FBRztRQUN2QixNQUFNO1FBQ04sVUFBVTtRQUNWLGFBQWE7UUFDYixTQUFTO1FBQ1QsUUFBUTtLQUNULENBQUM7SUFDRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFB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

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/js-instruments.js":
/*!********************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/js-instruments.js ***!
  \********************************************************************/
/*! exports provided: jsInstruments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsInstruments", function() { return jsInstruments; });
// Intrumentation injection code is based on privacybadgerfirefox
// https://github.com/EFForg/privacybadgerfirefox/blob/master/data/fingerprinting.js
function jsInstruments(event_id, sendMessagesToLogger) {
    /*
     * Instrumentation helpers
     * (Inlined in order for jsInstruments to be easily exportable as a string)
     */
    // debounce - from Underscore v1.6.0
    function debounce(func, wait, immediate = false) {
        let timeout, args, context, timestamp, result;
        const later = function () {
            const last = Date.now() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            const callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    }
    // Recursively generates a path for an element
    function getPathToDomElement(element, visibilityAttr = false) {
        if (element === document.body) {
            return element.tagName;
        }
        if (element.parentNode === null) {
            return "NULL/" + element.tagName;
        }
        let siblingIndex = 1;
        const siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element) {
                let path = getPathToDomElement(element.parentNode, visibilityAttr);
                path += "/" + element.tagName + "[" + siblingIndex;
                path += "," + element.id;
                path += "," + element.className;
                if (visibilityAttr) {
                    path += "," + element.hidden;
                    path += "," + element.style.display;
                    path += "," + element.style.visibility;
                }
                if (element.tagName === "A") {
                    path += "," + element.href;
                }
                path += "]";
                return path;
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                siblingIndex++;
            }
        }
    }
    // Helper for JSONifying objects
    function serializeObject(object, stringifyFunctions = false) {
        // Handle permissions errors
        try {
            if (object === null) {
                return "null";
            }
            if (typeof object === "function") {
                if (stringifyFunctions) {
                    return object.toString();
                }
                else {
                    return "FUNCTION";
                }
            }
            if (typeof object !== "object") {
                return object;
            }
            const seenObjects = [];
            return JSON.stringify(object, function (key, value) {
                if (value === null) {
                    return "null";
                }
                if (typeof value === "function") {
                    if (stringifyFunctions) {
                        return value.toString();
                    }
                    else {
                        return "FUNCTION";
                    }
                }
                if (typeof value === "object") {
                    // Remove wrapping on content objects
                    if ("wrappedJSObject" in value) {
                        value = value.wrappedJSObject;
                    }
                    // Serialize DOM elements
                    if (value instanceof HTMLElement) {
                        return getPathToDomElement(value);
                    }
                    // Prevent serialization cycles
                    if (key === "" || seenObjects.indexOf(value) < 0) {
                        seenObjects.push(value);
                        return value;
                    }
                    else {
                        return typeof value;
                    }
                }
                return value;
            });
        }
        catch (error) {
            console.log("OpenWPM: SERIALIZATION ERROR: " + error);
            return "SERIALIZATION ERROR: " + error;
        }
    }
    /*
     * Direct instrumentation of javascript objects
     */
    const sendFactory = function ($event_id, $sendMessagesToLogger) {
        let messages = [];
        // debounce sending queued messages
        const _send = debounce(function () {
            $sendMessagesToLogger($event_id, messages);
            // clear the queue
            messages = [];
        }, 100);
        return function (msgType, msg) {
            // queue the message
            messages.push({ type: msgType, content: msg });
            _send();
        };
    };
    const send = sendFactory(event_id, sendMessagesToLogger);
    // Counter to cap # of calls logged for each script/api combination
    const maxLogCount = 500;
    const logCounter = new Object();
    function updateCounterAndCheckIfOver(scriptUrl, symbol) {
        const key = scriptUrl + "|" + symbol;
        if (key in logCounter && logCounter[key] >= maxLogCount) {
            return true;
        }
        else if (!(key in logCounter)) {
            logCounter[key] = 1;
        }
        else {
            logCounter[key] += 1;
        }
        return false;
    }
    // Prevent logging of gets arising from logging
    let inLog = false;
    // To keep track of the original order of events
    let ordinal = 0;
    // For gets, sets, etc. on a single value
    function logValue(instrumentedVariableName, value, operation, callContext, logSettings) {
        if (inLog) {
            return;
        }
        inLog = true;
        const overLimit = updateCounterAndCheckIfOver(callContext.scriptUrl, instrumentedVariableName);
        if (overLimit) {
            inLog = false;
            return;
        }
        const msg = {
            operation,
            symbol: instrumentedVariableName,
            value: serializeObject(value, !!logSettings.logFunctionsAsStrings),
            scriptUrl: callContext.scriptUrl,
            scriptLine: callContext.scriptLine,
            scriptCol: callContext.scriptCol,
            funcName: callContext.funcName,
            scriptLocEval: callContext.scriptLocEval,
            callStack: callContext.callStack,
            ordinal: ordinal++,
        };
        try {
            send("logValue", msg);
        }
        catch (error) {
            console.log("OpenWPM: Unsuccessful value log!");
            logErrorToConsole(error);
        }
        inLog = false;
    }
    // For functions
    function logCall(instrumentedFunctionName, args, callContext, logSettings) {
        if (inLog) {
            return;
        }
        inLog = true;
        const overLimit = updateCounterAndCheckIfOver(callContext.scriptUrl, instrumentedFunctionName);
        if (overLimit) {
            inLog = false;
            return;
        }
        try {
            // Convert special arguments array to a standard array for JSONifying
            const serialArgs = [];
            for (let i = 0; i < args.length; i++) {
                serialArgs.push(serializeObject(args[i], !!logSettings.logFunctionsAsStrings));
            }
            const msg = {
                operation: "call",
                symbol: instrumentedFunctionName,
                args: serialArgs,
                value: "",
                scriptUrl: callContext.scriptUrl,
                scriptLine: callContext.scriptLine,
                scriptCol: callContext.scriptCol,
                funcName: callContext.funcName,
                scriptLocEval: callContext.scriptLocEval,
                callStack: callContext.callStack,
                ordinal: ordinal++,
            };
            send("logCall", msg);
        }
        catch (error) {
            console.log("OpenWPM: Unsuccessful call log: " + instrumentedFunctionName);
            logErrorToConsole(error);
        }
        inLog = false;
    }
    function logErrorToConsole(error, context = false) {
        console.log("OpenWPM: Error name: " + error.name);
        console.log("OpenWPM: Error message: " + error.message);
        console.log("OpenWPM: Error filename: " + error.fileName);
        console.log("OpenWPM: Error line number: " + error.lineNumber);
        console.log("OpenWPM: Error stack: " + error.stack);
        if (context) {
            console.log("OpenWPM: Error context: " + JSON.stringify(context));
        }
    }
    // Rough implementations of Object.getPropertyDescriptor and Object.getPropertyNames
    // See http://wiki.ecmascript.org/doku.php?id=harmony:extended_object_api
    Object.getPropertyDescriptor = function (subject, name) {
        if (subject === undefined) {
            throw new Error("Can't get property descriptor for undefined");
        }
        let pd = Object.getOwnPropertyDescriptor(subject, name);
        let proto = Object.getPrototypeOf(subject);
        while (pd === undefined && proto !== null) {
            pd = Object.getOwnPropertyDescriptor(proto, name);
            proto = Object.getPrototypeOf(proto);
        }
        return pd;
    };
    Object.getPropertyNames = function (subject) {
        if (subject === undefined) {
            throw new Error("Can't get property names for undefined");
        }
        let props = Object.getOwnPropertyNames(subject);
        let proto = Object.getPrototypeOf(subject);
        while (proto !== null) {
            props = props.concat(Object.getOwnPropertyNames(proto));
            proto = Object.getPrototypeOf(proto);
        }
        // FIXME: remove duplicate property names from props
        return props;
    };
    // Helper to get originating script urls
    function getStackTrace() {
        let stack;
        try {
            throw new Error();
        }
        catch (err) {
            stack = err.stack;
        }
        return stack;
    }
    // from http://stackoverflow.com/a/5202185
    const rsplit = function (source, sep, maxsplit) {
        const split = source.split(sep);
        return maxsplit
            ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit))
            : split;
    };
    function getOriginatingScriptContext(getCallStack = false) {
        const trace = getStackTrace()
            .trim()
            .split("\n");
        // return a context object even if there is an error
        const empty_context = {
            scriptUrl: "",
            scriptLine: "",
            scriptCol: "",
            funcName: "",
            scriptLocEval: "",
            callStack: "",
        };
        if (trace.length < 4) {
            return empty_context;
        }
        // 0, 1 and 2 are OpenWPM's own functions (e.g. getStackTrace), skip them.
        const callSite = trace[3];
        if (!callSite) {
            return empty_context;
        }
        /*
         * Stack frame format is simply: FUNC_NAME@FILENAME:LINE_NO:COLUMN_NO
         *
         * If eval or Function is involved we have an additional part after the FILENAME, e.g.:
         * FUNC_NAME@FILENAME line 123 > eval line 1 > eval:LINE_NO:COLUMN_NO
         * or FUNC_NAME@FILENAME line 234 > Function:LINE_NO:COLUMN_NO
         *
         * We store the part between the FILENAME and the LINE_NO in scriptLocEval
         */
        try {
            let scriptUrl = "";
            let scriptLocEval = ""; // for eval or Function calls
            const callSiteParts = callSite.split("@");
            const funcName = callSiteParts[0] || "";
            const items = rsplit(callSiteParts[1], ":", 2);
            const columnNo = items[items.length - 1];
            const lineNo = items[items.length - 2];
            const scriptFileName = items[items.length - 3] || "";
            const lineNoIdx = scriptFileName.indexOf(" line "); // line in the URL means eval or Function
            if (lineNoIdx === -1) {
                scriptUrl = scriptFileName; // TODO: sometimes we have filename only, e.g. XX.js
            }
            else {
                scriptUrl = scriptFileName.slice(0, lineNoIdx);
                scriptLocEval = scriptFileName.slice(lineNoIdx + 1, scriptFileName.length);
            }
            const callContext = {
                scriptUrl,
                scriptLine: lineNo,
                scriptCol: columnNo,
                funcName,
                scriptLocEval,
                callStack: getCallStack
                    ? trace
                        .slice(3)
                        .join("\n")
                        .trim()
                    : "",
            };
            return callContext;
        }
        catch (e) {
            console.log("OpenWPM: Error parsing the script context", e.toString(), callSite);
            return empty_context;
        }
    }
    function isObject(object, propertyName) {
        let property;
        try {
            property = object[propertyName];
        }
        catch (error) {
            return false;
        }
        if (property === null) {
            // null is type "object"
            return false;
        }
        return typeof property === "object";
    }
    function instrumentObject(object, objectName, logSettings = {}) {
        // Use for objects or object prototypes
        //
        // Parameters
        // ----------
        //   object : Object
        //     Object to instrument
        //   objectName : String
        //     Name of the object to be instrumented (saved to database)
        //   logSettings : Object
        //     (optional) object that can be used to specify additional logging
        //     configurations. See available options below.
        //
        // logSettings options (all optional)
        // -------------------
        //   propertiesToInstrument : Array
        //     An array of properties to instrument on this object. Default is
        //     all properties.
        //   nonExistingPropertiesToInstrument : Array
        //     An array of non-existing properties to instrument on this object.
        //   excludedProperties : Array
        //     Properties excluded from instrumentation. Default is an empty
        //     array.
        //   logCallStack : boolean
        //     Set to true save the call stack info with each property call.
        //     Default is `false`.
        //   logFunctionsAsStrings : boolean
        //     Set to true to save functional arguments as strings during
        //     argument serialization. Default is `false`.
        //   preventSets : boolean
        //     Set to true to prevent nested objects and functions from being
        //     overwritten (and thus having their instrumentation removed).
        //     Other properties (static values) can still be set with this is
        //     enabled. Default is `false`.
        //   recursive : boolean
        //     Set to `true` to recursively instrument all object properties of
        //     the given `object`. Default is `false`
        //     NOTE:
        //       (1)`logSettings['propertiesToInstrument']` does not propagate
        //           to sub-objects.
        //       (2) Sub-objects of prototypes can not be instrumented
        //           recursively as these properties can not be accessed
        //           until an instance of the prototype is created.
        //   depth : integer
        //     Recursion limit when instrumenting object recursively.
        //     Default is `5`.
        const properties = logSettings.propertiesToInstrument
            ? logSettings.propertiesToInstrument
            : Object.getPropertyNames(object);
        for (const propertyName of properties) {
            if (logSettings.excludedProperties &&
                logSettings.excludedProperties.indexOf(propertyName) > -1) {
                continue;
            }
            // If `recursive` flag set we want to recursively instrument any
            // object properties that aren't the prototype object. Only recurse if
            // depth not set (at which point its set to default) or not at limit.
            if (!!logSettings.recursive &&
                propertyName !== "__proto__" &&
                isObject(object, propertyName) &&
                (!("depth" in logSettings) || logSettings.depth > 0)) {
                // set recursion limit to default if not specified
                if (!("depth" in logSettings)) {
                    logSettings.depth = 5;
                }
                instrumentObject(object[propertyName], objectName + "." + propertyName, {
                    excludedProperties: logSettings.excludedProperties,
                    logCallStack: logSettings.logCallStack,
                    logFunctionsAsStrings: logSettings.logFunctionsAsStrings,
                    preventSets: logSettings.preventSets,
                    recursive: logSettings.recursive,
                    depth: logSettings.depth - 1,
                });
            }
            try {
                instrumentObjectProperty(object, objectName, propertyName, logSettings);
            }
            catch (error) {
                logErrorToConsole(error, { objectName, propertyName });
            }
        }
        const nonExistingProperties = logSettings.nonExistingPropertiesToInstrument;
        if (nonExistingProperties) {
            for (const propertyName of nonExistingProperties) {
                if (logSettings.excludedProperties &&
                    logSettings.excludedProperties.indexOf(propertyName) > -1) {
                    continue;
                }
                try {
                    instrumentObjectProperty(object, objectName, propertyName, logSettings);
                }
                catch (error) {
                    logErrorToConsole(error, { objectName, propertyName });
                }
            }
        }
    }
    // Log calls to a given function
    // This helper function returns a wrapper around `func` which logs calls
    // to `func`. `objectName` and `methodName` are used strictly to identify
    // which object method `func` is coming from in the logs
    function instrumentFunction(objectName, methodName, func, logSettings) {
        return function () {
            const callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
            logCall(objectName + "." + methodName, arguments, callContext, logSettings);
            return func.apply(this, arguments);
        };
    }
    // Log properties of prototypes and objects
    function instrumentObjectProperty(object, objectName, propertyName, logSettings = {}) {
        if (!object) {
            throw new Error("Invalid object: " + propertyName);
        }
        if (!objectName) {
            throw new Error("Invalid object name: " + propertyName);
        }
        if (!propertyName || propertyName === "undefined") {
            throw new Error("Invalid object property name: " + propertyName);
        }
        // Store original descriptor in closure
        const propDesc = Object.getPropertyDescriptor(object, propertyName);
        // Property descriptor must exist unless we are instrumenting a
        // non-existing property
        if (!propDesc &&
            (!logSettings.nonExistingPropertiesToInstrument ||
                logSettings.nonExistingPropertiesToInstrument.indexOf(propertyName) ==
                    -1)) {
            console.error("Property descriptor not found for", objectName, propertyName, object);
            return;
        }
        // Property descriptor for undefined properties
        let undefinedPropValue;
        const undefinedPropDesc = {
            get: () => {
                return undefinedPropValue;
            },
            set: value => {
                undefinedPropValue = value;
            },
            enumerable: false,
        };
        // Instrument data or accessor property descriptors
        const originalGetter = propDesc ? propDesc.get : undefinedPropDesc.get;
        const originalSetter = propDesc ? propDesc.set : undefinedPropDesc.set;
        let originalValue = propDesc ? propDesc.value : undefinedPropValue;
        // We overwrite both data and accessor properties as an instrumented
        // accessor property
        Object.defineProperty(object, propertyName, {
            configurable: true,
            get: (function () {
                return function () {
                    let origProperty;
                    const callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
                    // get original value
                    if (!propDesc) {
                        // if undefined property
                        origProperty = undefinedPropValue;
                    }
                    else if (originalGetter) {
                        // if accessor property
                        origProperty = originalGetter.call(this);
                    }
                    else if ("value" in propDesc) {
                        // if data property
                        origProperty = originalValue;
                    }
                    else {
                        console.error("Property descriptor for", objectName + "." + propertyName, "doesn't have getter or value?");
                        logValue(objectName + "." + propertyName, "", "get(failed)", callContext, logSettings);
                        return;
                    }
                    // Log `gets` except those that have instrumented return values
                    // * All returned functions are instrumented with a wrapper
                    // * Returned objects may be instrumented if recursive
                    //   instrumentation is enabled and this isn't at the depth limit.
                    if (typeof origProperty === "function") {
                        if (logSettings.logFunctionGets) {
                            logValue(objectName + "." + propertyName, origProperty, "get(function)", callContext, logSettings);
                        }
                        const instrumentedFunctionWrapper = instrumentFunction(objectName, propertyName, origProperty, logSettings);
                        // Restore the original prototype and constructor so that instrumented classes remain intact
                        // TODO: This may have introduced prototype pollution as per https://github.com/mozilla/OpenWPM/issues/471
                        if (origProperty.prototype) {
                            instrumentedFunctionWrapper.prototype = origProperty.prototype;
                            if (origProperty.prototype.constructor) {
                                instrumentedFunctionWrapper.prototype.constructor =
                                    origProperty.prototype.constructor;
                            }
                        }
                        return instrumentedFunctionWrapper;
                    }
                    else if (typeof origProperty === "object" &&
                        !!logSettings.recursive &&
                        (!("depth" in logSettings) || logSettings.depth > 0)) {
                        return origProperty;
                    }
                    else {
                        logValue(objectName + "." + propertyName, origProperty, "get", callContext, logSettings);
                        return origProperty;
                    }
                };
            })(),
            set: (function () {
                return function (value) {
                    const callContext = getOriginatingScriptContext(!!logSettings.logCallStack);
                    let returnValue;
                    // Prevent sets for functions and objects if enabled
                    if (!!logSettings.preventSets &&
                        (typeof originalValue === "function" ||
                            typeof originalValue === "object")) {
                        logValue(objectName + "." + propertyName, value, "set(prevented)", callContext, logSettings);
                        return value;
                    }
                    // set new value to original setter/location
                    if (originalSetter) {
                        // if accessor property
                        returnValue = originalSetter.call(this, value);
                    }
                    else if ("value" in propDesc) {
                        inLog = true;
                        if (object.isPrototypeOf(this)) {
                            Object.defineProperty(this, propertyName, {
                                value,
                            });
                        }
                        else {
                            originalValue = value;
                        }
                        returnValue = value;
                        inLog = false;
                    }
                    else {
                        console.error("Property descriptor for", objectName + "." + propertyName, "doesn't have setter or value?");
                        logValue(objectName + "." + propertyName, value, "set(failed)", callContext, logSettings);
                        return value;
                    }
                    // log set
                    logValue(objectName + "." + propertyName, value, "set", callContext, logSettings);
                    // return new value
                    return returnValue;
                };
            })(),
        });
    }
    return { instrumentObject, instrumentObjectProperty };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMtaW5zdHJ1bWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2pzLWluc3RydW1lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlFQUFpRTtBQUNqRSxvRkFBb0Y7QUF3QnBGLE1BQU0sVUFBVSxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQjtJQUMxRDs7O09BR0c7SUFFSCxvQ0FBb0M7SUFDcEMsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUcsS0FBSztRQUM3QyxJQUFJLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUM7UUFFOUMsTUFBTSxLQUFLLEdBQUc7WUFDWixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1lBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtnQkFDZixPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDZixJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNkLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDbkMsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ3ZCO2FBQ0Y7UUFDSCxDQUFDLENBQUM7UUFFRixPQUFPO1lBQ0wsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLElBQUksR0FBRyxTQUFTLENBQUM7WUFDakIsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QixNQUFNLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUss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

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/pending-navigation.js":
/*!************************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/pending-navigation.js ***!
  \************************************************************************/
/*! exports provided: PendingNavigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingNavigation", function() { return PendingNavigation; });
/**
 * Ties together the two separate navigation events that together holds information about both parent frame id and transition-related attributes
 */
class PendingNavigation {
    constructor() {
        this.onBeforeNavigateEventNavigation = new Promise(resolve => {
            this.resolveOnBeforeNavigateEventNavigation = resolve;
        });
        this.onCommittedEventNavigation = new Promise(resolve => {
            this.resolveOnCommittedEventNavigation = resolve;
        });
    }
    resolved() {
        return Promise.all([
            this.onBeforeNavigateEventNavigation,
            this.onCommittedEventNavigation,
        ]);
    }
    /**
     * Either returns or times out and returns undefined or
     * returns the results from resolved() above
     * @param ms
     */
    async resolvedWithinTimeout(ms) {
        const resolved = await Promise.race([
            this.resolved(),
            new Promise(resolve => setTimeout(resolve, ms)),
        ]);
        return resolved;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZy1uYXZpZ2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wZW5kaW5nLW5hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7O0dBRUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBSzVCO1FBQ0UsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxPQUFPLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEQsSUFBSSxDQUFDLGlDQUFpQyxHQUFHLE9BQU8sQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTSxRQUFRO1FBQ2IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQywrQkFBK0I7WUFDcEMsSUFBSSxDQUFDLDBCQUEwQjtTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2hELENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Q0FDRiJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/pending-request.js":
/*!*********************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/pending-request.js ***!
  \*********************************************************************/
/*! exports provided: PendingRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingRequest", function() { return PendingRequest; });
/**
 * Ties together the two separate events that together holds information about both request headers and body
 */
class PendingRequest {
    constructor() {
        this.onBeforeRequestEventDetails = new Promise(resolve => {
            this.resolveOnBeforeRequestEventDetails = resolve;
        });
        this.onBeforeSendHeadersEventDetails = new Promise(resolve => {
            this.resolveOnBeforeSendHeadersEventDetails = resolve;
        });
    }
    resolved() {
        return Promise.all([
            this.onBeforeRequestEventDetails,
            this.onBeforeSendHeadersEventDetails,
        ]);
    }
    /**
     * Either returns or times out and returns undefined or
     * returns the results from resolved() above
     * @param ms
     */
    async resolvedWithinTimeout(ms) {
        const resolved = await Promise.race([
            this.resolved(),
            new Promise(resolve => setTimeout(resolve, ms)),
        ]);
        return resolved;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZy1yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9wZW5kaW5nLXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7O0dBRUc7QUFDSCxNQUFNLE9BQU8sY0FBYztJQWF6QjtRQUNFLElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsa0NBQWtDLEdBQUcsT0FBTyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLCtCQUErQixHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxzQ0FBc0MsR0FBRyxPQUFPLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ00sUUFBUTtRQUNiLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsMkJBQTJCO1lBQ2hDLElBQUksQ0FBQywrQkFBK0I7U0FDckMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRTtRQUNuQyxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNoRCxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/pending-response.js":
/*!**********************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/pending-response.js ***!
  \**********************************************************************/
/*! exports provided: PendingResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingResponse", function() { return PendingResponse; });
/* harmony import */ var _response_body_listener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./response-body-listener */ "../webext-instrumentation/build/module/lib/response-body-listener.js");

/**
 * Ties together the two separate events that together holds information about both response headers and body
 */
class PendingResponse {
    constructor() {
        this.onBeforeRequestEventDetails = new Promise(resolve => {
            this.resolveOnBeforeRequestEventDetails = resolve;
        });
        this.onCompletedEventDetails = new Promise(resolve => {
            this.resolveOnCompletedEventDetails = resolve;
        });
    }
    addResponseResponseBodyListener(details) {
        this.responseBodyListener = new _response_body_listener__WEBPACK_IMPORTED_MODULE_0__["ResponseBodyListener"](details);
    }
    resolved() {
        return Promise.all([
            this.onBeforeRequestEventDetails,
            this.onCompletedEventDetails,
        ]);
    }
    /**
     * Either returns or times out and returns undefined or
     * returns the results from resolved() above
     * @param ms
     */
    async resolvedWithinTimeout(ms) {
        const resolved = await Promise.race([
            this.resolved(),
            new Promise(resolve => setTimeout(resolve, ms)),
        ]);
        return resolved;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZy1yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcGVuZGluZy1yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRTs7R0FFRztBQUNILE1BQU0sT0FBTyxlQUFlO0lBYzFCO1FBQ0UsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxrQ0FBa0MsR0FBRyxPQUFPLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkQsSUFBSSxDQUFDLDhCQUE4QixHQUFHLE9BQU8sQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTSwrQkFBK0IsQ0FDcEMsT0FBOEM7UUFFOUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUNNLFFBQVE7UUFDYixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDakIsSUFBSSxDQUFDLDJCQUEyQjtZQUNoQyxJQUFJLENBQUMsdUJBQXVCO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLHFCQUFxQixDQUFDLEVBQUU7UUFDbkMsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGIn0=

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/response-body-listener.js":
/*!****************************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/response-body-listener.js ***!
  \****************************************************************************/
/*! exports provided: ResponseBodyListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponseBodyListener", function() { return ResponseBodyListener; });
/* harmony import */ var _sha256__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sha256 */ "../webext-instrumentation/build/module/lib/sha256.js");

class ResponseBodyListener {
    constructor(details) {
        this.responseBody = new Promise(resolve => {
            this.resolveResponseBody = resolve;
        });
        this.contentHash = new Promise(resolve => {
            this.resolveContentHash = resolve;
        });
        // Used to parse Response stream
        const filter = browser.webRequest.filterResponseData(details.requestId);
        let responseBody = new Uint8Array();
        filter.ondata = event => {
            Object(_sha256__WEBPACK_IMPORTED_MODULE_0__["sha256Buffer"])(event.data).then(digest => {
                this.resolveContentHash(digest);
            });
            const incoming = new Uint8Array(event.data);
            const tmp = new Uint8Array(responseBody.length + incoming.length);
            tmp.set(responseBody);
            tmp.set(incoming, responseBody.length);
            responseBody = tmp;
            filter.write(event.data);
        };
        filter.onstop = _event => {
            this.resolveResponseBody(responseBody);
            filter.disconnect();
        };
    }
    async getResponseBody() {
        return this.responseBody;
    }
    async getContentHash() {
        return this.contentHash;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UtYm9keS1saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcmVzcG9uc2UtYm9keS1saXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXhDLE1BQU0sT0FBTyxvQkFBb0I7SUFNL0IsWUFBWSxPQUE4QztRQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxPQUFPLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQ0FBZ0M7UUFDaEMsTUFBTSxNQUFNLEdBQVEsT0FBTyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FDdkQsT0FBTyxDQUFDLFNBQVMsQ0FDWCxDQUFDO1FBRVQsSUFBSSxZQUFZLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUNwQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWM7UUFDekIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7Q0FDRiJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/sha256.js":
/*!************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/sha256.js ***!
  \************************************************************/
/*! exports provided: sha256, sha256Buffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return sha256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256Buffer", function() { return sha256Buffer; });
/**
 * Code originally from the example at
 * https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 *
 * Note: Using SHA256 instead of the previously used MD5 due to
 * the following comment found at the documentation page linked above:
 *
 * Warning: Older insecure hash functions, like MD5, are not supported
 * by this method. Even a supported method, SHA-1, is considered weak,
 * has been broken and should be avoided for cryptographic applications.
 */
function sha256(str) {
    // We transform the string into an arraybuffer.
    const buffer = new TextEncoder().encode(str);
    return sha256Buffer(buffer);
}
function sha256Buffer(buffer) {
    return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
        return hex(hash);
    });
}
function hex(buffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        const value = view.getUint32(i);
        // toString(16) will give the hex representation of the number without padding
        const stringValue = value.toString(16);
        // We use concatenation and slice for padding
        const padding = "00000000";
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    // Join all the hex strings into one
    return hexCodes.join("");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhMjU2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zaGEyNTYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7R0FVRztBQUVILE1BQU0sVUFBVSxNQUFNLENBQUMsR0FBRztJQUN4QiwrQ0FBK0M7SUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0MsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBTTtJQUNqQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBUyxJQUFJO1FBQy9ELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsR0FBRyxDQUFDLE1BQU07SUFDakIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDM0MseUZBQXlGO1FBQ3pGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsOEVBQThFO1FBQzlFLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsNkNBQTZDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUMzQixNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUM1QjtJQUVELG9DQUFvQztJQUNwQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDM0IsQ0FBQyJ9

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/string-utils.js":
/*!******************************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/string-utils.js ***!
  \******************************************************************/
/*! exports provided: encode_utf8, escapeString, escapeUrl, Uint8ToBase64, boolToInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode_utf8", function() { return encode_utf8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeString", function() { return escapeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeUrl", function() { return escapeUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uint8ToBase64", function() { return Uint8ToBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boolToInt", function() { return boolToInt; });
function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}
const escapeString = function (str) {
    // Convert to string if necessary
    if (typeof str != "string") {
        str = String(str);
    }
    return encode_utf8(str);
};
const escapeUrl = function (url, stripDataUrlData = true) {
    url = escapeString(url);
    // data:[<mediatype>][;base64],<data>
    if (url.substr(0, 5) === "data:" &&
        stripDataUrlData &&
        url.indexOf(",") > -1) {
        url = url.substr(0, url.indexOf(",") + 1) + "<data-stripped>";
    }
    return url;
};
// Base64 encoding, found on:
// https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/25644409#25644409
const Uint8ToBase64 = function (u8Arr) {
    const CHUNK_SIZE = 0x8000; // arbitrary number
    let index = 0;
    const length = u8Arr.length;
    let result = "";
    let slice;
    while (index < length) {
        slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
        result += String.fromCharCode.apply(null, slice);
        index += CHUNK_SIZE;
    }
    return btoa(result);
};
const boolToInt = function (bool) {
    return bool ? 1 : 0;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zdHJpbmctdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLFdBQVcsQ0FBQyxDQUFDO0lBQzNCLE9BQU8sUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxVQUFTLEdBQVE7SUFDM0MsaUNBQWlDO0lBQ2pDLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFO1FBQzFCLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7SUFFRCxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsVUFDdkIsR0FBVyxFQUNYLG1CQUE0QixJQUFJO0lBRWhDLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIscUNBQXFDO0lBQ3JDLElBQ0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssT0FBTztRQUM1QixnQkFBZ0I7UUFDaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDckI7UUFDQSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsQ0FBQztLQUMvRDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRUYsNkJBQTZCO0FBQzdCLHFIQUFxSDtBQUNySCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsVUFBUyxLQUFpQjtJQUNyRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxtQkFBbUI7SUFDOUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUM1QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxLQUFpQixDQUFDO0lBQ3RCLE9BQU8sS0FBSyxHQUFHLE1BQU0sRUFBRTtRQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRCxLQUFLLElBQUksVUFBVSxDQUFDO0tBQ3JCO0lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLFVBQVMsSUFBYTtJQUM3QyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEIsQ0FBQyxDQUFDIn0=

/***/ }),

/***/ "../webext-instrumentation/build/module/lib/uuid.js":
/*!**********************************************************!*\
  !*** ../webext-instrumentation/build/module/lib/uuid.js ***!
  \**********************************************************/
/*! exports provided: makeUUID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeUUID", function() { return makeUUID; });
/* tslint:disable:no-bitwise */
// from https://gist.github.com/jed/982883#gistcomment-2403369
const hex = [];
for (let i = 0; i < 256; i++) {
    hex[i] = (i < 16 ? "0" : "") + i.toString(16);
}
const makeUUID = () => {
    const r = crypto.getRandomValues(new Uint8Array(16));
    r[6] = (r[6] & 0x0f) | 0x40;
    r[8] = (r[8] & 0x3f) | 0x80;
    return (hex[r[0]] +
        hex[r[1]] +
        hex[r[2]] +
        hex[r[3]] +
        "-" +
        hex[r[4]] +
        hex[r[5]] +
        "-" +
        hex[r[6]] +
        hex[r[7]] +
        "-" +
        hex[r[8]] +
        hex[r[9]] +
        "-" +
        hex[r[10]] +
        hex[r[11]] +
        hex[r[12]] +
        hex[r[13]] +
        hex[r[14]] +
        hex[r[15]]);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXVpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvdXVpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFFL0IsOERBQThEO0FBQzlELE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUVmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDNUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQy9DO0FBRUQsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtJQUMzQixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFckQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRTVCLE9BQU8sQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNULEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRztRQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNYLENBQUM7QUFDSixDQUFDLENBQUMifQ==

/***/ }),

/***/ "../webext-instrumentation/build/module/schema.js":
/*!********************************************************!*\
  !*** ../webext-instrumentation/build/module/schema.js ***!
  \********************************************************/
/*! exports provided: dateTimeUnicodeFormatString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateTimeUnicodeFormatString", function() { return dateTimeUnicodeFormatString; });
// https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
const dateTimeUnicodeFormatString = "yyyy-MM-dd'T'HH:mm:ss.SSSXX";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSwrRUFBK0U7QUFDL0UsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUcsNkJBQTZCLENBQUMifQ==

/***/ }),

/***/ "./feature.js/index.js":
/*!*****************************!*\
  !*** ./feature.js/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! openwpm-webext-instrumentation */ "../webext-instrumentation/build/module/index.js");
/* harmony import */ var _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loggingdb.js */ "./feature.js/loggingdb.js");




async function main() {
  // Read the browser configuration from file
  let filename = "browser_params.json";
  let config = await browser.profileDirIO.readFile(filename);
  if (config) {
    config = JSON.parse(config);
    console.log("Browser Config:", config);
  } else {
    config = {
      navigation_instrument:true,
      cookie_instrument:true,
      js_instrument:true,
      js_instrument_modules:"fingerprinting",
      http_instrument:true,
      save_content:false,
      testing:true,
      crawl_id:0
    };
    console.log("WARNING: config not found. Assuming this is a test run of",
                "the extension. Outputting all queries to console.", {config});
  }

  await _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["open"](config['aggregator_address'],
                       config['logger_address'],
                       config['crawl_id']);

  if (config["navigation_instrument"]) {
    _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["logDebug"]("Navigation instrumentation enabled");
    let navigationInstrument = new openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__["NavigationInstrument"](_loggingdb_js__WEBPACK_IMPORTED_MODULE_1__);
    navigationInstrument.run(config["crawl_id"]);
  }

  if (config['cookie_instrument']) {
    _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["logDebug"]("Cookie instrumentation enabled");
    let cookieInstrument = new openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__["CookieInstrument"](_loggingdb_js__WEBPACK_IMPORTED_MODULE_1__);
    cookieInstrument.run(config['crawl_id']);
  }

  if (config['js_instrument']) {
    _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["logDebug"]("Javascript instrumentation enabled");
    let jsInstrument = new openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__["JavascriptInstrument"](_loggingdb_js__WEBPACK_IMPORTED_MODULE_1__);
    jsInstrument.run(config['crawl_id']);
    await jsInstrument.registerContentScript(config['testing'], config['js_instrument_modules']);
  }

  if (config['http_instrument']) {
    _loggingdb_js__WEBPACK_IMPORTED_MODULE_1__["logDebug"]("HTTP Instrumentation enabled");
    let httpInstrument = new openwpm_webext_instrumentation__WEBPACK_IMPORTED_MODULE_0__["HttpInstrument"](_loggingdb_js__WEBPACK_IMPORTED_MODULE_1__);
    httpInstrument.run(config['crawl_id'],
                       config['save_content']);
  }
}

main();


/***/ }),

/***/ "./feature.js/loggingdb.js":
/*!*********************************!*\
  !*** ./feature.js/loggingdb.js ***!
  \*********************************/
/*! exports provided: open, close, logInfo, logDebug, logWarn, logError, logCritical, dataReceiver, saveRecord, saveContent, escapeString, boolToInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open", function() { return open; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "close", function() { return close; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logInfo", function() { return logInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logDebug", function() { return logDebug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logWarn", function() { return logWarn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logError", function() { return logError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logCritical", function() { return logCritical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataReceiver", function() { return dataReceiver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveRecord", function() { return saveRecord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveContent", function() { return saveContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeString", function() { return escapeString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boolToInt", function() { return boolToInt; });
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.js */ "./feature.js/socket.js");


let crawlID = null;
let visitID = null;
let debugging = false;
let dataAggregator = null;
let logAggregator = null;
let listeningSocket = null;

let open = async function(aggregatorAddress, logAddress, curr_crawlID) {
    if (aggregatorAddress == null && logAddress == null && curr_crawlID == '') {
        console.log("Debugging, everything will output to console");
        debugging = true;
        return;
    }
    crawlID = curr_crawlID;

    console.log("Opening socket connections...");

    // Connect to MPLogger for extension info/debug/error logging
    if (logAddress != null) {
        logAggregator = new _socket_js__WEBPACK_IMPORTED_MODULE_0__["SendingSocket"]();
        let rv = await logAggregator.connect(logAddress[0], logAddress[1]);
        console.log("logSocket started?", rv)
    }

    // Connect to databases for saving data
    if (aggregatorAddress != null) {
        dataAggregator = new _socket_js__WEBPACK_IMPORTED_MODULE_0__["SendingSocket"]();
        let rv = await dataAggregator.connect(aggregatorAddress[0], aggregatorAddress[1]);
        console.log("sqliteSocket started?",rv);
    }

    // Listen for incoming urls as visit ids
    listeningSocket = new _socket_js__WEBPACK_IMPORTED_MODULE_0__["ListeningSocket"]();
    console.log("Starting socket listening for incoming connections.");
    listeningSocket.startListening().then(() => {
        browser.profileDirIO.writeFile("extension_port.txt", `${listeningSocket.port}`);
    });
};

let close = function() {
    if (dataAggregator != null) {
        dataAggregator.close();
    }
    if (logAggregator != null) {
        logAggregator.close();
    }
};

let makeLogJSON = function(lvl, msg) {
    var log_json = {
        'name': 'Extension-Logger',
        'level': lvl,
        'pathname': 'FirefoxExtension',
        'lineno': 1,
        'msg': escapeString(msg),
        'args': null,
        'exc_info': null,
        'func': null
    }
    return log_json;
}

let logInfo = function(msg) {
    // Always log to browser console
    console.log(msg);

    if (debugging) {
        return;
    }

    // Log level INFO == 20 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(20, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let logDebug = function(msg) {
    // Always log to browser console
    console.log(msg);

    if (debugging) {
        return;
    }

    // Log level DEBUG == 10 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(10, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let logWarn = function(msg) {
    // Always log to browser console
    console.warn(msg);

    if (debugging) {
        return;
    }

    // Log level WARN == 30 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(30, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let logError = function(msg) {
    // Always log to browser console
    console.error(msg);

    if (debugging) {
        return;
    }

    // Log level INFO == 40 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(40, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let logCritical = function(msg) {
    // Always log to browser console
    console.error(msg);

    if (debugging) {
        return;
    }

    // Log level CRITICAL == 50 (https://docs.python.org/2/library/logging.html#logging-levels)
    var log_json = makeLogJSON(50, msg);
    logAggregator.send(JSON.stringify(['EXT', JSON.stringify(log_json)]));
};

let dataReceiver = {
    saveRecord(a, b) {
        console.log(b);
    },
};

let saveRecord = function(instrument, record) {
    // Add visit id if changed
    while (!debugging && listeningSocket.queue.length != 0) {
        visitID = listeningSocket.queue.shift();
        logDebug("Visit Id: " + visitID);
    }
    record["visit_id"] = parseInt(visitID, 10);


    if (!visitID && !debugging) {
        logCritical('Extension-' + crawlID + ' : visitID is null while attempting to insert ' +
                    JSON.stringify(record));
        record["visit_id"] = -1;
    }

    // send to console if debugging
    if (debugging) {
      console.log("EXTENSION", instrument, record);
      return;
    }
    dataAggregator.send(JSON.stringify([instrument, record]));
};

// Stub for now
let saveContent = async function(content, contentHash) {
  // Send page content to the data aggregator
  // deduplicated by contentHash in a levelDB database
  if (debugging) {
    console.log("LDB contentHash:",contentHash,"with length",content.length);
    return;
  }
  // Since the content might not be a valid utf8 string and it needs to be
  // json encoded later, it is encoded using base64 first.
  const b64 = Uint8ToBase64(content);
  dataAggregator.send(JSON.stringify(['page_content', [b64, contentHash]]));
};

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

// Base64 encoding, found on:
// https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/25644409#25644409
function Uint8ToBase64(u8Arr){
  var CHUNK_SIZE = 0x8000; //arbitrary number
  var index = 0;
  var length = u8Arr.length;
  var result = '';
  var slice;
  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return btoa(result);
}

let escapeString = function(string) {
    // Convert to string if necessary
    if(typeof string != "string")
        string = "" + string;

    return encode_utf8(string);
};

let boolToInt = function(bool) {
    return bool ? 1 : 0;
};


/***/ }),

/***/ "./feature.js/socket.js":
/*!******************************!*\
  !*** ./feature.js/socket.js ***!
  \******************************/
/*! exports provided: ListeningSocket, SendingSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListeningSocket", function() { return ListeningSocket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendingSocket", function() { return SendingSocket; });
let DataReceiver = {
  callbacks: new Map(),
  onDataReceived: (aSocketId, aData, aJSON) => {
    if (!DataReceiver.callbacks.has(aSocketId)) {
      return;
    }
    if (aJSON) {
      aData = JSON.parse(aData);
    }
    DataReceiver.callbacks.get(aSocketId)._updateQueue(aData);
  },
};

browser.sockets.onDataReceived.addListener(DataReceiver.onDataReceived);

let ListeningSockets = new Map();

class ListeningSocket {
  constructor() {
    this.queue = []; // stores messages sent to socket
  }

  async startListening() {
    this.port = await browser.sockets.createServerSocket();
    DataReceiver.callbacks.set(this.port, this);
    browser.sockets.startListening(this.port);
    console.log('Listening on port ' + this.port);
  }

  _updateQueue(data) {
    this.queue.push(data);
  }
}

class SendingSocket {
  constructor() {
  }

  async connect(host, port) {
    this.id = await browser.sockets.createSendingSocket();
    browser.sockets.connect(this.id, host, port);
    console.log(`Connected to ${host}:${port}`);
  }

  send(aData, aJSON=true) {
    try {
      browser.sockets.sendData(this.id, aData, !!aJSON);
      return true;
    } catch (err) {
      console.error(err,err.message);
      return false;
    }
  }

  close() {
    browser.sockets.close(this.id);
  }
}



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvY29va2llLWluc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2JhY2tncm91bmQvaHR0cC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uLi93ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9iYWNrZ3JvdW5kL2phdmFzY3JpcHQtaW5zdHJ1bWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvYmFja2dyb3VuZC9uYXZpZ2F0aW9uLWluc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2NvbnRlbnQvamF2YXNjcmlwdC1pbnN0cnVtZW50LWNvbnRlbnQtc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2NvbnRlbnQvamF2YXNjcmlwdC1pbnN0cnVtZW50LXBhZ2Utc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uLi93ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbC5qcyIsIndlYnBhY2s6Ly8vLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL2V4dGVuc2lvbi1zZXNzaW9uLXV1aWQuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9odHRwLXBvc3QtcGFyc2VyLmpzIiwid2VicGFjazovLy8uLi93ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvaW5zdHJ1bWVudC1maW5nZXJwcmludGluZy1hcGlzLmpzIiwid2VicGFjazovLy8uLi93ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvanMtaW5zdHJ1bWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9wZW5kaW5nLW5hdmlnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9wZW5kaW5nLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL2xpYi9wZW5kaW5nLXJlc3BvbnNlLmpzIiwid2VicGFjazovLy8uLi93ZWJleHQtaW5zdHJ1bWVudGF0aW9uL2J1aWxkL21vZHVsZS9saWIvcmVzcG9uc2UtYm9keS1saXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly8vLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3N0cmluZy11dGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vd2ViZXh0LWluc3RydW1lbnRhdGlvbi9idWlsZC9tb2R1bGUvbGliL3V1aWQuanMiLCJ3ZWJwYWNrOi8vLy4uL3dlYmV4dC1pbnN0cnVtZW50YXRpb24vYnVpbGQvbW9kdWxlL3NjaGVtYS5qcyIsIndlYnBhY2s6Ly8vLi9mZWF0dXJlLmpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2ZlYXR1cmUuanMvbG9nZ2luZ2RiLmpzIiwid2VicGFjazovLy8uL2ZlYXR1cmUuanMvc29ja2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDJCQUEyQiw4QkFBOEI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsMkJBQTJCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLDJCQUEyQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdGQUF3RjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsMkNBQTJDLHVxckI7Ozs7Ozs7Ozs7OztBQzFtQjNDO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsK2dDOzs7Ozs7Ozs7Ozs7QUMvQjNDO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsdWdDOzs7Ozs7Ozs7Ozs7QUMvQjNDO0FBQUE7QUFBQTtBQUFnRTtBQUNoRTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBOztBQUVPO0FBQ1A7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsS0FBSyxHQUFHLEtBQUs7QUFDN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZmVhdHVyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZmVhdHVyZS5qcy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCB7IGluY3JlbWVudGVkRXZlbnRPcmRpbmFsIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi1ldmVudC1vcmRpbmFsXCI7XG5pbXBvcnQgeyBleHRlbnNpb25TZXNzaW9uVXVpZCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tdXVpZFwiO1xuaW1wb3J0IHsgYm9vbFRvSW50LCBlc2NhcGVTdHJpbmcgfSBmcm9tIFwiLi4vbGliL3N0cmluZy11dGlsc1wiO1xuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybUNvb2tpZU9iamVjdFRvTWF0Y2hPcGVuV1BNU2NoZW1hID0gKGNvb2tpZSkgPT4ge1xuICAgIGNvbnN0IGphdmFzY3JpcHRDb29raWUgPSB7fTtcbiAgICAvLyBFeHBpcnkgdGltZSAoaW4gc2Vjb25kcylcbiAgICAvLyBNYXkgcmV0dXJuIH5NYXgoaW50NjQpLiBJIGJlbGlldmUgdGhpcyBpcyBhIHNlc3Npb25cbiAgICAvLyBjb29raWUgd2hpY2ggZG9lc24ndCBleHBpcmUuIFNlc3Npb25zIGNvb2tpZXMgd2l0aFxuICAgIC8vIG5vbi1tYXggZXhwaXJ5IHRpbWUgZXhwaXJlIGFmdGVyIHNlc3Npb24gb3IgYXQgZXhwaXJ5LlxuICAgIGNvbnN0IGV4cGlyeVRpbWUgPSBjb29raWUuZXhwaXJhdGlvbkRhdGU7IC8vIHJldHVybnMgc2Vjb25kc1xuICAgIGxldCBleHBpcnlUaW1lU3RyaW5nO1xuICAgIGNvbnN0IG1heEludDY0ID0gOTIyMzM3MjAzNjg1NDc3NjAwMDtcbiAgICBpZiAoIWNvb2tpZS5leHBpcmF0aW9uRGF0ZSB8fCBleHBpcnlUaW1lID09PSBtYXhJbnQ2NCkge1xuICAgICAgICBleHBpcnlUaW1lU3RyaW5nID0gXCI5OTk5LTEyLTMxVDIxOjU5OjU5LjAwMFpcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGV4cGlyeVRpbWVEYXRlID0gbmV3IERhdGUoZXhwaXJ5VGltZSAqIDEwMDApOyAvLyByZXF1aXJlcyBtaWxsaXNlY29uZHNcbiAgICAgICAgZXhwaXJ5VGltZVN0cmluZyA9IGV4cGlyeVRpbWVEYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIGphdmFzY3JpcHRDb29raWUuZXhwaXJ5ID0gZXhwaXJ5VGltZVN0cmluZztcbiAgICBqYXZhc2NyaXB0Q29va2llLmlzX2h0dHBfb25seSA9IGJvb2xUb0ludChjb29raWUuaHR0cE9ubHkpO1xuICAgIGphdmFzY3JpcHRDb29raWUuaXNfaG9zdF9vbmx5ID0gYm9vbFRvSW50KGNvb2tpZS5ob3N0T25seSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5pc19zZXNzaW9uID0gYm9vbFRvSW50KGNvb2tpZS5zZXNzaW9uKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLmhvc3QgPSBlc2NhcGVTdHJpbmcoY29va2llLmRvbWFpbik7XG4gICAgamF2YXNjcmlwdENvb2tpZS5pc19zZWN1cmUgPSBib29sVG9JbnQoY29va2llLnNlY3VyZSk7XG4gICAgamF2YXNjcmlwdENvb2tpZS5uYW1lID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5uYW1lKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnBhdGggPSBlc2NhcGVTdHJpbmcoY29va2llLnBhdGgpO1xuICAgIGphdmFzY3JpcHRDb29raWUudmFsdWUgPSBlc2NhcGVTdHJpbmcoY29va2llLnZhbHVlKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnNhbWVfc2l0ZSA9IGVzY2FwZVN0cmluZyhjb29raWUuc2FtZVNpdGUpO1xuICAgIGphdmFzY3JpcHRDb29raWUuZmlyc3RfcGFydHlfZG9tYWluID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5maXJzdFBhcnR5RG9tYWluKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnN0b3JlX2lkID0gZXNjYXBlU3RyaW5nKGNvb2tpZS5zdG9yZUlkKTtcbiAgICBqYXZhc2NyaXB0Q29va2llLnRpbWVfc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgcmV0dXJuIGphdmFzY3JpcHRDb29raWU7XG59O1xuZXhwb3J0IGNsYXNzIENvb2tpZUluc3RydW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgcnVuKGNyYXdsSUQpIHtcbiAgICAgICAgLy8gSW5zdHJ1bWVudCBjb29raWUgY2hhbmdlc1xuICAgICAgICB0aGlzLm9uQ2hhbmdlZExpc3RlbmVyID0gYXN5bmMgKGNoYW5nZUluZm8pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IGNoYW5nZUluZm8ucmVtb3ZlZCA/IFwiZGVsZXRlZFwiIDogXCJhZGRlZC1vci1jaGFuZ2VkXCI7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGUgPSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkX3R5cGU6IGV2ZW50VHlwZSxcbiAgICAgICAgICAgICAgICBjaGFuZ2VfY2F1c2U6IGNoYW5nZUluZm8uY2F1c2UsXG4gICAgICAgICAgICAgICAgY3Jhd2xfaWQ6IGNyYXdsSUQsXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uX3Nlc3Npb25fdXVpZDogZXh0ZW5zaW9uU2Vzc2lvblV1aWQsXG4gICAgICAgICAgICAgICAgZXZlbnRfb3JkaW5hbDogaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKSxcbiAgICAgICAgICAgICAgICAuLi50cmFuc2Zvcm1Db29raWVPYmplY3RUb01hdGNoT3BlbldQTVNjaGVtYShjaGFuZ2VJbmZvLmNvb2tpZSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImphdmFzY3JpcHRfY29va2llc1wiLCB1cGRhdGUpO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLmNvb2tpZXMub25DaGFuZ2VkLmFkZExpc3RlbmVyKHRoaXMub25DaGFuZ2VkTGlzdGVuZXIpO1xuICAgIH1cbiAgICBhc3luYyBzYXZlQWxsQ29va2llcyhjcmF3bElEKSB7XG4gICAgICAgIGNvbnN0IGFsbENvb2tpZXMgPSBhd2FpdCBicm93c2VyLmNvb2tpZXMuZ2V0QWxsKHt9KTtcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoYWxsQ29va2llcy5tYXAoKGNvb2tpZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlID0ge1xuICAgICAgICAgICAgICAgIHJlY29yZF90eXBlOiBcIm1hbnVhbC1leHBvcnRcIixcbiAgICAgICAgICAgICAgICBjcmF3bF9pZDogY3Jhd2xJRCxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25fc2Vzc2lvbl91dWlkOiBleHRlbnNpb25TZXNzaW9uVXVpZCxcbiAgICAgICAgICAgICAgICAuLi50cmFuc2Zvcm1Db29raWVPYmplY3RUb01hdGNoT3BlbldQTVNjaGVtYShjb29raWUpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiamF2YXNjcmlwdF9jb29raWVzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25DaGFuZ2VkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIuY29va2llcy5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkNoYW5nZWRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMjl2YTJsbExXbHVjM1J5ZFcxbGJuUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTh1TGk5emNtTXZZbUZqYTJkeWIzVnVaQzlqYjI5cmFXVXRhVzV6ZEhKMWJXVnVkQzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeFBRVUZQTEVWQlFVVXNkVUpCUVhWQ0xFVkJRVVVzVFVGQlRTeDNRMEZCZDBNc1EwRkJRenRCUVVOcVJpeFBRVUZQTEVWQlFVVXNiMEpCUVc5Q0xFVkJRVVVzVFVGQlRTd3JRa0ZCSzBJc1EwRkJRenRCUVVOeVJTeFBRVUZQTEVWQlFVVXNVMEZCVXl4RlFVRkZMRmxCUVZrc1JVRkJSU3hOUVVGTkxIRkNRVUZ4UWl4RFFVRkRPMEZCU3psRUxFMUJRVTBzUTBGQlF5eE5RVUZOTEhsRFFVRjVReXhIUVVGSExFTkJRVU1zVFVGQll5eEZRVUZGTEVWQlFVVTdTVUZETVVVc1RVRkJUU3huUWtGQlowSXNSMEZCUnl4RlFVRnpRaXhEUVVGRE8wbEJSV2hFTERKQ1FVRXlRanRKUVVNelFpeHpSRUZCYzBRN1NVRkRkRVFzY1VSQlFYRkVPMGxCUTNKRUxIbEVRVUY1UkR0SlFVTjZSQ3hOUVVGTkxGVkJRVlVzUjBGQlJ5eE5RVUZOTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNc2EwSkJRV3RDTzBsQlF6VkVMRWxCUVVrc1owSkJRV2RDTEVOQlFVTTdTVUZEY2tJc1RVRkJUU3hSUVVGUkxFZEJRVWNzYlVKQlFXMUNMRU5CUVVNN1NVRkRja01zU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXl4alFVRmpMRWxCUVVrc1ZVRkJWU3hMUVVGTExGRkJRVkVzUlVGQlJUdFJRVU55UkN4blFrRkJaMElzUjBGQlJ5d3dRa0ZCTUVJc1EwRkJRenRMUVVNdlF6dFRRVUZOTzFGQlEwd3NUVUZCVFN4alFVRmpMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc2QwSkJRWGRDTzFGQlF6VkZMR2RDUVVGblFpeEhRVUZITEdOQlFXTXNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRMUVVOcVJEdEpRVU5FTEdkQ1FVRm5RaXhEUVVGRExFMUJRVTBzUjBGQlJ5eG5Ra0ZCWjBJc1EwRkJRenRKUVVNelF5eG5Ra0ZCWjBJc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNelJDeG5Ra0ZCWjBJc1EwRkJReXhaUVVGWkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNelJDeG5Ra0ZCWjBJc1EwRkJReXhWUVVGVkxFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRKUVVWNFJDeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVOd1JDeG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFZEJRVWNzVTBGQlV5eERRVUZETEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVOMFJDeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOc1JDeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOc1JDeG5Ra0ZCWjBJc1EwRkJReXhMUVVGTExFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRKUVVOd1JDeG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFZEJRVWNzV1VGQldTeERRVUZETEUxQlFVMHNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRKUVVNelJDeG5Ra0ZCWjBJc1EwRkJReXhyUWtGQmEwSXNSMEZCUnl4WlFVRlpMRU5CUVVNc1RVRkJUU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRU5CUVVNN1NVRkROVVVzWjBKQlFXZENMRU5CUVVNc1VVRkJVU3hIUVVGSExGbEJRVmtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkZla1FzWjBKQlFXZENMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzU1VGQlNTeEZRVUZGTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1NVRkZka1FzVDBGQlR5eG5Ra0ZCWjBJc1EwRkJRenRCUVVNeFFpeERRVUZETEVOQlFVTTdRVUZGUml4TlFVRk5MRTlCUVU4c1owSkJRV2RDTzBsQlNUTkNMRmxCUVZrc1dVRkJXVHRSUVVOMFFpeEpRVUZKTEVOQlFVTXNXVUZCV1N4SFFVRkhMRmxCUVZrc1EwRkJRenRKUVVOdVF5eERRVUZETzBsQlJVMHNSMEZCUnl4RFFVRkRMRTlCUVU4N1VVRkRhRUlzTkVKQlFUUkNPMUZCUXpWQ0xFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1IwRkJSeXhMUVVGTExFVkJRVVVzVlVGUEwwSXNSVUZCUlN4RlFVRkZPMWxCUTBnc1RVRkJUU3hUUVVGVExFZEJRVWNzVlVGQlZTeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF5eHJRa0ZCYTBJc1EwRkJRenRaUVVOMFJTeE5RVUZOTEUxQlFVMHNSMEZCTWtJN1owSkJRM0pETEZkQlFWY3NSVUZCUlN4VFFVRlRPMmRDUVVOMFFpeFpRVUZaTEVWQlFVVXNWVUZCVlN4RFFVRkRMRXRCUVVzN1owSkJRemxDTEZGQlFWRXNSVUZCUlN4UFFVRlBPMmRDUVVOcVFpeHpRa0ZCYzBJc1JVRkJSU3h2UWtGQmIwSTdaMEpCUXpWRExHRkJRV0VzUlVGQlJTeDFRa0ZCZFVJc1JVRkJSVHRuUWtGRGVFTXNSMEZCUnl4NVEwRkJlVU1zUTBGQlF5eFZRVUZWTEVOQlFVTXNUVUZCVFN4RFFVRkRPMkZCUTJoRkxFTkJRVU03V1VGRFJpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRlZCUVZVc1EwRkJReXh2UWtGQmIwSXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRSUVVNM1JDeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTTdTVUZEYUVVc1EwRkJRenRKUVVWTkxFdEJRVXNzUTBGQlF5eGpRVUZqTEVOQlFVTXNUMEZCVHp0UlFVTnFReXhOUVVGTkxGVkJRVlVzUjBGQlJ5eE5RVUZOTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1RVRkJUU3hEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETzFGQlEzQkVMRTFCUVUwc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGRFppeFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1RVRkJZeXhGUVVGRkxFVkJRVVU3V1VGRGFFTXNUVUZCVFN4TlFVRk5MRWRCUVRKQ08yZENRVU55UXl4WFFVRlhMRVZCUVVVc1pVRkJaVHRuUWtGRE5VSXNVVUZCVVN4RlFVRkZMRTlCUVU4N1owSkJRMnBDTEhOQ1FVRnpRaXhGUVVGRkxHOUNRVUZ2UWp0blFrRkROVU1zUjBGQlJ5eDVRMEZCZVVNc1EwRkJReXhOUVVGTkxFTkJRVU03WVVGRGNrUXNRMEZCUXp0WlFVTkdMRTlCUVU4c1NVRkJTU3hEUVVGRExGbEJRVmtzUTBGQlF5eFZRVUZWTEVOQlFVTXNiMEpCUVc5Q0xFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdVVUZEY0VVc1EwRkJReXhEUVVGRExFTkJRMGdzUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGVFN4UFFVRlBPMUZCUTFvc1NVRkJTU3hKUVVGSkxFTkJRVU1zYVVKQlFXbENMRVZCUVVVN1dVRkRNVUlzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVGRE8xTkJRMnhGTzBsQlEwZ3NRMEZCUXp0RFFVTkdJbjA9IiwiaW1wb3J0IHsgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLWV2ZW50LW9yZGluYWxcIjtcbmltcG9ydCB7IGV4dGVuc2lvblNlc3Npb25VdWlkIH0gZnJvbSBcIi4uL2xpYi9leHRlbnNpb24tc2Vzc2lvbi11dWlkXCI7XG5pbXBvcnQgeyBIdHRwUG9zdFBhcnNlciB9IGZyb20gXCIuLi9saWIvaHR0cC1wb3N0LXBhcnNlclwiO1xuaW1wb3J0IHsgUGVuZGluZ1JlcXVlc3QgfSBmcm9tIFwiLi4vbGliL3BlbmRpbmctcmVxdWVzdFwiO1xuaW1wb3J0IHsgUGVuZGluZ1Jlc3BvbnNlIH0gZnJvbSBcIi4uL2xpYi9wZW5kaW5nLXJlc3BvbnNlXCI7XG5pbXBvcnQgeyBib29sVG9JbnQsIGVzY2FwZVN0cmluZywgZXNjYXBlVXJsIH0gZnJvbSBcIi4uL2xpYi9zdHJpbmctdXRpbHNcIjtcbi8qKlxuICogTm90ZTogRGlmZmVyZW50IHBhcnRzIG9mIHRoZSBkZXNpcmVkIGluZm9ybWF0aW9uIGFycml2ZXMgaW4gZGlmZmVyZW50IGV2ZW50cyBhcyBwZXIgYmVsb3c6XG4gKiByZXF1ZXN0ID0gaGVhZGVycyBpbiBvbkJlZm9yZVNlbmRIZWFkZXJzICsgYm9keSBpbiBvbkJlZm9yZVJlcXVlc3RcbiAqIHJlc3BvbnNlID0gaGVhZGVycyBpbiBvbkNvbXBsZXRlZCArIGJvZHkgdmlhIGEgb25CZWZvcmVSZXF1ZXN0IGZpbHRlclxuICogcmVkaXJlY3QgPSBvcmlnaW5hbCByZXF1ZXN0IGhlYWRlcnMrYm9keSwgZm9sbG93ZWQgYnkgYSBvbkJlZm9yZVJlZGlyZWN0IGFuZCB0aGVuIGEgbmV3IHNldCBvZiByZXF1ZXN0IGhlYWRlcnMrYm9keSBhbmQgcmVzcG9uc2UgaGVhZGVycytib2R5XG4gKiBEb2NzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1VzZXI6d2JhbWJlcmcvd2ViUmVxdWVzdC5SZXF1ZXN0RGV0YWlsc1xuICovXG5leHBvcnQgY2xhc3MgSHR0cEluc3RydW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLnBlbmRpbmdSZXF1ZXN0cyA9IHt9O1xuICAgICAgICB0aGlzLnBlbmRpbmdSZXNwb25zZXMgPSB7fTtcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIgPSBkYXRhUmVjZWl2ZXI7XG4gICAgfVxuICAgIHJ1bihjcmF3bElELCBzYXZlQ29udGVudE9wdGlvbikge1xuICAgICAgICBjb25zdCBhbGxUeXBlcyA9IFtcbiAgICAgICAgICAgIFwiYmVhY29uXCIsXG4gICAgICAgICAgICBcImNzcF9yZXBvcnRcIixcbiAgICAgICAgICAgIFwiZm9udFwiLFxuICAgICAgICAgICAgXCJpbWFnZVwiLFxuICAgICAgICAgICAgXCJpbWFnZXNldFwiLFxuICAgICAgICAgICAgXCJtYWluX2ZyYW1lXCIsXG4gICAgICAgICAgICBcIm1lZGlhXCIsXG4gICAgICAgICAgICBcIm9iamVjdFwiLFxuICAgICAgICAgICAgXCJvYmplY3Rfc3VicmVxdWVzdFwiLFxuICAgICAgICAgICAgXCJwaW5nXCIsXG4gICAgICAgICAgICBcInNjcmlwdFwiLFxuICAgICAgICAgICAgLy8gXCJzcGVjdWxhdGl2ZVwiLFxuICAgICAgICAgICAgXCJzdHlsZXNoZWV0XCIsXG4gICAgICAgICAgICBcInN1Yl9mcmFtZVwiLFxuICAgICAgICAgICAgXCJ3ZWJfbWFuaWZlc3RcIixcbiAgICAgICAgICAgIFwid2Vic29ja2V0XCIsXG4gICAgICAgICAgICBcInhibFwiLFxuICAgICAgICAgICAgXCJ4bWxfZHRkXCIsXG4gICAgICAgICAgICBcInhtbGh0dHByZXF1ZXN0XCIsXG4gICAgICAgICAgICBcInhzbHRcIixcbiAgICAgICAgICAgIFwib3RoZXJcIixcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgZmlsdGVyID0geyB1cmxzOiBbXCI8YWxsX3VybHM+XCJdLCB0eXBlczogYWxsVHlwZXMgfTtcbiAgICAgICAgY29uc3QgcmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbiA9IGRldGFpbHMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChkZXRhaWxzLm9yaWdpblVybCAmJiBkZXRhaWxzLm9yaWdpblVybC5pbmRleE9mKFwibW96LWV4dGVuc2lvbjovL1wiKSA+IC0xKTtcbiAgICAgICAgfTtcbiAgICAgICAgLypcbiAgICAgICAgICogQXR0YWNoIGhhbmRsZXJzIHRvIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlcXVlc3RMaXN0ZW5lciA9IChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBibG9ja2luZ1Jlc3BvbnNlVGhhdERvZXNOb3RoaW5nID0ge307XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBibG9ja2luZ1Jlc3BvbnNlVGhhdERvZXNOb3RoaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGVuZGluZ1JlcXVlc3QgPSB0aGlzLmdldFBlbmRpbmdSZXF1ZXN0KGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIHBlbmRpbmdSZXF1ZXN0LnJlc29sdmVPbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMoZGV0YWlscyk7XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nUmVzcG9uc2UgPSB0aGlzLmdldFBlbmRpbmdSZXNwb25zZShkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgICAgICBwZW5kaW5nUmVzcG9uc2UucmVzb2x2ZU9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyhkZXRhaWxzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3VsZFNhdmVDb250ZW50KHNhdmVDb250ZW50T3B0aW9uLCBkZXRhaWxzLnR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1Jlc3BvbnNlLmFkZFJlc3BvbnNlUmVzcG9uc2VCb2R5TGlzdGVuZXIoZGV0YWlscyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmxvY2tpbmdSZXNwb25zZVRoYXREb2VzTm90aGluZztcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlUmVxdWVzdC5hZGRMaXN0ZW5lcih0aGlzLm9uQmVmb3JlUmVxdWVzdExpc3RlbmVyLCBmaWx0ZXIsIHRoaXMuaXNDb250ZW50U2F2aW5nRW5hYmxlZChzYXZlQ29udGVudE9wdGlvbilcbiAgICAgICAgICAgID8gW1wicmVxdWVzdEJvZHlcIiwgXCJibG9ja2luZ1wiXVxuICAgICAgICAgICAgOiBbXCJyZXF1ZXN0Qm9keVwiXSk7XG4gICAgICAgIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyID0gZGV0YWlscyA9PiB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdSZXF1ZXN0ID0gdGhpcy5nZXRQZW5kaW5nUmVxdWVzdChkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgICAgICBwZW5kaW5nUmVxdWVzdC5yZXNvbHZlT25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyhkZXRhaWxzKTtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0hhbmRsZXIoZGV0YWlscywgY3Jhd2xJRCwgaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKSk7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVNlbmRIZWFkZXJzLmFkZExpc3RlbmVyKHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyLCBmaWx0ZXIsIFtcInJlcXVlc3RIZWFkZXJzXCJdKTtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVJlZGlyZWN0TGlzdGVuZXIgPSBkZXRhaWxzID0+IHtcbiAgICAgICAgICAgIC8vIElnbm9yZSByZXF1ZXN0cyBtYWRlIGJ5IGV4dGVuc2lvbnNcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0U3RlbXNGcm9tRXh0ZW5zaW9uKGRldGFpbHMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVJlZGlyZWN0SGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQmVmb3JlUmVkaXJlY3QuYWRkTGlzdGVuZXIodGhpcy5vbkJlZm9yZVJlZGlyZWN0TGlzdGVuZXIsIGZpbHRlciwgW1wicmVzcG9uc2VIZWFkZXJzXCJdKTtcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlZExpc3RlbmVyID0gZGV0YWlscyA9PiB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgcmVxdWVzdHMgbWFkZSBieSBleHRlbnNpb25zXG4gICAgICAgICAgICBpZiAocmVxdWVzdFN0ZW1zRnJvbUV4dGVuc2lvbihkZXRhaWxzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdSZXNwb25zZSA9IHRoaXMuZ2V0UGVuZGluZ1Jlc3BvbnNlKGRldGFpbHMucmVxdWVzdElkKTtcbiAgICAgICAgICAgIHBlbmRpbmdSZXNwb25zZS5yZXNvbHZlT25Db21wbGV0ZWRFdmVudERldGFpbHMoZGV0YWlscyk7XG4gICAgICAgICAgICB0aGlzLm9uQ29tcGxldGVkSGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpLCBzYXZlQ29udGVudE9wdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkNvbXBsZXRlZC5hZGRMaXN0ZW5lcih0aGlzLm9uQ29tcGxldGVkTGlzdGVuZXIsIGZpbHRlciwgW1wicmVzcG9uc2VIZWFkZXJzXCJdKTtcbiAgICB9XG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVSZXF1ZXN0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViUmVxdWVzdC5vbkJlZm9yZVJlcXVlc3QucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkJlZm9yZVJlcXVlc3RMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVTZW5kSGVhZGVycy5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25CZWZvcmVSZWRpcmVjdExpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYlJlcXVlc3Qub25CZWZvcmVSZWRpcmVjdC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uQmVmb3JlUmVkaXJlY3RMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub25Db21wbGV0ZWRMaXN0ZW5lcikge1xuICAgICAgICAgICAgYnJvd3Nlci53ZWJSZXF1ZXN0Lm9uQ29tcGxldGVkLnJlbW92ZUxpc3RlbmVyKHRoaXMub25Db21wbGV0ZWRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNDb250ZW50U2F2aW5nRW5hYmxlZChzYXZlQ29udGVudE9wdGlvbikge1xuICAgICAgICBpZiAoc2F2ZUNvbnRlbnRPcHRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYXZlQ29udGVudE9wdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zYXZlQ29udGVudFJlc291cmNlVHlwZXMoc2F2ZUNvbnRlbnRPcHRpb24pLmxlbmd0aCA+IDA7XG4gICAgfVxuICAgIHNhdmVDb250ZW50UmVzb3VyY2VUeXBlcyhzYXZlQ29udGVudE9wdGlvbikge1xuICAgICAgICByZXR1cm4gc2F2ZUNvbnRlbnRPcHRpb24uc3BsaXQoXCIsXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXZSByZWx5IG9uIHRoZSByZXNvdXJjZSB0eXBlIHRvIGZpbHRlciByZXNwb25zZXNcbiAgICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvTW96aWxsYS9BZGQtb25zL1dlYkV4dGVuc2lvbnMvQVBJL3dlYlJlcXVlc3QvUmVzb3VyY2VUeXBlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2F2ZUNvbnRlbnRPcHRpb25cbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VUeXBlXG4gICAgICovXG4gICAgc2hvdWxkU2F2ZUNvbnRlbnQoc2F2ZUNvbnRlbnRPcHRpb24sIHJlc291cmNlVHlwZSkge1xuICAgICAgICBpZiAoc2F2ZUNvbnRlbnRPcHRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYXZlQ29udGVudE9wdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zYXZlQ29udGVudFJlc291cmNlVHlwZXMoc2F2ZUNvbnRlbnRPcHRpb24pLmluY2x1ZGVzKHJlc291cmNlVHlwZSk7XG4gICAgfVxuICAgIGdldFBlbmRpbmdSZXF1ZXN0KHJlcXVlc3RJZCkge1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF0pIHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ1JlcXVlc3RzW3JlcXVlc3RJZF0gPSBuZXcgUGVuZGluZ1JlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nUmVxdWVzdHNbcmVxdWVzdElkXTtcbiAgICB9XG4gICAgZ2V0UGVuZGluZ1Jlc3BvbnNlKHJlcXVlc3RJZCkge1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ1Jlc3BvbnNlc1tyZXF1ZXN0SWRdKSB7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdSZXNwb25zZXNbcmVxdWVzdElkXSA9IG5ldyBQZW5kaW5nUmVzcG9uc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wZW5kaW5nUmVzcG9uc2VzW3JlcXVlc3RJZF07XG4gICAgfVxuICAgIC8qXG4gICAgICogSFRUUCBSZXF1ZXN0IEhhbmRsZXIgYW5kIEhlbHBlciBGdW5jdGlvbnNcbiAgICAgKi9cbiAgICAvKlxuICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIGNvcnJlc3BvbmRpbmcgd2ViZXh0IGxvZ2ljIG9yIGRpc2NhcmRcbiAgICBwcml2YXRlIGdldF9zdGFja190cmFjZV9zdHIoKSB7XG4gICAgICAvLyByZXR1cm4gdGhlIHN0YWNrIHRyYWNlIGFzIGEgc3RyaW5nXG4gICAgICAvLyBUT0RPOiBjaGVjayBpZiBodHRwLW9uLW1vZGlmeS1yZXF1ZXN0IGlzIGEgZ29vZCBwbGFjZSB0byBjYXB0dXJlIHRoZSBzdGFja1xuICAgICAgLy8gSW4gdGhlIG1hbnVhbCB0ZXN0cyB3ZSBjb3VsZCBjYXB0dXJlIGV4YWN0bHkgdGhlIHNhbWUgdHJhY2UgYXMgdGhlXG4gICAgICAvLyBcIkNhdXNlXCIgY29sdW1uIG9mIHRoZSBkZXZ0b29scyBuZXR3b3JrIHBhbmVsLlxuICAgICAgY29uc3Qgc3RhY2t0cmFjZSA9IFtdO1xuICAgICAgbGV0IGZyYW1lID0gY29tcG9uZW50cy5zdGFjaztcbiAgICAgIGlmIChmcmFtZSAmJiBmcmFtZS5jYWxsZXIpIHtcbiAgICAgICAgLy8gaW50ZXJuYWwvY2hyb21lIGNhbGxlcnMgb2NjdXB5IHRoZSBmaXJzdCB0aHJlZSBmcmFtZXMsIHBvcCB0aGVtIVxuICAgICAgICBmcmFtZSA9IGZyYW1lLmNhbGxlci5jYWxsZXIuY2FsbGVyO1xuICAgICAgICB3aGlsZSAoZnJhbWUpIHtcbiAgICAgICAgICAvLyBjaHJvbWUgc2NyaXB0cyBhcHBlYXIgYXMgY2FsbGVycyBpbiBzb21lIGNhc2VzLCBmaWx0ZXIgdGhlbSBvdXRcbiAgICAgICAgICBjb25zdCBzY2hlbWUgPSBmcmFtZS5maWxlbmFtZS5zcGxpdChcIjovL1wiKVswXTtcbiAgICAgICAgICBpZiAoW1wicmVzb3VyY2VcIiwgXCJjaHJvbWVcIiwgXCJmaWxlXCJdLmluZGV4T2Yoc2NoZW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBjaHJvbWUgc2NyaXB0c1xuICAgICAgICAgICAgc3RhY2t0cmFjZS5wdXNoKFxuICAgICAgICAgICAgICBmcmFtZS5uYW1lICtcbiAgICAgICAgICAgICAgICBcIkBcIiArXG4gICAgICAgICAgICAgICAgZnJhbWUuZmlsZW5hbWUgK1xuICAgICAgICAgICAgICAgIFwiOlwiICtcbiAgICAgICAgICAgICAgICBmcmFtZS5saW5lTnVtYmVyICtcbiAgICAgICAgICAgICAgICBcIjpcIiArXG4gICAgICAgICAgICAgICAgZnJhbWUuY29sdW1uTnVtYmVyICtcbiAgICAgICAgICAgICAgICBcIjtcIiArXG4gICAgICAgICAgICAgICAgZnJhbWUuYXN5bmNDYXVzZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZyYW1lID0gZnJhbWUuY2FsbGVyIHx8IGZyYW1lLmFzeW5jQ2FsbGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhY2t0cmFjZS5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgICAqL1xuICAgIGFzeW5jIG9uQmVmb3JlU2VuZEhlYWRlcnNIYW5kbGVyKGRldGFpbHMsIGNyYXdsSUQsIGV2ZW50T3JkaW5hbCkge1xuICAgICAgICAvKlxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBcIm9uQmVmb3JlU2VuZEhlYWRlcnNIYW5kbGVyIChwcmV2aW91c2x5IGh0dHBSZXF1ZXN0SGFuZGxlcilcIixcbiAgICAgICAgICBkZXRhaWxzLFxuICAgICAgICAgIGNyYXdsSUQsXG4gICAgICAgICk7XG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IHRhYiA9IGRldGFpbHMudGFiSWQgPiAtMVxuICAgICAgICAgICAgPyBhd2FpdCBicm93c2VyLnRhYnMuZ2V0KGRldGFpbHMudGFiSWQpXG4gICAgICAgICAgICA6IHsgd2luZG93SWQ6IHVuZGVmaW5lZCwgaW5jb2duaXRvOiB1bmRlZmluZWQsIHVybDogdW5kZWZpbmVkIH07XG4gICAgICAgIGNvbnN0IHVwZGF0ZSA9IHt9O1xuICAgICAgICB1cGRhdGUuaW5jb2duaXRvID0gYm9vbFRvSW50KHRhYi5pbmNvZ25pdG8pO1xuICAgICAgICB1cGRhdGUuY3Jhd2xfaWQgPSBjcmF3bElEO1xuICAgICAgICB1cGRhdGUuZXh0ZW5zaW9uX3Nlc3Npb25fdXVpZCA9IGV4dGVuc2lvblNlc3Npb25VdWlkO1xuICAgICAgICB1cGRhdGUuZXZlbnRfb3JkaW5hbCA9IGV2ZW50T3JkaW5hbDtcbiAgICAgICAgdXBkYXRlLndpbmRvd19pZCA9IHRhYi53aW5kb3dJZDtcbiAgICAgICAgdXBkYXRlLnRhYl9pZCA9IGRldGFpbHMudGFiSWQ7XG4gICAgICAgIHVwZGF0ZS5mcmFtZV9pZCA9IGRldGFpbHMuZnJhbWVJZDtcbiAgICAgICAgLy8gcmVxdWVzdElkIGlzIGEgdW5pcXVlIGlkZW50aWZpZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBsaW5rIHJlcXVlc3RzIGFuZCByZXNwb25zZXNcbiAgICAgICAgdXBkYXRlLnJlcXVlc3RfaWQgPSBkZXRhaWxzLnJlcXVlc3RJZDtcbiAgICAgICAgLy8gY29uc3Qgc3RhY2t0cmFjZV9zdHIgPSBnZXRfc3RhY2tfdHJhY2Vfc3RyKCk7XG4gICAgICAgIC8vIHVwZGF0ZS5yZXFfY2FsbF9zdGFjayA9IGVzY2FwZVN0cmluZyhzdGFja3RyYWNlX3N0cik7XG4gICAgICAgIGNvbnN0IHVybCA9IGRldGFpbHMudXJsO1xuICAgICAgICB1cGRhdGUudXJsID0gZXNjYXBlVXJsKHVybCk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RNZXRob2QgPSBkZXRhaWxzLm1ldGhvZDtcbiAgICAgICAgdXBkYXRlLm1ldGhvZCA9IGVzY2FwZVN0cmluZyhyZXF1ZXN0TWV0aG9kKTtcbiAgICAgICAgY29uc3QgY3VycmVudF90aW1lID0gbmV3IERhdGUoZGV0YWlscy50aW1lU3RhbXApO1xuICAgICAgICB1cGRhdGUudGltZV9zdGFtcCA9IGN1cnJlbnRfdGltZS50b0lTT1N0cmluZygpO1xuICAgICAgICBsZXQgZW5jb2RpbmdUeXBlID0gXCJcIjtcbiAgICAgICAgbGV0IHJlZmVycmVyID0gXCJcIjtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IFtdO1xuICAgICAgICBsZXQgaXNPY3NwID0gZmFsc2U7XG4gICAgICAgIGlmIChkZXRhaWxzLnJlcXVlc3RIZWFkZXJzKSB7XG4gICAgICAgICAgICBkZXRhaWxzLnJlcXVlc3RIZWFkZXJzLm1hcChyZXF1ZXN0SGVhZGVyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSByZXF1ZXN0SGVhZGVyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcl9wYWlyID0gW107XG4gICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcobmFtZSkpO1xuICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlcl9wYWlyKTtcbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJDb250ZW50LVR5cGVcIikge1xuICAgICAgICAgICAgICAgICAgICBlbmNvZGluZ1R5cGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVuY29kaW5nVHlwZS5pbmRleE9mKFwiYXBwbGljYXRpb24vb2NzcC1yZXF1ZXN0XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNPY3NwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJSZWZlcmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGUucmVmZXJyZXIgPSBlc2NhcGVTdHJpbmcocmVmZXJyZXIpO1xuICAgICAgICBpZiAocmVxdWVzdE1ldGhvZCA9PT0gXCJQT1NUXCIgJiYgIWlzT2NzcCAvKiBkb24ndCBwcm9jZXNzIE9DU1AgcmVxdWVzdHMgKi8pIHtcbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmdSZXF1ZXN0ID0gdGhpcy5nZXRQZW5kaW5nUmVxdWVzdChkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IHBlbmRpbmdSZXF1ZXN0LnJlc29sdmVkV2l0aGluVGltZW91dCgxMDAwKTtcbiAgICAgICAgICAgIGlmICghcmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcIlBlbmRpbmcgcmVxdWVzdCB0aW1lZCBvdXQgd2FpdGluZyBmb3IgZGF0YSBmcm9tIGJvdGggb25CZWZvcmVSZXF1ZXN0IGFuZCBvbkJlZm9yZVNlbmRIZWFkZXJzIGV2ZW50c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IGF3YWl0IHBlbmRpbmdSZXF1ZXN0Lm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscztcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0Qm9keSA9IG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscy5yZXF1ZXN0Qm9keTtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zdFBhcnNlciA9IG5ldyBIdHRwUG9zdFBhcnNlcihcbiAgICAgICAgICAgICAgICAgICAgLy8gZGV0YWlscyxcbiAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLCB0aGlzLmRhdGFSZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RPYmogPSBwb3N0UGFyc2VyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGFyc2VQb3N0UmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgKFBPU1QpIHJlcXVlc3QgaGVhZGVycyBmcm9tIHVwbG9hZCBzdHJlYW1cbiAgICAgICAgICAgICAgICAgICAgaWYgKFwicG9zdF9oZWFkZXJzXCIgaW4gcG9zdE9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSBzdG9yZSBQT1NUIGhlYWRlcnMgdGhhdCB3ZSBrbm93IGFuZCBuZWVkLiBXZSBtYXkgbWlzaW50ZXJwcmV0IFBPU1QgZGF0YSBhcyBoZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcyBkZXRlY3Rpb24gaXMgYmFzZWQgb24gXCJrZXk6dmFsdWVcIiBmb3JtYXQgKG5vbi1oZWFkZXIgUE9TVCBkYXRhIGNhbiBiZSBpbiB0aGlzIGZvcm1hdCBhcyB3ZWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudEhlYWRlcnMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtRGlzcG9zaXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtTGVuZ3RoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHBvc3RPYmoucG9zdF9oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRIZWFkZXJzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcl9wYWlyID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcl9wYWlyLnB1c2goZXNjYXBlU3RyaW5nKG5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcocG9zdE9iai5wb3N0X2hlYWRlcnNbbmFtZV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVycy5wdXNoKGhlYWRlcl9wYWlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gd2Ugc3RvcmUgUE9TVCBib2R5IGluIEpTT04gZm9ybWF0LCBleGNlcHQgd2hlbiBpdCdzIGEgc3RyaW5nIHdpdGhvdXQgYSAoa2V5LXZhbHVlKSBzdHJ1Y3R1cmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwicG9zdF9ib2R5XCIgaW4gcG9zdE9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlLnBvc3RfYm9keSA9IHBvc3RPYmoucG9zdF9ib2R5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChcInBvc3RfYm9keV9yYXdcIiBpbiBwb3N0T2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUucG9zdF9ib2R5X3JhdyA9IHBvc3RPYmoucG9zdF9ib2R5X3JhdztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1cGRhdGUuaGVhZGVycyA9IEpTT04uc3RyaW5naWZ5KGhlYWRlcnMpO1xuICAgICAgICAvLyBDaGVjayBpZiB4aHJcbiAgICAgICAgY29uc3QgaXNYSFIgPSBkZXRhaWxzLnR5cGUgPT09IFwieG1saHR0cHJlcXVlc3RcIjtcbiAgICAgICAgdXBkYXRlLmlzX1hIUiA9IGJvb2xUb0ludChpc1hIUik7XG4gICAgICAgIC8vIENoZWNrIGlmIGZyYW1lIE9SIGZ1bGwgcGFnZSBsb2FkXG4gICAgICAgIGNvbnN0IGlzRnVsbFBhZ2VMb2FkID0gZGV0YWlscy5mcmFtZUlkID09PSAwO1xuICAgICAgICBjb25zdCBpc0ZyYW1lTG9hZCA9IGRldGFpbHMudHlwZSA9PT0gXCJzdWJfZnJhbWVcIjtcbiAgICAgICAgdXBkYXRlLmlzX2Z1bGxfcGFnZSA9IGJvb2xUb0ludChpc0Z1bGxQYWdlTG9hZCk7XG4gICAgICAgIHVwZGF0ZS5pc19mcmFtZV9sb2FkID0gYm9vbFRvSW50KGlzRnJhbWVMb2FkKTtcbiAgICAgICAgLy8gR3JhYiB0aGUgdHJpZ2dlcmluZyBhbmQgbG9hZGluZyBQcmluY2lwYWxzXG4gICAgICAgIGxldCB0cmlnZ2VyaW5nT3JpZ2luO1xuICAgICAgICBsZXQgbG9hZGluZ09yaWdpbjtcbiAgICAgICAgaWYgKGRldGFpbHMub3JpZ2luVXJsKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRPcmlnaW5VcmwgPSBuZXcgVVJMKGRldGFpbHMub3JpZ2luVXJsKTtcbiAgICAgICAgICAgIHRyaWdnZXJpbmdPcmlnaW4gPSBwYXJzZWRPcmlnaW5Vcmwub3JpZ2luO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZXRhaWxzLmRvY3VtZW50VXJsKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWREb2N1bWVudFVybCA9IG5ldyBVUkwoZGV0YWlscy5kb2N1bWVudFVybCk7XG4gICAgICAgICAgICBsb2FkaW5nT3JpZ2luID0gcGFyc2VkRG9jdW1lbnRVcmwub3JpZ2luO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZS50cmlnZ2VyaW5nX29yaWdpbiA9IGVzY2FwZVN0cmluZyh0cmlnZ2VyaW5nT3JpZ2luKTtcbiAgICAgICAgdXBkYXRlLmxvYWRpbmdfb3JpZ2luID0gZXNjYXBlU3RyaW5nKGxvYWRpbmdPcmlnaW4pO1xuICAgICAgICAvLyBsb2FkaW5nRG9jdW1lbnQncyBocmVmXG4gICAgICAgIC8vIFRoZSBsb2FkaW5nRG9jdW1lbnQgaXMgdGhlIGRvY3VtZW50IHRoZSBlbGVtZW50IHJlc2lkZXMsIHJlZ2FyZGxlc3Mgb2ZcbiAgICAgICAgLy8gaG93IHRoZSBsb2FkIHdhcyB0cmlnZ2VyZWQuXG4gICAgICAgIGNvbnN0IGxvYWRpbmdIcmVmID0gZGV0YWlscy5kb2N1bWVudFVybDtcbiAgICAgICAgdXBkYXRlLmxvYWRpbmdfaHJlZiA9IGVzY2FwZVN0cmluZyhsb2FkaW5nSHJlZik7XG4gICAgICAgIC8vIHJlc291cmNlVHlwZSBvZiB0aGUgcmVxdWVzdGluZyBub2RlLiBUaGlzIGlzIHNldCBieSB0aGUgdHlwZSBvZlxuICAgICAgICAvLyBub2RlIG1ha2luZyB0aGUgcmVxdWVzdCAoaS5lLiBhbiA8aW1nIHNyYz0uLi4+IG5vZGUgd2lsbCBzZXQgdG8gdHlwZSBcImltYWdlXCIpLlxuICAgICAgICAvLyBEb2N1bWVudGF0aW9uOlxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL01vemlsbGEvQWRkLW9ucy9XZWJFeHRlbnNpb25zL0FQSS93ZWJSZXF1ZXN0L1Jlc291cmNlVHlwZVxuICAgICAgICB1cGRhdGUucmVzb3VyY2VfdHlwZSA9IGRldGFpbHMudHlwZTtcbiAgICAgICAgLypcbiAgICAgICAgLy8gVE9ETzogUmVmYWN0b3IgdG8gY29ycmVzcG9uZGluZyB3ZWJleHQgbG9naWMgb3IgZGlzY2FyZFxuICAgICAgICBjb25zdCBUaGlyZFBhcnR5VXRpbCA9IENjW1wiQG1vemlsbGEub3JnL3RoaXJkcGFydHl1dGlsOzFcIl0uZ2V0U2VydmljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDaS5tb3pJVGhpcmRQYXJ0eVV0aWwpO1xuICAgICAgICAvLyBEbyB0aGlyZC1wYXJ0eSBjaGVja3NcbiAgICAgICAgLy8gVGhlc2Ugc3BlY2lmaWMgY2hlY2tzIGFyZSBkb25lIGJlY2F1c2UgaXQncyB3aGF0J3MgdXNlZCBpbiBUcmFja2luZyBQcm90ZWN0aW9uXG4gICAgICAgIC8vIFNlZTogaHR0cDovL3NlYXJjaGZveC5vcmcvbW96aWxsYS1jZW50cmFsL3NvdXJjZS9uZXR3ZXJrL2Jhc2UvbnNDaGFubmVsQ2xhc3NpZmllci5jcHAjMTA3XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaXNUaGlyZFBhcnR5Q2hhbm5lbCA9IFRoaXJkUGFydHlVdGlsLmlzVGhpcmRQYXJ0eUNoYW5uZWwoZGV0YWlscyk7XG4gICAgICAgICAgY29uc3QgdG9wV2luZG93ID0gVGhpcmRQYXJ0eVV0aWwuZ2V0VG9wV2luZG93Rm9yQ2hhbm5lbChkZXRhaWxzKTtcbiAgICAgICAgICBjb25zdCB0b3BVUkkgPSBUaGlyZFBhcnR5VXRpbC5nZXRVUklGcm9tV2luZG93KHRvcFdpbmRvdyk7XG4gICAgICAgICAgaWYgKHRvcFVSSSkge1xuICAgICAgICAgICAgY29uc3QgdG9wVXJsID0gdG9wVVJJLnNwZWM7XG4gICAgICAgICAgICBjb25zdCBjaGFubmVsVVJJID0gZGV0YWlscy5VUkk7XG4gICAgICAgICAgICBjb25zdCBpc1RoaXJkUGFydHlUb1RvcFdpbmRvdyA9IFRoaXJkUGFydHlVdGlsLmlzVGhpcmRQYXJ0eVVSSShcbiAgICAgICAgICAgICAgY2hhbm5lbFVSSSxcbiAgICAgICAgICAgICAgdG9wVVJJLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVwZGF0ZS5pc190aGlyZF9wYXJ0eV90b190b3Bfd2luZG93ID0gaXNUaGlyZFBhcnR5VG9Ub3BXaW5kb3c7XG4gICAgICAgICAgICB1cGRhdGUuaXNfdGhpcmRfcGFydHlfY2hhbm5lbCA9IGlzVGhpcmRQYXJ0eUNoYW5uZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChhbkVycm9yKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9ucyBleHBlY3RlZCBmb3IgY2hhbm5lbHMgdHJpZ2dlcmVkIG9yIGxvYWRpbmcgaW4gYVxuICAgICAgICAgIC8vIE51bGxQcmluY2lwYWwgb3IgU3lzdGVtUHJpbmNpcGFsLiBUaGV5IGFyZSBhbHNvIGV4cGVjdGVkIGZvciBmYXZpY29uXG4gICAgICAgICAgLy8gbG9hZHMsIHdoaWNoIHdlIGF0dGVtcHQgdG8gZmlsdGVyLiBEZXBlbmRpbmcgb24gdGhlIG5hbWluZywgc29tZSBmYXZpY29uc1xuICAgICAgICAgIC8vIG1heSBjb250aW51ZSB0byBsZWFkIHRvIGVycm9yIGxvZ3MuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdXBkYXRlLnRyaWdnZXJpbmdfb3JpZ2luICE9PSBcIltTeXN0ZW0gUHJpbmNpcGFsXVwiICYmXG4gICAgICAgICAgICB1cGRhdGUudHJpZ2dlcmluZ19vcmlnaW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgdXBkYXRlLmxvYWRpbmdfb3JpZ2luICE9PSBcIltTeXN0ZW0gUHJpbmNpcGFsXVwiICYmXG4gICAgICAgICAgICB1cGRhdGUubG9hZGluZ19vcmlnaW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgIXVwZGF0ZS51cmwuZW5kc1dpdGgoXCJpY29cIilcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0Vycm9yKFxuICAgICAgICAgICAgICBcIkVycm9yIHdoaWxlIHJldHJpZXZpbmcgYWRkaXRpb25hbCBjaGFubmVsIGluZm9ybWF0aW9uIGZvciBVUkw6IFwiICtcbiAgICAgICAgICAgICAgXCJcXG5cIiArXG4gICAgICAgICAgICAgIHVwZGF0ZS51cmwgK1xuICAgICAgICAgICAgICBcIlxcbiBFcnJvciB0ZXh0OlwiICtcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoYW5FcnJvciksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgICAgICB1cGRhdGUudG9wX2xldmVsX3VybCA9IGVzY2FwZVVybCh0aGlzLmdldERvY3VtZW50VXJsRm9yUmVxdWVzdChkZXRhaWxzKSk7XG4gICAgICAgIHVwZGF0ZS5wYXJlbnRfZnJhbWVfaWQgPSBkZXRhaWxzLnBhcmVudEZyYW1lSWQ7XG4gICAgICAgIHVwZGF0ZS5mcmFtZV9hbmNlc3RvcnMgPSBlc2NhcGVTdHJpbmcoSlNPTi5zdHJpbmdpZnkoZGV0YWlscy5mcmFtZUFuY2VzdG9ycykpO1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiaHR0cF9yZXF1ZXN0c1wiLCB1cGRhdGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb2RlIHRha2VuIGFuZCBhZGFwdGVkIGZyb21cbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vRUZGb3JnL3ByaXZhY3liYWRnZXIvcHVsbC8yMTk4L2ZpbGVzXG4gICAgICpcbiAgICAgKiBHZXRzIHRoZSBVUkwgZm9yIGEgZ2l2ZW4gcmVxdWVzdCdzIHRvcC1sZXZlbCBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIFRoZSByZXF1ZXN0J3MgZG9jdW1lbnQgbWF5IGJlIGRpZmZlcmVudCBmcm9tIHRoZSBjdXJyZW50IHRvcC1sZXZlbCBkb2N1bWVudFxuICAgICAqIGxvYWRlZCBpbiB0YWIgYXMgcmVxdWVzdHMgY2FuIGNvbWUgb3V0IG9mIG9yZGVyOlxuICAgICAqXG4gICAgICogQHBhcmFtIHtXZWJSZXF1ZXN0T25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlsc30gZGV0YWlsc1xuICAgICAqXG4gICAgICogQHJldHVybiB7P1N0cmluZ30gdGhlIFVSTCBmb3IgdGhlIHJlcXVlc3QncyB0b3AtbGV2ZWwgZG9jdW1lbnRcbiAgICAgKi9cbiAgICBnZXREb2N1bWVudFVybEZvclJlcXVlc3QoZGV0YWlscykge1xuICAgICAgICBsZXQgdXJsID0gXCJcIjtcbiAgICAgICAgaWYgKGRldGFpbHMudHlwZSA9PT0gXCJtYWluX2ZyYW1lXCIpIHtcbiAgICAgICAgICAgIC8vIFVybCBvZiB0aGUgdG9wLWxldmVsIGRvY3VtZW50IGl0c2VsZi5cbiAgICAgICAgICAgIHVybCA9IGRldGFpbHMudXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRldGFpbHMuaGFzT3duUHJvcGVydHkoXCJmcmFtZUFuY2VzdG9yc1wiKSkge1xuICAgICAgICAgICAgLy8gSW4gY2FzZSBvZiBuZXN0ZWQgZnJhbWVzLCByZXRyaWV2ZSB1cmwgZnJvbSB0b3AtbW9zdCBhbmNlc3Rvci5cbiAgICAgICAgICAgIC8vIElmIGZyYW1lQW5jZXN0b3JzID09IFtdLCByZXF1ZXN0IGNvbWVzIGZyb20gdGhlIHRvcC1sZXZlbC1kb2N1bWVudC5cbiAgICAgICAgICAgIHVybCA9IGRldGFpbHMuZnJhbWVBbmNlc3RvcnMubGVuZ3RoXG4gICAgICAgICAgICAgICAgPyBkZXRhaWxzLmZyYW1lQW5jZXN0b3JzW2RldGFpbHMuZnJhbWVBbmNlc3RvcnMubGVuZ3RoIC0gMV0udXJsXG4gICAgICAgICAgICAgICAgOiBkZXRhaWxzLmRvY3VtZW50VXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gdHlwZSAhPSAnbWFpbl9mcmFtZScgYW5kIGZyYW1lQW5jZXN0b3JzID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGUgc2VydmljZSB3b3JrZXJzOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDcwNTM3I2MxM1xuICAgICAgICAgICAgdXJsID0gZGV0YWlscy5kb2N1bWVudFVybDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgICBhc3luYyBvbkJlZm9yZVJlZGlyZWN0SGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBldmVudE9yZGluYWwpIHtcbiAgICAgICAgLypcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgXCJvbkJlZm9yZVJlZGlyZWN0SGFuZGxlciAocHJldmlvdXNseSBodHRwUmVxdWVzdEhhbmRsZXIpXCIsXG4gICAgICAgICAgZGV0YWlscyxcbiAgICAgICAgICBjcmF3bElELFxuICAgICAgICApO1xuICAgICAgICAqL1xuICAgICAgICAvLyBTYXZlIEhUVFAgcmVkaXJlY3QgZXZlbnRzXG4gICAgICAgIC8vIEV2ZW50cyBhcmUgc2F2ZWQgdG8gdGhlIGBodHRwX3JlZGlyZWN0c2AgdGFibGVcbiAgICAgICAgLypcbiAgICAgICAgLy8gVE9ETzogUmVmYWN0b3IgdG8gY29ycmVzcG9uZGluZyB3ZWJleHQgbG9naWMgb3IgZGlzY2FyZFxuICAgICAgICAvLyBFdmVudHMgYXJlIHNhdmVkIHRvIHRoZSBgaHR0cF9yZWRpcmVjdHNgIHRhYmxlLCBhbmQgbWFwIHRoZSBvbGRcbiAgICAgICAgLy8gcmVxdWVzdC9yZXNwb25zZSBjaGFubmVsIGlkIHRvIHRoZSBuZXcgcmVxdWVzdC9yZXNwb25zZSBjaGFubmVsIGlkLlxuICAgICAgICAvLyBJbXBsZW1lbnRhdGlvbiBiYXNlZCBvbjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzExMjQwNjI3XG4gICAgICAgIGNvbnN0IG9sZE5vdGlmaWNhdGlvbnMgPSBkZXRhaWxzLm5vdGlmaWNhdGlvbkNhbGxiYWNrcztcbiAgICAgICAgbGV0IG9sZEV2ZW50U2luayA9IG51bGw7XG4gICAgICAgIGRldGFpbHMubm90aWZpY2F0aW9uQ2FsbGJhY2tzID0ge1xuICAgICAgICAgIFF1ZXJ5SW50ZXJmYWNlOiBYUENPTVV0aWxzLmdlbmVyYXRlUUkoW1xuICAgICAgICAgICAgQ2kubnNJSW50ZXJmYWNlUmVxdWVzdG9yLFxuICAgICAgICAgICAgQ2kubnNJQ2hhbm5lbEV2ZW50U2luayxcbiAgICAgICAgICBdKSxcbiAgICBcbiAgICAgICAgICBnZXRJbnRlcmZhY2UoaWlkKSB7XG4gICAgICAgICAgICAvLyBXZSBhcmUgb25seSBpbnRlcmVzdGVkIGluIG5zSUNoYW5uZWxFdmVudFNpbmssXG4gICAgICAgICAgICAvLyByZXR1cm4gdGhlIG9sZCBjYWxsYmFja3MgZm9yIGFueSBvdGhlciBpbnRlcmZhY2UgcmVxdWVzdHMuXG4gICAgICAgICAgICBpZiAoaWlkLmVxdWFscyhDaS5uc0lDaGFubmVsRXZlbnRTaW5rKSkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG9sZEV2ZW50U2luayA9IG9sZE5vdGlmaWNhdGlvbnMuUXVlcnlJbnRlcmZhY2UoaWlkKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoYW5FcnJvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0Vycm9yKFxuICAgICAgICAgICAgICAgICAgXCJFcnJvciBkdXJpbmcgY2FsbCB0byBjdXN0b20gbm90aWZpY2F0aW9uQ2FsbGJhY2tzOjpnZXRJbnRlcmZhY2UuXCIgK1xuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShhbkVycm9yKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgaWYgKG9sZE5vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9sZE5vdGlmaWNhdGlvbnMuZ2V0SW50ZXJmYWNlKGlpZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBDci5OU19FUlJPUl9OT19JTlRFUkZBQ0U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICBcbiAgICAgICAgICBhc3luY09uQ2hhbm5lbFJlZGlyZWN0KG9sZENoYW5uZWwsIG5ld0NoYW5uZWwsIGZsYWdzLCBjYWxsYmFjaykge1xuICAgIFxuICAgICAgICAgICAgbmV3Q2hhbm5lbC5RdWVyeUludGVyZmFjZShDaS5uc0lIdHRwQ2hhbm5lbCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBodHRwUmVkaXJlY3Q6IEh0dHBSZWRpcmVjdCA9IHtcbiAgICAgICAgICAgICAgY3Jhd2xfaWQ6IGNyYXdsSUQsXG4gICAgICAgICAgICAgIG9sZF9yZXF1ZXN0X2lkOiBvbGRDaGFubmVsLmNoYW5uZWxJZCxcbiAgICAgICAgICAgICAgbmV3X3JlcXVlc3RfaWQ6IG5ld0NoYW5uZWwuY2hhbm5lbElkLFxuICAgICAgICAgICAgICB0aW1lX3N0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVkaXJlY3RzXCIsIGh0dHBSZWRpcmVjdCk7XG4gICAgXG4gICAgICAgICAgICBpZiAob2xkRXZlbnRTaW5rKSB7XG4gICAgICAgICAgICAgIG9sZEV2ZW50U2luay5hc3luY09uQ2hhbm5lbFJlZGlyZWN0KFxuICAgICAgICAgICAgICAgIG9sZENoYW5uZWwsXG4gICAgICAgICAgICAgICAgbmV3Q2hhbm5lbCxcbiAgICAgICAgICAgICAgICBmbGFncyxcbiAgICAgICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrLm9uUmVkaXJlY3RWZXJpZnlDYWxsYmFjayhDci5OU19PSyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcmVzcG9uc2VTdGF0dXMgPSBkZXRhaWxzLnN0YXR1c0NvZGU7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzVGV4dCA9IGRldGFpbHMuc3RhdHVzTGluZTtcbiAgICAgICAgY29uc3QgdGFiID0gZGV0YWlscy50YWJJZCA+IC0xXG4gICAgICAgICAgICA/IGF3YWl0IGJyb3dzZXIudGFicy5nZXQoZGV0YWlscy50YWJJZClcbiAgICAgICAgICAgIDogeyB3aW5kb3dJZDogdW5kZWZpbmVkLCBpbmNvZ25pdG86IHVuZGVmaW5lZCB9O1xuICAgICAgICBjb25zdCBodHRwUmVkaXJlY3QgPSB7XG4gICAgICAgICAgICBpbmNvZ25pdG86IGJvb2xUb0ludCh0YWIuaW5jb2duaXRvKSxcbiAgICAgICAgICAgIGNyYXdsX2lkOiBjcmF3bElELFxuICAgICAgICAgICAgb2xkX3JlcXVlc3RfdXJsOiBlc2NhcGVVcmwoZGV0YWlscy51cmwpLFxuICAgICAgICAgICAgb2xkX3JlcXVlc3RfaWQ6IGRldGFpbHMucmVxdWVzdElkLFxuICAgICAgICAgICAgbmV3X3JlcXVlc3RfdXJsOiBlc2NhcGVVcmwoZGV0YWlscy5yZWRpcmVjdFVybCksXG4gICAgICAgICAgICBuZXdfcmVxdWVzdF9pZDogbnVsbCxcbiAgICAgICAgICAgIGV4dGVuc2lvbl9zZXNzaW9uX3V1aWQ6IGV4dGVuc2lvblNlc3Npb25VdWlkLFxuICAgICAgICAgICAgZXZlbnRfb3JkaW5hbDogZXZlbnRPcmRpbmFsLFxuICAgICAgICAgICAgd2luZG93X2lkOiB0YWIud2luZG93SWQsXG4gICAgICAgICAgICB0YWJfaWQ6IGRldGFpbHMudGFiSWQsXG4gICAgICAgICAgICBmcmFtZV9pZDogZGV0YWlscy5mcmFtZUlkLFxuICAgICAgICAgICAgcmVzcG9uc2Vfc3RhdHVzOiByZXNwb25zZVN0YXR1cyxcbiAgICAgICAgICAgIHJlc3BvbnNlX3N0YXR1c190ZXh0OiBlc2NhcGVTdHJpbmcocmVzcG9uc2VTdGF0dXNUZXh0KSxcbiAgICAgICAgICAgIHRpbWVfc3RhbXA6IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiaHR0cF9yZWRpcmVjdHNcIiwgaHR0cFJlZGlyZWN0KTtcbiAgICB9XG4gICAgLypcbiAgICAgKiBIVFRQIFJlc3BvbnNlIEhhbmRsZXJzIGFuZCBIZWxwZXIgRnVuY3Rpb25zXG4gICAgICovXG4gICAgYXN5bmMgbG9nV2l0aFJlc3BvbnNlQm9keShkZXRhaWxzLCB1cGRhdGUpIHtcbiAgICAgICAgY29uc3QgcGVuZGluZ1Jlc3BvbnNlID0gdGhpcy5nZXRQZW5kaW5nUmVzcG9uc2UoZGV0YWlscy5yZXF1ZXN0SWQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VCb2R5TGlzdGVuZXIgPSBwZW5kaW5nUmVzcG9uc2UucmVzcG9uc2VCb2R5TGlzdGVuZXI7XG4gICAgICAgICAgICBjb25zdCByZXNwQm9keSA9IGF3YWl0IHJlc3BvbnNlQm9keUxpc3RlbmVyLmdldFJlc3BvbnNlQm9keSgpO1xuICAgICAgICAgICAgY29uc3QgY29udGVudEhhc2ggPSBhd2FpdCByZXNwb25zZUJvZHlMaXN0ZW5lci5nZXRDb250ZW50SGFzaCgpO1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZUNvbnRlbnQocmVzcEJvZHksIGVzY2FwZVN0cmluZyhjb250ZW50SGFzaCkpO1xuICAgICAgICAgICAgdXBkYXRlLmNvbnRlbnRfaGFzaCA9IGNvbnRlbnRIYXNoO1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIGNvcnJlc3BvbmRpbmcgd2ViZXh0IGxvZ2ljIG9yIGRpc2NhcmRcbiAgICAgICAgICAgIGRhdGFSZWNlaXZlci5sb2dFcnJvcihcbiAgICAgICAgICAgICAgXCJVbmFibGUgdG8gcmV0cmlldmUgcmVzcG9uc2UgYm9keS5cIiArIEpTT04uc3RyaW5naWZ5KGFSZWFzb24pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVwZGF0ZS5jb250ZW50X2hhc2ggPSBcIjxlcnJvcj5cIjtcbiAgICAgICAgICAgIGRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiaHR0cF9yZXNwb25zZXNcIiwgdXBkYXRlKTtcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcIlVuYWJsZSB0byByZXRyaWV2ZSByZXNwb25zZSBib2R5LlwiICtcbiAgICAgICAgICAgICAgICBcIkxpa2VseSBjYXVzZWQgYnkgYSBwcm9ncmFtbWluZyBlcnJvci4gRXJyb3IgTWVzc2FnZTpcIiArXG4gICAgICAgICAgICAgICAgZXJyLm5hbWUgK1xuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICBcIlxcblwiICtcbiAgICAgICAgICAgICAgICBlcnIuc3RhY2spO1xuICAgICAgICAgICAgdXBkYXRlLmNvbnRlbnRfaGFzaCA9IFwiPGVycm9yPlwiO1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImh0dHBfcmVzcG9uc2VzXCIsIHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSW5zdHJ1bWVudCBIVFRQIHJlc3BvbnNlc1xuICAgIGFzeW5jIG9uQ29tcGxldGVkSGFuZGxlcihkZXRhaWxzLCBjcmF3bElELCBldmVudE9yZGluYWwsIHNhdmVDb250ZW50KSB7XG4gICAgICAgIC8qXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwib25Db21wbGV0ZWRIYW5kbGVyIChwcmV2aW91c2x5IGh0dHBSZXF1ZXN0SGFuZGxlcilcIixcbiAgICAgICAgICBkZXRhaWxzLFxuICAgICAgICAgIGNyYXdsSUQsXG4gICAgICAgICAgc2F2ZUNvbnRlbnQsXG4gICAgICAgICk7XG4gICAgICAgICovXG4gICAgICAgIGNvbnN0IHRhYiA9IGRldGFpbHMudGFiSWQgPiAtMVxuICAgICAgICAgICAgPyBhd2FpdCBicm93c2VyLnRhYnMuZ2V0KGRldGFpbHMudGFiSWQpXG4gICAgICAgICAgICA6IHsgd2luZG93SWQ6IHVuZGVmaW5lZCwgaW5jb2duaXRvOiB1bmRlZmluZWQgfTtcbiAgICAgICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgICAgIHVwZGF0ZS5pbmNvZ25pdG8gPSBib29sVG9JbnQodGFiLmluY29nbml0byk7XG4gICAgICAgIHVwZGF0ZS5jcmF3bF9pZCA9IGNyYXdsSUQ7XG4gICAgICAgIHVwZGF0ZS5leHRlbnNpb25fc2Vzc2lvbl91dWlkID0gZXh0ZW5zaW9uU2Vzc2lvblV1aWQ7XG4gICAgICAgIHVwZGF0ZS5ldmVudF9vcmRpbmFsID0gZXZlbnRPcmRpbmFsO1xuICAgICAgICB1cGRhdGUud2luZG93X2lkID0gdGFiLndpbmRvd0lkO1xuICAgICAgICB1cGRhdGUudGFiX2lkID0gZGV0YWlscy50YWJJZDtcbiAgICAgICAgdXBkYXRlLmZyYW1lX2lkID0gZGV0YWlscy5mcmFtZUlkO1xuICAgICAgICAvLyByZXF1ZXN0SWQgaXMgYSB1bmlxdWUgaWRlbnRpZmllciB0aGF0IGNhbiBiZSB1c2VkIHRvIGxpbmsgcmVxdWVzdHMgYW5kIHJlc3BvbnNlc1xuICAgICAgICB1cGRhdGUucmVxdWVzdF9pZCA9IGRldGFpbHMucmVxdWVzdElkO1xuICAgICAgICBjb25zdCBpc0NhY2hlZCA9IGRldGFpbHMuZnJvbUNhY2hlO1xuICAgICAgICB1cGRhdGUuaXNfY2FjaGVkID0gYm9vbFRvSW50KGlzQ2FjaGVkKTtcbiAgICAgICAgY29uc3QgdXJsID0gZGV0YWlscy51cmw7XG4gICAgICAgIHVwZGF0ZS51cmwgPSBlc2NhcGVVcmwodXJsKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE1ldGhvZCA9IGRldGFpbHMubWV0aG9kO1xuICAgICAgICB1cGRhdGUubWV0aG9kID0gZXNjYXBlU3RyaW5nKHJlcXVlc3RNZXRob2QpO1xuICAgICAgICAvLyBUT0RPOiBSZWZhY3RvciB0byBjb3JyZXNwb25kaW5nIHdlYmV4dCBsb2dpYyBvciBkaXNjYXJkXG4gICAgICAgIC8vIChyZXF1ZXN0IGhlYWRlcnMgYXJlIG5vdCBhdmFpbGFibGUgaW4gaHR0cCByZXNwb25zZSBldmVudCBsaXN0ZW5lciBvYmplY3QsXG4gICAgICAgIC8vIGJ1dCB0aGUgcmVmZXJyZXIgcHJvcGVydHkgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcmVxdWVzdCBjb3VsZCBiZSBxdWVyaWVkKVxuICAgICAgICAvL1xuICAgICAgICAvLyBsZXQgcmVmZXJyZXIgPSBcIlwiO1xuICAgICAgICAvLyBpZiAoZGV0YWlscy5yZWZlcnJlcikge1xuICAgICAgICAvLyAgIHJlZmVycmVyID0gZGV0YWlscy5yZWZlcnJlci5zcGVjO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHVwZGF0ZS5yZWZlcnJlciA9IGVzY2FwZVN0cmluZyhyZWZlcnJlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzID0gZGV0YWlscy5zdGF0dXNDb2RlO1xuICAgICAgICB1cGRhdGUucmVzcG9uc2Vfc3RhdHVzID0gcmVzcG9uc2VTdGF0dXM7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlU3RhdHVzVGV4dCA9IGRldGFpbHMuc3RhdHVzTGluZTtcbiAgICAgICAgdXBkYXRlLnJlc3BvbnNlX3N0YXR1c190ZXh0ID0gZXNjYXBlU3RyaW5nKHJlc3BvbnNlU3RhdHVzVGV4dCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRfdGltZSA9IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKTtcbiAgICAgICAgdXBkYXRlLnRpbWVfc3RhbXAgPSBjdXJyZW50X3RpbWUudG9JU09TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IFtdO1xuICAgICAgICBsZXQgbG9jYXRpb24gPSBcIlwiO1xuICAgICAgICBpZiAoZGV0YWlscy5yZXNwb25zZUhlYWRlcnMpIHtcbiAgICAgICAgICAgIGRldGFpbHMucmVzcG9uc2VIZWFkZXJzLm1hcChyZXNwb25zZUhlYWRlciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gcmVzcG9uc2VIZWFkZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyX3BhaXIgPSBbXTtcbiAgICAgICAgICAgICAgICBoZWFkZXJfcGFpci5wdXNoKGVzY2FwZVN0cmluZyhuYW1lKSk7XG4gICAgICAgICAgICAgICAgaGVhZGVyX3BhaXIucHVzaChlc2NhcGVTdHJpbmcodmFsdWUpKTtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLnB1c2goaGVhZGVyX3BhaXIpO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwibG9jYXRpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZS5oZWFkZXJzID0gSlNPTi5zdHJpbmdpZnkoaGVhZGVycyk7XG4gICAgICAgIHVwZGF0ZS5sb2NhdGlvbiA9IGVzY2FwZVN0cmluZyhsb2NhdGlvbik7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZFNhdmVDb250ZW50KHNhdmVDb250ZW50LCBkZXRhaWxzLnR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ1dpdGhSZXNwb25zZUJvZHkoZGV0YWlscywgdXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLnNhdmVSZWNvcmQoXCJodHRwX3Jlc3BvbnNlc1wiLCB1cGRhdGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYUhSMGNDMXBibk4wY25WdFpXNTBMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMkpoWTJ0bmNtOTFibVF2YUhSMGNDMXBibk4wY25WdFpXNTBMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQkxFOUJRVThzUlVGQlJTeDFRa0ZCZFVJc1JVRkJSU3hOUVVGTkxIZERRVUYzUXl4RFFVRkRPMEZCUTJwR0xFOUJRVThzUlVGQlJTeHZRa0ZCYjBJc1JVRkJSU3hOUVVGTkxDdENRVUVyUWl4RFFVRkRPMEZCUTNKRkxFOUJRVThzUlVGQlJTeGpRVUZqTEVWQlFYRkNMRTFCUVUwc2VVSkJRWGxDTEVOQlFVTTdRVUZETlVVc1QwRkJUeXhGUVVGRkxHTkJRV01zUlVGQlJTeE5RVUZOTEhkQ1FVRjNRaXhEUVVGRE8wRkJRM2hFTEU5QlFVOHNSVUZCUlN4bFFVRmxMRVZCUVVVc1RVRkJUU3g1UWtGQmVVSXNRMEZCUXp0QlFVa3hSQ3hQUVVGUExFVkJRVVVzVTBGQlV5eEZRVUZGTEZsQlFWa3NSVUZCUlN4VFFVRlRMRVZCUVVVc1RVRkJUU3h4UWtGQmNVSXNRMEZCUXp0QlFWZDZSVHM3T3pzN08wZEJUVWM3UVVGRlNDeE5RVUZOTEU5QlFVOHNZMEZCWXp0SlFXRjZRaXhaUVVGWkxGbEJRVms3VVVGWWFFSXNiMEpCUVdVc1IwRkZia0lzUlVGQlJTeERRVUZETzFGQlEwTXNjVUpCUVdkQ0xFZEJSWEJDTEVWQlFVVXNRMEZCUXp0UlFVOU1MRWxCUVVrc1EwRkJReXhaUVVGWkxFZEJRVWNzV1VGQldTeERRVUZETzBsQlEyNURMRU5CUVVNN1NVRkZUU3hIUVVGSExFTkJRVU1zVDBGQlR5eEZRVUZGTEdsQ1FVRnZRenRSUVVOMFJDeE5RVUZOTEZGQlFWRXNSMEZCYlVJN1dVRkRMMElzVVVGQlVUdFpRVU5TTEZsQlFWazdXVUZEV2l4TlFVRk5PMWxCUTA0c1QwRkJUenRaUVVOUUxGVkJRVlU3V1VGRFZpeFpRVUZaTzFsQlExb3NUMEZCVHp0WlFVTlFMRkZCUVZFN1dVRkRVaXh0UWtGQmJVSTdXVUZEYmtJc1RVRkJUVHRaUVVOT0xGRkJRVkU3V1VGRFVpeHBRa0ZCYVVJN1dVRkRha0lzV1VGQldUdFpRVU5hTEZkQlFWYzdXVUZEV0N4alFVRmpPMWxCUTJRc1YwRkJWenRaUVVOWUxFdEJRVXM3V1VGRFRDeFRRVUZUTzFsQlExUXNaMEpCUVdkQ08xbEJRMmhDTEUxQlFVMDdXVUZEVGl4UFFVRlBPMU5CUTFJc1EwRkJRenRSUVVWR0xFMUJRVTBzVFVGQlRTeEhRVUZyUWl4RlFVRkZMRWxCUVVrc1JVRkJSU3hEUVVGRExGbEJRVmtzUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4UlFVRlJMRVZCUVVVc1EwRkJRenRSUVVWNFJTeE5RVUZOTEhsQ1FVRjVRaXhIUVVGSExFOUJRVThzUTBGQlF5eEZRVUZGTzFsQlF6RkRMRTlCUVU4c1EwRkRUQ3hQUVVGUExFTkJRVU1zVTBGQlV5eEpRVUZKTEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNc1QwRkJUeXhEUVVGRExHdENRVUZyUWl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRM2hGTEVOQlFVTTdVVUZEU2l4RFFVRkRMRU5CUVVNN1VVRkZSanM3VjBGRlJ6dFJRVVZJTEVsQlFVa3NRMEZCUXl4MVFrRkJkVUlzUjBGQlJ5eERRVU0zUWl4UFFVRTRReXhGUVVNNVF5eEZRVUZGTzFsQlEwWXNUVUZCVFN3clFrRkJLMElzUjBGQmNVSXNSVUZCUlN4RFFVRkRPMWxCUXpkRUxIRkRRVUZ4UXp0WlFVTnlReXhKUVVGSkxIbENRVUY1UWl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8yZENRVU4wUXl4UFFVRlBMQ3RDUVVFclFpeERRVUZETzJGQlEzaERPMWxCUTBRc1RVRkJUU3hqUVVGakxFZEJRVWNzU1VGQlNTeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0WlFVTnFSU3hqUVVGakxFTkJRVU1zYTBOQlFXdERMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03V1VGRE0wUXNUVUZCVFN4bFFVRmxMRWRCUVVjc1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFpRVU51UlN4bFFVRmxMRU5CUVVNc2EwTkJRV3RETEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1dVRkROVVFzU1VGQlNTeEpRVUZKTEVOQlFVTXNhVUpCUVdsQ0xFTkJRVU1zYVVKQlFXbENMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTzJkQ1FVTXpSQ3hsUVVGbExFTkJRVU1zSzBKQlFTdENMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03WVVGRE1VUTdXVUZEUkN4UFFVRlBMQ3RDUVVFclFpeERRVUZETzFGQlEzcERMRU5CUVVNc1EwRkJRenRSUVVOR0xFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNaVUZCWlN4RFFVRkRMRmRCUVZjc1EwRkROVU1zU1VGQlNTeERRVUZETEhWQ1FVRjFRaXhGUVVNMVFpeE5RVUZOTEVWQlEwNHNTVUZCU1N4RFFVRkRMSE5DUVVGelFpeERRVUZETEdsQ1FVRnBRaXhEUVVGRE8xbEJRelZETEVOQlFVTXNRMEZCUXl4RFFVRkRMR0ZCUVdFc1JVRkJSU3hWUVVGVkxFTkJRVU03V1VGRE4wSXNRMEZCUXl4RFFVRkRMRU5CUVVNc1lVRkJZU3hEUVVGRExFTkJRM0JDTEVOQlFVTTdVVUZGUml4SlFVRkpMRU5CUVVNc01rSkJRVEpDTEVkQlFVY3NUMEZCVHl4RFFVRkRMRVZCUVVVN1dVRkRNME1zY1VOQlFYRkRPMWxCUTNKRExFbEJRVWtzZVVKQlFYbENMRU5CUVVNc1QwRkJUeXhEUVVGRExFVkJRVVU3WjBKQlEzUkRMRTlCUVU4N1lVRkRVanRaUVVORUxFMUJRVTBzWTBGQll5eEhRVUZITEVsQlFVa3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRha1VzWTBGQll5eERRVUZETEhORFFVRnpReXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlF5OUVMRWxCUVVrc1EwRkJReXd3UWtGQk1FSXNRMEZETjBJc1QwRkJUeXhGUVVOUUxFOUJRVThzUlVGRFVDeDFRa0ZCZFVJc1JVRkJSU3hEUVVNeFFpeERRVUZETzFGQlEwb3NRMEZCUXl4RFFVRkRPMUZCUTBZc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhYUVVGWExFTkJRMmhFTEVsQlFVa3NRMEZCUXl3eVFrRkJNa0lzUlVGRGFFTXNUVUZCVFN4RlFVTk9MRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNRMEZEYmtJc1EwRkJRenRSUVVWR0xFbEJRVWtzUTBGQlF5eDNRa0ZCZDBJc1IwRkJSeXhQUVVGUExFTkJRVU1zUlVGQlJUdFpRVU40UXl4eFEwRkJjVU03V1VGRGNrTXNTVUZCU1N4NVFrRkJlVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0blFrRkRkRU1zVDBGQlR6dGhRVU5TTzFsQlEwUXNTVUZCU1N4RFFVRkRMSFZDUVVGMVFpeERRVUZETEU5QlFVOHNSVUZCUlN4UFFVRlBMRVZCUVVVc2RVSkJRWFZDTEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUXpWRkxFTkJRVU1zUTBGQlF6dFJRVU5HTEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNWMEZCVnl4RFFVTTNReXhKUVVGSkxFTkJRVU1zZDBKQlFYZENMRVZCUXpkQ0xFMUJRVTBzUlVGRFRpeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRM0JDTEVOQlFVTTdVVUZGUml4SlFVRkpMRU5CUVVNc2JVSkJRVzFDTEVkQlFVY3NUMEZCVHl4RFFVRkRMRVZCUVVVN1dVRkRia01zY1VOQlFYRkRPMWxCUTNKRExFbEJRVWtzZVVKQlFYbENMRU5CUVVNc1QwRkJUeXhEUVVGRExFVkJRVVU3WjBKQlEzUkRMRTlCUVU4N1lVRkRVanRaUVVORUxFMUJRVTBzWlVGQlpTeEhRVUZITEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUTBGQlF5eFBRVUZQTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1dVRkRia1VzWlVGQlpTeERRVUZETERoQ1FVRTRRaXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFsQlEzaEVMRWxCUVVrc1EwRkJReXhyUWtGQmEwSXNRMEZEY2tJc1QwRkJUeXhGUVVOUUxFOUJRVThzUlVGRFVDeDFRa0ZCZFVJc1JVRkJSU3hGUVVONlFpeHBRa0ZCYVVJc1EwRkRiRUlzUTBGQlF6dFJRVU5LTEVOQlFVTXNRMEZCUXp0UlFVTkdMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU1zVjBGQlZ5eERRVUZETEZkQlFWY3NRMEZEZUVNc1NVRkJTU3hEUVVGRExHMUNRVUZ0UWl4RlFVTjRRaXhOUVVGTkxFVkJRMDRzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVOd1FpeERRVUZETzBsQlEwb3NRMEZCUXp0SlFVVk5MRTlCUVU4N1VVRkRXaXhKUVVGSkxFbEJRVWtzUTBGQlF5eDFRa0ZCZFVJc1JVRkJSVHRaUVVOb1F5eFBRVUZQTEVOQlFVTXNWVUZCVlN4RFFVRkRMR1ZCUVdVc1EwRkJReXhqUVVGakxFTkJReTlETEVsQlFVa3NRMEZCUXl4MVFrRkJkVUlzUTBGRE4wSXNRMEZCUXp0VFFVTklPMUZCUTBRc1NVRkJTU3hKUVVGSkxFTkJRVU1zTWtKQlFUSkNMRVZCUVVVN1dVRkRjRU1zVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4dFFrRkJiVUlzUTBGQlF5eGpRVUZqTEVOQlEyNUVMRWxCUVVrc1EwRkJReXd5UWtGQk1rSXNRMEZEYWtNc1EwRkJRenRUUVVOSU8xRkJRMFFzU1VGQlNTeEpRVUZKTEVOQlFVTXNkMEpCUVhkQ0xFVkJRVVU3V1VGRGFrTXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4alFVRmpMRU5CUTJoRUxFbEJRVWtzUTBGQlF5eDNRa0ZCZDBJc1EwRkRPVUlzUTBGQlF6dFRRVU5JTzFGQlEwUXNTVUZCU1N4SlFVRkpMRU5CUVVNc2JVSkJRVzFDTEVWQlFVVTdXVUZETlVJc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eFhRVUZYTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4RFFVRkRPMU5CUTNwRk8wbEJRMGdzUTBGQlF6dEpRVVZQTEhOQ1FVRnpRaXhEUVVGRExHbENRVUZ2UXp0UlFVTnFSU3hKUVVGSkxHbENRVUZwUWl4TFFVRkxMRWxCUVVrc1JVRkJSVHRaUVVNNVFpeFBRVUZQTEVsQlFVa3NRMEZCUXp0VFFVTmlPMUZCUTBRc1NVRkJTU3hwUWtGQmFVSXNTMEZCU3l4TFFVRkxMRVZCUVVVN1dVRkRMMElzVDBGQlR5eExRVUZMTEVOQlFVTTdVMEZEWkR0UlFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRExIZENRVUYzUWl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1EwRkJRenRKUVVOeVJTeERRVUZETzBsQlJVOHNkMEpCUVhkQ0xFTkJRVU1zYVVKQlFYbENPMUZCUTNoRUxFOUJRVThzYVVKQlFXbENMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQmJVSXNRMEZCUXp0SlFVTjRSQ3hEUVVGRE8wbEJSVVE3T3pzN096dFBRVTFITzBsQlEwc3NhVUpCUVdsQ0xFTkJRM1pDTEdsQ1FVRnZReXhGUVVOd1F5eFpRVUV3UWp0UlFVVXhRaXhKUVVGSkxHbENRVUZwUWl4TFFVRkxMRWxCUVVrc1JVRkJSVHRaUVVNNVFpeFBRVUZQTEVsQlFVa3NRMEZCUXp0VFFVTmlPMUZCUTBRc1NVRkJTU3hwUWtGQmFVSXNTMEZCU3l4TFFVRkxMRVZCUVVVN1dVRkRMMElzVDBGQlR5eExRVUZMTEVOQlFVTTdVMEZEWkR0UlFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRExIZENRVUYzUWl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTXNVVUZCVVN4RFFVTTVSQ3haUVVGWkxFTkJRMklzUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGVHl4cFFrRkJhVUlzUTBGQlF5eFRRVUZUTzFGQlEycERMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeERRVUZETEZOQlFWTXNRMEZCUXl4RlFVRkZPMWxCUTNCRExFbEJRVWtzUTBGQlF5eGxRVUZsTEVOQlFVTXNVMEZCVXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hqUVVGakxFVkJRVVVzUTBGQlF6dFRRVU40UkR0UlFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0SlFVTjZReXhEUVVGRE8wbEJSVThzYTBKQlFXdENMRU5CUVVNc1UwRkJVenRSUVVOc1F5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMR2RDUVVGblFpeERRVUZETEZOQlFWTXNRMEZCUXl4RlFVRkZPMWxCUTNKRExFbEJRVWtzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFTkJRVU1zUjBGQlJ5eEpRVUZKTEdWQlFXVXNSVUZCUlN4RFFVRkRPMU5CUXpGRU8xRkJRMFFzVDBGQlR5eEpRVUZKTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdTVUZETVVNc1EwRkJRenRKUVVWRU96dFBRVVZITzBsQlJVZzdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1RVRnJRMFU3U1VGRlRTeExRVUZMTEVOQlFVTXNNRUpCUVRCQ0xFTkJRM1JETEU5QlFXdEVMRVZCUTJ4RUxFOUJRVThzUlVGRFVDeFpRVUZ2UWp0UlFVVndRanM3T3pzN08xVkJUVVU3VVVGRlJpeE5RVUZOTEVkQlFVY3NSMEZEVUN4UFFVRlBMRU5CUVVNc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF6dFpRVU5vUWl4RFFVRkRMRU5CUVVNc1RVRkJUU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRE8xbEJRM1pETEVOQlFVTXNRMEZCUXl4RlFVRkZMRkZCUVZFc1JVRkJSU3hUUVVGVExFVkJRVVVzVTBGQlV5eEZRVUZGTEZOQlFWTXNSVUZCUlN4SFFVRkhMRVZCUVVVc1UwRkJVeXhGUVVGRkxFTkJRVU03VVVGRmNFVXNUVUZCVFN4TlFVRk5MRWRCUVVjc1JVRkJhVUlzUTBGQlF6dFJRVVZxUXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExGTkJRVk1zUTBGQlF5eEhRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1VVRkROVU1zVFVGQlRTeERRVUZETEZGQlFWRXNSMEZCUnl4UFFVRlBMRU5CUVVNN1VVRkRNVUlzVFVGQlRTeERRVUZETEhOQ1FVRnpRaXhIUVVGSExHOUNRVUZ2UWl4RFFVRkRPMUZCUTNKRUxFMUJRVTBzUTBGQlF5eGhRVUZoTEVkQlFVY3NXVUZCV1N4RFFVRkRPMUZCUTNCRExFMUJRVTBzUTBGQlF5eFRRVUZUTEVkQlFVY3NSMEZCUnl4RFFVRkRMRkZCUVZFc1EwRkJRenRSUVVOb1F5eE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU03VVVGRE9VSXNUVUZCVFN4RFFVRkRMRkZCUVZFc1IwRkJSeXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETzFGQlJXeERMRzFHUVVGdFJqdFJRVU51Uml4TlFVRk5MRU5CUVVNc1ZVRkJWU3hIUVVGSExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTTdVVUZGZEVNc1owUkJRV2RFTzFGQlEyaEVMSGRFUVVGM1JEdFJRVVY0UkN4TlFVRk5MRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETzFGQlEzaENMRTFCUVUwc1EwRkJReXhIUVVGSExFZEJRVWNzVTBGQlV5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUlRWQ0xFMUJRVTBzWVVGQllTeEhRVUZITEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNN1VVRkRja01zVFVGQlRTeERRVUZETEUxQlFVMHNSMEZCUnl4WlFVRlpMRU5CUVVNc1lVRkJZU3hEUVVGRExFTkJRVU03VVVGRk5VTXNUVUZCVFN4WlFVRlpMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMUZCUTJwRUxFMUJRVTBzUTBGQlF5eFZRVUZWTEVkQlFVY3NXVUZCV1N4RFFVRkRMRmRCUVZjc1JVRkJSU3hEUVVGRE8xRkJSUzlETEVsQlFVa3NXVUZCV1N4SFFVRkhMRVZCUVVVc1EwRkJRenRSUVVOMFFpeEpRVUZKTEZGQlFWRXNSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkRiRUlzVFVGQlRTeFBRVUZQTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTI1Q0xFbEJRVWtzVFVGQlRTeEhRVUZITEV0QlFVc3NRMEZCUXp0UlFVTnVRaXhKUVVGSkxFOUJRVThzUTBGQlF5eGpRVUZqTEVWQlFVVTdXVUZETVVJc1QwRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eEhRVUZITEVOQlFVTXNZVUZCWVN4RFFVRkRMRVZCUVVVN1owSkJRM3BETEUxQlFVMHNSVUZCUlN4SlFVRkpMRVZCUVVVc1MwRkJTeXhGUVVGRkxFZEJRVWNzWVVGQllTeERRVUZETzJkQ1FVTjBReXhOUVVGTkxGZEJRVmNzUjBGQlJ5eEZRVUZGTEVOQlFVTTdaMEpCUTNaQ0xGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU03WjBKQlEzSkRMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNN1owSkJRM1JETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03WjBKQlF6RkNMRWxCUVVrc1NVRkJTU3hMUVVGTExHTkJRV01zUlVGQlJUdHZRa0ZETTBJc1dVRkJXU3hIUVVGSExFdEJRVXNzUTBGQlF6dHZRa0ZEY2tJc1NVRkJTU3haUVVGWkxFTkJRVU1zVDBGQlR5eERRVUZETERCQ1FVRXdRaXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVWQlFVVTdkMEpCUXpORUxFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTTdjVUpCUTJZN2FVSkJRMFk3WjBKQlEwUXNTVUZCU1N4SlFVRkpMRXRCUVVzc1UwRkJVeXhGUVVGRk8yOUNRVU4wUWl4UlFVRlJMRWRCUVVjc1MwRkJTeXhEUVVGRE8ybENRVU5zUWp0WlFVTklMRU5CUVVNc1EwRkJReXhEUVVGRE8xTkJRMG83VVVGRlJDeE5RVUZOTEVOQlFVTXNVVUZCVVN4SFFVRkhMRmxCUVZrc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFJRVVY2UXl4SlFVRkpMR0ZCUVdFc1MwRkJTeXhOUVVGTkxFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNhVU5CUVdsRExFVkJRVVU3V1VGRGVrVXNUVUZCVFN4alFVRmpMRWRCUVVjc1NVRkJTU3hEUVVGRExHbENRVUZwUWl4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFpRVU5xUlN4TlFVRk5MRkZCUVZFc1IwRkJSeXhOUVVGTkxHTkJRV01zUTBGQlF5eHhRa0ZCY1VJc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFpRVU5zUlN4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRk8yZENRVU5pTEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1VVRkJVU3hEUVVONFFpeHhSMEZCY1Vjc1EwRkRkRWNzUTBGQlF6dGhRVU5JTzJsQ1FVRk5PMmRDUVVOTUxFMUJRVTBzTWtKQlFUSkNMRWRCUVVjc1RVRkJUU3hqUVVGakxFTkJRVU1zTWtKQlFUSkNMRU5CUVVNN1owSkJRM0pHTEUxQlFVMHNWMEZCVnl4SFFVRkhMREpDUVVFeVFpeERRVUZETEZkQlFWY3NRMEZCUXp0blFrRkZOVVFzU1VGQlNTeFhRVUZYTEVWQlFVVTdiMEpCUTJZc1RVRkJUU3hWUVVGVkxFZEJRVWNzU1VGQlNTeGpRVUZqTzI5Q1FVTnVReXhYUVVGWE8yOUNRVU5ZTERKQ1FVRXlRaXhGUVVNelFpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVTnNRaXhEUVVGRE8yOUNRVU5HTEUxQlFVMHNUMEZCVHl4SFFVRnpRaXhWUVVGVk8zbENRVU14UXl4blFrRkJaMElzUlVGRlppeERRVUZETzI5Q1FVVk1MR2RFUVVGblJEdHZRa0ZEYUVRc1NVRkJTU3hqUVVGakxFbEJRVWtzVDBGQlR5eEZRVUZGTzNkQ1FVTTNRaXd3UmtGQk1FWTdkMEpCUXpGR0xHMUhRVUZ0Unp0M1FrRkRia2NzVFVGQlRTeGpRVUZqTEVkQlFVYzdORUpCUTNKQ0xHTkJRV003TkVKQlEyUXNjVUpCUVhGQ096UkNRVU55UWl4blFrRkJaMEk3ZVVKQlEycENMRU5CUVVNN2QwSkJRMFlzUzBGQlN5eE5RVUZOTEVsQlFVa3NTVUZCU1N4UFFVRlBMRU5CUVVNc1dVRkJXU3hGUVVGRk96UkNRVU4yUXl4SlFVRkpMR05CUVdNc1EwRkJReXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVTdaME5CUTJwRExFMUJRVTBzVjBGQlZ5eEhRVUZITEVWQlFVVXNRMEZCUXp0blEwRkRka0lzVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dG5RMEZEY2tNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdaME5CUXpORUxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RFFVRkRMRU5CUVVNN05rSkJRek5DTzNsQ1FVTkdPM0ZDUVVOR08yOUNRVU5FTEN0R1FVRXJSanR2UWtGREwwWXNTVUZCU1N4WFFVRlhMRWxCUVVrc1QwRkJUeXhGUVVGRk8zZENRVU14UWl4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTTdjVUpCUTNSRE8yOUNRVU5FTEVsQlFVa3NaVUZCWlN4SlFVRkpMRTlCUVU4c1JVRkJSVHQzUWtGRE9VSXNUVUZCVFN4RFFVRkRMR0ZCUVdFc1IwRkJSeXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETzNGQ1FVTTVRenRwUWtGRFJqdGhRVU5HTzFOQlEwWTdVVUZGUkN4TlFVRk5MRU5CUVVNc1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkZla01zWlVGQlpUdFJRVU5tTEUxQlFVMHNTMEZCU3l4SFFVRkhMRTlCUVU4c1EwRkJReXhKUVVGSkxFdEJRVXNzWjBKQlFXZENMRU5CUVVNN1VVRkRhRVFzVFVGQlRTeERRVUZETEUxQlFVMHNSMEZCUnl4VFFVRlRMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03VVVGRmFrTXNiVU5CUVcxRE8xRkJRMjVETEUxQlFVMHNZMEZCWXl4SFFVRkhMRTlCUVU4c1EwRkJReXhQUVVGUExFdEJRVXNzUTBGQlF5eERRVUZETzFGQlF6ZERMRTFCUVUwc1YwRkJWeXhIUVVGSExFOUJRVThzUTBGQlF5eEpRVUZKTEV0QlFVc3NWMEZCVnl4RFFVRkRPMUZCUTJwRUxFMUJRVTBzUTBGQlF5eFpRVUZaTEVkQlFVY3NVMEZCVXl4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRE8xRkJRMmhFTEUxQlFVMHNRMEZCUXl4aFFVRmhMRWRCUVVjc1UwRkJVeXhEUVVGRExGZEJRVmNzUTBGQlF5eERRVUZETzFGQlJUbERMRFpEUVVFMlF6dFJRVU0zUXl4SlFVRkpMR2RDUVVGblFpeERRVUZETzFGQlEzSkNMRWxCUVVrc1lVRkJZU3hEUVVGRE8xRkJRMnhDTEVsQlFVa3NUMEZCVHl4RFFVRkRMRk5CUVZNc1JVRkJSVHRaUVVOeVFpeE5RVUZOTEdWQlFXVXNSMEZCUnl4SlFVRkpMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdXVUZEYmtRc1owSkJRV2RDTEVkQlFVY3NaVUZCWlN4RFFVRkRMRTFCUVUwc1EwRkJRenRUUVVNelF6dFJRVU5FTEVsQlFVa3NUMEZCVHl4RFFVRkRMRmRCUVZjc1JVRkJSVHRaUVVOMlFpeE5RVUZOTEdsQ1FVRnBRaXhIUVVGSExFbEJRVWtzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNc1EwRkJRenRaUVVOMlJDeGhRVUZoTEVkQlFVY3NhVUpCUVdsQ0xFTkJRVU1zVFVGQlRTeERRVUZETzFOQlF6RkRPMUZCUTBRc1RVRkJUU3hEUVVGRExHbENRVUZwUWl4SFFVRkhMRmxCUVZrc1EwRkJReXhuUWtGQlowSXNRMEZCUXl4RFFVRkRPMUZCUXpGRUxFMUJRVTBzUTBGQlF5eGpRVUZqTEVkQlFVY3NXVUZCV1N4RFFVRkRMR0ZCUVdFc1EwRkJReXhEUVVGRE8xRkJSWEJFTEhsQ1FVRjVRanRSUVVONlFpeDVSVUZCZVVVN1VVRkRla1VzT0VKQlFUaENPMUZCUXpsQ0xFMUJRVTBzVjBGQlZ5eEhRVUZITEU5QlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNN1VVRkRlRU1zVFVGQlRTeERRVUZETEZsQlFWa3NSMEZCUnl4WlFVRlpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03VVVGRmFFUXNhMFZCUVd0Rk8xRkJRMnhGTEdsR1FVRnBSanRSUVVOcVJpeHBRa0ZCYVVJN1VVRkRha0lzY1VkQlFYRkhPMUZCUTNKSExFMUJRVTBzUTBGQlF5eGhRVUZoTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJRenRSUVVWd1F6czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzFWQk1FTkZPMUZCUTBZc1RVRkJUU3hEUVVGRExHRkJRV0VzUjBGQlJ5eFRRVUZUTEVOQlFVTXNTVUZCU1N4RFFVRkRMSGRDUVVGM1FpeERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRla1VzVFVGQlRTeERRVUZETEdWQlFXVXNSMEZCUnl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRE8xRkJReTlETEUxQlFVMHNRMEZCUXl4bFFVRmxMRWRCUVVjc1dVRkJXU3hEUVVOdVF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRTlCUVU4c1EwRkJReXhqUVVGakxFTkJRVU1zUTBGRGRrTXNRMEZCUXp0UlFVTkdMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zVlVGQlZTeERRVUZETEdWQlFXVXNSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRKUVVONFJDeERRVUZETzBsQlJVUTdPenM3T3pzN096czdPenRQUVZsSE8wbEJRMHNzZDBKQlFYZENMRU5CUXpsQ0xFOUJRV3RFTzFGQlJXeEVMRWxCUVVrc1IwRkJSeXhIUVVGSExFVkJRVVVzUTBGQlF6dFJRVVZpTEVsQlFVa3NUMEZCVHl4RFFVRkRMRWxCUVVrc1MwRkJTeXhaUVVGWkxFVkJRVVU3V1VGRGFrTXNkME5CUVhkRE8xbEJRM2hETEVkQlFVY3NSMEZCUnl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRE8xTkJRMjVDTzJGQlFVMHNTVUZCU1N4UFFVRlBMRU5CUVVNc1kwRkJZeXhEUVVGRExHZENRVUZuUWl4RFFVRkRMRVZCUVVVN1dVRkRia1FzYVVWQlFXbEZPMWxCUTJwRkxITkZRVUZ6UlR0WlFVTjBSU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEdOQlFXTXNRMEZCUXl4TlFVRk5PMmRDUVVOcVF5eERRVUZETEVOQlFVTXNUMEZCVHl4RFFVRkRMR05CUVdNc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll5eERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSE8yZENRVU12UkN4RFFVRkRMRU5CUVVNc1QwRkJUeXhEUVVGRExGZEJRVmNzUTBGQlF6dFRRVU42UWp0aFFVRk5PMWxCUTB3c2RVUkJRWFZFTzFsQlEzWkVMSGRHUVVGM1JqdFpRVU40Uml4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExGZEJRVmNzUTBGQlF6dFRRVU16UWp0UlFVTkVMRTlCUVU4c1IwRkJSeXhEUVVGRE8wbEJRMklzUTBGQlF6dEpRVVZQTEV0QlFVc3NRMEZCUXl4MVFrRkJkVUlzUTBGRGJrTXNUMEZCSzBNc1JVRkRMME1zVDBGQlR5eEZRVU5RTEZsQlFXOUNPMUZCUlhCQ096czdPenM3VlVGTlJUdFJRVVZHTERSQ1FVRTBRanRSUVVNMVFpeHBSRUZCYVVRN1VVRkZha1E3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08xVkJNa1JGTzFGQlJVWXNUVUZCVFN4alFVRmpMRWRCUVVjc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU14UXl4TlFVRk5MR3RDUVVGclFpeEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkZPVU1zVFVGQlRTeEhRVUZITEVkQlExQXNUMEZCVHl4RFFVRkRMRXRCUVVzc1IwRkJSeXhEUVVGRExFTkJRVU03V1VGRGFFSXNRMEZCUXl4RFFVRkRMRTFCUVUwc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNUMEZCVHl4RFFVRkRMRXRCUVVzc1EwRkJRenRaUVVOMlF5eERRVUZETEVOQlFVTXNSVUZCUlN4UlFVRlJMRVZCUVVVc1UwRkJVeXhGUVVGRkxGTkJRVk1zUlVGQlJTeFRRVUZUTEVWQlFVVXNRMEZCUXp0UlFVTndSQ3hOUVVGTkxGbEJRVmtzUjBGQmFVSTdXVUZEYWtNc1UwRkJVeXhGUVVGRkxGTkJRVk1zUTBGQlF5eEhRVUZITEVOQlFVTXNVMEZCVXl4RFFVRkRPMWxCUTI1RExGRkJRVkVzUlVGQlJTeFBRVUZQTzFsQlEycENMR1ZCUVdVc1JVRkJSU3hUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXp0WlFVTjJReXhqUVVGakxFVkJRVVVzVDBGQlR5eERRVUZETEZOQlFWTTdXVUZEYWtNc1pVRkJaU3hGUVVGRkxGTkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNWMEZCVnl4RFFVRkRPMWxCUXk5RExHTkJRV01zUlVGQlJTeEpRVUZKTzFsQlEzQkNMSE5DUVVGelFpeEZRVUZGTEc5Q1FVRnZRanRaUVVNMVF5eGhRVUZoTEVWQlFVVXNXVUZCV1R0WlFVTXpRaXhUUVVGVExFVkJRVVVzUjBGQlJ5eERRVUZETEZGQlFWRTdXVUZEZGtJc1RVRkJUU3hGUVVGRkxFOUJRVThzUTBGQlF5eExRVUZMTzFsQlEzSkNMRkZCUVZFc1JVRkJSU3hQUVVGUExFTkJRVU1zVDBGQlR6dFpRVU42UWl4bFFVRmxMRVZCUVVVc1kwRkJZenRaUVVNdlFpeHZRa0ZCYjBJc1JVRkJSU3haUVVGWkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNN1dVRkRkRVFzVlVGQlZTeEZRVUZGTEVsQlFVa3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eFhRVUZYTEVWQlFVVTdVMEZEZEVRc1EwRkJRenRSUVVWR0xFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNWVUZCVlN4RFFVRkRMR2RDUVVGblFpeEZRVUZGTEZsQlFWa3NRMEZCUXl4RFFVRkRPMGxCUXk5RUxFTkJRVU03U1VGRlJEczdUMEZGUnp0SlFVVkxMRXRCUVVzc1EwRkJReXh0UWtGQmJVSXNRMEZETDBJc1QwRkJPRU1zUlVGRE9VTXNUVUZCVFR0UlFVVk9MRTFCUVUwc1pVRkJaU3hIUVVGSExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhQUVVGUExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZEYmtVc1NVRkJTVHRaUVVOR0xFMUJRVTBzYjBKQlFXOUNMRWRCUVVjc1pVRkJaU3hEUVVGRExHOUNRVUZ2UWl4RFFVRkRPMWxCUTJ4RkxFMUJRVTBzVVVGQlVTeEhRVUZITEUxQlFVMHNiMEpCUVc5Q0xFTkJRVU1zWlVGQlpTeEZRVUZGTEVOQlFVTTdXVUZET1VRc1RVRkJUU3hYUVVGWExFZEJRVWNzVFVGQlRTeHZRa0ZCYjBJc1EwRkJReXhqUVVGakxFVkJRVVVzUTBGQlF6dFpRVU5vUlN4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGZEJRVmNzUTBGQlF5eFJRVUZSTEVWQlFVVXNXVUZCV1N4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRExFTkJRVU03V1VGRGJrVXNUVUZCVFN4RFFVRkRMRmxCUVZrc1IwRkJSeXhYUVVGWExFTkJRVU03V1VGRGJFTXNTVUZCU1N4RFFVRkRMRmxCUVZrc1EwRkJReXhWUVVGVkxFTkJRVU1zWjBKQlFXZENMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03VTBGRGVFUTdVVUZCUXl4UFFVRlBMRWRCUVVjc1JVRkJSVHRaUVVOYU96czdPenM3TzJOQlQwVTdXVUZEUml4SlFVRkpMRU5CUVVNc1dVRkJXU3hEUVVGRExGRkJRVkVzUTBGRGVFSXNiVU5CUVcxRE8yZENRVU5xUXl4elJFRkJjMFE3WjBKQlEzUkVMRWRCUVVjc1EwRkJReXhKUVVGSk8yZENRVU5TTEVkQlFVY3NRMEZCUXl4UFFVRlBPMmRDUVVOWUxFbEJRVWs3WjBKQlEwb3NSMEZCUnl4RFFVRkRMRXRCUVVzc1EwRkRXaXhEUVVGRE8xbEJRMFlzVFVGQlRTeERRVUZETEZsQlFWa3NSMEZCUnl4VFFVRlRMRU5CUVVNN1dVRkRhRU1zU1VGQlNTeERRVUZETEZsQlFWa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1owSkJRV2RDTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1UwRkRlRVE3U1VGRFNDeERRVUZETzBsQlJVUXNORUpCUVRSQ08wbEJRM0JDTEV0QlFVc3NRMEZCUXl4clFrRkJhMElzUTBGRE9VSXNUMEZCTUVNc1JVRkRNVU1zVDBGQlR5eEZRVU5RTEZsQlFWa3NSVUZEV2l4WFFVRlhPMUZCUlZnN096czdPenM3VlVGUFJUdFJRVVZHTEUxQlFVMHNSMEZCUnl4SFFVTlFMRTlCUVU4c1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eERRVUZETzFsQlEyaENMRU5CUVVNc1EwRkJReXhOUVVGTkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU03V1VGRGRrTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1VVRkJVU3hGUVVGRkxGTkJRVk1zUlVGQlJTeFRRVUZUTEVWQlFVVXNVMEZCVXl4RlFVRkZMRU5CUVVNN1VVRkZjRVFzVFVGQlRTeE5RVUZOTEVkQlFVY3NSVUZCYTBJc1EwRkJRenRSUVVWc1F5eE5RVUZOTEVOQlFVTXNVMEZCVXl4SFFVRkhMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTTdVVUZETlVNc1RVRkJUU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZETVVJc1RVRkJUU3hEUVVGRExITkNRVUZ6UWl4SFFVRkhMRzlDUVVGdlFpeERRVUZETzFGQlEzSkVMRTFCUVUwc1EwRkJReXhoUVVGaExFZEJRVWNzV1VGQldTeERRVUZETzFGQlEzQkRMRTFCUVUwc1EwRkJReXhUUVVGVExFZEJRVWNzUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXp0UlFVTm9ReXhOUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEU5QlFVOHNRMEZCUXl4TFFVRkxMRU5CUVVNN1VVRkRPVUlzVFVGQlRTeERRVUZETEZGQlFWRXNSMEZCUnl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRE8xRkJSV3hETEcxR1FVRnRSanRSUVVOdVJpeE5RVUZOTEVOQlFVTXNWVUZCVlN4SFFVRkhMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRVU03VVVGRmRFTXNUVUZCVFN4UlFVRlJMRWRCUVVjc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGQlF6dFJRVU51UXl4TlFVRk5MRU5CUVVNc1UwRkJVeXhIUVVGSExGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVVjJReXhOUVVGTkxFZEJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRPMUZCUTNoQ0xFMUJRVTBzUTBGQlF5eEhRVUZITEVkQlFVY3NVMEZCVXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJSVFZDTEUxQlFVMHNZVUZCWVN4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFTkJRVU03VVVGRGNrTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhaUVVGWkxFTkJRVU1zWVVGQllTeERRVUZETEVOQlFVTTdVVUZGTlVNc01FUkJRVEJFTzFGQlF6RkVMRFpGUVVFMlJUdFJRVU0zUlN3eVJVRkJNa1U3VVVGRE0wVXNSVUZCUlR0UlFVTkdMSEZDUVVGeFFqdFJRVU55UWl3d1FrRkJNRUk3VVVGRE1VSXNjME5CUVhORE8xRkJRM1JETEVsQlFVazdVVUZEU2l3MFEwRkJORU03VVVGRk5VTXNUVUZCVFN4alFVRmpMRWRCUVVjc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF6dFJRVU14UXl4TlFVRk5MRU5CUVVNc1pVRkJaU3hIUVVGSExHTkJRV01zUTBGQlF6dFJRVVY0UXl4TlFVRk5MR3RDUVVGclFpeEhRVUZITEU5QlFVOHNRMEZCUXl4VlFVRlZMRU5CUVVNN1VVRkRPVU1zVFVGQlRTeERRVUZETEc5Q1FVRnZRaXhIUVVGSExGbEJRVmtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhEUVVGRE8xRkJSUzlFTEUxQlFVMHNXVUZCV1N4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hOUVVGTkxFTkJRVU1zVlVGQlZTeEhRVUZITEZsQlFWa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRSUVVVdlF5eE5RVUZOTEU5QlFVOHNSMEZCUnl4RlFVRkZMRU5CUVVNN1VVRkRia0lzU1VGQlNTeFJRVUZSTEVkQlFVY3NSVUZCUlN4RFFVRkRPMUZCUTJ4Q0xFbEJRVWtzVDBGQlR5eERRVUZETEdWQlFXVXNSVUZCUlR0WlFVTXpRaXhQUVVGUExFTkJRVU1zWlVGQlpTeERRVUZETEVkQlFVY3NRMEZCUXl4alFVRmpMRU5CUVVNc1JVRkJSVHRuUWtGRE0wTXNUVUZCVFN4RlFVRkZMRWxCUVVrc1JVRkJSU3hMUVVGTExFVkJRVVVzUjBGQlJ5eGpRVUZqTEVOQlFVTTdaMEpCUTNaRExFMUJRVTBzVjBGQlZ5eEhRVUZITEVWQlFVVXNRMEZCUXp0blFrRkRka0lzVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF6dG5Ra0ZEY2tNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eFpRVUZaTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRuUWtGRGRFTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF6dG5Ra0ZETVVJc1NVRkJTU3hKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEV0QlFVc3NWVUZCVlN4RlFVRkZPMjlDUVVOeVF5eFJRVUZSTEVkQlFVY3NTMEZCU3l4RFFVRkRPMmxDUVVOc1FqdFpRVU5JTEVOQlFVTXNRMEZCUXl4RFFVRkRPMU5CUTBvN1VVRkRSQ3hOUVVGTkxFTkJRVU1zVDBGQlR5eEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03VVVGRGVrTXNUVUZCVFN4RFFVRkRMRkZCUVZFc1IwRkJSeXhaUVVGWkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdVVUZGZWtNc1NVRkJTU3hKUVVGSkxFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1YwRkJWeXhGUVVGRkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlR0WlFVTnlSQ3hKUVVGSkxFTkJRVU1zYlVKQlFXMUNMRU5CUVVNc1QwRkJUeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFOQlF6TkRPMkZCUVUwN1dVRkRUQ3hKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEZWQlFWVXNRMEZCUXl4blFrRkJaMElzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0VFFVTjRSRHRKUVVOSUxFTkJRVU03UTBGRFJpSjkiLCJpbXBvcnQgeyBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbFwiO1xuaW1wb3J0IHsgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLXV1aWRcIjtcbmltcG9ydCB7IGJvb2xUb0ludCwgZXNjYXBlU3RyaW5nLCBlc2NhcGVVcmwgfSBmcm9tIFwiLi4vbGliL3N0cmluZy11dGlsc1wiO1xuZXhwb3J0IGNsYXNzIEphdmFzY3JpcHRJbnN0cnVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhUmVjZWl2ZXIpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlY29yZHMgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIgPSBkYXRhUmVjZWl2ZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHJlY2VpdmVkIGNhbGwgYW5kIHZhbHVlcyBkYXRhIGZyb20gdGhlIEpTIEluc3RydW1lbnRhdGlvblxuICAgICAqIGludG8gdGhlIGZvcm1hdCB0aGF0IHRoZSBzY2hlbWEgZXhwZWN0cy5cbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwYXJhbSBzZW5kZXJcbiAgICAgKi9cbiAgICBzdGF0aWMgcHJvY2Vzc0NhbGxzQW5kVmFsdWVzKGRhdGEsIHNlbmRlcikge1xuICAgICAgICBjb25zdCB1cGRhdGUgPSB7fTtcbiAgICAgICAgdXBkYXRlLmV4dGVuc2lvbl9zZXNzaW9uX3V1aWQgPSBleHRlbnNpb25TZXNzaW9uVXVpZDtcbiAgICAgICAgdXBkYXRlLmV2ZW50X29yZGluYWwgPSBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpO1xuICAgICAgICB1cGRhdGUucGFnZV9zY29wZWRfZXZlbnRfb3JkaW5hbCA9IGRhdGEub3JkaW5hbDtcbiAgICAgICAgdXBkYXRlLndpbmRvd19pZCA9IHNlbmRlci50YWIud2luZG93SWQ7XG4gICAgICAgIHVwZGF0ZS50YWJfaWQgPSBzZW5kZXIudGFiLmlkO1xuICAgICAgICB1cGRhdGUuZnJhbWVfaWQgPSBzZW5kZXIuZnJhbWVJZDtcbiAgICAgICAgdXBkYXRlLnNjcmlwdF91cmwgPSBlc2NhcGVVcmwoZGF0YS5zY3JpcHRVcmwpO1xuICAgICAgICB1cGRhdGUuc2NyaXB0X2xpbmUgPSBlc2NhcGVTdHJpbmcoZGF0YS5zY3JpcHRMaW5lKTtcbiAgICAgICAgdXBkYXRlLnNjcmlwdF9jb2wgPSBlc2NhcGVTdHJpbmcoZGF0YS5zY3JpcHRDb2wpO1xuICAgICAgICB1cGRhdGUuZnVuY19uYW1lID0gZXNjYXBlU3RyaW5nKGRhdGEuZnVuY05hbWUpO1xuICAgICAgICB1cGRhdGUuc2NyaXB0X2xvY19ldmFsID0gZXNjYXBlU3RyaW5nKGRhdGEuc2NyaXB0TG9jRXZhbCk7XG4gICAgICAgIHVwZGF0ZS5jYWxsX3N0YWNrID0gZXNjYXBlU3RyaW5nKGRhdGEuY2FsbFN0YWNrKTtcbiAgICAgICAgdXBkYXRlLnN5bWJvbCA9IGVzY2FwZVN0cmluZyhkYXRhLnN5bWJvbCk7XG4gICAgICAgIHVwZGF0ZS5vcGVyYXRpb24gPSBlc2NhcGVTdHJpbmcoZGF0YS5vcGVyYXRpb24pO1xuICAgICAgICB1cGRhdGUudmFsdWUgPSBlc2NhcGVTdHJpbmcoZGF0YS52YWx1ZSk7XG4gICAgICAgIHVwZGF0ZS50aW1lX3N0YW1wID0gZGF0YS50aW1lU3RhbXA7XG4gICAgICAgIHVwZGF0ZS5pbmNvZ25pdG8gPSBib29sVG9JbnQoc2VuZGVyLnRhYi5pbmNvZ25pdG8pO1xuICAgICAgICAvLyBkb2N1bWVudF91cmwgaXMgdGhlIGN1cnJlbnQgZnJhbWUncyBkb2N1bWVudCBocmVmXG4gICAgICAgIC8vIHRvcF9sZXZlbF91cmwgaXMgdGhlIHRvcC1sZXZlbCBmcmFtZSdzIGRvY3VtZW50IGhyZWZcbiAgICAgICAgdXBkYXRlLmRvY3VtZW50X3VybCA9IGVzY2FwZVVybChzZW5kZXIudXJsKTtcbiAgICAgICAgdXBkYXRlLnRvcF9sZXZlbF91cmwgPSBlc2NhcGVVcmwoc2VuZGVyLnRhYi51cmwpO1xuICAgICAgICBpZiAoZGF0YS5vcGVyYXRpb24gPT09IFwiY2FsbFwiICYmIGRhdGEuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB1cGRhdGUuYXJndW1lbnRzID0gZXNjYXBlU3RyaW5nKEpTT04uc3RyaW5naWZ5KGRhdGEuYXJncykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cGRhdGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgbWVzc2FnZXMgZnJvbSBwYWdlL2NvbnRlbnQvYmFja2dyb3VuZCBzY3JpcHRzIGluamVjdGVkIHRvIGluc3RydW1lbnQgSmF2YVNjcmlwdCBBUElzXG4gICAgICovXG4gICAgbGlzdGVuKCkge1xuICAgICAgICB0aGlzLm9uTWVzc2FnZUxpc3RlbmVyID0gKG1lc3NhZ2UsIHNlbmRlcikgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5kZWJ1ZyhcImphdmFzY3JpcHQtaW5zdHJ1bWVudGF0aW9uIGJhY2tncm91bmQgbGlzdGVuZXJcIiwge21lc3NhZ2UsIHNlbmRlcn0sIHRoaXMuY29uZmlndXJlZCk7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5uYW1lc3BhY2UgJiZcbiAgICAgICAgICAgICAgICBtZXNzYWdlLm5hbWVzcGFjZSA9PT0gXCJqYXZhc2NyaXB0LWluc3RydW1lbnRhdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVKc0luc3RydW1lbnRhdGlvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgYnJvd3Nlci5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcih0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRWl0aGVyIHNlbmRzIHRoZSBsb2cgZGF0YSB0byB0aGUgZGF0YVJlY2VpdmVyIG9yIHN0b3JlIGl0IGluIG1lbW9yeVxuICAgICAqIGFzIGEgcGVuZGluZyByZWNvcmQgaWYgdGhlIEpTIGluc3RydW1lbnRhdGlvbiBpcyBub3QgeWV0IGNvbmZpZ3VyZWRcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgICAqIEBwYXJhbSBzZW5kZXJcbiAgICAgKi9cbiAgICBoYW5kbGVKc0luc3RydW1lbnRhdGlvbk1lc3NhZ2UobWVzc2FnZSwgc2VuZGVyKSB7XG4gICAgICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwibG9nQ2FsbFwiOlxuICAgICAgICAgICAgY2FzZSBcImxvZ1ZhbHVlXCI6XG4gICAgICAgICAgICAgICAgY29uc3QgdXBkYXRlID0gSmF2YXNjcmlwdEluc3RydW1lbnQucHJvY2Vzc0NhbGxzQW5kVmFsdWVzKG1lc3NhZ2UuZGF0YSwgc2VuZGVyKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWd1cmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5jcmF3bF9pZCA9IHRoaXMuY3Jhd2xJRDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIuc2F2ZVJlY29yZChcImphdmFzY3JpcHRcIiwgdXBkYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ1JlY29yZHMucHVzaCh1cGRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydHMgbGlzdGVuaW5nIGlmIGhhdmVuJ3QgZG9uZSBzbyBhbHJlYWR5LCBzZXRzIHRoZSBjcmF3bCBJRCxcbiAgICAgKiBtYXJrcyB0aGUgSlMgaW5zdHJ1bWVudGF0aW9uIGFzIGNvbmZpZ3VyZWQgYW5kIHNlbmRzIGFueSBwZW5kaW5nXG4gICAgICogcmVjb3JkcyB0aGF0IGhhdmUgYmVlbiByZWNlaXZlZCB1cCB1bnRpbCB0aGlzIHBvaW50LlxuICAgICAqIEBwYXJhbSBjcmF3bElEXG4gICAgICovXG4gICAgcnVuKGNyYXdsSUQpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uTWVzc2FnZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Jhd2xJRCA9IGNyYXdsSUQ7XG4gICAgICAgIHRoaXMuY29uZmlndXJlZCA9IHRydWU7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlY29yZHMubWFwKHVwZGF0ZSA9PiB7XG4gICAgICAgICAgICB1cGRhdGUuY3Jhd2xfaWQgPSB0aGlzLmNyYXdsSUQ7XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwiamF2YXNjcmlwdFwiLCB1cGRhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgcmVnaXN0ZXJDb250ZW50U2NyaXB0KHRlc3RpbmcsIG1vZHVsZXMpIHtcbiAgICAgICAgY29uc3QgY29udGVudFNjcmlwdENvbmZpZyA9IHtcbiAgICAgICAgICAgIHRlc3RpbmcsXG4gICAgICAgICAgICBtb2R1bGVzLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoY29udGVudFNjcmlwdENvbmZpZykge1xuICAgICAgICAgICAgLy8gVE9ETzogQXZvaWQgdXNpbmcgd2luZG93IHRvIHBhc3MgdGhlIGNvbnRlbnQgc2NyaXB0IGNvbmZpZ1xuICAgICAgICAgICAgYXdhaXQgYnJvd3Nlci5jb250ZW50U2NyaXB0cy5yZWdpc3Rlcih7XG4gICAgICAgICAgICAgICAganM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogYHdpbmRvdy5vcGVuV3BtQ29udGVudFNjcmlwdENvbmZpZyA9ICR7SlNPTi5zdHJpbmdpZnkoY29udGVudFNjcmlwdENvbmZpZyl9O2AsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBtYXRjaGVzOiBbXCI8YWxsX3VybHM+XCJdLFxuICAgICAgICAgICAgICAgIGFsbEZyYW1lczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBydW5BdDogXCJkb2N1bWVudF9zdGFydFwiLFxuICAgICAgICAgICAgICAgIG1hdGNoQWJvdXRCbGFuazogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBicm93c2VyLmNvbnRlbnRTY3JpcHRzLnJlZ2lzdGVyKHtcbiAgICAgICAgICAgIGpzOiBbeyBmaWxlOiBcIi9jb250ZW50LmpzXCIgfV0sXG4gICAgICAgICAgICBtYXRjaGVzOiBbXCI8YWxsX3VybHM+XCJdLFxuICAgICAgICAgICAgYWxsRnJhbWVzOiB0cnVlLFxuICAgICAgICAgICAgcnVuQXQ6IFwiZG9jdW1lbnRfc3RhcnRcIixcbiAgICAgICAgICAgIG1hdGNoQWJvdXRCbGFuazogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIHRoaXMucGVuZGluZ1JlY29yZHMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMub25NZXNzYWdlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIodGhpcy5vbk1lc3NhZ2VMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhbUYyWVhOamNtbHdkQzFwYm5OMGNuVnRaVzUwTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJKaFkydG5jbTkxYm1RdmFtRjJZWE5qY21sd2RDMXBibk4wY25WdFpXNTBMblJ6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVOQkxFOUJRVThzUlVGQlJTeDFRa0ZCZFVJc1JVRkJSU3hOUVVGTkxIZERRVUYzUXl4RFFVRkRPMEZCUTJwR0xFOUJRVThzUlVGQlJTeHZRa0ZCYjBJc1JVRkJSU3hOUVVGTkxDdENRVUVyUWl4RFFVRkRPMEZCUTNKRkxFOUJRVThzUlVGQlJTeFRRVUZUTEVWQlFVVXNXVUZCV1N4RlFVRkZMRk5CUVZNc1JVRkJSU3hOUVVGTkxIRkNRVUZ4UWl4RFFVRkRPMEZCUjNwRkxFMUJRVTBzVDBGQlR5eHZRa0ZCYjBJN1NVRTBReTlDTEZsQlFWa3NXVUZCV1R0UlFVcG9RaXhsUVVGVkxFZEJRVmtzUzBGQlN5eERRVUZETzFGQlF6VkNMRzFDUVVGakxFZEJRVEJDTEVWQlFVVXNRMEZCUXp0UlFVbHFSQ3hKUVVGSkxFTkJRVU1zV1VGQldTeEhRVUZITEZsQlFWa3NRMEZCUXp0SlFVTnVReXhEUVVGRE8wbEJOME5FT3pzN096dFBRVXRITzBsQlEwc3NUVUZCVFN4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVsQlFVa3NSVUZCUlN4TlFVRnhRanRSUVVNNVJDeE5RVUZOTEUxQlFVMHNSMEZCUnl4RlFVRjVRaXhEUVVGRE8xRkJRM3BETEUxQlFVMHNRMEZCUXl4elFrRkJjMElzUjBGQlJ5eHZRa0ZCYjBJc1EwRkJRenRSUVVOeVJDeE5RVUZOTEVOQlFVTXNZVUZCWVN4SFFVRkhMSFZDUVVGMVFpeEZRVUZGTEVOQlFVTTdVVUZEYWtRc1RVRkJUU3hEUVVGRExIbENRVUY1UWl4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03VVVGRGFFUXNUVUZCVFN4RFFVRkRMRk5CUVZNc1IwRkJSeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXp0UlFVTjJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRE8xRkJRemxDTEUxQlFVMHNRMEZCUXl4UlFVRlJMRWRCUVVjc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF6dFJRVU5xUXl4TlFVRk5MRU5CUVVNc1ZVRkJWU3hIUVVGSExGTkJRVk1zUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNN1VVRkRPVU1zVFVGQlRTeERRVUZETEZkQlFWY3NSMEZCUnl4WlFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzFGQlEyNUVMRTFCUVUwc1EwRkJReXhWUVVGVkxFZEJRVWNzV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJRenRSUVVOcVJDeE5RVUZOTEVOQlFVTXNVMEZCVXl4SFFVRkhMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdVVUZETDBNc1RVRkJUU3hEUVVGRExHVkJRV1VzUjBGQlJ5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMR0ZCUVdFc1EwRkJReXhEUVVGRE8xRkJRekZFTEUxQlFVMHNRMEZCUXl4VlFVRlZMRWRCUVVjc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hOUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03VVVGRE1VTXNUVUZCVFN4RFFVRkRMRk5CUVZNc1IwRkJSeXhaUVVGWkxFTkJRVU1zU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRPMUZCUTJoRUxFMUJRVTBzUTBGQlF5eExRVUZMTEVkQlFVY3NXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dFJRVU40UXl4TlFVRk5MRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTTdVVUZEYmtNc1RVRkJUU3hEUVVGRExGTkJRVk1zUjBGQlJ5eFRRVUZUTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF6dFJRVVZ1UkN4dlJFRkJiMFE3VVVGRGNFUXNkVVJCUVhWRU8xRkJRM1pFTEUxQlFVMHNRMEZCUXl4WlFVRlpMRWRCUVVjc1UwRkJVeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTTFReXhOUVVGTkxFTkJRVU1zWVVGQllTeEhRVUZITEZOQlFWTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFGQlJXcEVMRWxCUVVrc1NVRkJTU3hEUVVGRExGTkJRVk1zUzBGQlN5eE5RVUZOTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eEZRVUZGTzFsQlEzSkVMRTFCUVUwc1EwRkJReXhUUVVGVExFZEJRVWNzV1VGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTTdVMEZETlVRN1VVRkZSQ3hQUVVGUExFMUJRVTBzUTBGQlF6dEpRVU5vUWl4RFFVRkRPMGxCVjBRN08wOUJSVWM3U1VGRFNTeE5RVUZOTzFGQlExZ3NTVUZCU1N4RFFVRkRMR2xDUVVGcFFpeEhRVUZITEVOQlFVTXNUMEZCVHl4RlFVRkZMRTFCUVUwc1JVRkJSU3hGUVVGRk8xbEJRek5ETEhWSFFVRjFSenRaUVVOMlJ5eEpRVU5GTEU5QlFVOHNRMEZCUXl4VFFVRlRPMmRDUVVOcVFpeFBRVUZQTEVOQlFVTXNVMEZCVXl4TFFVRkxMRFJDUVVFMFFpeEZRVU5zUkR0blFrRkRRU3hKUVVGSkxFTkJRVU1zT0VKQlFUaENMRU5CUVVNc1QwRkJUeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzJGQlEzUkVPMUZCUTBnc1EwRkJReXhEUVVGRE8xRkJRMFlzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUVVNc1YwRkJWeXhEUVVGRExFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhEUVVGRE8wbEJRMmhGTEVOQlFVTTdTVUZGUkRzN096czdUMEZMUnp0SlFVTkpMRGhDUVVFNFFpeERRVUZETEU5QlFVOHNSVUZCUlN4TlFVRnhRanRSUVVOc1JTeFJRVUZSTEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVN1dVRkRjRUlzUzBGQlN5eFRRVUZUTEVOQlFVTTdXVUZEWml4TFFVRkxMRlZCUVZVN1owSkJRMklzVFVGQlRTeE5RVUZOTEVkQlFVY3NiMEpCUVc5Q0xFTkJRVU1zY1VKQlFYRkNMRU5CUTNaRUxFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlExb3NUVUZCVFN4RFFVTlFMRU5CUVVNN1owSkJRMFlzU1VGQlNTeEpRVUZKTEVOQlFVTXNWVUZCVlN4RlFVRkZPMjlDUVVOdVFpeE5RVUZOTEVOQlFVTXNVVUZCVVN4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03YjBKQlF5OUNMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zVlVGQlZTeERRVUZETEZsQlFWa3NSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRwUWtGRGNFUTdjVUpCUVUwN2IwSkJRMHdzU1VGQlNTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03YVVKQlEyeERPMmRDUVVORUxFMUJRVTA3VTBGRFZEdEpRVU5JTEVOQlFVTTdTVUZGUkRzN096czdUMEZMUnp0SlFVTkpMRWRCUVVjc1EwRkJReXhQUVVGUE8xRkJRMmhDTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc2FVSkJRV2xDTEVWQlFVVTdXVUZETTBJc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETzFOQlEyWTdVVUZEUkN4SlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFOUJRVThzUTBGQlF6dFJRVU4yUWl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF6dFJRVU4yUWl4SlFVRkpMRU5CUVVNc1kwRkJZeXhEUVVGRExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlR0WlFVTXZRaXhOUVVGTkxFTkJRVU1zVVVGQlVTeEhRVUZITEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNN1dVRkRMMElzU1VGQlNTeERRVUZETEZsQlFWa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1dVRkJXU3hGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzFGQlEzSkVMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMHdzUTBGQlF6dEpRVVZOTEV0QlFVc3NRMEZCUXl4eFFrRkJjVUlzUTBGQlF5eFBRVUZQTEVWQlFVVXNUMEZCVHp0UlFVTnFSQ3hOUVVGTkxHMUNRVUZ0UWl4SFFVRkhPMWxCUXpGQ0xFOUJRVTg3V1VGRFVDeFBRVUZQTzFOQlExSXNRMEZCUXp0UlFVTkdMRWxCUVVrc2JVSkJRVzFDTEVWQlFVVTdXVUZEZGtJc05rUkJRVFpFTzFsQlF6ZEVMRTFCUVUwc1QwRkJUeXhEUVVGRExHTkJRV01zUTBGQlF5eFJRVUZSTEVOQlFVTTdaMEpCUTNCRExFVkJRVVVzUlVGQlJUdHZRa0ZEUmp0M1FrRkRSU3hKUVVGSkxFVkJRVVVzZFVOQlFYVkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRM3BFTEcxQ1FVRnRRaXhEUVVOd1FpeEhRVUZITzNGQ1FVTk1PMmxDUVVOR08yZENRVU5FTEU5QlFVOHNSVUZCUlN4RFFVRkRMRmxCUVZrc1EwRkJRenRuUWtGRGRrSXNVMEZCVXl4RlFVRkZMRWxCUVVrN1owSkJRMllzUzBGQlN5eEZRVUZGTEdkQ1FVRm5RanRuUWtGRGRrSXNaVUZCWlN4RlFVRkZMRWxCUVVrN1lVRkRkRUlzUTBGQlF5eERRVUZETzFOQlEwbzdVVUZEUkN4UFFVRlBMRTlCUVU4c1EwRkJReXhqUVVGakxFTkJRVU1zVVVGQlVTeERRVUZETzFsQlEzSkRMRVZCUVVVc1JVRkJSU3hEUVVGRExFVkJRVVVzU1VGQlNTeEZRVUZGTEdGQlFXRXNSVUZCUlN4RFFVRkRPMWxCUXpkQ0xFOUJRVThzUlVGQlJTeERRVUZETEZsQlFWa3NRMEZCUXp0WlFVTjJRaXhUUVVGVExFVkJRVVVzU1VGQlNUdFpRVU5tTEV0QlFVc3NSVUZCUlN4blFrRkJaMEk3V1VGRGRrSXNaVUZCWlN4RlFVRkZMRWxCUVVrN1UwRkRkRUlzUTBGQlF5eERRVUZETzBsQlEwd3NRMEZCUXp0SlFVVk5MRTlCUVU4N1VVRkRXaXhKUVVGSkxFTkJRVU1zWTBGQll5eEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVTjZRaXhKUVVGSkxFbEJRVWtzUTBGQlF5eHBRa0ZCYVVJc1JVRkJSVHRaUVVNeFFpeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEdsQ1FVRnBRaXhEUVVGRExFTkJRVU03VTBGRGJFVTdTVUZEU0N4RFFVRkRPME5CUTBZaWZRPT0iLCJpbXBvcnQgeyBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCB9IGZyb20gXCIuLi9saWIvZXh0ZW5zaW9uLXNlc3Npb24tZXZlbnQtb3JkaW5hbFwiO1xuaW1wb3J0IHsgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgfSBmcm9tIFwiLi4vbGliL2V4dGVuc2lvbi1zZXNzaW9uLXV1aWRcIjtcbmltcG9ydCB7IFBlbmRpbmdOYXZpZ2F0aW9uIH0gZnJvbSBcIi4uL2xpYi9wZW5kaW5nLW5hdmlnYXRpb25cIjtcbmltcG9ydCB7IGJvb2xUb0ludCwgZXNjYXBlU3RyaW5nLCBlc2NhcGVVcmwgfSBmcm9tIFwiLi4vbGliL3N0cmluZy11dGlsc1wiO1xuaW1wb3J0IHsgbWFrZVVVSUQgfSBmcm9tIFwiLi4vbGliL3V1aWRcIjtcbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1XZWJOYXZpZ2F0aW9uQmFzZUV2ZW50RGV0YWlsc1RvT3BlbldQTVNjaGVtYSA9IGFzeW5jIChjcmF3bElELCBkZXRhaWxzKSA9PiB7XG4gICAgY29uc3QgdGFiID0gZGV0YWlscy50YWJJZCA+IC0xXG4gICAgICAgID8gYXdhaXQgYnJvd3Nlci50YWJzLmdldChkZXRhaWxzLnRhYklkKVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHdpbmRvd0lkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBpbmNvZ25pdG86IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvb2tpZVN0b3JlSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG9wZW5lclRhYklkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB3aWR0aDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgaGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgY29uc3Qgd2luZG93ID0gdGFiLndpbmRvd0lkXG4gICAgICAgID8gYXdhaXQgYnJvd3Nlci53aW5kb3dzLmdldCh0YWIud2luZG93SWQpXG4gICAgICAgIDogeyB3aWR0aDogdW5kZWZpbmVkLCBoZWlnaHQ6IHVuZGVmaW5lZCwgdHlwZTogdW5kZWZpbmVkIH07XG4gICAgY29uc3QgbmF2aWdhdGlvbiA9IHtcbiAgICAgICAgY3Jhd2xfaWQ6IGNyYXdsSUQsXG4gICAgICAgIGluY29nbml0bzogYm9vbFRvSW50KHRhYi5pbmNvZ25pdG8pLFxuICAgICAgICBleHRlbnNpb25fc2Vzc2lvbl91dWlkOiBleHRlbnNpb25TZXNzaW9uVXVpZCxcbiAgICAgICAgcHJvY2Vzc19pZDogZGV0YWlscy5wcm9jZXNzSWQsXG4gICAgICAgIHdpbmRvd19pZDogdGFiLndpbmRvd0lkLFxuICAgICAgICB0YWJfaWQ6IGRldGFpbHMudGFiSWQsXG4gICAgICAgIHRhYl9vcGVuZXJfdGFiX2lkOiB0YWIub3BlbmVyVGFiSWQsXG4gICAgICAgIGZyYW1lX2lkOiBkZXRhaWxzLmZyYW1lSWQsXG4gICAgICAgIHdpbmRvd193aWR0aDogd2luZG93LndpZHRoLFxuICAgICAgICB3aW5kb3dfaGVpZ2h0OiB3aW5kb3cuaGVpZ2h0LFxuICAgICAgICB3aW5kb3dfdHlwZTogd2luZG93LnR5cGUsXG4gICAgICAgIHRhYl93aWR0aDogdGFiLndpZHRoLFxuICAgICAgICB0YWJfaGVpZ2h0OiB0YWIuaGVpZ2h0LFxuICAgICAgICB0YWJfY29va2llX3N0b3JlX2lkOiBlc2NhcGVTdHJpbmcodGFiLmNvb2tpZVN0b3JlSWQpLFxuICAgICAgICB1dWlkOiBtYWtlVVVJRCgpLFxuICAgICAgICB1cmw6IGVzY2FwZVVybChkZXRhaWxzLnVybCksXG4gICAgfTtcbiAgICByZXR1cm4gbmF2aWdhdGlvbjtcbn07XG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkluc3RydW1lbnQge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFSZWNlaXZlcikge1xuICAgICAgICB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9ucyA9IHt9O1xuICAgICAgICB0aGlzLmRhdGFSZWNlaXZlciA9IGRhdGFSZWNlaXZlcjtcbiAgICB9XG4gICAgc3RhdGljIG5hdmlnYXRpb25JZChwcm9jZXNzSWQsIHRhYklkLCBmcmFtZUlkKSB7XG4gICAgICAgIHJldHVybiBgJHtwcm9jZXNzSWR9LSR7dGFiSWR9LSR7ZnJhbWVJZH1gO1xuICAgIH1cbiAgICBydW4oY3Jhd2xJRCkge1xuICAgICAgICB0aGlzLm9uQmVmb3JlTmF2aWdhdGVMaXN0ZW5lciA9IGFzeW5jIChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uSWQgPSBOYXZpZ2F0aW9uSW5zdHJ1bWVudC5uYXZpZ2F0aW9uSWQoZGV0YWlscy5wcm9jZXNzSWQsIGRldGFpbHMudGFiSWQsIGRldGFpbHMuZnJhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nTmF2aWdhdGlvbiA9IHRoaXMuaW5zdGFudGlhdGVQZW5kaW5nTmF2aWdhdGlvbihuYXZpZ2F0aW9uSWQpO1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdGlvbiA9IGF3YWl0IHRyYW5zZm9ybVdlYk5hdmlnYXRpb25CYXNlRXZlbnREZXRhaWxzVG9PcGVuV1BNU2NoZW1hKGNyYXdsSUQsIGRldGFpbHMpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5wYXJlbnRfZnJhbWVfaWQgPSBkZXRhaWxzLnBhcmVudEZyYW1lSWQ7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV9ldmVudF9vcmRpbmFsID0gaW5jcmVtZW50ZWRFdmVudE9yZGluYWwoKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX3RpbWVfc3RhbXAgPSBuZXcgRGF0ZShkZXRhaWxzLnRpbWVTdGFtcCkudG9JU09TdHJpbmcoKTtcbiAgICAgICAgICAgIHBlbmRpbmdOYXZpZ2F0aW9uLnJlc29sdmVPbkJlZm9yZU5hdmlnYXRlRXZlbnROYXZpZ2F0aW9uKG5hdmlnYXRpb24pO1xuICAgICAgICB9O1xuICAgICAgICBicm93c2VyLndlYk5hdmlnYXRpb24ub25CZWZvcmVOYXZpZ2F0ZS5hZGRMaXN0ZW5lcih0aGlzLm9uQmVmb3JlTmF2aWdhdGVMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMub25Db21taXR0ZWRMaXN0ZW5lciA9IGFzeW5jIChkZXRhaWxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uSWQgPSBOYXZpZ2F0aW9uSW5zdHJ1bWVudC5uYXZpZ2F0aW9uSWQoZGV0YWlscy5wcm9jZXNzSWQsIGRldGFpbHMudGFiSWQsIGRldGFpbHMuZnJhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0aW9uID0gYXdhaXQgdHJhbnNmb3JtV2ViTmF2aWdhdGlvbkJhc2VFdmVudERldGFpbHNUb09wZW5XUE1TY2hlbWEoY3Jhd2xJRCwgZGV0YWlscyk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLnRyYW5zaXRpb25fcXVhbGlmaWVycyA9IGVzY2FwZVN0cmluZyhKU09OLnN0cmluZ2lmeShkZXRhaWxzLnRyYW5zaXRpb25RdWFsaWZpZXJzKSk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uLnRyYW5zaXRpb25fdHlwZSA9IGVzY2FwZVN0cmluZyhkZXRhaWxzLnRyYW5zaXRpb25UeXBlKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb24uY29tbWl0dGVkX2V2ZW50X29yZGluYWwgPSBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCgpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5jb21taXR0ZWRfdGltZV9zdGFtcCA9IG5ldyBEYXRlKGRldGFpbHMudGltZVN0YW1wKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgICAgLy8gaW5jbHVkZSBhdHRyaWJ1dGVzIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgb25CZWZvcmVOYXZpZ2F0aW9uIGV2ZW50XG4gICAgICAgICAgICBjb25zdCBwZW5kaW5nTmF2aWdhdGlvbiA9IHRoaXMuZ2V0UGVuZGluZ05hdmlnYXRpb24obmF2aWdhdGlvbklkKTtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHBlbmRpbmdOYXZpZ2F0aW9uLnJlc29sdmVPbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbihuYXZpZ2F0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IHBlbmRpbmdOYXZpZ2F0aW9uLnJlc29sdmVkV2l0aGluVGltZW91dCgxMDAwKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbiA9IGF3YWl0IHBlbmRpbmdOYXZpZ2F0aW9uLm9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb247XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb24ucGFyZW50X2ZyYW1lX2lkID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24ucGFyZW50X2ZyYW1lX2lkO1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uLmJlZm9yZV9uYXZpZ2F0ZV9ldmVudF9vcmRpbmFsID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmVmb3JlTmF2aWdhdGVFdmVudE5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX2V2ZW50X29yZGluYWw7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb24uYmVmb3JlX25hdmlnYXRlX3RpbWVfc3RhbXAgPVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbi5iZWZvcmVfbmF2aWdhdGVfdGltZV9zdGFtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5zYXZlUmVjb3JkKFwibmF2aWdhdGlvbnNcIiwgbmF2aWdhdGlvbik7XG4gICAgICAgIH07XG4gICAgICAgIGJyb3dzZXIud2ViTmF2aWdhdGlvbi5vbkNvbW1pdHRlZC5hZGRMaXN0ZW5lcih0aGlzLm9uQ29tbWl0dGVkTGlzdGVuZXIpO1xuICAgIH1cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICBpZiAodGhpcy5vbkJlZm9yZU5hdmlnYXRlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGJyb3dzZXIud2ViTmF2aWdhdGlvbi5vbkJlZm9yZU5hdmlnYXRlLnJlbW92ZUxpc3RlbmVyKHRoaXMub25CZWZvcmVOYXZpZ2F0ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkNvbW1pdHRlZExpc3RlbmVyKSB7XG4gICAgICAgICAgICBicm93c2VyLndlYk5hdmlnYXRpb24ub25Db21taXR0ZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkNvbW1pdHRlZExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW50aWF0ZVBlbmRpbmdOYXZpZ2F0aW9uKG5hdmlnYXRpb25JZCkge1xuICAgICAgICB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9uc1tuYXZpZ2F0aW9uSWRdID0gbmV3IFBlbmRpbmdOYXZpZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdOYXZpZ2F0aW9uc1tuYXZpZ2F0aW9uSWRdO1xuICAgIH1cbiAgICBnZXRQZW5kaW5nTmF2aWdhdGlvbihuYXZpZ2F0aW9uSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ05hdmlnYXRpb25zW25hdmlnYXRpb25JZF07XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYm1GMmFXZGhkR2x2YmkxcGJuTjBjblZ0Wlc1MExtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwySmhZMnRuY205MWJtUXZibUYyYVdkaGRHbHZiaTFwYm5OMGNuVnRaVzUwTG5SeklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJMRTlCUVU4c1JVRkJSU3gxUWtGQmRVSXNSVUZCUlN4TlFVRk5MSGREUVVGM1F5eERRVUZETzBGQlEycEdMRTlCUVU4c1JVRkJSU3h2UWtGQmIwSXNSVUZCUlN4TlFVRk5MQ3RDUVVFclFpeERRVUZETzBGQlEzSkZMRTlCUVU4c1JVRkJSU3hwUWtGQmFVSXNSVUZCUlN4TlFVRk5MREpDUVVFeVFpeERRVUZETzBGQlF6bEVMRTlCUVU4c1JVRkJSU3hUUVVGVExFVkJRVVVzV1VGQldTeEZRVUZGTEZOQlFWTXNSVUZCUlN4TlFVRk5MSEZDUVVGeFFpeERRVUZETzBGQlEzcEZMRTlCUVU4c1JVRkJSU3hSUVVGUkxFVkJRVVVzVFVGQlRTeGhRVUZoTEVOQlFVTTdRVUZSZGtNc1RVRkJUU3hEUVVGRExFMUJRVTBzY1VSQlFYRkVMRWRCUVVjc1MwRkJTeXhGUVVONFJTeFBRVUZQTEVWQlExQXNUMEZCYzBNc1JVRkRha0lzUlVGQlJUdEpRVU4yUWl4TlFVRk5MRWRCUVVjc1IwRkRVQ3hQUVVGUExFTkJRVU1zUzBGQlN5eEhRVUZITEVOQlFVTXNRMEZCUXp0UlFVTm9RaXhEUVVGRExFTkJRVU1zVFVGQlRTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETzFGQlEzWkRMRU5CUVVNc1EwRkJRenRaUVVORkxGRkJRVkVzUlVGQlJTeFRRVUZUTzFsQlEyNUNMRk5CUVZNc1JVRkJSU3hUUVVGVE8xbEJRM0JDTEdGQlFXRXNSVUZCUlN4VFFVRlRPMWxCUTNoQ0xGZEJRVmNzUlVGQlJTeFRRVUZUTzFsQlEzUkNMRXRCUVVzc1JVRkJSU3hUUVVGVE8xbEJRMmhDTEUxQlFVMHNSVUZCUlN4VFFVRlRPMU5CUTJ4Q0xFTkJRVU03U1VGRFVpeE5RVUZOTEUxQlFVMHNSMEZCUnl4SFFVRkhMRU5CUVVNc1VVRkJVVHRSUVVONlFpeERRVUZETEVOQlFVTXNUVUZCVFN4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNVVUZCVVN4RFFVRkRPMUZCUTNwRExFTkJRVU1zUTBGQlF5eEZRVUZGTEV0QlFVc3NSVUZCUlN4VFFVRlRMRVZCUVVVc1RVRkJUU3hGUVVGRkxGTkJRVk1zUlVGQlJTeEpRVUZKTEVWQlFVVXNVMEZCVXl4RlFVRkZMRU5CUVVNN1NVRkROMFFzVFVGQlRTeFZRVUZWTEVkQlFXVTdVVUZETjBJc1VVRkJVU3hGUVVGRkxFOUJRVTg3VVVGRGFrSXNVMEZCVXl4RlFVRkZMRk5CUVZNc1EwRkJReXhIUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETzFGQlEyNURMSE5DUVVGelFpeEZRVUZGTEc5Q1FVRnZRanRSUVVNMVF5eFZRVUZWTEVWQlFVVXNUMEZCVHl4RFFVRkRMRk5CUVZNN1VVRkROMElzVTBGQlV5eEZRVUZGTEVkQlFVY3NRMEZCUXl4UlFVRlJPMUZCUTNaQ0xFMUJRVTBzUlVGQlJTeFBRVUZQTEVOQlFVTXNTMEZCU3p0UlFVTnlRaXhwUWtGQmFVSXNSVUZCUlN4SFFVRkhMRU5CUVVNc1YwRkJWenRSUVVOc1F5eFJRVUZSTEVWQlFVVXNUMEZCVHl4RFFVRkRMRTlCUVU4N1VVRkRla0lzV1VGQldTeEZRVUZGTEUxQlFVMHNRMEZCUXl4TFFVRkxPMUZCUXpGQ0xHRkJRV0VzUlVGQlJTeE5RVUZOTEVOQlFVTXNUVUZCVFR0UlFVTTFRaXhYUVVGWExFVkJRVVVzVFVGQlRTeERRVUZETEVsQlFVazdVVUZEZUVJc1UwRkJVeXhGUVVGRkxFZEJRVWNzUTBGQlF5eExRVUZMTzFGQlEzQkNMRlZCUVZVc1JVRkJSU3hIUVVGSExFTkJRVU1zVFVGQlRUdFJRVU4wUWl4dFFrRkJiVUlzUlVGQlJTeFpRVUZaTEVOQlFVTXNSMEZCUnl4RFFVRkRMR0ZCUVdFc1EwRkJRenRSUVVOd1JDeEpRVUZKTEVWQlFVVXNVVUZCVVN4RlFVRkZPMUZCUTJoQ0xFZEJRVWNzUlVGQlJTeFRRVUZUTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJRenRMUVVNMVFpeERRVUZETzBsQlEwWXNUMEZCVHl4VlFVRlZMRU5CUVVNN1FVRkRjRUlzUTBGQlF5eERRVUZETzBGQlJVWXNUVUZCVFN4UFFVRlBMRzlDUVVGdlFqdEpRVmN2UWl4WlFVRlpMRmxCUVZrN1VVRkthRUlzZFVKQlFXdENMRWRCUlhSQ0xFVkJRVVVzUTBGQlF6dFJRVWRNTEVsQlFVa3NRMEZCUXl4WlFVRlpMRWRCUVVjc1dVRkJXU3hEUVVGRE8wbEJRMjVETEVOQlFVTTdTVUZhVFN4TlFVRk5MRU5CUVVNc1dVRkJXU3hEUVVGRExGTkJRVk1zUlVGQlJTeExRVUZMTEVWQlFVVXNUMEZCVHp0UlFVTnNSQ3hQUVVGUExFZEJRVWNzVTBGQlV5eEpRVUZKTEV0QlFVc3NTVUZCU1N4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVNMVF5eERRVUZETzBsQldVMHNSMEZCUnl4RFFVRkRMRTlCUVU4N1VVRkRhRUlzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhIUVVGSExFdEJRVXNzUlVGRGJrTXNUMEZCYTBRc1JVRkRiRVFzUlVGQlJUdFpRVU5HTEUxQlFVMHNXVUZCV1N4SFFVRkhMRzlDUVVGdlFpeERRVUZETEZsQlFWa3NRMEZEY0VRc1QwRkJUeXhEUVVGRExGTkJRVk1zUlVGRGFrSXNUMEZCVHl4RFFVRkRMRXRCUVVzc1JVRkRZaXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVU5vUWl4RFFVRkRPMWxCUTBZc1RVRkJUU3hwUWtGQmFVSXNSMEZCUnl4SlFVRkpMRU5CUVVNc05FSkJRVFJDTEVOQlFVTXNXVUZCV1N4RFFVRkRMRU5CUVVNN1dVRkRNVVVzVFVGQlRTeFZRVUZWTEVkQlFXVXNUVUZCVFN4eFJFRkJjVVFzUTBGRGVFWXNUMEZCVHl4RlFVTlFMRTlCUVU4c1EwRkRVaXhEUVVGRE8xbEJRMFlzVlVGQlZTeERRVUZETEdWQlFXVXNSMEZCUnl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRE8xbEJRMjVFTEZWQlFWVXNRMEZCUXl3MlFrRkJOa0lzUjBGQlJ5eDFRa0ZCZFVJc1JVRkJSU3hEUVVGRE8xbEJRM0pGTEZWQlFWVXNRMEZCUXl3d1FrRkJNRUlzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZET1VNc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGRGJFSXNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRaUVVOb1FpeHBRa0ZCYVVJc1EwRkJReXh6UTBGQmMwTXNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVOMlJTeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRmRCUVZjc1EwRkRhRVFzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhEUVVNNVFpeERRVUZETzFGQlEwWXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeEhRVUZITEV0QlFVc3NSVUZET1VJc1QwRkJOa01zUlVGRE4wTXNSVUZCUlR0WlFVTkdMRTFCUVUwc1dVRkJXU3hIUVVGSExHOUNRVUZ2UWl4RFFVRkRMRmxCUVZrc1EwRkRjRVFzVDBGQlR5eERRVUZETEZOQlFWTXNSVUZEYWtJc1QwRkJUeXhEUVVGRExFdEJRVXNzUlVGRFlpeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVTm9RaXhEUVVGRE8xbEJRMFlzVFVGQlRTeFZRVUZWTEVkQlFXVXNUVUZCVFN4eFJFRkJjVVFzUTBGRGVFWXNUMEZCVHl4RlFVTlFMRTlCUVU4c1EwRkRVaXhEUVVGRE8xbEJRMFlzVlVGQlZTeERRVUZETEhGQ1FVRnhRaXhIUVVGSExGbEJRVmtzUTBGRE4wTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhQUVVGUExFTkJRVU1zYjBKQlFXOUNMRU5CUVVNc1EwRkROME1zUTBGQlF6dFpRVU5HTEZWQlFWVXNRMEZCUXl4bFFVRmxMRWRCUVVjc1dVRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0WlFVTnNSU3hWUVVGVkxFTkJRVU1zZFVKQlFYVkNMRWRCUVVjc2RVSkJRWFZDTEVWQlFVVXNRMEZCUXp0WlFVTXZSQ3hWUVVGVkxFTkJRVU1zYjBKQlFXOUNMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRM2hETEU5QlFVOHNRMEZCUXl4VFFVRlRMRU5CUTJ4Q0xFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdXVUZGYUVJc2NVVkJRWEZGTzFsQlEzSkZMRTFCUVUwc2FVSkJRV2xDTEVkQlFVY3NTVUZCU1N4RFFVRkRMRzlDUVVGdlFpeERRVUZETEZsQlFWa3NRMEZCUXl4RFFVRkRPMWxCUTJ4RkxFbEJRVWtzYVVKQlFXbENMRVZCUVVVN1owSkJRM0pDTEdsQ1FVRnBRaXhEUVVGRExHbERRVUZwUXl4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRE8yZENRVU5vUlN4TlFVRk5MRkZCUVZFc1IwRkJSeXhOUVVGTkxHbENRVUZwUWl4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMmRDUVVOeVJTeEpRVUZKTEZGQlFWRXNSVUZCUlR0dlFrRkRXaXhOUVVGTkxDdENRVUVyUWl4SFFVRkhMRTFCUVUwc2FVSkJRV2xDTEVOQlFVTXNLMEpCUVN0Q0xFTkJRVU03YjBKQlEyaEhMRlZCUVZVc1EwRkJReXhsUVVGbE8zZENRVU40UWl3clFrRkJLMElzUTBGQlF5eGxRVUZsTEVOQlFVTTdiMEpCUTJ4RUxGVkJRVlVzUTBGQlF5dzJRa0ZCTmtJN2QwSkJRM1JETEN0Q1FVRXJRaXhEUVVGRExEWkNRVUUyUWl4RFFVRkRPMjlDUVVOb1JTeFZRVUZWTEVOQlFVTXNNRUpCUVRCQ08zZENRVU51UXl3clFrRkJLMElzUTBGQlF5d3dRa0ZCTUVJc1EwRkJRenRwUWtGRE9VUTdZVUZEUmp0WlFVVkVMRWxCUVVrc1EwRkJReXhaUVVGWkxFTkJRVU1zVlVGQlZTeERRVUZETEdGQlFXRXNSVUZCUlN4VlFVRlZMRU5CUVVNc1EwRkJRenRSUVVNeFJDeERRVUZETEVOQlFVTTdVVUZEUml4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExGZEJRVmNzUTBGQlF5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRzFDUVVGdFFpeERRVUZETEVOQlFVTTdTVUZETVVVc1EwRkJRenRKUVVWTkxFOUJRVTg3VVVGRFdpeEpRVUZKTEVsQlFVa3NRMEZCUXl4M1FrRkJkMElzUlVGQlJUdFpRVU5xUXl4UFFVRlBMRU5CUVVNc1lVRkJZU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMR05CUVdNc1EwRkRia1FzU1VGQlNTeERRVUZETEhkQ1FVRjNRaXhEUVVNNVFpeERRVUZETzFOQlEwZzdVVUZEUkN4SlFVRkpMRWxCUVVrc1EwRkJReXh0UWtGQmJVSXNSVUZCUlR0WlFVTTFRaXhQUVVGUExFTkJRVU1zWVVGQllTeERRVUZETEZkQlFWY3NRMEZCUXl4alFVRmpMRU5CUXpsRExFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1EwRkRla0lzUTBGQlF6dFRRVU5JTzBsQlEwZ3NRMEZCUXp0SlFVVlBMRFJDUVVFMFFpeERRVU5zUXl4WlFVRnZRanRSUVVWd1FpeEpRVUZKTEVOQlFVTXNhMEpCUVd0Q0xFTkJRVU1zV1VGQldTeERRVUZETEVkQlFVY3NTVUZCU1N4cFFrRkJhVUlzUlVGQlJTeERRVUZETzFGQlEyaEZMRTlCUVU4c1NVRkJTU3hEUVVGRExHdENRVUZyUWl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8wbEJReTlETEVOQlFVTTdTVUZGVHl4dlFrRkJiMElzUTBGQlF5eFpRVUZ2UWp0UlFVTXZReXhQUVVGUExFbEJRVWtzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF6dEpRVU12UXl4RFFVRkRPME5CUTBZaWZRPT0iLCJpbXBvcnQgeyBpbnN0cnVtZW50RmluZ2VycHJpbnRpbmdBcGlzIH0gZnJvbSBcIi4uL2xpYi9pbnN0cnVtZW50LWZpbmdlcnByaW50aW5nLWFwaXNcIjtcbmltcG9ydCB7IGpzSW5zdHJ1bWVudHMgfSBmcm9tIFwiLi4vbGliL2pzLWluc3RydW1lbnRzXCI7XG5pbXBvcnQgeyBwYWdlU2NyaXB0IH0gZnJvbSBcIi4vamF2YXNjcmlwdC1pbnN0cnVtZW50LXBhZ2Utc2NvcGVcIjtcbmZ1bmN0aW9uIGdldFBhZ2VTY3JpcHRBc1N0cmluZygpIHtcbiAgICByZXR1cm4gKGpzSW5zdHJ1bWVudHMgK1xuICAgICAgICBcIlxcblwiICtcbiAgICAgICAgaW5zdHJ1bWVudEZpbmdlcnByaW50aW5nQXBpcyArXG4gICAgICAgIFwiXFxuXCIgK1xuICAgICAgICBcIihcIiArXG4gICAgICAgIHBhZ2VTY3JpcHQgK1xuICAgICAgICBcIih7anNJbnN0cnVtZW50cywgaW5zdHJ1bWVudEZpbmdlcnByaW50aW5nQXBpc30pKTtcIik7XG59XG5mdW5jdGlvbiBpbnNlcnRTY3JpcHQodGV4dCwgZGF0YSkge1xuICAgIGNvbnN0IHBhcmVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBzY3JpcHQudGV4dCA9IHRleHQ7XG4gICAgc2NyaXB0LmFzeW5jID0gZmFsc2U7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS1cIiArIGtleS5yZXBsYWNlKFwiX1wiLCBcIi1cIiksIGRhdGFba2V5XSk7XG4gICAgfVxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoc2NyaXB0LCBwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgcGFyZW50LnJlbW92ZUNoaWxkKHNjcmlwdCk7XG59XG5mdW5jdGlvbiBlbWl0TXNnKHR5cGUsIG1zZykge1xuICAgIG1zZy50aW1lU3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgYnJvd3Nlci5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgbmFtZXNwYWNlOiBcImphdmFzY3JpcHQtaW5zdHJ1bWVudGF0aW9uXCIsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGRhdGE6IG1zZyxcbiAgICB9KTtcbn1cbmNvbnN0IGV2ZW50X2lkID0gTWF0aC5yYW5kb20oKTtcbi8vIGxpc3RlbiBmb3IgbWVzc2FnZXMgZnJvbSB0aGUgc2NyaXB0IHdlIGFyZSBhYm91dCB0byBpbnNlcnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRfaWQudG9TdHJpbmcoKSwgZnVuY3Rpb24gKGUpIHtcbiAgICAvLyBwYXNzIHRoZXNlIG9uIHRvIHRoZSBiYWNrZ3JvdW5kIHBhZ2VcbiAgICBjb25zdCBtc2dzID0gZS5kZXRhaWw7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobXNncykpIHtcbiAgICAgICAgbXNncy5mb3JFYWNoKGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgIGVtaXRNc2cobXNnLnR5cGUsIG1zZy5jb250ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBlbWl0TXNnKG1zZ3MudHlwZSwgbXNncy5jb250ZW50KTtcbiAgICB9XG59KTtcbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RKYXZhc2NyaXB0SW5zdHJ1bWVudFBhZ2VTY3JpcHQoY29udGVudFNjcmlwdENvbmZpZykge1xuICAgIGluc2VydFNjcmlwdChnZXRQYWdlU2NyaXB0QXNTdHJpbmcoKSwge1xuICAgICAgICBldmVudF9pZCxcbiAgICAgICAgLi4uY29udGVudFNjcmlwdENvbmZpZyxcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFtRjJZWE5qY21sd2RDMXBibk4wY25WdFpXNTBMV052Ym5SbGJuUXRjMk52Y0dVdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTl6Y21NdlkyOXVkR1Z1ZEM5cVlYWmhjMk55YVhCMExXbHVjM1J5ZFcxbGJuUXRZMjl1ZEdWdWRDMXpZMjl3WlM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRU3hQUVVGUExFVkJRVVVzTkVKQlFUUkNMRVZCUVVVc1RVRkJUU3gxUTBGQmRVTXNRMEZCUXp0QlFVTnlSaXhQUVVGUExFVkJRVVVzWVVGQllTeEZRVUZGTEUxQlFVMHNkVUpCUVhWQ0xFTkJRVU03UVVGRGRFUXNUMEZCVHl4RlFVRkZMRlZCUVZVc1JVRkJSU3hOUVVGTkxHOURRVUZ2UXl4RFFVRkRPMEZCUldoRkxGTkJRVk1zY1VKQlFYRkNPMGxCUXpWQ0xFOUJRVThzUTBGRFRDeGhRVUZoTzFGQlEySXNTVUZCU1R0UlFVTktMRFJDUVVFMFFqdFJRVU0xUWl4SlFVRkpPMUZCUTBvc1IwRkJSenRSUVVOSUxGVkJRVlU3VVVGRFZpeHRSRUZCYlVRc1EwRkRjRVFzUTBGQlF6dEJRVU5LTEVOQlFVTTdRVUZGUkN4VFFVRlRMRmxCUVZrc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNUdEpRVU01UWl4TlFVRk5MRTFCUVUwc1IwRkJSeXhSUVVGUkxFTkJRVU1zWlVGQlpTeEZRVU55UXl4TlFVRk5MRWRCUVVjc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0SlFVTTFReXhOUVVGTkxFTkJRVU1zU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXp0SlFVTnVRaXhOUVVGTkxFTkJRVU1zUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVVnlRaXhMUVVGTExFMUJRVTBzUjBGQlJ5eEpRVUZKTEVsQlFVa3NSVUZCUlR0UlFVTjBRaXhOUVVGTkxFTkJRVU1zV1VGQldTeERRVUZETEU5QlFVOHNSMEZCUnl4SFFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF6dExRVU5xUlR0SlFVVkVMRTFCUVUwc1EwRkJReXhaUVVGWkxFTkJRVU1zVFVGQlRTeEZRVUZGTEUxQlFVMHNRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRKUVVNdlF5eE5RVUZOTEVOQlFVTXNWMEZCVnl4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRE8wRkJRemRDTEVOQlFVTTdRVUZGUkN4VFFVRlRMRTlCUVU4c1EwRkJReXhKUVVGSkxFVkJRVVVzUjBGQlJ6dEpRVU40UWl4SFFVRkhMRU5CUVVNc1UwRkJVeXhIUVVGSExFbEJRVWtzU1VGQlNTeEZRVUZGTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1NVRkRla01zVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4WFFVRlhMRU5CUVVNN1VVRkRNVUlzVTBGQlV5eEZRVUZGTERSQ1FVRTBRanRSUVVOMlF5eEpRVUZKTzFGQlEwb3NTVUZCU1N4RlFVRkZMRWRCUVVjN1MwRkRWaXhEUVVGRExFTkJRVU03UVVGRFRDeERRVUZETzBGQlJVUXNUVUZCVFN4UlFVRlJMRWRCUVVjc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETzBGQlJTOUNMRFpFUVVFMlJEdEJRVU0zUkN4UlFVRlJMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNVVUZCVVN4RFFVRkRMRkZCUVZFc1JVRkJSU3hGUVVGRkxGVkJRVk1zUTBGQll6dEpRVU53UlN4MVEwRkJkVU03U1VGRGRrTXNUVUZCVFN4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF6dEpRVU4wUWl4SlFVRkpMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVWQlFVVTdVVUZEZGtJc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZUTEVkQlFVYzdXVUZEZGtJc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVWQlFVVXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8xRkJRMnBETEVOQlFVTXNRMEZCUXl4RFFVRkRPMHRCUTBvN1UwRkJUVHRSUVVOTUxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zUTBGQlF6dExRVU5zUXp0QlFVTklMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJSVWdzVFVGQlRTeFZRVUZWTEc5RFFVRnZReXhEUVVGRExHMUNRVUZ0UWp0SlFVTjBSU3haUVVGWkxFTkJRVU1zY1VKQlFYRkNMRVZCUVVVc1JVRkJSVHRSUVVOd1F5eFJRVUZSTzFGQlExSXNSMEZCUnl4dFFrRkJiVUk3UzBGRGRrSXNRMEZCUXl4RFFVRkRPMEZCUTB3c1EwRkJReUo5IiwiLy8gQ29kZSBiZWxvdyBpcyBub3QgYSBjb250ZW50IHNjcmlwdDogbm8gRmlyZWZveCBBUElzIHNob3VsZCBiZSB1c2VkXG4vLyBBbHNvLCBubyB3ZWJwYWNrL2VzNiBpbXBvcnRzIG1heSBiZSB1c2VkIGluIHRoaXMgZmlsZSBzaW5jZSB0aGUgc2NyaXB0XG4vLyBpcyBleHBvcnRlZCBhcyBhIHBhZ2Ugc2NyaXB0IGFzIGEgc3RyaW5nXG5leHBvcnQgY29uc3QgcGFnZVNjcmlwdCA9IGZ1bmN0aW9uICh7IGpzSW5zdHJ1bWVudHMsIGluc3RydW1lbnRGaW5nZXJwcmludGluZ0FwaXMsIH0pIHtcbiAgICAvLyBtZXNzYWdlcyB0aGUgaW5qZWN0ZWQgc2NyaXB0XG4gICAgZnVuY3Rpb24gc2VuZE1lc3NhZ2VzVG9Mb2dnZXIoJGV2ZW50X2lkLCBtZXNzYWdlcykge1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgkZXZlbnRfaWQsIHtcbiAgICAgICAgICAgIGRldGFpbDogbWVzc2FnZXMsXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgY29uc3QgZXZlbnRfaWQgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcImRhdGEtZXZlbnQtaWRcIik7XG4gICAgY29uc3QgeyBpbnN0cnVtZW50T2JqZWN0LCBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkgfSA9IGpzSW5zdHJ1bWVudHMoZXZlbnRfaWQsIHNlbmRNZXNzYWdlc1RvTG9nZ2VyKTtcbiAgICBjb25zdCB0ZXN0aW5nID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRlc3RpbmdcIikgPT09IFwidHJ1ZVwiO1xuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogQ3VycmVudGx5IHRlc3RpbmdcIik7XG4gICAgICAgIHdpbmRvdy5pbnN0cnVtZW50T2JqZWN0ID0gaW5zdHJ1bWVudE9iamVjdDtcbiAgICB9XG4gICAgLypcbiAgICAgKiBTdGFydCBJbnN0cnVtZW50YXRpb25cbiAgICAgKi9cbiAgICBjb25zdCBtb2R1bGVzID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1vZHVsZXNcIilcbiAgICAgICAgPyBkb2N1bWVudC5jdXJyZW50U2NyaXB0LmdldEF0dHJpYnV0ZShcImRhdGEtbW9kdWxlc1wiKS5zcGxpdChcIixcIilcbiAgICAgICAgOiBbXTtcbiAgICBpZiAobW9kdWxlcy5pbmNsdWRlcyhcImZpbmdlcnByaW50aW5nXCIpKSB7XG4gICAgICAgIGluc3RydW1lbnRGaW5nZXJwcmludGluZ0FwaXMoe1xuICAgICAgICAgICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5LFxuICAgICAgICAgICAgaW5zdHJ1bWVudE9iamVjdCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0ZXN0aW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogQ29udGVudC1zaWRlIGphdmFzY3JpcHQgaW5zdHJ1bWVudGF0aW9uIHN0YXJ0ZWRcIiwgeyBtb2R1bGVzIH0sIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSk7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFtRjJZWE5qY21sd2RDMXBibk4wY25WdFpXNTBMWEJoWjJVdGMyTnZjR1V1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTh1TGk4dUxpOXpjbU12WTI5dWRHVnVkQzlxWVhaaGMyTnlhWEIwTFdsdWMzUnlkVzFsYm5RdGNHRm5aUzF6WTI5d1pTNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4eFJVRkJjVVU3UVVGRGNrVXNlVVZCUVhsRk8wRkJRM3BGTERKRFFVRXlRenRCUVVVelF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4VlFVRlZMRWRCUVVjc1ZVRkJVeXhGUVVOcVF5eGhRVUZoTEVWQlEySXNORUpCUVRSQ0xFZEJRemRDTzBsQlEwTXNLMEpCUVN0Q08wbEJReTlDTEZOQlFWTXNiMEpCUVc5Q0xFTkJRVU1zVTBGQlV5eEZRVUZGTEZGQlFWRTdVVUZETDBNc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGRGNFSXNTVUZCU1N4WFFVRlhMRU5CUVVNc1UwRkJVeXhGUVVGRk8xbEJRM3BDTEUxQlFVMHNSVUZCUlN4UlFVRlJPMU5CUTJwQ0xFTkJRVU1zUTBGRFNDeERRVUZETzBsQlEwb3NRMEZCUXp0SlFVVkVMRTFCUVUwc1VVRkJVU3hIUVVGSExGRkJRVkVzUTBGQlF5eGhRVUZoTEVOQlFVTXNXVUZCV1N4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRE8wbEJSWFJGTEUxQlFVMHNSVUZCUlN4blFrRkJaMElzUlVGQlJTeDNRa0ZCZDBJc1JVRkJSU3hIUVVGSExHRkJRV0VzUTBGRGJFVXNVVUZCVVN4RlFVTlNMRzlDUVVGdlFpeERRVU55UWl4RFFVRkRPMGxCUlVZc1RVRkJUU3hQUVVGUExFZEJRMWdzVVVGQlVTeERRVUZETEdGQlFXRXNRMEZCUXl4WlFVRlpMRU5CUVVNc1kwRkJZeXhEUVVGRExFdEJRVXNzVFVGQlRTeERRVUZETzBsQlEycEZMRWxCUVVrc1QwRkJUeXhGUVVGRk8xRkJRMWdzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl3MFFrRkJORUlzUTBGQlF5eERRVUZETzFGQlEzcERMRTFCUVdNc1EwRkJReXhuUWtGQlowSXNSMEZCUnl4blFrRkJaMElzUTBGQlF6dExRVU55UkR0SlFVVkVPenRQUVVWSE8wbEJRMGdzVFVGQlRTeFBRVUZQTEVkQlFVY3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1EwRkJReXhaUVVGWkxFTkJRVU1zWTBGQll5eERRVUZETzFGQlEycEZMRU5CUVVNc1EwRkJReXhSUVVGUkxFTkJRVU1zWVVGQllTeERRVUZETEZsQlFWa3NRMEZCUXl4alFVRmpMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eERRVUZETzFGQlEyaEZMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU03U1VGRlVDeEpRVUZKTEU5QlFVOHNRMEZCUXl4UlFVRlJMRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNSVUZCUlR0UlFVTjBReXcwUWtGQk5FSXNRMEZCUXp0WlFVTXpRaXgzUWtGQmQwSTdXVUZEZUVJc1owSkJRV2RDTzFOQlEycENMRU5CUVVNc1EwRkJRenRMUVVOS08wbEJSVVFzU1VGQlNTeFBRVUZQTEVWQlFVVTdVVUZEV0N4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVOVUxEQkVRVUV3UkN4RlFVTXhSQ3hGUVVGRkxFOUJRVThzUlVGQlJTeEZRVU5ZTEVsQlFVa3NTVUZCU1N4RlFVRkZMRU5CUVVNc1YwRkJWeXhGUVVGRkxFTkJRM3BDTEVOQlFVTTdTMEZEU0R0QlFVTklMRU5CUVVNc1EwRkJReUo5IiwiZXhwb3J0ICogZnJvbSBcIi4vYmFja2dyb3VuZC9jb29raWUtaW5zdHJ1bWVudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vYmFja2dyb3VuZC9odHRwLWluc3RydW1lbnRcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2JhY2tncm91bmQvamF2YXNjcmlwdC1pbnN0cnVtZW50XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9iYWNrZ3JvdW5kL25hdmlnYXRpb24taW5zdHJ1bWVudFwiO1xuZXhwb3J0ICogZnJvbSBcIi4vY29udGVudC9qYXZhc2NyaXB0LWluc3RydW1lbnQtY29udGVudC1zY29wZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbGliL2h0dHAtcG9zdC1wYXJzZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2xpYi9zdHJpbmctdXRpbHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3NjaGVtYVwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOHVMaTl6Y21NdmFXNWtaWGd1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRXNZMEZCWXl4blEwRkJaME1zUTBGQlF6dEJRVU12UXl4alFVRmpMRGhDUVVFNFFpeERRVUZETzBGQlF6ZERMR05CUVdNc2IwTkJRVzlETEVOQlFVTTdRVUZEYmtRc1kwRkJZeXh2UTBGQmIwTXNRMEZCUXp0QlFVTnVSQ3hqUVVGakxDdERRVUVyUXl4RFFVRkRPMEZCUXpsRUxHTkJRV01zZDBKQlFYZENMRU5CUVVNN1FVRkRka01zWTBGQll5eHZRa0ZCYjBJc1EwRkJRenRCUVVOdVF5eGpRVUZqTEZWQlFWVXNRMEZCUXlKOSIsIi8qKlxuICogVGhpcyBlbmFibGVzIHVzIHRvIGtlZXAgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG9yaWdpbmFsIG9yZGVyXG4gKiBpbiB3aGljaCBldmVudHMgYXJyaXZlZCB0byBvdXIgZXZlbnQgbGlzdGVuZXJzLlxuICovXG5sZXQgZXZlbnRPcmRpbmFsID0gMDtcbmV4cG9ydCBjb25zdCBpbmNyZW1lbnRlZEV2ZW50T3JkaW5hbCA9ICgpID0+IHtcbiAgICByZXR1cm4gZXZlbnRPcmRpbmFsKys7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWlhoMFpXNXphVzl1TFhObGMzTnBiMjR0WlhabGJuUXRiM0prYVc1aGJDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2WlhoMFpXNXphVzl1TFhObGMzTnBiMjR0WlhabGJuUXRiM0prYVc1aGJDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVRzN08wZEJSMGM3UVVGRFNDeEpRVUZKTEZsQlFWa3NSMEZCUnl4RFFVRkRMRU5CUVVNN1FVRkZja0lzVFVGQlRTeERRVUZETEUxQlFVMHNkVUpCUVhWQ0xFZEJRVWNzUjBGQlJ5eEZRVUZGTzBsQlF6RkRMRTlCUVU4c1dVRkJXU3hGUVVGRkxFTkJRVU03UVVGRGVFSXNRMEZCUXl4RFFVRkRJbjA9IiwiaW1wb3J0IHsgbWFrZVVVSUQgfSBmcm9tIFwiLi91dWlkXCI7XG4vKipcbiAqIFRoaXMgZW5hYmxlcyB1cyB0byBhY2Nlc3MgYSB1bmlxdWUgcmVmZXJlbmNlIHRvIHRoaXMgYnJvd3NlclxuICogc2Vzc2lvbiAtIHJlZ2VuZXJhdGVkIGFueSB0aW1lIHRoZSBiYWNrZ3JvdW5kIHByb2Nlc3MgZ2V0c1xuICogcmVzdGFydGVkICh3aGljaCBzaG91bGQgb25seSBiZSBvbiBicm93c2VyIHJlc3RhcnRzKVxuICovXG5leHBvcnQgY29uc3QgZXh0ZW5zaW9uU2Vzc2lvblV1aWQgPSBtYWtlVVVJRCgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWlhoMFpXNXphVzl1TFhObGMzTnBiMjR0ZFhWcFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2WlhoMFpXNXphVzl1TFhObGMzTnBiMjR0ZFhWcFpDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4UFFVRlBMRVZCUVVVc1VVRkJVU3hGUVVGRkxFMUJRVTBzVVVGQlVTeERRVUZETzBGQlJXeERPenM3TzBkQlNVYzdRVUZEU0N4TlFVRk5MRU5CUVVNc1RVRkJUU3h2UWtGQmIwSXNSMEZCUnl4UlFVRlJMRVZCUVVVc1EwRkJReUo5IiwiLy8gSW5jb3Jwb3JhdGVzIGNvZGUgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL3JlZGxpbmUxMy9zZWxlbml1bS1qbWV0ZXIvYmxvYi82OTY2ZDRiMzI2Y2Q3ODI2MWUzMWU2ZTMxNzA3NjU2OTA1MWNhYzM3L2NvbnRlbnQvbGlicmFyeS9yZWNvcmRlci9IdHRwUG9zdFBhcnNlci5qc1xuLy8gaW1wb3J0IHsgZXNjYXBlU3RyaW5nLCBlc2NhcGVVcmwgfSBmcm9tIFwiLi9zdHJpbmctdXRpbHNcIjtcbmltcG9ydCB7IGVzY2FwZVN0cmluZywgVWludDhUb0Jhc2U2NCB9IGZyb20gXCIuL3N0cmluZy11dGlsc1wiO1xuZXhwb3J0IGNsYXNzIEh0dHBQb3N0UGFyc2VyIHtcbiAgICAvKlxuICAgIHByaXZhdGUgaGFzaGVhZGVyczogYm9vbGVhbjtcbiAgICBwcml2YXRlIHNlZWthYmxlc3RyZWFtO1xuICAgIHByaXZhdGUgc3RyZWFtO1xuICAgIHByaXZhdGUgcG9zdEJvZHk7XG4gICAgcHJpdmF0ZSBwb3N0TGluZXM7XG4gICAgcHJpdmF0ZSBwb3N0SGVhZGVycztcbiAgICBwcml2YXRlIGJvZHk7XG4gICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAvLyBvbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzOiBXZWJSZXF1ZXN0T25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyxcbiAgICBvbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMsIGRhdGFSZWNlaXZlcikge1xuICAgICAgICAvLyB0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMgPSBvbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzO1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscztcbiAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIgPSBkYXRhUmVjZWl2ZXI7XG4gICAgICAgIC8qXG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIFwiSHR0cFBvc3RQYXJzZXJcIixcbiAgICAgICAgICAvLyBvbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzLFxuICAgICAgICAgIG9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyxcbiAgICAgICAgKTtcbiAgICAgICAgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGVuY29kaW5nVHlwZSBmcm9tIHRoZSBIVFRQIFJlcXVlc3QgaGVhZGVyc1xuICAgICAqL1xuICAgIHBhcnNlUG9zdFJlcXVlc3QoIC8qZW5jb2RpbmdUeXBlKi8pIHtcbiAgICAgICAgLy8gY29uc3QgcmVxdWVzdEhlYWRlcnMgPSB0aGlzLm9uQmVmb3JlU2VuZEhlYWRlcnNFdmVudERldGFpbHMucmVxdWVzdEhlYWRlcnM7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0gdGhpcy5vbkJlZm9yZVJlcXVlc3RFdmVudERldGFpbHMucmVxdWVzdEJvZHk7XG4gICAgICAgIGlmIChyZXF1ZXN0Qm9keS5lcnJvcikge1xuICAgICAgICAgICAgdGhpcy5kYXRhUmVjZWl2ZXIubG9nRXJyb3IoXCJFeGNlcHRpb246IFVwc3RyZWFtIGZhaWxlZCB0byBwYXJzZSBQT1NUOiBcIiArIHJlcXVlc3RCb2R5LmVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdEJvZHkuZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogcmVxdWVzdEJvZHkuZm9ybURhdGEgc2hvdWxkIHByb2JhYmx5IGJlIHRyYW5zZm9ybWVkIGludG8gYW5vdGhlciBmb3JtYXRcbiAgICAgICAgICAgICAgICBwb3N0X2JvZHk6IGVzY2FwZVN0cmluZyhKU09OLnN0cmluZ2lmeShyZXF1ZXN0Qm9keS5mb3JtRGF0YSkpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdEJvZHkucmF3KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBvc3RfYm9keV9yYXc6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5LnJhdy5tYXAoeCA9PiBbXG4gICAgICAgICAgICAgICAgICAgIHguZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgVWludDhUb0Jhc2U2NChuZXcgVWludDhBcnJheSh4LmJ5dGVzKSksXG4gICAgICAgICAgICAgICAgXSkpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXR1cm4gZW1wdHkgcmVzcG9uc2UgdW50aWwgd2UgaGF2ZSBhbGwgaW5zdHJ1bWVudGF0aW9uIGNvbnZlcnRlZFxuICAgICAgICByZXR1cm4ge307XG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuZGF0YVJlY2VpdmVyLmxvZ0RlYnVnKFxuICAgICAgICAgIFwiRXhjZXB0aW9uOiBJbnN0cnVtZW50YXRpb24gdG8gcGFyc2UgUE9TVCByZXF1ZXN0cyB3aXRob3V0IGZvcm1EYXRhIGlzIG5vdCB5ZXQgcmVzdG9yZWRcIixcbiAgICAgICAgKTtcbiAgICBcbiAgICAgICAgLy8gVE9ETzogUmVmYWN0b3IgdG8gY29ycmVzcG9uZGluZyB3ZWJleHQgbG9naWMgb3IgZGlzY2FyZFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuc2V0dXBTdHJlYW0oKTtcbiAgICAgICAgICB0aGlzLnBhcnNlU3RyZWFtKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLmRhdGFSZWNlaXZlci5sb2dFcnJvcihcIkV4Y2VwdGlvbjogRmFpbGVkIHRvIHBhcnNlIFBPU1Q6IFwiICsgZSk7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IHBvc3RCb2R5ID0gdGhpcy5wb3N0Qm9keTtcbiAgICBcbiAgICAgICAgaWYgKCFwb3N0Qm9keSkge1xuICAgICAgICAgIC8vIHNvbWUgc2NyaXB0cyBzdHJhbmdlbHkgc2VuZHMgZW1wdHkgcG9zdCBib2RpZXMgKGNvbmZpcm1lZCB3aXRoIHRoZSBkZXZlbG9wZXIgdG9vbHMpXG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGxldCBpc011bHRpUGFydCA9IGZhbHNlOyAvLyBlbmNUeXBlOiBtdWx0aXBhcnQvZm9ybS1kYXRhXG4gICAgICAgIGNvbnN0IHBvc3RIZWFkZXJzID0gdGhpcy5wb3N0SGVhZGVyczsgLy8gcmVxdWVzdCBoZWFkZXJzIGZyb20gdXBsb2FkIHN0cmVhbVxuICAgICAgICAvLyBTZWUsIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTY1NDg1MTcvd2hhdC1pcy1yZXF1ZXN0LWhlYWRlcnMtZnJvbS11cGxvYWQtc3RyZWFtXG4gICAgXG4gICAgICAgIC8vIGFkZCBlbmNvZGluZ1R5cGUgZnJvbSBwb3N0SGVhZGVycyBpZiBpdCdzIG1pc3NpbmdcbiAgICAgICAgaWYgKCFlbmNvZGluZ1R5cGUgJiYgcG9zdEhlYWRlcnMgJiYgXCJDb250ZW50LVR5cGVcIiBpbiBwb3N0SGVhZGVycykge1xuICAgICAgICAgIGVuY29kaW5nVHlwZSA9IHBvc3RIZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChlbmNvZGluZ1R5cGUuaW5kZXhPZihcIm11bHRpcGFydC9mb3JtLWRhdGFcIikgIT09IC0xKSB7XG4gICAgICAgICAgaXNNdWx0aVBhcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGxldCBqc29uUG9zdERhdGEgPSBcIlwiO1xuICAgICAgICBsZXQgZXNjYXBlZEpzb25Qb3N0RGF0YSA9IFwiXCI7XG4gICAgICAgIGlmIChpc011bHRpUGFydCkge1xuICAgICAgICAgIGpzb25Qb3N0RGF0YSA9IHRoaXMucGFyc2VNdWx0aVBhcnREYXRhKHBvc3RCb2R5IC8qLCBlbmNvZGluZ1R5cGUqIC8pO1xuICAgICAgICAgIGVzY2FwZWRKc29uUG9zdERhdGEgPSBlc2NhcGVTdHJpbmcoanNvblBvc3REYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBqc29uUG9zdERhdGEgPSB0aGlzLnBhcnNlRW5jb2RlZEZvcm1EYXRhKHBvc3RCb2R5LCBlbmNvZGluZ1R5cGUpO1xuICAgICAgICAgIGVzY2FwZWRKc29uUG9zdERhdGEgPSBlc2NhcGVTdHJpbmcoanNvblBvc3REYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBwb3N0X2hlYWRlcnM6IHBvc3RIZWFkZXJzLCBwb3N0X2JvZHk6IGVzY2FwZWRKc29uUG9zdERhdGEgfTtcbiAgICAgICAgKi9cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhSFIwY0Mxd2IzTjBMWEJoY25ObGNpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2YUhSMGNDMXdiM04wTFhCaGNuTmxjaTUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeG5TMEZCWjBzN1FVRk5hRXNzTkVSQlFUUkVPMEZCUlRWRUxFOUJRVThzUlVGQlJTeFpRVUZaTEVWQlFVVXNZVUZCWVN4RlFVRkZMRTFCUVUwc1owSkJRV2RDTEVOQlFVTTdRVUZWTjBRc1RVRkJUU3hQUVVGUExHTkJRV003U1VGSmVrSTdPenM3T3pzN08wMUJVVVU3U1VGRlJqdEpRVU5GTERoRlFVRTRSVHRKUVVNNVJTd3lRa0ZCYTBVc1JVRkRiRVVzV1VGQldUdFJRVVZhTERCRlFVRXdSVHRSUVVNeFJTeEpRVUZKTEVOQlFVTXNNa0pCUVRKQ0xFZEJRVWNzTWtKQlFUSkNMRU5CUVVNN1VVRkRMMFFzU1VGQlNTeERRVUZETEZsQlFWa3NSMEZCUnl4WlFVRlpMRU5CUVVNN1VVRkRha003T3pzN096dFZRVTFGTzBsQlEwb3NRMEZCUXp0SlFVVkVPenRQUVVWSE8wbEJRMGtzWjBKQlFXZENMRVZCUVVNc1owSkJRV2RDTzFGQlEzUkRMRGhGUVVFNFJUdFJRVU01UlN4TlFVRk5MRmRCUVZjc1IwRkJSeXhKUVVGSkxFTkJRVU1zTWtKQlFUSkNMRU5CUVVNc1YwRkJWeXhEUVVGRE8xRkJRMnBGTEVsQlFVa3NWMEZCVnl4RFFVRkRMRXRCUVVzc1JVRkJSVHRaUVVOeVFpeEpRVUZKTEVOQlFVTXNXVUZCV1N4RFFVRkRMRkZCUVZFc1EwRkRlRUlzTkVOQlFUUkRMRWRCUVVjc1YwRkJWeXhEUVVGRExFdEJRVXNzUTBGRGFrVXNRMEZCUXp0VFFVTklPMUZCUTBRc1NVRkJTU3hYUVVGWExFTkJRVU1zVVVGQlVTeEZRVUZGTzFsQlEzaENMRTlCUVU4N1owSkJRMHdzWjBaQlFXZEdPMmRDUVVOb1JpeFRRVUZUTEVWQlFVVXNXVUZCV1N4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zVjBGQlZ5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMkZCUXpsRUxFTkJRVU03VTBGRFNEdFJRVU5FTEVsQlFVa3NWMEZCVnl4RFFVRkRMRWRCUVVjc1JVRkJSVHRaUVVOdVFpeFBRVUZQTzJkQ1FVTk1MR0ZCUVdFc1JVRkJSU3hKUVVGSkxFTkJRVU1zVTBGQlV5eERRVU16UWl4WFFVRlhMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRPMjlDUVVOMlFpeERRVUZETEVOQlFVTXNTVUZCU1R0dlFrRkRUaXhoUVVGaExFTkJRVU1zU1VGQlNTeFZRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8ybENRVU4yUXl4RFFVRkRMRU5CUTBnN1lVRkRSaXhEUVVGRE8xTkJRMGc3VVVGRlJDeHZSVUZCYjBVN1VVRkRjRVVzVDBGQlR5eEZRVUZGTEVOQlFVTTdVVUZEVmpzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3VlVFMFEwVTdTVUZEU2l4RFFVRkRPME5CTWxSR0luMD0iLCJleHBvcnQgZnVuY3Rpb24gaW5zdHJ1bWVudEZpbmdlcnByaW50aW5nQXBpcyh7IGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSwgaW5zdHJ1bWVudE9iamVjdCwgfSkge1xuICAgIC8vIEFjY2VzcyB0byBuYXZpZ2F0b3IgcHJvcGVydGllc1xuICAgIGNvbnN0IG5hdmlnYXRvclByb3BlcnRpZXMgPSBbXG4gICAgICAgIFwiYXBwQ29kZU5hbWVcIixcbiAgICAgICAgXCJhcHBOYW1lXCIsXG4gICAgICAgIFwiYXBwVmVyc2lvblwiLFxuICAgICAgICBcImJ1aWxkSURcIixcbiAgICAgICAgXCJjb29raWVFbmFibGVkXCIsXG4gICAgICAgIFwiZG9Ob3RUcmFja1wiLFxuICAgICAgICBcImdlb2xvY2F0aW9uXCIsXG4gICAgICAgIFwibGFuZ3VhZ2VcIixcbiAgICAgICAgXCJsYW5ndWFnZXNcIixcbiAgICAgICAgXCJvbkxpbmVcIixcbiAgICAgICAgXCJvc2NwdVwiLFxuICAgICAgICBcInBsYXRmb3JtXCIsXG4gICAgICAgIFwicHJvZHVjdFwiLFxuICAgICAgICBcInByb2R1Y3RTdWJcIixcbiAgICAgICAgXCJ1c2VyQWdlbnRcIixcbiAgICAgICAgXCJ2ZW5kb3JTdWJcIixcbiAgICAgICAgXCJ2ZW5kb3JcIixcbiAgICBdO1xuICAgIG5hdmlnYXRvclByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KHdpbmRvdy5uYXZpZ2F0b3IsIFwid2luZG93Lm5hdmlnYXRvclwiLCBwcm9wZXJ0eSk7XG4gICAgfSk7XG4gICAgLy8gQWNjZXNzIHRvIHNjcmVlbiBwcm9wZXJ0aWVzXG4gICAgLy8gaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuc2NyZWVuLCBcIndpbmRvdy5zY3JlZW5cIik7XG4gICAgLy8gVE9ETzogd2h5IGRvIHdlIGluc3RydW1lbnQgb25seSB0d28gc2NyZWVuIHByb3BlcnRpZXNcbiAgICBjb25zdCBzY3JlZW5Qcm9wZXJ0aWVzID0gW1wicGl4ZWxEZXB0aFwiLCBcImNvbG9yRGVwdGhcIl07XG4gICAgc2NyZWVuUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkod2luZG93LnNjcmVlbiwgXCJ3aW5kb3cuc2NyZWVuXCIsIHByb3BlcnR5KTtcbiAgICB9KTtcbiAgICAvLyBBY2Nlc3MgdG8gcGx1Z2luc1xuICAgIGNvbnN0IHBsdWdpblByb3BlcnRpZXMgPSBbXG4gICAgICAgIFwibmFtZVwiLFxuICAgICAgICBcImZpbGVuYW1lXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgXCJ2ZXJzaW9uXCIsXG4gICAgICAgIFwibGVuZ3RoXCIsXG4gICAgXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbmRvdy5uYXZpZ2F0b3IucGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwbHVnaW5OYW1lID0gd2luZG93Lm5hdmlnYXRvci5wbHVnaW5zW2ldLm5hbWU7XG4gICAgICAgIHBsdWdpblByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3cubmF2aWdhdG9yLnBsdWdpbnNbcGx1Z2luTmFtZV0sIFwid2luZG93Lm5hdmlnYXRvci5wbHVnaW5zW1wiICsgcGx1Z2luTmFtZSArIFwiXVwiLCBwcm9wZXJ0eSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBBY2Nlc3MgdG8gTUlNRVR5cGVzXG4gICAgY29uc3QgbWltZVR5cGVQcm9wZXJ0aWVzID0gW1wiZGVzY3JpcHRpb25cIiwgXCJzdWZmaXhlc1wiLCBcInR5cGVcIl07XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtaW1lVHlwZU5hbWUgPSB3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlc1tpXS50eXBlOyAvLyBub3RlOiB1cHN0cmVhbSB0eXBpbmdzIHNlZW1zIHRvIGJlIGluY29ycmVjdFxuICAgICAgICBtaW1lVHlwZVByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlc1ttaW1lVHlwZU5hbWVdLCBcIndpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzW1wiICsgbWltZVR5cGVOYW1lICsgXCJdXCIsIHByb3BlcnR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIE5hbWUsIGxvY2FsU3RvcmFnZSwgYW5kIHNlc3Npb25zU3RvcmFnZSBsb2dnaW5nXG4gICAgLy8gSW5zdHJ1bWVudGluZyB3aW5kb3cubG9jYWxTdG9yYWdlIGRpcmVjdGx5IGRvZXNuJ3Qgc2VlbSB0byB3b3JrLCBzbyB0aGUgU3RvcmFnZVxuICAgIC8vIHByb3RvdHlwZSBtdXN0IGJlIGluc3RydW1lbnRlZCBpbnN0ZWFkLiBVbmZvcnR1bmF0ZWx5IHRoaXMgZmFpbHMgdG8gZGlmZmVyZW50aWF0ZVxuICAgIC8vIGJldHdlZW4gc2Vzc2lvblN0b3JhZ2UgYW5kIGxvY2FsU3RvcmFnZS4gSW5zdGVhZCwgeW91J2xsIGhhdmUgdG8gbG9vayBmb3IgYSBzZXF1ZW5jZVxuICAgIC8vIG9mIGEgZ2V0IGZvciB0aGUgbG9jYWxTdG9yYWdlIG9iamVjdCBmb2xsb3dlZCBieSBhIGdldEl0ZW0vc2V0SXRlbSBmb3IgdGhlIFN0b3JhZ2Ugb2JqZWN0LlxuICAgIGNvbnN0IHdpbmRvd1Byb3BlcnRpZXMgPSBbXCJuYW1lXCIsIFwibG9jYWxTdG9yYWdlXCIsIFwic2Vzc2lvblN0b3JhZ2VcIl07XG4gICAgd2luZG93UHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICBpbnN0cnVtZW50T2JqZWN0UHJvcGVydHkod2luZG93LCBcIndpbmRvd1wiLCBwcm9wZXJ0eSk7XG4gICAgfSk7XG4gICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuU3RvcmFnZS5wcm90b3R5cGUsIFwid2luZG93LlN0b3JhZ2VcIik7XG4gICAgLy8gQWNjZXNzIHRvIGRvY3VtZW50LmNvb2tpZVxuICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3cuZG9jdW1lbnQsIFwid2luZG93LmRvY3VtZW50XCIsIFwiY29va2llXCIsIHtcbiAgICAgICAgbG9nQ2FsbFN0YWNrOiB0cnVlLFxuICAgIH0pO1xuICAgIC8vIEFjY2VzcyB0byBkb2N1bWVudC5yZWZlcnJlclxuICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eSh3aW5kb3cuZG9jdW1lbnQsIFwid2luZG93LmRvY3VtZW50XCIsIFwicmVmZXJyZXJcIiwge1xuICAgICAgICBsb2dDYWxsU3RhY2s6IHRydWUsXG4gICAgfSk7XG4gICAgLy8gQWNjZXNzIHRvIGNhbnZhc1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93LkhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZSwgXCJIVE1MQ2FudmFzRWxlbWVudFwiKTtcbiAgICBjb25zdCBleGNsdWRlZFByb3BlcnRpZXMgPSBbXG4gICAgICAgIFwicXVhZHJhdGljQ3VydmVUb1wiLFxuICAgICAgICBcImxpbmVUb1wiLFxuICAgICAgICBcInRyYW5zZm9ybVwiLFxuICAgICAgICBcImdsb2JhbEFscGhhXCIsXG4gICAgICAgIFwibW92ZVRvXCIsXG4gICAgICAgIFwiZHJhd0ltYWdlXCIsXG4gICAgICAgIFwic2V0VHJhbnNmb3JtXCIsXG4gICAgICAgIFwiY2xlYXJSZWN0XCIsXG4gICAgICAgIFwiY2xvc2VQYXRoXCIsXG4gICAgICAgIFwiYmVnaW5QYXRoXCIsXG4gICAgICAgIFwiY2FudmFzXCIsXG4gICAgICAgIFwidHJhbnNsYXRlXCIsXG4gICAgXTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLCBcIkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFwiLCB7IGV4Y2x1ZGVkUHJvcGVydGllcyB9KTtcbiAgICAvLyBBY2Nlc3MgdG8gd2ViUlRDXG4gICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCBcIlJUQ1BlZXJDb25uZWN0aW9uXCIpO1xuICAgIC8vIEFjY2VzcyB0byBBdWRpbyBBUElcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5BdWRpb0NvbnRleHQucHJvdG90eXBlLCBcIkF1ZGlvQ29udGV4dFwiKTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5PZmZsaW5lQXVkaW9Db250ZXh0LnByb3RvdHlwZSwgXCJPZmZsaW5lQXVkaW9Db250ZXh0XCIpO1xuICAgIGluc3RydW1lbnRPYmplY3Qod2luZG93Lk9zY2lsbGF0b3JOb2RlLnByb3RvdHlwZSwgXCJPc2NpbGxhdG9yTm9kZVwiKTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5BbmFseXNlck5vZGUucHJvdG90eXBlLCBcIkFuYWx5c2VyTm9kZVwiKTtcbiAgICBpbnN0cnVtZW50T2JqZWN0KHdpbmRvdy5HYWluTm9kZS5wcm90b3R5cGUsIFwiR2Fpbk5vZGVcIik7XG4gICAgaW5zdHJ1bWVudE9iamVjdCh3aW5kb3cuU2NyaXB0UHJvY2Vzc29yTm9kZS5wcm90b3R5cGUsIFwiU2NyaXB0UHJvY2Vzc29yTm9kZVwiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNXpkSEoxYldWdWRDMW1hVzVuWlhKd2NtbHVkR2x1WnkxaGNHbHpMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMnhwWWk5cGJuTjBjblZ0Wlc1MExXWnBibWRsY25CeWFXNTBhVzVuTFdGd2FYTXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFc1RVRkJUU3hWUVVGVkxEUkNRVUUwUWl4RFFVRkRMRVZCUXpORExIZENRVUYzUWl4RlFVTjRRaXhuUWtGQlowSXNSMEZEYWtJN1NVRkRReXhwUTBGQmFVTTdTVUZEYWtNc1RVRkJUU3h0UWtGQmJVSXNSMEZCUnp0UlFVTXhRaXhoUVVGaE8xRkJRMklzVTBGQlV6dFJRVU5VTEZsQlFWazdVVUZEV2l4VFFVRlRPMUZCUTFRc1pVRkJaVHRSUVVObUxGbEJRVms3VVVGRFdpeGhRVUZoTzFGQlEySXNWVUZCVlR0UlFVTldMRmRCUVZjN1VVRkRXQ3hSUVVGUk8xRkJRMUlzVDBGQlR6dFJRVU5RTEZWQlFWVTdVVUZEVml4VFFVRlRPMUZCUTFRc1dVRkJXVHRSUVVOYUxGZEJRVmM3VVVGRFdDeFhRVUZYTzFGQlExZ3NVVUZCVVR0TFFVTlVMRU5CUVVNN1NVRkRSaXh0UWtGQmJVSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1ZVRkJVeXhSUVVGUk8xRkJRek5ETEhkQ1FVRjNRaXhEUVVGRExFMUJRVTBzUTBGQlF5eFRRVUZUTEVWQlFVVXNhMEpCUVd0Q0xFVkJRVVVzVVVGQlVTeERRVUZETEVOQlFVTTdTVUZETTBVc1EwRkJReXhEUVVGRExFTkJRVU03U1VGRlNDdzRRa0ZCT0VJN1NVRkRPVUlzYjBSQlFXOUVPMGxCUTNCRUxIZEVRVUYzUkR0SlFVTjRSQ3hOUVVGTkxHZENRVUZuUWl4SFFVRkhMRU5CUVVNc1dVRkJXU3hGUVVGRkxGbEJRVmtzUTBGQlF5eERRVUZETzBsQlEzUkVMR2RDUVVGblFpeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRlRMRkZCUVZFN1VVRkRlRU1zZDBKQlFYZENMRU5CUVVNc1RVRkJUU3hEUVVGRExFMUJRVTBzUlVGQlJTeGxRVUZsTEVWQlFVVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1NVRkRja1VzUTBGQlF5eERRVUZETEVOQlFVTTdTVUZGU0N4dlFrRkJiMEk3U1VGRGNFSXNUVUZCVFN4blFrRkJaMElzUjBGQlJ6dFJRVU4yUWl4TlFVRk5PMUZCUTA0c1ZVRkJWVHRSUVVOV0xHRkJRV0U3VVVGRFlpeFRRVUZUTzFGQlExUXNVVUZCVVR0TFFVTlVMRU5CUVVNN1NVRkRSaXhMUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRk8xRkJRM2hFTEUxQlFVMHNWVUZCVlN4SFFVRkhMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenRSUVVOd1JDeG5Ra0ZCWjBJc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlV5eFJRVUZSTzFsQlEzaERMSGRDUVVGM1FpeERRVU4wUWl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNSVUZEY0VNc01rSkJRVEpDTEVkQlFVY3NWVUZCVlN4SFFVRkhMRWRCUVVjc1JVRkRPVU1zVVVGQlVTeERRVU5VTEVOQlFVTTdVVUZEU2l4RFFVRkRMRU5CUVVNc1EwRkJRenRMUVVOS08wbEJSVVFzYzBKQlFYTkNPMGxCUTNSQ0xFMUJRVTBzYTBKQlFXdENMRWRCUVVjc1EwRkJReXhoUVVGaExFVkJRVVVzVlVGQlZTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRPMGxCUXk5RUxFdEJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETEZOQlFWTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3VVVGRE1VUXNUVUZCVFN4WlFVRlpMRWRCUVVzc1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eFRRVUZUTEVOQlF5OURMRU5CUVVNc1EwRkRkVUlzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl3clEwRkJLME03VVVGRGFFWXNhMEpCUVd0Q0xFTkJRVU1zVDBGQlR5eERRVUZETEZWQlFWTXNVVUZCVVR0WlFVTXhReXgzUWtGQmQwSXNRMEZEZEVJc1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eFRRVUZUTEVOQlFVTXNXVUZCV1N4RFFVRkRMRVZCUTNoRExEWkNRVUUyUWl4SFFVRkhMRmxCUVZrc1IwRkJSeXhIUVVGSExFVkJRMnhFTEZGQlFWRXNRMEZEVkN4RFFVRkRPMUZCUTBvc1EwRkJReXhEUVVGRExFTkJRVU03UzBGRFNqdEpRVU5FTEd0RVFVRnJSRHRKUVVOc1JDeHJSa0ZCYTBZN1NVRkRiRVlzYjBaQlFXOUdPMGxCUTNCR0xIVkdRVUYxUmp0SlFVTjJSaXcyUmtGQk5rWTdTVUZETjBZc1RVRkJUU3huUWtGQlowSXNSMEZCUnl4RFFVRkRMRTFCUVUwc1JVRkJSU3hqUVVGakxFVkJRVVVzWjBKQlFXZENMRU5CUVVNc1EwRkJRenRKUVVOd1JTeG5Ra0ZCWjBJc1EwRkJReXhQUVVGUExFTkJRVU1zVlVGQlV5eFJRVUZSTzFGQlEzaERMSGRDUVVGM1FpeERRVUZETEUxQlFVMHNSVUZCUlN4UlFVRlJMRVZCUVVVc1VVRkJVU3hEUVVGRExFTkJRVU03U1VGRGRrUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRTQ3huUWtGQlowSXNRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExGTkJRVk1zUlVGQlJTeG5Ra0ZCWjBJc1EwRkJReXhEUVVGRE8wbEJSVGRFTERSQ1FVRTBRanRKUVVNMVFpeDNRa0ZCZDBJc1EwRkJReXhOUVVGTkxFTkJRVU1zVVVGQlVTeEZRVUZGTEdsQ1FVRnBRaXhGUVVGRkxGRkJRVkVzUlVGQlJUdFJRVU55UlN4WlFVRlpMRVZCUVVVc1NVRkJTVHRMUVVOdVFpeERRVUZETEVOQlFVTTdTVUZGU0N3NFFrRkJPRUk3U1VGRE9VSXNkMEpCUVhkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEZGQlFWRXNSVUZCUlN4cFFrRkJhVUlzUlVGQlJTeFZRVUZWTEVWQlFVVTdVVUZEZGtVc1dVRkJXU3hGUVVGRkxFbEJRVWs3UzBGRGJrSXNRMEZCUXl4RFFVRkRPMGxCUlVnc2JVSkJRVzFDTzBsQlEyNUNMR2RDUVVGblFpeERRVUZETEUxQlFVMHNRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eFRRVUZUTEVWQlFVVXNiVUpCUVcxQ0xFTkJRVU1zUTBGQlF6dEpRVVV4UlN4TlFVRk5MR3RDUVVGclFpeEhRVUZITzFGQlEzcENMR3RDUVVGclFqdFJRVU5zUWl4UlFVRlJPMUZCUTFJc1YwRkJWenRSUVVOWUxHRkJRV0U3VVVGRFlpeFJRVUZSTzFGQlExSXNWMEZCVnp0UlFVTllMR05CUVdNN1VVRkRaQ3hYUVVGWE8xRkJRMWdzVjBGQlZ6dFJRVU5ZTEZkQlFWYzdVVUZEV0N4UlFVRlJPMUZCUTFJc1YwRkJWenRMUVVOYUxFTkJRVU03U1VGRFJpeG5Ra0ZCWjBJc1EwRkRaQ3hOUVVGTkxFTkJRVU1zZDBKQlFYZENMRU5CUVVNc1UwRkJVeXhGUVVONlF5d3dRa0ZCTUVJc1JVRkRNVUlzUlVGQlJTeHJRa0ZCYTBJc1JVRkJSU3hEUVVOMlFpeERRVUZETzBsQlJVWXNiVUpCUVcxQ08wbEJRMjVDTEdkQ1FVRm5RaXhEUVVGRExFMUJRVTBzUTBGQlF5eHBRa0ZCYVVJc1EwRkJReXhUUVVGVExFVkJRVVVzYlVKQlFXMUNMRU5CUVVNc1EwRkJRenRKUVVVeFJTeHpRa0ZCYzBJN1NVRkRkRUlzWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hEUVVGRExGbEJRVmtzUTBGQlF5eFRRVUZUTEVWQlFVVXNZMEZCWXl4RFFVRkRMRU5CUVVNN1NVRkRhRVVzWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hEUVVGRExHMUNRVUZ0UWl4RFFVRkRMRk5CUVZNc1JVRkJSU3h4UWtGQmNVSXNRMEZCUXl4RFFVRkRPMGxCUXpsRkxHZENRVUZuUWl4RFFVRkRMRTFCUVUwc1EwRkJReXhqUVVGakxFTkJRVU1zVTBGQlV5eEZRVUZGTEdkQ1FVRm5RaXhEUVVGRExFTkJRVU03U1VGRGNFVXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEZsQlFWa3NRMEZCUXl4VFFVRlRMRVZCUVVVc1kwRkJZeXhEUVVGRExFTkJRVU03U1VGRGFFVXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEZGQlFWRXNRMEZCUXl4VFFVRlRMRVZCUVVVc1ZVRkJWU3hEUVVGRExFTkJRVU03U1VGRGVFUXNaMEpCUVdkQ0xFTkJRVU1zVFVGQlRTeERRVUZETEcxQ1FVRnRRaXhEUVVGRExGTkJRVk1zUlVGQlJTeHhRa0ZCY1VJc1EwRkJReXhEUVVGRE8wRkJRMmhHTEVOQlFVTWlmUT09IiwiLy8gSW50cnVtZW50YXRpb24gaW5qZWN0aW9uIGNvZGUgaXMgYmFzZWQgb24gcHJpdmFjeWJhZGdlcmZpcmVmb3hcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9FRkZvcmcvcHJpdmFjeWJhZGdlcmZpcmVmb3gvYmxvYi9tYXN0ZXIvZGF0YS9maW5nZXJwcmludGluZy5qc1xuZXhwb3J0IGZ1bmN0aW9uIGpzSW5zdHJ1bWVudHMoZXZlbnRfaWQsIHNlbmRNZXNzYWdlc1RvTG9nZ2VyKSB7XG4gICAgLypcbiAgICAgKiBJbnN0cnVtZW50YXRpb24gaGVscGVyc1xuICAgICAqIChJbmxpbmVkIGluIG9yZGVyIGZvciBqc0luc3RydW1lbnRzIHRvIGJlIGVhc2lseSBleHBvcnRhYmxlIGFzIGEgc3RyaW5nKVxuICAgICAqL1xuICAgIC8vIGRlYm91bmNlIC0gZnJvbSBVbmRlcnNjb3JlIHYxLjYuMFxuICAgIGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSA9IGZhbHNlKSB7XG4gICAgICAgIGxldCB0aW1lb3V0LCBhcmdzLCBjb250ZXh0LCB0aW1lc3RhbXAsIHJlc3VsdDtcbiAgICAgICAgY29uc3QgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGlmIChsYXN0IDwgd2FpdCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgZ2VuZXJhdGVzIGEgcGF0aCBmb3IgYW4gZWxlbWVudFxuICAgIGZ1bmN0aW9uIGdldFBhdGhUb0RvbUVsZW1lbnQoZWxlbWVudCwgdmlzaWJpbGl0eUF0dHIgPSBmYWxzZSkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJOVUxML1wiICsgZWxlbWVudC50YWdOYW1lO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaWJsaW5nSW5kZXggPSAxO1xuICAgICAgICBjb25zdCBzaWJsaW5ncyA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpYmxpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzaWJsaW5nID0gc2libGluZ3NbaV07XG4gICAgICAgICAgICBpZiAoc2libGluZyA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gZ2V0UGF0aFRvRG9tRWxlbWVudChlbGVtZW50LnBhcmVudE5vZGUsIHZpc2liaWxpdHlBdHRyKTtcbiAgICAgICAgICAgICAgICBwYXRoICs9IFwiL1wiICsgZWxlbWVudC50YWdOYW1lICsgXCJbXCIgKyBzaWJsaW5nSW5kZXg7XG4gICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuaWQ7XG4gICAgICAgICAgICAgICAgcGF0aCArPSBcIixcIiArIGVsZW1lbnQuY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5QXR0cikge1xuICAgICAgICAgICAgICAgICAgICBwYXRoICs9IFwiLFwiICsgZWxlbWVudC5oaWRkZW47XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LnN0eWxlLmRpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09IFwiQVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGggKz0gXCIsXCIgKyBlbGVtZW50LmhyZWY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGggKz0gXCJdXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2libGluZy5ub2RlVHlwZSA9PT0gMSAmJiBzaWJsaW5nLnRhZ05hbWUgPT09IGVsZW1lbnQudGFnTmFtZSkge1xuICAgICAgICAgICAgICAgIHNpYmxpbmdJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEhlbHBlciBmb3IgSlNPTmlmeWluZyBvYmplY3RzXG4gICAgZnVuY3Rpb24gc2VyaWFsaXplT2JqZWN0KG9iamVjdCwgc3RyaW5naWZ5RnVuY3Rpb25zID0gZmFsc2UpIHtcbiAgICAgICAgLy8gSGFuZGxlIHBlcm1pc3Npb25zIGVycm9yc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKG9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RyaW5naWZ5RnVuY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3QudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkZVTkNUSU9OXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2Vlbk9iamVjdHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmplY3QsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdpZnlGdW5jdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiRlVOQ1RJT05cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB3cmFwcGluZyBvbiBjb250ZW50IG9iamVjdHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwid3JhcHBlZEpTT2JqZWN0XCIgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUud3JhcHBlZEpTT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFNlcmlhbGl6ZSBET00gZWxlbWVudHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRQYXRoVG9Eb21FbGVtZW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHNlcmlhbGl6YXRpb24gY3ljbGVzXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IFwiXCIgfHwgc2Vlbk9iamVjdHMuaW5kZXhPZih2YWx1ZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWVuT2JqZWN0cy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IFNFUklBTElaQVRJT04gRVJST1I6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIFwiU0VSSUFMSVpBVElPTiBFUlJPUjogXCIgKyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAqIERpcmVjdCBpbnN0cnVtZW50YXRpb24gb2YgamF2YXNjcmlwdCBvYmplY3RzXG4gICAgICovXG4gICAgY29uc3Qgc2VuZEZhY3RvcnkgPSBmdW5jdGlvbiAoJGV2ZW50X2lkLCAkc2VuZE1lc3NhZ2VzVG9Mb2dnZXIpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gW107XG4gICAgICAgIC8vIGRlYm91bmNlIHNlbmRpbmcgcXVldWVkIG1lc3NhZ2VzXG4gICAgICAgIGNvbnN0IF9zZW5kID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHNlbmRNZXNzYWdlc1RvTG9nZ2VyKCRldmVudF9pZCwgbWVzc2FnZXMpO1xuICAgICAgICAgICAgLy8gY2xlYXIgdGhlIHF1ZXVlXG4gICAgICAgICAgICBtZXNzYWdlcyA9IFtdO1xuICAgICAgICB9LCAxMDApO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1zZ1R5cGUsIG1zZykge1xuICAgICAgICAgICAgLy8gcXVldWUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goeyB0eXBlOiBtc2dUeXBlLCBjb250ZW50OiBtc2cgfSk7XG4gICAgICAgICAgICBfc2VuZCgpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgY29uc3Qgc2VuZCA9IHNlbmRGYWN0b3J5KGV2ZW50X2lkLCBzZW5kTWVzc2FnZXNUb0xvZ2dlcik7XG4gICAgLy8gQ291bnRlciB0byBjYXAgIyBvZiBjYWxscyBsb2dnZWQgZm9yIGVhY2ggc2NyaXB0L2FwaSBjb21iaW5hdGlvblxuICAgIGNvbnN0IG1heExvZ0NvdW50ID0gNTAwO1xuICAgIGNvbnN0IGxvZ0NvdW50ZXIgPSBuZXcgT2JqZWN0KCk7XG4gICAgZnVuY3Rpb24gdXBkYXRlQ291bnRlckFuZENoZWNrSWZPdmVyKHNjcmlwdFVybCwgc3ltYm9sKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHNjcmlwdFVybCArIFwifFwiICsgc3ltYm9sO1xuICAgICAgICBpZiAoa2V5IGluIGxvZ0NvdW50ZXIgJiYgbG9nQ291bnRlcltrZXldID49IG1heExvZ0NvdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghKGtleSBpbiBsb2dDb3VudGVyKSkge1xuICAgICAgICAgICAgbG9nQ291bnRlcltrZXldID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ0NvdW50ZXJba2V5XSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUHJldmVudCBsb2dnaW5nIG9mIGdldHMgYXJpc2luZyBmcm9tIGxvZ2dpbmdcbiAgICBsZXQgaW5Mb2cgPSBmYWxzZTtcbiAgICAvLyBUbyBrZWVwIHRyYWNrIG9mIHRoZSBvcmlnaW5hbCBvcmRlciBvZiBldmVudHNcbiAgICBsZXQgb3JkaW5hbCA9IDA7XG4gICAgLy8gRm9yIGdldHMsIHNldHMsIGV0Yy4gb24gYSBzaW5nbGUgdmFsdWVcbiAgICBmdW5jdGlvbiBsb2dWYWx1ZShpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWUsIHZhbHVlLCBvcGVyYXRpb24sIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncykge1xuICAgICAgICBpZiAoaW5Mb2cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbkxvZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IG92ZXJMaW1pdCA9IHVwZGF0ZUNvdW50ZXJBbmRDaGVja0lmT3ZlcihjYWxsQ29udGV4dC5zY3JpcHRVcmwsIGluc3RydW1lbnRlZFZhcmlhYmxlTmFtZSk7XG4gICAgICAgIGlmIChvdmVyTGltaXQpIHtcbiAgICAgICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbXNnID0ge1xuICAgICAgICAgICAgb3BlcmF0aW9uLFxuICAgICAgICAgICAgc3ltYm9sOiBpbnN0cnVtZW50ZWRWYXJpYWJsZU5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogc2VyaWFsaXplT2JqZWN0KHZhbHVlLCAhIWxvZ1NldHRpbmdzLmxvZ0Z1bmN0aW9uc0FzU3RyaW5ncyksXG4gICAgICAgICAgICBzY3JpcHRVcmw6IGNhbGxDb250ZXh0LnNjcmlwdFVybCxcbiAgICAgICAgICAgIHNjcmlwdExpbmU6IGNhbGxDb250ZXh0LnNjcmlwdExpbmUsXG4gICAgICAgICAgICBzY3JpcHRDb2w6IGNhbGxDb250ZXh0LnNjcmlwdENvbCxcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBjYWxsQ29udGV4dC5mdW5jTmFtZSxcbiAgICAgICAgICAgIHNjcmlwdExvY0V2YWw6IGNhbGxDb250ZXh0LnNjcmlwdExvY0V2YWwsXG4gICAgICAgICAgICBjYWxsU3RhY2s6IGNhbGxDb250ZXh0LmNhbGxTdGFjayxcbiAgICAgICAgICAgIG9yZGluYWw6IG9yZGluYWwrKyxcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlbmQoXCJsb2dWYWx1ZVwiLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBVbnN1Y2Nlc3NmdWwgdmFsdWUgbG9nIVwiKTtcbiAgICAgICAgICAgIGxvZ0Vycm9yVG9Db25zb2xlKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpbkxvZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBGb3IgZnVuY3Rpb25zXG4gICAgZnVuY3Rpb24gbG9nQ2FsbChpbnN0cnVtZW50ZWRGdW5jdGlvbk5hbWUsIGFyZ3MsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncykge1xuICAgICAgICBpZiAoaW5Mb2cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpbkxvZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IG92ZXJMaW1pdCA9IHVwZGF0ZUNvdW50ZXJBbmRDaGVja0lmT3ZlcihjYWxsQ29udGV4dC5zY3JpcHRVcmwsIGluc3RydW1lbnRlZEZ1bmN0aW9uTmFtZSk7XG4gICAgICAgIGlmIChvdmVyTGltaXQpIHtcbiAgICAgICAgICAgIGluTG9nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgc3BlY2lhbCBhcmd1bWVudHMgYXJyYXkgdG8gYSBzdGFuZGFyZCBhcnJheSBmb3IgSlNPTmlmeWluZ1xuICAgICAgICAgICAgY29uc3Qgc2VyaWFsQXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2VyaWFsQXJncy5wdXNoKHNlcmlhbGl6ZU9iamVjdChhcmdzW2ldLCAhIWxvZ1NldHRpbmdzLmxvZ0Z1bmN0aW9uc0FzU3RyaW5ncykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbXNnID0ge1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogXCJjYWxsXCIsXG4gICAgICAgICAgICAgICAgc3ltYm9sOiBpbnN0cnVtZW50ZWRGdW5jdGlvbk5hbWUsXG4gICAgICAgICAgICAgICAgYXJnczogc2VyaWFsQXJncyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJcIixcbiAgICAgICAgICAgICAgICBzY3JpcHRVcmw6IGNhbGxDb250ZXh0LnNjcmlwdFVybCxcbiAgICAgICAgICAgICAgICBzY3JpcHRMaW5lOiBjYWxsQ29udGV4dC5zY3JpcHRMaW5lLFxuICAgICAgICAgICAgICAgIHNjcmlwdENvbDogY2FsbENvbnRleHQuc2NyaXB0Q29sLFxuICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBjYWxsQ29udGV4dC5mdW5jTmFtZSxcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2NFdmFsOiBjYWxsQ29udGV4dC5zY3JpcHRMb2NFdmFsLFxuICAgICAgICAgICAgICAgIGNhbGxTdGFjazogY2FsbENvbnRleHQuY2FsbFN0YWNrLFxuICAgICAgICAgICAgICAgIG9yZGluYWw6IG9yZGluYWwrKyxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZW5kKFwibG9nQ2FsbFwiLCBtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBVbnN1Y2Nlc3NmdWwgY2FsbCBsb2c6IFwiICsgaW5zdHJ1bWVudGVkRnVuY3Rpb25OYW1lKTtcbiAgICAgICAgICAgIGxvZ0Vycm9yVG9Db25zb2xlKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpbkxvZyA9IGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsb2dFcnJvclRvQ29uc29sZShlcnJvciwgY29udGV4dCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbldQTTogRXJyb3IgbmFtZTogXCIgKyBlcnJvci5uYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBtZXNzYWdlOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEVycm9yIGZpbGVuYW1lOiBcIiArIGVycm9yLmZpbGVOYW1lKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBsaW5lIG51bWJlcjogXCIgKyBlcnJvci5saW5lTnVtYmVyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBzdGFjazogXCIgKyBlcnJvci5zdGFjayk7XG4gICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW5XUE06IEVycm9yIGNvbnRleHQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoY29udGV4dCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFJvdWdoIGltcGxlbWVudGF0aW9ucyBvZiBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yIGFuZCBPYmplY3QuZ2V0UHJvcGVydHlOYW1lc1xuICAgIC8vIFNlZSBodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmV4dGVuZGVkX29iamVjdF9hcGlcbiAgICBPYmplY3QuZ2V0UHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gKHN1YmplY3QsIG5hbWUpIHtcbiAgICAgICAgaWYgKHN1YmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZ2V0IHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHN1YmplY3QsIG5hbWUpO1xuICAgICAgICBsZXQgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc3ViamVjdCk7XG4gICAgICAgIHdoaWxlIChwZCA9PT0gdW5kZWZpbmVkICYmIHByb3RvICE9PSBudWxsKSB7XG4gICAgICAgICAgICBwZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIG5hbWUpO1xuICAgICAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwZDtcbiAgICB9O1xuICAgIE9iamVjdC5nZXRQcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICAgICAgaWYgKHN1YmplY3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgZ2V0IHByb3BlcnR5IG5hbWVzIGZvciB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3ViamVjdCk7XG4gICAgICAgIGxldCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzdWJqZWN0KTtcbiAgICAgICAgd2hpbGUgKHByb3RvICE9PSBudWxsKSB7XG4gICAgICAgICAgICBwcm9wcyA9IHByb3BzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykpO1xuICAgICAgICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZJWE1FOiByZW1vdmUgZHVwbGljYXRlIHByb3BlcnR5IG5hbWVzIGZyb20gcHJvcHNcbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH07XG4gICAgLy8gSGVscGVyIHRvIGdldCBvcmlnaW5hdGluZyBzY3JpcHQgdXJsc1xuICAgIGZ1bmN0aW9uIGdldFN0YWNrVHJhY2UoKSB7XG4gICAgICAgIGxldCBzdGFjaztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHN0YWNrID0gZXJyLnN0YWNrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGFjaztcbiAgICB9XG4gICAgLy8gZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81MjAyMTg1XG4gICAgY29uc3QgcnNwbGl0ID0gZnVuY3Rpb24gKHNvdXJjZSwgc2VwLCBtYXhzcGxpdCkge1xuICAgICAgICBjb25zdCBzcGxpdCA9IHNvdXJjZS5zcGxpdChzZXApO1xuICAgICAgICByZXR1cm4gbWF4c3BsaXRcbiAgICAgICAgICAgID8gW3NwbGl0LnNsaWNlKDAsIC1tYXhzcGxpdCkuam9pbihzZXApXS5jb25jYXQoc3BsaXQuc2xpY2UoLW1heHNwbGl0KSlcbiAgICAgICAgICAgIDogc3BsaXQ7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBnZXRPcmlnaW5hdGluZ1NjcmlwdENvbnRleHQoZ2V0Q2FsbFN0YWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdHJhY2UgPSBnZXRTdGFja1RyYWNlKClcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgLy8gcmV0dXJuIGEgY29udGV4dCBvYmplY3QgZXZlbiBpZiB0aGVyZSBpcyBhbiBlcnJvclxuICAgICAgICBjb25zdCBlbXB0eV9jb250ZXh0ID0ge1xuICAgICAgICAgICAgc2NyaXB0VXJsOiBcIlwiLFxuICAgICAgICAgICAgc2NyaXB0TGluZTogXCJcIixcbiAgICAgICAgICAgIHNjcmlwdENvbDogXCJcIixcbiAgICAgICAgICAgIGZ1bmNOYW1lOiBcIlwiLFxuICAgICAgICAgICAgc2NyaXB0TG9jRXZhbDogXCJcIixcbiAgICAgICAgICAgIGNhbGxTdGFjazogXCJcIixcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRyYWNlLmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eV9jb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIC8vIDAsIDEgYW5kIDIgYXJlIE9wZW5XUE0ncyBvd24gZnVuY3Rpb25zIChlLmcuIGdldFN0YWNrVHJhY2UpLCBza2lwIHRoZW0uXG4gICAgICAgIGNvbnN0IGNhbGxTaXRlID0gdHJhY2VbM107XG4gICAgICAgIGlmICghY2FsbFNpdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eV9jb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgICAqIFN0YWNrIGZyYW1lIGZvcm1hdCBpcyBzaW1wbHk6IEZVTkNfTkFNRUBGSUxFTkFNRTpMSU5FX05POkNPTFVNTl9OT1xuICAgICAgICAgKlxuICAgICAgICAgKiBJZiBldmFsIG9yIEZ1bmN0aW9uIGlzIGludm9sdmVkIHdlIGhhdmUgYW4gYWRkaXRpb25hbCBwYXJ0IGFmdGVyIHRoZSBGSUxFTkFNRSwgZS5nLjpcbiAgICAgICAgICogRlVOQ19OQU1FQEZJTEVOQU1FIGxpbmUgMTIzID4gZXZhbCBsaW5lIDEgPiBldmFsOkxJTkVfTk86Q09MVU1OX05PXG4gICAgICAgICAqIG9yIEZVTkNfTkFNRUBGSUxFTkFNRSBsaW5lIDIzNCA+IEZ1bmN0aW9uOkxJTkVfTk86Q09MVU1OX05PXG4gICAgICAgICAqXG4gICAgICAgICAqIFdlIHN0b3JlIHRoZSBwYXJ0IGJldHdlZW4gdGhlIEZJTEVOQU1FIGFuZCB0aGUgTElORV9OTyBpbiBzY3JpcHRMb2NFdmFsXG4gICAgICAgICAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHNjcmlwdFVybCA9IFwiXCI7XG4gICAgICAgICAgICBsZXQgc2NyaXB0TG9jRXZhbCA9IFwiXCI7IC8vIGZvciBldmFsIG9yIEZ1bmN0aW9uIGNhbGxzXG4gICAgICAgICAgICBjb25zdCBjYWxsU2l0ZVBhcnRzID0gY2FsbFNpdGUuc3BsaXQoXCJAXCIpO1xuICAgICAgICAgICAgY29uc3QgZnVuY05hbWUgPSBjYWxsU2l0ZVBhcnRzWzBdIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IHJzcGxpdChjYWxsU2l0ZVBhcnRzWzFdLCBcIjpcIiwgMik7XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5ObyA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgbGluZU5vID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMl07XG4gICAgICAgICAgICBjb25zdCBzY3JpcHRGaWxlTmFtZSA9IGl0ZW1zW2l0ZW1zLmxlbmd0aCAtIDNdIHx8IFwiXCI7XG4gICAgICAgICAgICBjb25zdCBsaW5lTm9JZHggPSBzY3JpcHRGaWxlTmFtZS5pbmRleE9mKFwiIGxpbmUgXCIpOyAvLyBsaW5lIGluIHRoZSBVUkwgbWVhbnMgZXZhbCBvciBGdW5jdGlvblxuICAgICAgICAgICAgaWYgKGxpbmVOb0lkeCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzY3JpcHRVcmwgPSBzY3JpcHRGaWxlTmFtZTsgLy8gVE9ETzogc29tZXRpbWVzIHdlIGhhdmUgZmlsZW5hbWUgb25seSwgZS5nLiBYWC5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NyaXB0VXJsID0gc2NyaXB0RmlsZU5hbWUuc2xpY2UoMCwgbGluZU5vSWR4KTtcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2NFdmFsID0gc2NyaXB0RmlsZU5hbWUuc2xpY2UobGluZU5vSWR4ICsgMSwgc2NyaXB0RmlsZU5hbWUubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhbGxDb250ZXh0ID0ge1xuICAgICAgICAgICAgICAgIHNjcmlwdFVybCxcbiAgICAgICAgICAgICAgICBzY3JpcHRMaW5lOiBsaW5lTm8sXG4gICAgICAgICAgICAgICAgc2NyaXB0Q29sOiBjb2x1bW5ObyxcbiAgICAgICAgICAgICAgICBmdW5jTmFtZSxcbiAgICAgICAgICAgICAgICBzY3JpcHRMb2NFdmFsLFxuICAgICAgICAgICAgICAgIGNhbGxTdGFjazogZ2V0Q2FsbFN0YWNrXG4gICAgICAgICAgICAgICAgICAgID8gdHJhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgOiBcIlwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsQ29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuV1BNOiBFcnJvciBwYXJzaW5nIHRoZSBzY3JpcHQgY29udGV4dFwiLCBlLnRvU3RyaW5nKCksIGNhbGxTaXRlKTtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eV9jb250ZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzT2JqZWN0KG9iamVjdCwgcHJvcGVydHlOYW1lKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHByb3BlcnR5ID0gb2JqZWN0W3Byb3BlcnR5TmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BlcnR5ID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBudWxsIGlzIHR5cGUgXCJvYmplY3RcIlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgcHJvcGVydHkgPT09IFwib2JqZWN0XCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluc3RydW1lbnRPYmplY3Qob2JqZWN0LCBvYmplY3ROYW1lLCBsb2dTZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIC8vIFVzZSBmb3Igb2JqZWN0cyBvciBvYmplY3QgcHJvdG90eXBlc1xuICAgICAgICAvL1xuICAgICAgICAvLyBQYXJhbWV0ZXJzXG4gICAgICAgIC8vIC0tLS0tLS0tLS1cbiAgICAgICAgLy8gICBvYmplY3QgOiBPYmplY3RcbiAgICAgICAgLy8gICAgIE9iamVjdCB0byBpbnN0cnVtZW50XG4gICAgICAgIC8vICAgb2JqZWN0TmFtZSA6IFN0cmluZ1xuICAgICAgICAvLyAgICAgTmFtZSBvZiB0aGUgb2JqZWN0IHRvIGJlIGluc3RydW1lbnRlZCAoc2F2ZWQgdG8gZGF0YWJhc2UpXG4gICAgICAgIC8vICAgbG9nU2V0dGluZ3MgOiBPYmplY3RcbiAgICAgICAgLy8gICAgIChvcHRpb25hbCkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBhZGRpdGlvbmFsIGxvZ2dpbmdcbiAgICAgICAgLy8gICAgIGNvbmZpZ3VyYXRpb25zLiBTZWUgYXZhaWxhYmxlIG9wdGlvbnMgYmVsb3cuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGxvZ1NldHRpbmdzIG9wdGlvbnMgKGFsbCBvcHRpb25hbClcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvLyAgIHByb3BlcnRpZXNUb0luc3RydW1lbnQgOiBBcnJheVxuICAgICAgICAvLyAgICAgQW4gYXJyYXkgb2YgcHJvcGVydGllcyB0byBpbnN0cnVtZW50IG9uIHRoaXMgb2JqZWN0LiBEZWZhdWx0IGlzXG4gICAgICAgIC8vICAgICBhbGwgcHJvcGVydGllcy5cbiAgICAgICAgLy8gICBub25FeGlzdGluZ1Byb3BlcnRpZXNUb0luc3RydW1lbnQgOiBBcnJheVxuICAgICAgICAvLyAgICAgQW4gYXJyYXkgb2Ygbm9uLWV4aXN0aW5nIHByb3BlcnRpZXMgdG8gaW5zdHJ1bWVudCBvbiB0aGlzIG9iamVjdC5cbiAgICAgICAgLy8gICBleGNsdWRlZFByb3BlcnRpZXMgOiBBcnJheVxuICAgICAgICAvLyAgICAgUHJvcGVydGllcyBleGNsdWRlZCBmcm9tIGluc3RydW1lbnRhdGlvbi4gRGVmYXVsdCBpcyBhbiBlbXB0eVxuICAgICAgICAvLyAgICAgYXJyYXkuXG4gICAgICAgIC8vICAgbG9nQ2FsbFN0YWNrIDogYm9vbGVhblxuICAgICAgICAvLyAgICAgU2V0IHRvIHRydWUgc2F2ZSB0aGUgY2FsbCBzdGFjayBpbmZvIHdpdGggZWFjaCBwcm9wZXJ0eSBjYWxsLlxuICAgICAgICAvLyAgICAgRGVmYXVsdCBpcyBgZmFsc2VgLlxuICAgICAgICAvLyAgIGxvZ0Z1bmN0aW9uc0FzU3RyaW5ncyA6IGJvb2xlYW5cbiAgICAgICAgLy8gICAgIFNldCB0byB0cnVlIHRvIHNhdmUgZnVuY3Rpb25hbCBhcmd1bWVudHMgYXMgc3RyaW5ncyBkdXJpbmdcbiAgICAgICAgLy8gICAgIGFyZ3VtZW50IHNlcmlhbGl6YXRpb24uIERlZmF1bHQgaXMgYGZhbHNlYC5cbiAgICAgICAgLy8gICBwcmV2ZW50U2V0cyA6IGJvb2xlYW5cbiAgICAgICAgLy8gICAgIFNldCB0byB0cnVlIHRvIHByZXZlbnQgbmVzdGVkIG9iamVjdHMgYW5kIGZ1bmN0aW9ucyBmcm9tIGJlaW5nXG4gICAgICAgIC8vICAgICBvdmVyd3JpdHRlbiAoYW5kIHRodXMgaGF2aW5nIHRoZWlyIGluc3RydW1lbnRhdGlvbiByZW1vdmVkKS5cbiAgICAgICAgLy8gICAgIE90aGVyIHByb3BlcnRpZXMgKHN0YXRpYyB2YWx1ZXMpIGNhbiBzdGlsbCBiZSBzZXQgd2l0aCB0aGlzIGlzXG4gICAgICAgIC8vICAgICBlbmFibGVkLiBEZWZhdWx0IGlzIGBmYWxzZWAuXG4gICAgICAgIC8vICAgcmVjdXJzaXZlIDogYm9vbGVhblxuICAgICAgICAvLyAgICAgU2V0IHRvIGB0cnVlYCB0byByZWN1cnNpdmVseSBpbnN0cnVtZW50IGFsbCBvYmplY3QgcHJvcGVydGllcyBvZlxuICAgICAgICAvLyAgICAgdGhlIGdpdmVuIGBvYmplY3RgLiBEZWZhdWx0IGlzIGBmYWxzZWBcbiAgICAgICAgLy8gICAgIE5PVEU6XG4gICAgICAgIC8vICAgICAgICgxKWBsb2dTZXR0aW5nc1sncHJvcGVydGllc1RvSW5zdHJ1bWVudCddYCBkb2VzIG5vdCBwcm9wYWdhdGVcbiAgICAgICAgLy8gICAgICAgICAgIHRvIHN1Yi1vYmplY3RzLlxuICAgICAgICAvLyAgICAgICAoMikgU3ViLW9iamVjdHMgb2YgcHJvdG90eXBlcyBjYW4gbm90IGJlIGluc3RydW1lbnRlZFxuICAgICAgICAvLyAgICAgICAgICAgcmVjdXJzaXZlbHkgYXMgdGhlc2UgcHJvcGVydGllcyBjYW4gbm90IGJlIGFjY2Vzc2VkXG4gICAgICAgIC8vICAgICAgICAgICB1bnRpbCBhbiBpbnN0YW5jZSBvZiB0aGUgcHJvdG90eXBlIGlzIGNyZWF0ZWQuXG4gICAgICAgIC8vICAgZGVwdGggOiBpbnRlZ2VyXG4gICAgICAgIC8vICAgICBSZWN1cnNpb24gbGltaXQgd2hlbiBpbnN0cnVtZW50aW5nIG9iamVjdCByZWN1cnNpdmVseS5cbiAgICAgICAgLy8gICAgIERlZmF1bHQgaXMgYDVgLlxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gbG9nU2V0dGluZ3MucHJvcGVydGllc1RvSW5zdHJ1bWVudFxuICAgICAgICAgICAgPyBsb2dTZXR0aW5ncy5wcm9wZXJ0aWVzVG9JbnN0cnVtZW50XG4gICAgICAgICAgICA6IE9iamVjdC5nZXRQcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcGVydHlOYW1lIG9mIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmIChsb2dTZXR0aW5ncy5leGNsdWRlZFByb3BlcnRpZXMgJiZcbiAgICAgICAgICAgICAgICBsb2dTZXR0aW5ncy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGByZWN1cnNpdmVgIGZsYWcgc2V0IHdlIHdhbnQgdG8gcmVjdXJzaXZlbHkgaW5zdHJ1bWVudCBhbnlcbiAgICAgICAgICAgIC8vIG9iamVjdCBwcm9wZXJ0aWVzIHRoYXQgYXJlbid0IHRoZSBwcm90b3R5cGUgb2JqZWN0LiBPbmx5IHJlY3Vyc2UgaWZcbiAgICAgICAgICAgIC8vIGRlcHRoIG5vdCBzZXQgKGF0IHdoaWNoIHBvaW50IGl0cyBzZXQgdG8gZGVmYXVsdCkgb3Igbm90IGF0IGxpbWl0LlxuICAgICAgICAgICAgaWYgKCEhbG9nU2V0dGluZ3MucmVjdXJzaXZlICYmXG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lICE9PSBcIl9fcHJvdG9fX1wiICYmXG4gICAgICAgICAgICAgICAgaXNPYmplY3Qob2JqZWN0LCBwcm9wZXJ0eU5hbWUpICYmXG4gICAgICAgICAgICAgICAgKCEoXCJkZXB0aFwiIGluIGxvZ1NldHRpbmdzKSB8fCBsb2dTZXR0aW5ncy5kZXB0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IHJlY3Vyc2lvbiBsaW1pdCB0byBkZWZhdWx0IGlmIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgICAgICAgICBpZiAoIShcImRlcHRoXCIgaW4gbG9nU2V0dGluZ3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZ1NldHRpbmdzLmRlcHRoID0gNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zdHJ1bWVudE9iamVjdChvYmplY3RbcHJvcGVydHlOYW1lXSwgb2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVkUHJvcGVydGllczogbG9nU2V0dGluZ3MuZXhjbHVkZWRQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICBsb2dDYWxsU3RhY2s6IGxvZ1NldHRpbmdzLmxvZ0NhbGxTdGFjayxcbiAgICAgICAgICAgICAgICAgICAgbG9nRnVuY3Rpb25zQXNTdHJpbmdzOiBsb2dTZXR0aW5ncy5sb2dGdW5jdGlvbnNBc1N0cmluZ3MsXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnRTZXRzOiBsb2dTZXR0aW5ncy5wcmV2ZW50U2V0cyxcbiAgICAgICAgICAgICAgICAgICAgcmVjdXJzaXZlOiBsb2dTZXR0aW5ncy5yZWN1cnNpdmUsXG4gICAgICAgICAgICAgICAgICAgIGRlcHRoOiBsb2dTZXR0aW5ncy5kZXB0aCAtIDEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eShvYmplY3QsIG9iamVjdE5hbWUsIHByb3BlcnR5TmFtZSwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IsIHsgb2JqZWN0TmFtZSwgcHJvcGVydHlOYW1lIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vbkV4aXN0aW5nUHJvcGVydGllcyA9IGxvZ1NldHRpbmdzLm5vbkV4aXN0aW5nUHJvcGVydGllc1RvSW5zdHJ1bWVudDtcbiAgICAgICAgaWYgKG5vbkV4aXN0aW5nUHJvcGVydGllcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgb2Ygbm9uRXhpc3RpbmdQcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvZ1NldHRpbmdzLmV4Y2x1ZGVkUHJvcGVydGllcyAmJlxuICAgICAgICAgICAgICAgICAgICBsb2dTZXR0aW5ncy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGluc3RydW1lbnRPYmplY3RQcm9wZXJ0eShvYmplY3QsIG9iamVjdE5hbWUsIHByb3BlcnR5TmFtZSwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nRXJyb3JUb0NvbnNvbGUoZXJyb3IsIHsgb2JqZWN0TmFtZSwgcHJvcGVydHlOYW1lIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBMb2cgY2FsbHMgdG8gYSBnaXZlbiBmdW5jdGlvblxuICAgIC8vIFRoaXMgaGVscGVyIGZ1bmN0aW9uIHJldHVybnMgYSB3cmFwcGVyIGFyb3VuZCBgZnVuY2Agd2hpY2ggbG9ncyBjYWxsc1xuICAgIC8vIHRvIGBmdW5jYC4gYG9iamVjdE5hbWVgIGFuZCBgbWV0aG9kTmFtZWAgYXJlIHVzZWQgc3RyaWN0bHkgdG8gaWRlbnRpZnlcbiAgICAvLyB3aGljaCBvYmplY3QgbWV0aG9kIGBmdW5jYCBpcyBjb21pbmcgZnJvbSBpbiB0aGUgbG9nc1xuICAgIGZ1bmN0aW9uIGluc3RydW1lbnRGdW5jdGlvbihvYmplY3ROYW1lLCBtZXRob2ROYW1lLCBmdW5jLCBsb2dTZXR0aW5ncykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSBnZXRPcmlnaW5hdGluZ1NjcmlwdENvbnRleHQoISFsb2dTZXR0aW5ncy5sb2dDYWxsU3RhY2spO1xuICAgICAgICAgICAgbG9nQ2FsbChvYmplY3ROYW1lICsgXCIuXCIgKyBtZXRob2ROYW1lLCBhcmd1bWVudHMsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBMb2cgcHJvcGVydGllcyBvZiBwcm90b3R5cGVzIGFuZCBvYmplY3RzXG4gICAgZnVuY3Rpb24gaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5KG9iamVjdCwgb2JqZWN0TmFtZSwgcHJvcGVydHlOYW1lLCBsb2dTZXR0aW5ncyA9IHt9KSB7XG4gICAgICAgIGlmICghb2JqZWN0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG9iamVjdDogXCIgKyBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb2JqZWN0TmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBvYmplY3QgbmFtZTogXCIgKyBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcHJvcGVydHlOYW1lIHx8IHByb3BlcnR5TmFtZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBvYmplY3QgcHJvcGVydHkgbmFtZTogXCIgKyBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0b3JlIG9yaWdpbmFsIGRlc2NyaXB0b3IgaW4gY2xvc3VyZVxuICAgICAgICBjb25zdCBwcm9wRGVzYyA9IE9iamVjdC5nZXRQcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICAvLyBQcm9wZXJ0eSBkZXNjcmlwdG9yIG11c3QgZXhpc3QgdW5sZXNzIHdlIGFyZSBpbnN0cnVtZW50aW5nIGFcbiAgICAgICAgLy8gbm9uLWV4aXN0aW5nIHByb3BlcnR5XG4gICAgICAgIGlmICghcHJvcERlc2MgJiZcbiAgICAgICAgICAgICghbG9nU2V0dGluZ3Mubm9uRXhpc3RpbmdQcm9wZXJ0aWVzVG9JbnN0cnVtZW50IHx8XG4gICAgICAgICAgICAgICAgbG9nU2V0dGluZ3Mubm9uRXhpc3RpbmdQcm9wZXJ0aWVzVG9JbnN0cnVtZW50LmluZGV4T2YocHJvcGVydHlOYW1lKSA9PVxuICAgICAgICAgICAgICAgICAgICAtMSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eSBkZXNjcmlwdG9yIG5vdCBmb3VuZCBmb3JcIiwgb2JqZWN0TmFtZSwgcHJvcGVydHlOYW1lLCBvYmplY3QpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIHVuZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgICAgIGxldCB1bmRlZmluZWRQcm9wVmFsdWU7XG4gICAgICAgIGNvbnN0IHVuZGVmaW5lZFByb3BEZXNjID0ge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFByb3BWYWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICB1bmRlZmluZWRQcm9wVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gSW5zdHJ1bWVudCBkYXRhIG9yIGFjY2Vzc29yIHByb3BlcnR5IGRlc2NyaXB0b3JzXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsR2V0dGVyID0gcHJvcERlc2MgPyBwcm9wRGVzYy5nZXQgOiB1bmRlZmluZWRQcm9wRGVzYy5nZXQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsU2V0dGVyID0gcHJvcERlc2MgPyBwcm9wRGVzYy5zZXQgOiB1bmRlZmluZWRQcm9wRGVzYy5zZXQ7XG4gICAgICAgIGxldCBvcmlnaW5hbFZhbHVlID0gcHJvcERlc2MgPyBwcm9wRGVzYy52YWx1ZSA6IHVuZGVmaW5lZFByb3BWYWx1ZTtcbiAgICAgICAgLy8gV2Ugb3ZlcndyaXRlIGJvdGggZGF0YSBhbmQgYWNjZXNzb3IgcHJvcGVydGllcyBhcyBhbiBpbnN0cnVtZW50ZWRcbiAgICAgICAgLy8gYWNjZXNzb3IgcHJvcGVydHlcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcGVydHlOYW1lLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9yaWdQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSBnZXRPcmlnaW5hdGluZ1NjcmlwdENvbnRleHQoISFsb2dTZXR0aW5ncy5sb2dDYWxsU3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgb3JpZ2luYWwgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9wRGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdW5kZWZpbmVkIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnUHJvcGVydHkgPSB1bmRlZmluZWRQcm9wVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAob3JpZ2luYWxHZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFjY2Vzc29yIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnUHJvcGVydHkgPSBvcmlnaW5hbEdldHRlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFwidmFsdWVcIiBpbiBwcm9wRGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgZGF0YSBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ1Byb3BlcnR5ID0gb3JpZ2luYWxWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9wZXJ0eSBkZXNjcmlwdG9yIGZvclwiLCBvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eU5hbWUsIFwiZG9lc24ndCBoYXZlIGdldHRlciBvciB2YWx1ZT9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dWYWx1ZShvYmplY3ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eU5hbWUsIFwiXCIsIFwiZ2V0KGZhaWxlZClcIiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBMb2cgYGdldHNgIGV4Y2VwdCB0aG9zZSB0aGF0IGhhdmUgaW5zdHJ1bWVudGVkIHJldHVybiB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gKiBBbGwgcmV0dXJuZWQgZnVuY3Rpb25zIGFyZSBpbnN0cnVtZW50ZWQgd2l0aCBhIHdyYXBwZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gKiBSZXR1cm5lZCBvYmplY3RzIG1heSBiZSBpbnN0cnVtZW50ZWQgaWYgcmVjdXJzaXZlXG4gICAgICAgICAgICAgICAgICAgIC8vICAgaW5zdHJ1bWVudGF0aW9uIGlzIGVuYWJsZWQgYW5kIHRoaXMgaXNuJ3QgYXQgdGhlIGRlcHRoIGxpbWl0LlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9yaWdQcm9wZXJ0eSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9nU2V0dGluZ3MubG9nRnVuY3Rpb25HZXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nVmFsdWUob2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCBvcmlnUHJvcGVydHksIFwiZ2V0KGZ1bmN0aW9uKVwiLCBjYWxsQ29udGV4dCwgbG9nU2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdHJ1bWVudGVkRnVuY3Rpb25XcmFwcGVyID0gaW5zdHJ1bWVudEZ1bmN0aW9uKG9iamVjdE5hbWUsIHByb3BlcnR5TmFtZSwgb3JpZ1Byb3BlcnR5LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBwcm90b3R5cGUgYW5kIGNvbnN0cnVjdG9yIHNvIHRoYXQgaW5zdHJ1bWVudGVkIGNsYXNzZXMgcmVtYWluIGludGFjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogVGhpcyBtYXkgaGF2ZSBpbnRyb2R1Y2VkIHByb3RvdHlwZSBwb2xsdXRpb24gYXMgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL09wZW5XUE0vaXNzdWVzLzQ3MVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdQcm9wZXJ0eS5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVtZW50ZWRGdW5jdGlvbldyYXBwZXIucHJvdG90eXBlID0gb3JpZ1Byb3BlcnR5LnByb3RvdHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ1Byb3BlcnR5LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVtZW50ZWRGdW5jdGlvbldyYXBwZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdQcm9wZXJ0eS5wcm90b3R5cGUuY29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RydW1lbnRlZEZ1bmN0aW9uV3JhcHBlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3JpZ1Byb3BlcnR5ID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhIWxvZ1NldHRpbmdzLnJlY3Vyc2l2ZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKCEoXCJkZXB0aFwiIGluIGxvZ1NldHRpbmdzKSB8fCBsb2dTZXR0aW5ncy5kZXB0aCA+IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ1Byb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nVmFsdWUob2JqZWN0TmFtZSArIFwiLlwiICsgcHJvcGVydHlOYW1lLCBvcmlnUHJvcGVydHksIFwiZ2V0XCIsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ1Byb3BlcnR5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICBzZXQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IGdldE9yaWdpbmF0aW5nU2NyaXB0Q29udGV4dCghIWxvZ1NldHRpbmdzLmxvZ0NhbGxTdGFjayk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBzZXRzIGZvciBmdW5jdGlvbnMgYW5kIG9iamVjdHMgaWYgZW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoISFsb2dTZXR0aW5ncy5wcmV2ZW50U2V0cyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBvcmlnaW5hbFZhbHVlID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb3JpZ2luYWxWYWx1ZSA9PT0gXCJvYmplY3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgdmFsdWUsIFwic2V0KHByZXZlbnRlZClcIiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBzZXQgbmV3IHZhbHVlIHRvIG9yaWdpbmFsIHNldHRlci9sb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxTZXR0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFjY2Vzc29yIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IG9yaWdpbmFsU2V0dGVyLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFwidmFsdWVcIiBpbiBwcm9wRGVzYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5Mb2cgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdC5pc1Byb3RvdHlwZU9mKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHByb3BlcnR5TmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbkxvZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlByb3BlcnR5IGRlc2NyaXB0b3IgZm9yXCIsIG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgXCJkb2Vzbid0IGhhdmUgc2V0dGVyIG9yIHZhbHVlP1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgdmFsdWUsIFwic2V0KGZhaWxlZClcIiwgY2FsbENvbnRleHQsIGxvZ1NldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBsb2cgc2V0XG4gICAgICAgICAgICAgICAgICAgIGxvZ1ZhbHVlKG9iamVjdE5hbWUgKyBcIi5cIiArIHByb3BlcnR5TmFtZSwgdmFsdWUsIFwic2V0XCIsIGNhbGxDb250ZXh0LCBsb2dTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiBuZXcgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSgpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHsgaW5zdHJ1bWVudE9iamVjdCwgaW5zdHJ1bWVudE9iamVjdFByb3BlcnR5IH07XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lhbk10YVc1emRISjFiV1Z1ZEhNdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl1TGk4dUxpOHVMaTl6Y21NdmJHbGlMMnB6TFdsdWMzUnlkVzFsYm5SekxuUnpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCTEdsRlFVRnBSVHRCUVVOcVJTeHZSa0ZCYjBZN1FVRjNRbkJHTEUxQlFVMHNWVUZCVlN4aFFVRmhMRU5CUVVNc1VVRkJVU3hGUVVGRkxHOUNRVUZ2UWp0SlFVTXhSRHM3TzA5QlIwYzdTVUZGU0N4dlEwRkJiME03U1VGRGNFTXNVMEZCVXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJTeFRRVUZUTEVkQlFVY3NTMEZCU3p0UlFVTTNReXhKUVVGSkxFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVVXNUMEZCVHl4RlFVRkZMRk5CUVZNc1JVRkJSU3hOUVVGTkxFTkJRVU03VVVGRk9VTXNUVUZCVFN4TFFVRkxMRWRCUVVjN1dVRkRXaXhOUVVGTkxFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RlFVRkZMRWRCUVVjc1UwRkJVeXhEUVVGRE8xbEJRM0JETEVsQlFVa3NTVUZCU1N4SFFVRkhMRWxCUVVrc1JVRkJSVHRuUWtGRFppeFBRVUZQTEVkQlFVY3NWVUZCVlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTTdZVUZETVVNN2FVSkJRVTA3WjBKQlEwd3NUMEZCVHl4SFFVRkhMRWxCUVVrc1EwRkJRenRuUWtGRFppeEpRVUZKTEVOQlFVTXNVMEZCVXl4RlFVRkZPMjlDUVVOa0xFMUJRVTBzUjBGQlJ5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dHZRa0ZEYmtNc1QwRkJUeXhIUVVGSExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTTdhVUpCUTNaQ08yRkJRMFk3VVVGRFNDeERRVUZETEVOQlFVTTdVVUZGUml4UFFVRlBPMWxCUTB3c1QwRkJUeXhIUVVGSExFbEJRVWtzUTBGQlF6dFpRVU5tTEVsQlFVa3NSMEZCUnl4VFFVRlRMRU5CUVVNN1dVRkRha0lzVTBGQlV5eEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJRenRaUVVOMlFpeE5RVUZOTEU5QlFVOHNSMEZCUnl4VFFVRlRMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU03V1VGRGRFTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSVHRuUWtGRFdpeFBRVUZQTEVkQlFVY3NWVUZCVlN4RFFVRkRMRXRCUVVzc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dGhRVU51UXp0WlFVTkVMRWxCUVVrc1QwRkJUeXhGUVVGRk8yZENRVU5ZTEUxQlFVMHNSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0blFrRkRia01zVDBGQlR5eEhRVUZITEVsQlFVa3NSMEZCUnl4SlFVRkpMRU5CUVVNN1lVRkRka0k3V1VGRlJDeFBRVUZQTEUxQlFVMHNRMEZCUXp0UlFVTm9RaXhEUVVGRExFTkJRVU03U1VGRFNpeERRVUZETzBsQlJVUXNPRU5CUVRoRE8wbEJRemxETEZOQlFWTXNiVUpCUVcxQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEdOQlFXTXNSMEZCUnl4TFFVRkxPMUZCUXpGRUxFbEJRVWtzVDBGQlR5eExRVUZMTEZGQlFWRXNRMEZCUXl4SlFVRkpMRVZCUVVVN1dVRkROMElzVDBGQlR5eFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRPMU5CUTNoQ08xRkJRMFFzU1VGQlNTeFBRVUZQTEVOQlFVTXNWVUZCVlN4TFFVRkxMRWxCUVVrc1JVRkJSVHRaUVVNdlFpeFBRVUZQTEU5QlFVOHNSMEZCUnl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRE8xTkJRMnhETzFGQlJVUXNTVUZCU1N4WlFVRlpMRWRCUVVjc1EwRkJReXhEUVVGRE8xRkJRM0pDTEUxQlFVMHNVVUZCVVN4SFFVRkhMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU1zVlVGQlZTeERRVUZETzFGQlF5OURMRXRCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4UlFVRlJMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzFsQlEzaERMRTFCUVUwc1QwRkJUeXhIUVVGSExGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTTFRaXhKUVVGSkxFOUJRVThzUzBGQlN5eFBRVUZQTEVWQlFVVTdaMEpCUTNaQ0xFbEJRVWtzU1VGQlNTeEhRVUZITEcxQ1FVRnRRaXhEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZWTEVWQlFVVXNZMEZCWXl4RFFVRkRMRU5CUVVNN1owSkJRMjVGTEVsQlFVa3NTVUZCU1N4SFFVRkhMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVThzUjBGQlJ5eEhRVUZITEVkQlFVY3NXVUZCV1N4RFFVRkRPMmRDUVVOdVJDeEpRVUZKTEVsQlFVa3NSMEZCUnl4SFFVRkhMRTlCUVU4c1EwRkJReXhGUVVGRkxFTkJRVU03WjBKQlEzcENMRWxCUVVrc1NVRkJTU3hIUVVGSExFZEJRVWNzVDBGQlR5eERRVUZETEZOQlFWTXNRMEZCUXp0blFrRkRhRU1zU1VGQlNTeGpRVUZqTEVWQlFVVTdiMEpCUTJ4Q0xFbEJRVWtzU1VGQlNTeEhRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRTFCUVUwc1EwRkJRenR2UWtGRE4wSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXp0dlFrRkRjRU1zU1VGQlNTeEpRVUZKTEVkQlFVY3NSMEZCUnl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExGVkJRVlVzUTBGQlF6dHBRa0ZEZUVNN1owSkJRMFFzU1VGQlNTeFBRVUZQTEVOQlFVTXNUMEZCVHl4TFFVRkxMRWRCUVVjc1JVRkJSVHR2UWtGRE0wSXNTVUZCU1N4SlFVRkpMRWRCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETzJsQ1FVTTFRanRuUWtGRFJDeEpRVUZKTEVsQlFVa3NSMEZCUnl4RFFVRkRPMmRDUVVOYUxFOUJRVThzU1VGQlNTeERRVUZETzJGQlEySTdXVUZEUkN4SlFVRkpMRTlCUVU4c1EwRkJReXhSUVVGUkxFdEJRVXNzUTBGQlF5eEpRVUZKTEU5QlFVOHNRMEZCUXl4UFFVRlBMRXRCUVVzc1QwRkJUeXhEUVVGRExFOUJRVThzUlVGQlJUdG5Ra0ZEYWtVc1dVRkJXU3hGUVVGRkxFTkJRVU03WVVGRGFFSTdVMEZEUmp0SlFVTklMRU5CUVVNN1NVRkZSQ3huUTBGQlowTTdTVUZEYUVNc1UwRkJVeXhsUVVGbExFTkJRVU1zVFVGQlRTeEZRVUZGTEd0Q1FVRnJRaXhIUVVGSExFdEJRVXM3VVVGRGVrUXNORUpCUVRSQ08xRkJRelZDTEVsQlFVazdXVUZEUml4SlFVRkpMRTFCUVUwc1MwRkJTeXhKUVVGSkxFVkJRVVU3WjBKQlEyNUNMRTlCUVU4c1RVRkJUU3hEUVVGRE8yRkJRMlk3V1VGRFJDeEpRVUZKTEU5QlFVOHNUVUZCVFN4TFFVRkxMRlZCUVZVc1JVRkJSVHRuUWtGRGFFTXNTVUZCU1N4clFrRkJhMElzUlVGQlJUdHZRa0ZEZEVJc1QwRkJUeXhOUVVGTkxFTkJRVU1zVVVGQlVTeEZRVUZGTEVOQlFVTTdhVUpCUXpGQ08zRkNRVUZOTzI5Q1FVTk1MRTlCUVU4c1ZVRkJWU3hEUVVGRE8ybENRVU51UWp0aFFVTkdPMWxCUTBRc1NVRkJTU3hQUVVGUExFMUJRVTBzUzBGQlN5eFJRVUZSTEVWQlFVVTdaMEpCUXpsQ0xFOUJRVThzVFVGQlRTeERRVUZETzJGQlEyWTdXVUZEUkN4TlFVRk5MRmRCUVZjc1IwRkJSeXhGUVVGRkxFTkJRVU03V1VGRGRrSXNUMEZCVHl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFMUJRVTBzUlVGQlJTeFZRVUZUTEVkQlFVY3NSVUZCUlN4TFFVRkxPMmRDUVVNdlF5eEpRVUZKTEV0QlFVc3NTMEZCU3l4SlFVRkpMRVZCUVVVN2IwSkJRMnhDTEU5QlFVOHNUVUZCVFN4RFFVRkRPMmxDUVVObU8yZENRVU5FTEVsQlFVa3NUMEZCVHl4TFFVRkxMRXRCUVVzc1ZVRkJWU3hGUVVGRk8yOUNRVU12UWl4SlFVRkpMR3RDUVVGclFpeEZRVUZGTzNkQ1FVTjBRaXhQUVVGUExFdEJRVXNzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXp0eFFrRkRla0k3ZVVKQlFVMDdkMEpCUTB3c1QwRkJUeXhWUVVGVkxFTkJRVU03Y1VKQlEyNUNPMmxDUVVOR08yZENRVU5FTEVsQlFVa3NUMEZCVHl4TFFVRkxMRXRCUVVzc1VVRkJVU3hGUVVGRk8yOUNRVU0zUWl4eFEwRkJjVU03YjBKQlEzSkRMRWxCUVVrc2FVSkJRV2xDTEVsQlFVa3NTMEZCU3l4RlFVRkZPM2RDUVVNNVFpeExRVUZMTEVkQlFVY3NTMEZCU3l4RFFVRkRMR1ZCUVdVc1EwRkJRenR4UWtGREwwSTdiMEpCUlVRc2VVSkJRWGxDTzI5Q1FVTjZRaXhKUVVGSkxFdEJRVXNzV1VGQldTeFhRVUZYTEVWQlFVVTdkMEpCUTJoRExFOUJRVThzYlVKQlFXMUNMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03Y1VKQlEyNURPMjlDUVVWRUxDdENRVUVyUWp0dlFrRkRMMElzU1VGQlNTeEhRVUZITEV0QlFVc3NSVUZCUlN4SlFVRkpMRmRCUVZjc1EwRkJReXhQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZPM2RDUVVOb1JDeFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8zZENRVU40UWl4UFFVRlBMRXRCUVVzc1EwRkJRenR4UWtGRFpEdDVRa0ZCVFR0M1FrRkRUQ3hQUVVGUExFOUJRVThzUzBGQlN5eERRVUZETzNGQ1FVTnlRanRwUWtGRFJqdG5Ra0ZEUkN4UFFVRlBMRXRCUVVzc1EwRkJRenRaUVVObUxFTkJRVU1zUTBGQlF5eERRVUZETzFOQlEwbzdVVUZCUXl4UFFVRlBMRXRCUVVzc1JVRkJSVHRaUVVOa0xFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNaME5CUVdkRExFZEJRVWNzUzBGQlN5eERRVUZETEVOQlFVTTdXVUZEZEVRc1QwRkJUeXgxUWtGQmRVSXNSMEZCUnl4TFFVRkxMRU5CUVVNN1UwRkRlRU03U1VGRFNDeERRVUZETzBsQlJVUTdPMDlCUlVjN1NVRkZTQ3hOUVVGTkxGZEJRVmNzUjBGQlJ5eFZRVUZUTEZOQlFWTXNSVUZCUlN4eFFrRkJjVUk3VVVGRE0wUXNTVUZCU1N4UlFVRlJMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRMnhDTEcxRFFVRnRRenRSUVVOdVF5eE5RVUZOTEV0QlFVc3NSMEZCUnl4UlFVRlJMRU5CUVVNN1dVRkRja0lzY1VKQlFYRkNMRU5CUVVNc1UwRkJVeXhGUVVGRkxGRkJRVkVzUTBGQlF5eERRVUZETzFsQlJUTkRMR3RDUVVGclFqdFpRVU5zUWl4UlFVRlJMRWRCUVVjc1JVRkJSU3hEUVVGRE8xRkJRMmhDTEVOQlFVTXNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJRenRSUVVWU0xFOUJRVThzVlVGQlV5eFBRVUZQTEVWQlFVVXNSMEZCUnp0WlFVTXhRaXh2UWtGQmIwSTdXVUZEY0VJc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVsQlFVa3NSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRkxFZEJRVWNzUlVGQlJTeERRVUZETEVOQlFVTTdXVUZETDBNc1MwRkJTeXhGUVVGRkxFTkJRVU03VVVGRFZpeERRVUZETEVOQlFVTTdTVUZEU2l4RFFVRkRMRU5CUVVNN1NVRkZSaXhOUVVGTkxFbEJRVWtzUjBGQlJ5eFhRVUZYTEVOQlFVTXNVVUZCVVN4RlFVRkZMRzlDUVVGdlFpeERRVUZETEVOQlFVTTdTVUZGZWtRc2JVVkJRVzFGTzBsQlEyNUZMRTFCUVUwc1YwRkJWeXhIUVVGSExFZEJRVWNzUTBGQlF6dEpRVU40UWl4TlFVRk5MRlZCUVZVc1IwRkJSeXhKUVVGSkxFMUJRVTBzUlVGQlJTeERRVUZETzBsQlJXaERMRk5CUVZNc01rSkJRVEpDTEVOQlFVTXNVMEZCVXl4RlFVRkZMRTFCUVUwN1VVRkRjRVFzVFVGQlRTeEhRVUZITEVkQlFVY3NVMEZCVXl4SFFVRkhMRWRCUVVjc1IwRkJSeXhOUVVGTkxFTkJRVU03VVVGRGNrTXNTVUZCU1N4SFFVRkhMRWxCUVVrc1ZVRkJWU3hKUVVGSkxGVkJRVlVzUTBGQlF5eEhRVUZITEVOQlFVTXNTVUZCU1N4WFFVRlhMRVZCUVVVN1dVRkRka1FzVDBGQlR5eEpRVUZKTEVOQlFVTTdVMEZEWWp0aFFVRk5MRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeFZRVUZWTEVOQlFVTXNSVUZCUlR0WlFVTXZRaXhWUVVGVkxFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMU5CUTNKQ08yRkJRVTA3V1VGRFRDeFZRVUZWTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xTkJRM1JDTzFGQlEwUXNUMEZCVHl4TFFVRkxMRU5CUVVNN1NVRkRaaXhEUVVGRE8wbEJSVVFzSzBOQlFTdERPMGxCUXk5RExFbEJRVWtzUzBGQlN5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVVnNRaXhuUkVGQlowUTdTVUZEYUVRc1NVRkJTU3hQUVVGUExFZEJRVWNzUTBGQlF5eERRVUZETzBsQlJXaENMSGxEUVVGNVF6dEpRVU42UXl4VFFVRlRMRkZCUVZFc1EwRkRaaXgzUWtGQmQwSXNSVUZEZUVJc1MwRkJTeXhGUVVOTUxGTkJRVk1zUlVGRFZDeFhRVUZYTEVWQlExZ3NWMEZCVnp0UlFVVllMRWxCUVVrc1MwRkJTeXhGUVVGRk8xbEJRMVFzVDBGQlR6dFRRVU5TTzFGQlEwUXNTMEZCU3l4SFFVRkhMRWxCUVVrc1EwRkJRenRSUVVWaUxFMUJRVTBzVTBGQlV5eEhRVUZITERKQ1FVRXlRaXhEUVVNelF5eFhRVUZYTEVOQlFVTXNVMEZCVXl4RlFVTnlRaXgzUWtGQmQwSXNRMEZEZWtJc1EwRkJRenRSUVVOR0xFbEJRVWtzVTBGQlV5eEZRVUZGTzFsQlEySXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenRaUVVOa0xFOUJRVTg3VTBGRFVqdFJRVVZFTEUxQlFVMHNSMEZCUnl4SFFVRkhPMWxCUTFZc1UwRkJVenRaUVVOVUxFMUJRVTBzUlVGQlJTeDNRa0ZCZDBJN1dVRkRhRU1zUzBGQlN5eEZRVUZGTEdWQlFXVXNRMEZCUXl4TFFVRkxMRVZCUVVVc1EwRkJReXhEUVVGRExGZEJRVmNzUTBGQlF5eHhRa0ZCY1VJc1EwRkJRenRaUVVOc1JTeFRRVUZUTEVWQlFVVXNWMEZCVnl4RFFVRkRMRk5CUVZNN1dVRkRhRU1zVlVGQlZTeEZRVUZGTEZkQlFWY3NRMEZCUXl4VlFVRlZPMWxCUTJ4RExGTkJRVk1zUlVGQlJTeFhRVUZYTEVOQlFVTXNVMEZCVXp0WlFVTm9ReXhSUVVGUkxFVkJRVVVzVjBGQlZ5eERRVUZETEZGQlFWRTdXVUZET1VJc1lVRkJZU3hGUVVGRkxGZEJRVmNzUTBGQlF5eGhRVUZoTzFsQlEzaERMRk5CUVZNc1JVRkJSU3hYUVVGWExFTkJRVU1zVTBGQlV6dFpRVU5vUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRk8xTkJRMjVDTEVOQlFVTTdVVUZGUml4SlFVRkpPMWxCUTBZc1NVRkJTU3hEUVVGRExGVkJRVlVzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0VFFVTjJRanRSUVVGRExFOUJRVThzUzBGQlN5eEZRVUZGTzFsQlEyUXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhyUTBGQmEwTXNRMEZCUXl4RFFVRkRPMWxCUTJoRUxHbENRVUZwUWl4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xTkJRekZDTzFGQlJVUXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJRenRKUVVOb1FpeERRVUZETzBsQlJVUXNaMEpCUVdkQ08wbEJRMmhDTEZOQlFWTXNUMEZCVHl4RFFVRkRMSGRDUVVGM1FpeEZRVUZGTEVsQlFVa3NSVUZCUlN4WFFVRlhMRVZCUVVVc1YwRkJWenRSUVVOMlJTeEpRVUZKTEV0QlFVc3NSVUZCUlR0WlFVTlVMRTlCUVU4N1UwRkRVanRSUVVORUxFdEJRVXNzUjBGQlJ5eEpRVUZKTEVOQlFVTTdVVUZGWWl4TlFVRk5MRk5CUVZNc1IwRkJSeXd5UWtGQk1rSXNRMEZETTBNc1YwRkJWeXhEUVVGRExGTkJRVk1zUlVGRGNrSXNkMEpCUVhkQ0xFTkJRM3BDTEVOQlFVTTdVVUZEUml4SlFVRkpMRk5CUVZNc1JVRkJSVHRaUVVOaUxFdEJRVXNzUjBGQlJ5eExRVUZMTEVOQlFVTTdXVUZEWkN4UFFVRlBPMU5CUTFJN1VVRkZSQ3hKUVVGSk8xbEJRMFlzY1VWQlFYRkZPMWxCUTNKRkxFMUJRVTBzVlVGQlZTeEhRVUZITEVWQlFVVXNRMEZCUXp0WlFVTjBRaXhMUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlR0blFrRkRjRU1zVlVGQlZTeERRVUZETEVsQlFVa3NRMEZEWWl4bFFVRmxMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4WFFVRlhMRU5CUVVNc2NVSkJRWEZDTEVOQlFVTXNRMEZET1VRc1EwRkJRenRoUVVOSU8xbEJRMFFzVFVGQlRTeEhRVUZITEVkQlFVYzdaMEpCUTFZc1UwRkJVeXhGUVVGRkxFMUJRVTA3WjBKQlEycENMRTFCUVUwc1JVRkJSU3gzUWtGQmQwSTdaMEpCUTJoRExFbEJRVWtzUlVGQlJTeFZRVUZWTzJkQ1FVTm9RaXhMUVVGTExFVkJRVVVzUlVGQlJUdG5Ra0ZEVkN4VFFVRlRMRVZCUVVVc1YwRkJWeXhEUVVGRExGTkJRVk03WjBKQlEyaERMRlZCUVZVc1JVRkJSU3hYUVVGWExFTkJRVU1zVlVGQlZUdG5Ra0ZEYkVNc1UwRkJVeXhGUVVGRkxGZEJRVmNzUTBGQlF5eFRRVUZUTzJkQ1FVTm9ReXhSUVVGUkxFVkJRVVVzVjBGQlZ5eERRVUZETEZGQlFWRTdaMEpCUXpsQ0xHRkJRV0VzUlVGQlJTeFhRVUZYTEVOQlFVTXNZVUZCWVR0blFrRkRlRU1zVTBGQlV5eEZRVUZGTEZkQlFWY3NRMEZCUXl4VFFVRlRPMmRDUVVOb1F5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZPMkZCUTI1Q0xFTkJRVU03V1VGRFJpeEpRVUZKTEVOQlFVTXNVMEZCVXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8xTkJRM1JDTzFGQlFVTXNUMEZCVHl4TFFVRkxMRVZCUVVVN1dVRkRaQ3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVU5VTEd0RFFVRnJReXhIUVVGSExIZENRVUYzUWl4RFFVTTVSQ3hEUVVGRE8xbEJRMFlzYVVKQlFXbENMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03VTBGRE1VSTdVVUZEUkN4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRE8wbEJRMmhDTEVOQlFVTTdTVUZGUkN4VFFVRlRMR2xDUVVGcFFpeERRVUZETEV0QlFVc3NSVUZCUlN4VlFVRmxMRXRCUVVzN1VVRkRjRVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4MVFrRkJkVUlzUjBGQlJ5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1VVRkRiRVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl3d1FrRkJNRUlzUjBGQlJ5eExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1VVRkRlRVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl3eVFrRkJNa0lzUjBGQlJ5eExRVUZMTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkRNVVFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl3NFFrRkJPRUlzUjBGQlJ5eExRVUZMTEVOQlFVTXNWVUZCVlN4RFFVRkRMRU5CUVVNN1VVRkRMMFFzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4M1FrRkJkMElzUjBGQlJ5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1VVRkRjRVFzU1VGQlNTeFBRVUZQTEVWQlFVVTdXVUZEV0N4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExEQkNRVUV3UWl4SFFVRkhMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0VFFVTnVSVHRKUVVOSUxFTkJRVU03U1VGRlJDeHZSa0ZCYjBZN1NVRkRjRVlzZVVWQlFYbEZPMGxCUTNwRkxFMUJRVTBzUTBGQlF5eHhRa0ZCY1VJc1IwRkJSeXhWUVVGVExFOUJRVThzUlVGQlJTeEpRVUZKTzFGQlEyNUVMRWxCUVVrc1QwRkJUeXhMUVVGTExGTkJRVk1zUlVGQlJUdFpRVU42UWl4TlFVRk5MRWxCUVVrc1MwRkJTeXhEUVVGRExEWkRRVUUyUXl4RFFVRkRMRU5CUVVNN1UwRkRhRVU3VVVGRFJDeEpRVUZKTEVWQlFVVXNSMEZCUnl4TlFVRk5MRU5CUVVNc2QwSkJRWGRDTEVOQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRM2hFTEVsQlFVa3NTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJReXhqUVVGakxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdVVUZETTBNc1QwRkJUeXhGUVVGRkxFdEJRVXNzVTBGQlV5eEpRVUZKTEV0QlFVc3NTMEZCU3l4SlFVRkpMRVZCUVVVN1dVRkRla01zUlVGQlJTeEhRVUZITEUxQlFVMHNRMEZCUXl4M1FrRkJkMElzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkRiRVFzUzBGQlN5eEhRVUZITEUxQlFVMHNRMEZCUXl4alFVRmpMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03VTBGRGRFTTdVVUZEUkN4UFFVRlBMRVZCUVVVc1EwRkJRenRKUVVOYUxFTkJRVU1zUTBGQlF6dEpRVVZHTEUxQlFVMHNRMEZCUXl4blFrRkJaMElzUjBGQlJ5eFZRVUZUTEU5QlFVODdVVUZEZUVNc1NVRkJTU3hQUVVGUExFdEJRVXNzVTBGQlV5eEZRVUZGTzFsQlEzcENMRTFCUVUwc1NVRkJTU3hMUVVGTExFTkJRVU1zZDBOQlFYZERMRU5CUVVNc1EwRkJRenRUUVVNelJEdFJRVU5FTEVsQlFVa3NTMEZCU3l4SFFVRkhMRTFCUVUwc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJRenRSUVVOb1JDeEpRVUZKTEV0QlFVc3NSMEZCUnl4TlFVRk5MRU5CUVVNc1kwRkJZeXhEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzFGQlF6TkRMRTlCUVU4c1MwRkJTeXhMUVVGTExFbEJRVWtzUlVGQlJUdFpRVU55UWl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXp0WlFVTjRSQ3hMUVVGTExFZEJRVWNzVFVGQlRTeERRVUZETEdOQlFXTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJRenRUUVVOMFF6dFJRVU5FTEc5RVFVRnZSRHRSUVVOd1JDeFBRVUZQTEV0QlFVc3NRMEZCUXp0SlFVTm1MRU5CUVVNc1EwRkJRenRKUVVWR0xIZERRVUYzUXp0SlFVTjRReXhUUVVGVExHRkJRV0U3VVVGRGNFSXNTVUZCU1N4TFFVRkxMRU5CUVVNN1VVRkZWaXhKUVVGSk8xbEJRMFlzVFVGQlRTeEpRVUZKTEV0QlFVc3NSVUZCUlN4RFFVRkRPMU5CUTI1Q08xRkJRVU1zVDBGQlR5eEhRVUZITEVWQlFVVTdXVUZEV2l4TFFVRkxMRWRCUVVjc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF6dFRRVU51UWp0UlFVVkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMllzUTBGQlF6dEpRVVZFTERCRFFVRXdRenRKUVVNeFF5eE5RVUZOTEUxQlFVMHNSMEZCUnl4VlFVRlRMRTFCUVdNc1JVRkJSU3hIUVVGSExFVkJRVVVzVVVGQlVUdFJRVU51UkN4TlFVRk5MRXRCUVVzc1IwRkJSeXhOUVVGTkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMUZCUTJoRExFOUJRVThzVVVGQlVUdFpRVU5pTEVOQlFVTXNRMEZCUXl4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0WlFVTjBSU3hEUVVGRExFTkJRVU1zUzBGQlN5eERRVUZETzBsQlExb3NRMEZCUXl4RFFVRkRPMGxCUlVZc1UwRkJVeXd5UWtGQk1rSXNRMEZCUXl4WlFVRlpMRWRCUVVjc1MwRkJTenRSUVVOMlJDeE5RVUZOTEV0QlFVc3NSMEZCUnl4aFFVRmhMRVZCUVVVN1lVRkRNVUlzU1VGQlNTeEZRVUZGTzJGQlEwNHNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRMllzYjBSQlFXOUVPMUZCUTNCRUxFMUJRVTBzWVVGQllTeEhRVUZITzFsQlEzQkNMRk5CUVZNc1JVRkJSU3hGUVVGRk8xbEJRMklzVlVGQlZTeEZRVUZGTEVWQlFVVTdXVUZEWkN4VFFVRlRMRVZCUVVVc1JVRkJSVHRaUVVOaUxGRkJRVkVzUlVGQlJTeEZRVUZGTzFsQlExb3NZVUZCWVN4RlFVRkZMRVZCUVVVN1dVRkRha0lzVTBGQlV5eEZRVUZGTEVWQlFVVTdVMEZEWkN4RFFVRkRPMUZCUTBZc1NVRkJTU3hMUVVGTExFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNSVUZCUlR0WlFVTndRaXhQUVVGUExHRkJRV0VzUTBGQlF6dFRRVU4wUWp0UlFVTkVMREJGUVVFd1JUdFJRVU14UlN4TlFVRk5MRkZCUVZFc1IwRkJSeXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVVUZETVVJc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJUdFpRVU5pTEU5QlFVOHNZVUZCWVN4RFFVRkRPMU5CUTNSQ08xRkJRMFE3T3pzN096czdPMWRCVVVjN1VVRkRTQ3hKUVVGSk8xbEJRMFlzU1VGQlNTeFRRVUZUTEVkQlFVY3NSVUZCUlN4RFFVRkRPMWxCUTI1Q0xFbEJRVWtzWVVGQllTeEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRMRFpDUVVFMlFqdFpRVU55UkN4TlFVRk5MR0ZCUVdFc1IwRkJSeXhSUVVGUkxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMWxCUXpGRExFMUJRVTBzVVVGQlVTeEhRVUZITEdGQlFXRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU03V1VGRGVFTXNUVUZCVFN4TFFVRkxMRWRCUVVjc1RVRkJUU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4SFFVRkhMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03V1VGREwwTXNUVUZCVFN4UlFVRlJMRWRCUVVjc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRla01zVFVGQlRTeE5RVUZOTEVkQlFVY3NTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEZGtNc1RVRkJUU3hqUVVGakxFZEJRVWNzUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETzFsQlEzSkVMRTFCUVUwc1UwRkJVeXhIUVVGSExHTkJRV01zUTBGQlF5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXg1UTBGQmVVTTdXVUZETjBZc1NVRkJTU3hUUVVGVExFdEJRVXNzUTBGQlF5eERRVUZETEVWQlFVVTdaMEpCUTNCQ0xGTkJRVk1zUjBGQlJ5eGpRVUZqTEVOQlFVTXNRMEZCUXl4dlJFRkJiMFE3WVVGRGFrWTdhVUpCUVUwN1owSkJRMHdzVTBGQlV5eEhRVUZITEdOQlFXTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhGUVVGRkxGTkJRVk1zUTBGQlF5eERRVUZETzJkQ1FVTXZReXhoUVVGaExFZEJRVWNzWTBGQll5eERRVUZETEV0QlFVc3NRMEZEYkVNc1UwRkJVeXhIUVVGSExFTkJRVU1zUlVGRFlpeGpRVUZqTEVOQlFVTXNUVUZCVFN4RFFVTjBRaXhEUVVGRE8yRkJRMGc3V1VGRFJDeE5RVUZOTEZkQlFWY3NSMEZCUnp0blFrRkRiRUlzVTBGQlV6dG5Ra0ZEVkN4VlFVRlZMRVZCUVVVc1RVRkJUVHRuUWtGRGJFSXNVMEZCVXl4RlFVRkZMRkZCUVZFN1owSkJRMjVDTEZGQlFWRTdaMEpCUTFJc1lVRkJZVHRuUWtGRFlpeFRRVUZUTEVWQlFVVXNXVUZCV1R0dlFrRkRja0lzUTBGQlF5eERRVUZETEV0QlFVczdlVUpCUTBZc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dDVRa0ZEVWl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRE8zbENRVU5XTEVsQlFVa3NSVUZCUlR0dlFrRkRXQ3hEUVVGRExFTkJRVU1zUlVGQlJUdGhRVU5RTEVOQlFVTTdXVUZEUml4UFFVRlBMRmRCUVZjc1EwRkJRenRUUVVOd1FqdFJRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUTFZc1QwRkJUeXhEUVVGRExFZEJRVWNzUTBGRFZDd3lRMEZCTWtNc1JVRkRNME1zUTBGQlF5eERRVUZETEZGQlFWRXNSVUZCUlN4RlFVTmFMRkZCUVZFc1EwRkRWQ3hEUVVGRE8xbEJRMFlzVDBGQlR5eGhRVUZoTEVOQlFVTTdVMEZEZEVJN1NVRkRTQ3hEUVVGRE8wbEJSVVFzVTBGQlV5eFJRVUZSTEVOQlFVTXNUVUZCVFN4RlFVRkZMRmxCUVZrN1VVRkRjRU1zU1VGQlNTeFJRVUZSTEVOQlFVTTdVVUZEWWl4SlFVRkpPMWxCUTBZc1VVRkJVU3hIUVVGSExFMUJRVTBzUTBGQlF5eFpRVUZaTEVOQlFVTXNRMEZCUXp0VFFVTnFRenRSUVVGRExFOUJRVThzUzBGQlN5eEZRVUZGTzFsQlEyUXNUMEZCVHl4TFFVRkxMRU5CUVVNN1UwRkRaRHRSUVVORUxFbEJRVWtzVVVGQlVTeExRVUZMTEVsQlFVa3NSVUZCUlR0WlFVTnlRaXgzUWtGQmQwSTdXVUZEZUVJc1QwRkJUeXhMUVVGTExFTkJRVU03VTBGRFpEdFJRVU5FTEU5QlFVOHNUMEZCVHl4UlFVRlJMRXRCUVVzc1VVRkJVU3hEUVVGRE8wbEJRM1JETEVOQlFVTTdTVUZGUkN4VFFVRlRMR2RDUVVGblFpeERRVUZETEUxQlFVMHNSVUZCUlN4VlFVRlZMRVZCUVVVc1kwRkJNa0lzUlVGQlJUdFJRVU42UlN4MVEwRkJkVU03VVVGRGRrTXNSVUZCUlR0UlFVTkdMR0ZCUVdFN1VVRkRZaXhoUVVGaE8xRkJRMklzYjBKQlFXOUNPMUZCUTNCQ0xESkNRVUV5UWp0UlFVTXpRaXgzUWtGQmQwSTdVVUZEZUVJc1owVkJRV2RGTzFGQlEyaEZMSGxDUVVGNVFqdFJRVU42UWl4MVJVRkJkVVU3VVVGRGRrVXNiVVJCUVcxRU8xRkJRMjVFTEVWQlFVVTdVVUZEUml4eFEwRkJjVU03VVVGRGNrTXNjMEpCUVhOQ08xRkJRM1JDTEcxRFFVRnRRenRSUVVOdVF5eHpSVUZCYzBVN1VVRkRkRVVzYzBKQlFYTkNPMUZCUTNSQ0xEaERRVUU0UXp0UlFVTTVReXgzUlVGQmQwVTdVVUZEZUVVc0swSkJRU3RDTzFGQlF5OUNMRzlGUVVGdlJUdFJRVU53UlN4aFFVRmhPMUZCUTJJc01rSkJRVEpDTzFGQlF6TkNMRzlGUVVGdlJUdFJRVU53UlN3d1FrRkJNRUk3VVVGRE1VSXNiME5CUVc5RE8xRkJRM0JETEdsRlFVRnBSVHRSUVVOcVJTeHJSRUZCYTBRN1VVRkRiRVFzTUVKQlFUQkNPMUZCUXpGQ0xIRkZRVUZ4UlR0UlFVTnlSU3h0UlVGQmJVVTdVVUZEYmtVc2NVVkJRWEZGTzFGQlEzSkZMRzFEUVVGdFF6dFJRVU51UXl4M1FrRkJkMEk3VVVGRGVFSXNkVVZCUVhWRk8xRkJRM1pGTERaRFFVRTJRenRSUVVNM1F5eFpRVUZaTzFGQlExb3NjMFZCUVhORk8xRkJRM1JGTERSQ1FVRTBRanRSUVVNMVFpdzRSRUZCT0VRN1VVRkRPVVFzWjBWQlFXZEZPMUZCUTJoRkxESkVRVUV5UkR0UlFVTXpSQ3h2UWtGQmIwSTdVVUZEY0VJc05rUkJRVFpFTzFGQlF6ZEVMSE5DUVVGelFqdFJRVU4wUWl4TlFVRk5MRlZCUVZVc1IwRkJSeXhYUVVGWExFTkJRVU1zYzBKQlFYTkNPMWxCUTI1RUxFTkJRVU1zUTBGQlF5eFhRVUZYTEVOQlFVTXNjMEpCUVhOQ08xbEJRM0JETEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1owSkJRV2RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1VVRkRjRU1zUzBGQlN5eE5RVUZOTEZsQlFWa3NTVUZCU1N4VlFVRlZMRVZCUVVVN1dVRkRja01zU1VGRFJTeFhRVUZYTEVOQlFVTXNhMEpCUVd0Q08yZENRVU01UWl4WFFVRlhMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmxCUVZrc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eEZRVU42UkR0blFrRkRRU3hUUVVGVE8yRkJRMVk3V1VGRFJDeG5SVUZCWjBVN1dVRkRhRVVzYzBWQlFYTkZPMWxCUTNSRkxIRkZRVUZ4UlR0WlFVTnlSU3hKUVVORkxFTkJRVU1zUTBGQlF5eFhRVUZYTEVOQlFVTXNVMEZCVXp0blFrRkRka0lzV1VGQldTeExRVUZMTEZkQlFWYzdaMEpCUXpWQ0xGRkJRVkVzUTBGQlF5eE5RVUZOTEVWQlFVVXNXVUZCV1N4RFFVRkRPMmRDUVVNNVFpeERRVUZETEVOQlFVTXNRMEZCUXl4UFFVRlBMRWxCUVVrc1YwRkJWeXhEUVVGRExFbEJRVWtzVjBGQlZ5eERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNc1JVRkRjRVE3WjBKQlEwRXNhMFJCUVd0RU8yZENRVU5zUkN4SlFVRkpMRU5CUVVNc1EwRkJReXhQUVVGUExFbEJRVWtzVjBGQlZ5eERRVUZETEVWQlFVVTdiMEpCUXpkQ0xGZEJRVmNzUTBGQlF5eExRVUZMTEVkQlFVY3NRMEZCUXl4RFFVRkRPMmxDUVVOMlFqdG5Ra0ZEUkN4blFrRkJaMElzUTBGRFpDeE5RVUZOTEVOQlFVTXNXVUZCV1N4RFFVRkRMRVZCUTNCQ0xGVkJRVlVzUjBGQlJ5eEhRVUZITEVkQlFVY3NXVUZCV1N4RlFVTXZRanR2UWtGRFJTeHJRa0ZCYTBJc1JVRkJSU3hYUVVGWExFTkJRVU1zYTBKQlFXdENPMjlDUVVOc1JDeFpRVUZaTEVWQlFVVXNWMEZCVnl4RFFVRkRMRmxCUVZrN2IwSkJRM1JETEhGQ1FVRnhRaXhGUVVGRkxGZEJRVmNzUTBGQlF5eHhRa0ZCY1VJN2IwSkJRM2hFTEZkQlFWY3NSVUZCUlN4WFFVRlhMRU5CUVVNc1YwRkJWenR2UWtGRGNFTXNVMEZCVXl4RlFVRkZMRmRCUVZjc1EwRkJReXhUUVVGVE8yOUNRVU5vUXl4TFFVRkxMRVZCUVVVc1YwRkJWeXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETzJsQ1FVTTNRaXhEUVVOR0xFTkJRVU03WVVGRFNEdFpRVU5FTEVsQlFVazdaMEpCUTBZc2QwSkJRWGRDTEVOQlFVTXNUVUZCVFN4RlFVRkZMRlZCUVZVc1JVRkJSU3haUVVGWkxFVkJRVVVzVjBGQlZ5eERRVUZETEVOQlFVTTdZVUZEZWtVN1dVRkJReXhQUVVGUExFdEJRVXNzUlVGQlJUdG5Ra0ZEWkN4cFFrRkJhVUlzUTBGQlF5eExRVUZMTEVWQlFVVXNSVUZCUlN4VlFVRlZMRVZCUVVVc1dVRkJXU3hGUVVGRkxFTkJRVU1zUTBGQlF6dGhRVU40UkR0VFFVTkdPMUZCUTBRc1RVRkJUU3h4UWtGQmNVSXNSMEZCUnl4WFFVRlhMRU5CUVVNc2FVTkJRV2xETEVOQlFVTTdVVUZETlVVc1NVRkJTU3h4UWtGQmNVSXNSVUZCUlR0WlFVTjZRaXhMUVVGTExFMUJRVTBzV1VGQldTeEpRVUZKTEhGQ1FVRnhRaXhGUVVGRk8yZENRVU5vUkN4SlFVTkZMRmRCUVZjc1EwRkJReXhyUWtGQmEwSTdiMEpCUXpsQ0xGZEJRVmNzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhQUVVGUExFTkJRVU1zV1VGQldTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRVZCUTNwRU8yOUNRVU5CTEZOQlFWTTdhVUpCUTFZN1owSkJRMFFzU1VGQlNUdHZRa0ZEUml4M1FrRkJkMElzUTBGRGRFSXNUVUZCVFN4RlFVTk9MRlZCUVZVc1JVRkRWaXhaUVVGWkxFVkJRMW9zVjBGQlZ5eERRVU5hTEVOQlFVTTdhVUpCUTBnN1owSkJRVU1zVDBGQlR5eExRVUZMTEVWQlFVVTdiMEpCUTJRc2FVSkJRV2xDTEVOQlFVTXNTMEZCU3l4RlFVRkZMRVZCUVVVc1ZVRkJWU3hGUVVGRkxGbEJRVmtzUlVGQlJTeERRVUZETEVOQlFVTTdhVUpCUTNoRU8yRkJRMFk3VTBGRFJqdEpRVU5JTEVOQlFVTTdTVUZGUkN4blEwRkJaME03U1VGRGFFTXNkMFZCUVhkRk8wbEJRM2hGTEhsRlFVRjVSVHRKUVVONlJTeDNSRUZCZDBRN1NVRkRlRVFzVTBGQlV5eHJRa0ZCYTBJc1EwRkJReXhWUVVGVkxFVkJRVVVzVlVGQlZTeEZRVUZGTEVsQlFVa3NSVUZCUlN4WFFVRlhPMUZCUTI1RkxFOUJRVTg3V1VGRFRDeE5RVUZOTEZkQlFWY3NSMEZCUnl3eVFrRkJNa0lzUTBGRE4wTXNRMEZCUXl4RFFVRkRMRmRCUVZjc1EwRkJReXhaUVVGWkxFTkJRek5DTEVOQlFVTTdXVUZEUml4UFFVRlBMRU5CUTB3c1ZVRkJWU3hIUVVGSExFZEJRVWNzUjBGQlJ5eFZRVUZWTEVWQlF6ZENMRk5CUVZNc1JVRkRWQ3hYUVVGWExFVkJRMWdzVjBGQlZ5eERRVU5hTEVOQlFVTTdXVUZEUml4UFFVRlBMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeEZRVUZGTEZOQlFWTXNRMEZCUXl4RFFVRkRPMUZCUTNKRExFTkJRVU1zUTBGQlF6dEpRVU5LTEVOQlFVTTdTVUZGUkN3eVEwRkJNa003U1VGRE0wTXNVMEZCVXl4M1FrRkJkMElzUTBGREwwSXNUVUZCVFN4RlFVTk9MRlZCUVZVc1JVRkRWaXhaUVVGWkxFVkJRMW9zWTBGQk1rSXNSVUZCUlR0UlFVVTNRaXhKUVVGSkxFTkJRVU1zVFVGQlRTeEZRVUZGTzFsQlExZ3NUVUZCVFN4SlFVRkpMRXRCUVVzc1EwRkJReXhyUWtGQmEwSXNSMEZCUnl4WlFVRlpMRU5CUVVNc1EwRkJRenRUUVVOd1JEdFJRVU5FTEVsQlFVa3NRMEZCUXl4VlFVRlZMRVZCUVVVN1dVRkRaaXhOUVVGTkxFbEJRVWtzUzBGQlN5eERRVUZETEhWQ1FVRjFRaXhIUVVGSExGbEJRVmtzUTBGQlF5eERRVUZETzFOQlEzcEVPMUZCUTBRc1NVRkJTU3hEUVVGRExGbEJRVmtzU1VGQlNTeFpRVUZaTEV0QlFVc3NWMEZCVnl4RlFVRkZPMWxCUTJwRUxFMUJRVTBzU1VGQlNTeExRVUZMTEVOQlFVTXNaME5CUVdkRExFZEJRVWNzV1VGQldTeERRVUZETEVOQlFVTTdVMEZEYkVVN1VVRkZSQ3gxUTBGQmRVTTdVVUZEZGtNc1RVRkJUU3hSUVVGUkxFZEJRVWNzVFVGQlRTeERRVUZETEhGQ1FVRnhRaXhEUVVGRExFMUJRVTBzUlVGQlJTeFpRVUZaTEVOQlFVTXNRMEZCUXp0UlFVVndSU3dyUkVGQkswUTdVVUZETDBRc2QwSkJRWGRDTzFGQlEzaENMRWxCUTBVc1EwRkJReXhSUVVGUk8xbEJRMVFzUTBGQlF5eERRVUZETEZkQlFWY3NRMEZCUXl4cFEwRkJhVU03WjBKQlF6ZERMRmRCUVZjc1EwRkJReXhwUTBGQmFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1dVRkJXU3hEUVVGRE8yOUNRVU5xUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVOUU8xbEJRMEVzVDBGQlR5eERRVUZETEV0QlFVc3NRMEZEV0N4dFEwRkJiVU1zUlVGRGJrTXNWVUZCVlN4RlFVTldMRmxCUVZrc1JVRkRXaXhOUVVGTkxFTkJRMUFzUTBGQlF6dFpRVU5HTEU5QlFVODdVMEZEVWp0UlFVVkVMQ3REUVVFclF6dFJRVU12UXl4SlFVRkpMR3RDUVVGclFpeERRVUZETzFGQlEzWkNMRTFCUVUwc2FVSkJRV2xDTEVkQlFVYzdXVUZEZUVJc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJUdG5Ra0ZEVWl4UFFVRlBMR3RDUVVGclFpeERRVUZETzFsQlF6VkNMRU5CUVVNN1dVRkRSQ3hIUVVGSExFVkJRVVVzUzBGQlN5eERRVUZETEVWQlFVVTdaMEpCUTFnc2EwSkJRV3RDTEVkQlFVY3NTMEZCU3l4RFFVRkRPMWxCUXpkQ0xFTkJRVU03V1VGRFJDeFZRVUZWTEVWQlFVVXNTMEZCU3p0VFFVTnNRaXhEUVVGRE8xRkJSVVlzYlVSQlFXMUVPMUZCUTI1RUxFMUJRVTBzWTBGQll5eEhRVUZITEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNhVUpCUVdsQ0xFTkJRVU1zUjBGQlJ5eERRVUZETzFGQlEzWkZMRTFCUVUwc1kwRkJZeXhIUVVGSExGRkJRVkVzUTBGQlF5eERRVUZETEVOQlFVTXNVVUZCVVN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zYVVKQlFXbENMRU5CUVVNc1IwRkJSeXhEUVVGRE8xRkJRM1pGTEVsQlFVa3NZVUZCWVN4SFFVRkhMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTTdVVUZGYmtVc2IwVkJRVzlGTzFGQlEzQkZMRzlDUVVGdlFqdFJRVU53UWl4TlFVRk5MRU5CUVVNc1kwRkJZeXhEUVVGRExFMUJRVTBzUlVGQlJTeFpRVUZaTEVWQlFVVTdXVUZETVVNc1dVRkJXU3hGUVVGRkxFbEJRVWs3V1VGRGJFSXNSMEZCUnl4RlFVRkZMRU5CUVVNN1owSkJRMG9zVDBGQlR6dHZRa0ZEVEN4SlFVRkpMRmxCUVZrc1EwRkJRenR2UWtGRGFrSXNUVUZCVFN4WFFVRlhMRWRCUVVjc01rSkJRVEpDTEVOQlF6ZERMRU5CUVVNc1EwRkJReXhYUVVGWExFTkJRVU1zV1VGQldTeERRVU16UWl4RFFVRkRPMjlDUVVWR0xIRkNRVUZ4UWp0dlFrRkRja0lzU1VGQlNTeERRVUZETEZGQlFWRXNSVUZCUlR0M1FrRkRZaXgzUWtGQmQwSTdkMEpCUTNoQ0xGbEJRVmtzUjBGQlJ5eHJRa0ZCYTBJc1EwRkJRenR4UWtGRGJrTTdlVUpCUVUwc1NVRkJTU3hqUVVGakxFVkJRVVU3ZDBKQlEzcENMSFZDUVVGMVFqdDNRa0ZEZGtJc1dVRkJXU3hIUVVGSExHTkJRV01zUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN2NVSkJRekZETzNsQ1FVRk5MRWxCUVVrc1QwRkJUeXhKUVVGSkxGRkJRVkVzUlVGQlJUdDNRa0ZET1VJc2JVSkJRVzFDTzNkQ1FVTnVRaXhaUVVGWkxFZEJRVWNzWVVGQllTeERRVUZETzNGQ1FVTTVRanQ1UWtGQlRUdDNRa0ZEVEN4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVOWUxIbENRVUY1UWl4RlFVTjZRaXhWUVVGVkxFZEJRVWNzUjBGQlJ5eEhRVUZITEZsQlFWa3NSVUZETDBJc0swSkJRU3RDTEVOQlEyaERMRU5CUVVNN2QwSkJRMFlzVVVGQlVTeERRVU5PTEZWQlFWVXNSMEZCUnl4SFFVRkhMRWRCUVVjc1dVRkJXU3hGUVVNdlFpeEZRVUZGTEVWQlEwWXNZVUZCWVN4RlFVTmlMRmRCUVZjc1JVRkRXQ3hYUVVGWExFTkJRMW9zUTBGQlF6dDNRa0ZEUml4UFFVRlBPM0ZDUVVOU08yOUNRVVZFTEN0RVFVRXJSRHR2UWtGREwwUXNNa1JCUVRKRU8yOUNRVU16UkN4elJFRkJjMFE3YjBKQlEzUkVMR3RGUVVGclJUdHZRa0ZEYkVVc1NVRkJTU3hQUVVGUExGbEJRVmtzUzBGQlN5eFZRVUZWTEVWQlFVVTdkMEpCUTNSRExFbEJRVWtzVjBGQlZ5eERRVUZETEdWQlFXVXNSVUZCUlRzMFFrRkRMMElzVVVGQlVTeERRVU5PTEZWQlFWVXNSMEZCUnl4SFFVRkhMRWRCUVVjc1dVRkJXU3hGUVVNdlFpeFpRVUZaTEVWQlExb3NaVUZCWlN4RlFVTm1MRmRCUVZjc1JVRkRXQ3hYUVVGWExFTkJRMW9zUTBGQlF6dDVRa0ZEU0R0M1FrRkRSQ3hOUVVGTkxESkNRVUV5UWl4SFFVRkhMR3RDUVVGclFpeERRVU53UkN4VlFVRlZMRVZCUTFZc1dVRkJXU3hGUVVOYUxGbEJRVmtzUlVGRFdpeFhRVUZYTEVOQlExb3NRMEZCUXp0M1FrRkRSaXcwUmtGQk5FWTdkMEpCUXpWR0xEQkhRVUV3Unp0M1FrRkRNVWNzU1VGQlNTeFpRVUZaTEVOQlFVTXNVMEZCVXl4RlFVRkZPelJDUVVNeFFpd3lRa0ZCTWtJc1EwRkJReXhUUVVGVExFZEJRVWNzV1VGQldTeERRVUZETEZOQlFWTXNRMEZCUXpzMFFrRkRMMFFzU1VGQlNTeFpRVUZaTEVOQlFVTXNVMEZCVXl4RFFVRkRMRmRCUVZjc1JVRkJSVHRuUTBGRGRFTXNNa0pCUVRKQ0xFTkJRVU1zVTBGQlV5eERRVUZETEZkQlFWYzdiME5CUXk5RExGbEJRVmtzUTBGQlF5eFRRVUZUTEVOQlFVTXNWMEZCVnl4RFFVRkRPelpDUVVOMFF6dDVRa0ZEUmp0M1FrRkRSQ3hQUVVGUExESkNRVUV5UWl4RFFVRkRPM0ZDUVVOd1F6dDVRa0ZCVFN4SlFVTk1MRTlCUVU4c1dVRkJXU3hMUVVGTExGRkJRVkU3ZDBKQlEyaERMRU5CUVVNc1EwRkJReXhYUVVGWExFTkJRVU1zVTBGQlV6dDNRa0ZEZGtJc1EwRkJReXhEUVVGRExFTkJRVU1zVDBGQlR5eEpRVUZKTEZkQlFWY3NRMEZCUXl4SlFVRkpMRmRCUVZjc1EwRkJReXhMUVVGTExFZEJRVWNzUTBGQlF5eERRVUZETEVWQlEzQkVPM2RDUVVOQkxFOUJRVThzV1VGQldTeERRVUZETzNGQ1FVTnlRanQ1UWtGQlRUdDNRa0ZEVEN4UlFVRlJMRU5CUTA0c1ZVRkJWU3hIUVVGSExFZEJRVWNzUjBGQlJ5eFpRVUZaTEVWQlF5OUNMRmxCUVZrc1JVRkRXaXhMUVVGTExFVkJRMHdzVjBGQlZ5eEZRVU5ZTEZkQlFWY3NRMEZEV2l4RFFVRkRPM2RDUVVOR0xFOUJRVThzV1VGQldTeERRVUZETzNGQ1FVTnlRanRuUWtGRFNDeERRVUZETEVOQlFVTTdXVUZEU2l4RFFVRkRMRU5CUVVNc1JVRkJSVHRaUVVOS0xFZEJRVWNzUlVGQlJTeERRVUZETzJkQ1FVTktMRTlCUVU4c1ZVRkJVeXhMUVVGTE8yOUNRVU51UWl4TlFVRk5MRmRCUVZjc1IwRkJSeXd5UWtGQk1rSXNRMEZETjBNc1EwRkJReXhEUVVGRExGZEJRVmNzUTBGQlF5eFpRVUZaTEVOQlF6TkNMRU5CUVVNN2IwSkJRMFlzU1VGQlNTeFhRVUZYTEVOQlFVTTdiMEpCUldoQ0xHOUVRVUZ2UkR0dlFrRkRjRVFzU1VGRFJTeERRVUZETEVOQlFVTXNWMEZCVnl4RFFVRkRMRmRCUVZjN2QwSkJRM3BDTEVOQlFVTXNUMEZCVHl4aFFVRmhMRXRCUVVzc1ZVRkJWVHMwUWtGRGJFTXNUMEZCVHl4aFFVRmhMRXRCUVVzc1VVRkJVU3hEUVVGRExFVkJRM0JETzNkQ1FVTkJMRkZCUVZFc1EwRkRUaXhWUVVGVkxFZEJRVWNzUjBGQlJ5eEhRVUZITEZsQlFWa3NSVUZETDBJc1MwRkJTeXhGUVVOTUxHZENRVUZuUWl4RlFVTm9RaXhYUVVGWExFVkJRMWdzVjBGQlZ5eERRVU5hTEVOQlFVTTdkMEpCUTBZc1QwRkJUeXhMUVVGTExFTkJRVU03Y1VKQlEyUTdiMEpCUlVRc05FTkJRVFJETzI5Q1FVTTFReXhKUVVGSkxHTkJRV01zUlVGQlJUdDNRa0ZEYkVJc2RVSkJRWFZDTzNkQ1FVTjJRaXhYUVVGWExFZEJRVWNzWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRVZCUVVVc1MwRkJTeXhEUVVGRExFTkJRVU03Y1VKQlEyaEVPM2xDUVVGTkxFbEJRVWtzVDBGQlR5eEpRVUZKTEZGQlFWRXNSVUZCUlR0M1FrRkRPVUlzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXp0M1FrRkRZaXhKUVVGSkxFMUJRVTBzUTBGQlF5eGhRVUZoTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN05FSkJRemxDTEUxQlFVMHNRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJTU3hGUVVGRkxGbEJRVmtzUlVGQlJUdG5RMEZEZUVNc1MwRkJTenMyUWtGRFRpeERRVUZETEVOQlFVTTdlVUpCUTBvN05rSkJRVTA3TkVKQlEwd3NZVUZCWVN4SFFVRkhMRXRCUVVzc1EwRkJRenQ1UWtGRGRrSTdkMEpCUTBRc1YwRkJWeXhIUVVGSExFdEJRVXNzUTBGQlF6dDNRa0ZEY0VJc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dHhRa0ZEWmp0NVFrRkJUVHQzUWtGRFRDeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVTllMSGxDUVVGNVFpeEZRVU42UWl4VlFVRlZMRWRCUVVjc1IwRkJSeXhIUVVGSExGbEJRVmtzUlVGREwwSXNLMEpCUVN0Q0xFTkJRMmhETEVOQlFVTTdkMEpCUTBZc1VVRkJVU3hEUVVOT0xGVkJRVlVzUjBGQlJ5eEhRVUZITEVkQlFVY3NXVUZCV1N4RlFVTXZRaXhMUVVGTExFVkJRMHdzWVVGQllTeEZRVU5pTEZkQlFWY3NSVUZEV0N4WFFVRlhMRU5CUTFvc1EwRkJRenQzUWtGRFJpeFBRVUZQTEV0QlFVc3NRMEZCUXp0eFFrRkRaRHR2UWtGRlJDeFZRVUZWTzI5Q1FVTldMRkZCUVZFc1EwRkRUaXhWUVVGVkxFZEJRVWNzUjBGQlJ5eEhRVUZITEZsQlFWa3NSVUZETDBJc1MwRkJTeXhGUVVOTUxFdEJRVXNzUlVGRFRDeFhRVUZYTEVWQlExZ3NWMEZCVnl4RFFVTmFMRU5CUVVNN2IwSkJSVVlzYlVKQlFXMUNPMjlDUVVOdVFpeFBRVUZQTEZkQlFWY3NRMEZCUXp0blFrRkRja0lzUTBGQlF5eERRVUZETzFsQlEwb3NRMEZCUXl4RFFVRkRMRVZCUVVVN1UwRkRUQ3hEUVVGRExFTkJRVU03U1VGRFRDeERRVUZETzBsQlJVUXNUMEZCVHl4RlFVRkZMR2RDUVVGblFpeEZRVUZGTEhkQ1FVRjNRaXhGUVVGRkxFTkJRVU03UVVGRGVFUXNRMEZCUXlKOSIsIi8qKlxuICogVGllcyB0b2dldGhlciB0aGUgdHdvIHNlcGFyYXRlIG5hdmlnYXRpb24gZXZlbnRzIHRoYXQgdG9nZXRoZXIgaG9sZHMgaW5mb3JtYXRpb24gYWJvdXQgYm90aCBwYXJlbnQgZnJhbWUgaWQgYW5kIHRyYW5zaXRpb24tcmVsYXRlZCBhdHRyaWJ1dGVzXG4gKi9cbmV4cG9ydCBjbGFzcyBQZW5kaW5nTmF2aWdhdGlvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbiA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbiA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uQ29tbWl0dGVkRXZlbnROYXZpZ2F0aW9uID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVPbkNvbW1pdHRlZEV2ZW50TmF2aWdhdGlvbiA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNvbHZlZCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVOYXZpZ2F0ZUV2ZW50TmF2aWdhdGlvbixcbiAgICAgICAgICAgIHRoaXMub25Db21taXR0ZWRFdmVudE5hdmlnYXRpb24sXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFaXRoZXIgcmV0dXJucyBvciB0aW1lcyBvdXQgYW5kIHJldHVybnMgdW5kZWZpbmVkIG9yXG4gICAgICogcmV0dXJucyB0aGUgcmVzdWx0cyBmcm9tIHJlc29sdmVkKCkgYWJvdmVcbiAgICAgKiBAcGFyYW0gbXNcbiAgICAgKi9cbiAgICBhc3luYyByZXNvbHZlZFdpdGhpblRpbWVvdXQobXMpIHtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBhd2FpdCBQcm9taXNlLnJhY2UoW1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlZCgpLFxuICAgICAgICAgICAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSksXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZWQ7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pY0dWdVpHbHVaeTF1WVhacFoyRjBhVzl1TG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJ4cFlpOXdaVzVrYVc1bkxXNWhkbWxuWVhScGIyNHVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUlVFN08wZEJSVWM3UVVGRFNDeE5RVUZOTEU5QlFVOHNhVUpCUVdsQ08wbEJTelZDTzFGQlEwVXNTVUZCU1N4RFFVRkRMQ3RDUVVFclFpeEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRek5FTEVsQlFVa3NRMEZCUXl4elEwRkJjME1zUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZEZUVRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEpRVUZKTEVOQlFVTXNNRUpCUVRCQ0xFZEJRVWNzU1VGQlNTeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1dVRkRkRVFzU1VGQlNTeERRVUZETEdsRFFVRnBReXhIUVVGSExFOUJRVThzUTBGQlF6dFJRVU51UkN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRFRTeFJRVUZSTzFGQlEySXNUMEZCVHl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRE8xbEJRMnBDTEVsQlFVa3NRMEZCUXl3clFrRkJLMEk3V1VGRGNFTXNTVUZCU1N4RFFVRkRMREJDUVVFd1FqdFRRVU5vUXl4RFFVRkRMRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJSVVE3T3pzN1QwRkpSenRKUVVOSkxFdEJRVXNzUTBGQlF5eHhRa0ZCY1VJc1EwRkJReXhGUVVGRk8xRkJRMjVETEUxQlFVMHNVVUZCVVN4SFFVRkhMRTFCUVUwc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF6dFpRVU5zUXl4SlFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRk8xbEJRMllzU1VGQlNTeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVc1EwRkJReXhWUVVGVkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVWQlFVVXNRMEZCUXl4RFFVRkRPMU5CUTJoRUxFTkJRVU1zUTBGQlF6dFJRVU5JTEU5QlFVOHNVVUZCVVN4RFFVRkRPMGxCUTJ4Q0xFTkJRVU03UTBGRFJpSjkiLCIvKipcbiAqIFRpZXMgdG9nZXRoZXIgdGhlIHR3byBzZXBhcmF0ZSBldmVudHMgdGhhdCB0b2dldGhlciBob2xkcyBpbmZvcm1hdGlvbiBhYm91dCBib3RoIHJlcXVlc3QgaGVhZGVycyBhbmQgYm9keVxuICovXG5leHBvcnQgY2xhc3MgUGVuZGluZ1JlcXVlc3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25CZWZvcmVTZW5kSGVhZGVyc0V2ZW50RGV0YWlscyA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNvbHZlZCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLFxuICAgICAgICAgICAgdGhpcy5vbkJlZm9yZVNlbmRIZWFkZXJzRXZlbnREZXRhaWxzLFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRWl0aGVyIHJldHVybnMgb3IgdGltZXMgb3V0IGFuZCByZXR1cm5zIHVuZGVmaW5lZCBvclxuICAgICAqIHJldHVybnMgdGhlIHJlc3VsdHMgZnJvbSByZXNvbHZlZCgpIGFib3ZlXG4gICAgICogQHBhcmFtIG1zXG4gICAgICovXG4gICAgYXN5bmMgcmVzb2x2ZWRXaXRoaW5UaW1lb3V0KG1zKSB7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZWQoKSxcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpLFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWNHVnVaR2x1WnkxeVpYRjFaWE4wTG1weklpd2ljMjkxY21ObFVtOXZkQ0k2SWlJc0luTnZkWEpqWlhNaU9sc2lMaTR2TGk0dkxpNHZjM0pqTDJ4cFlpOXdaVzVrYVc1bkxYSmxjWFZsYzNRdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJTMEU3TzBkQlJVYzdRVUZEU0N4TlFVRk5MRTlCUVU4c1kwRkJZenRKUVdGNlFqdFJRVU5GTEVsQlFVa3NRMEZCUXl3eVFrRkJNa0lzUjBGQlJ5eEpRVUZKTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1JVRkJSVHRaUVVOMlJDeEpRVUZKTEVOQlFVTXNhME5CUVd0RExFZEJRVWNzVDBGQlR5eERRVUZETzFGQlEzQkVMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMGdzU1VGQlNTeERRVUZETEN0Q1FVRXJRaXhIUVVGSExFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUXpORUxFbEJRVWtzUTBGQlF5eHpRMEZCYzBNc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRGVFUXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRUQ3hEUVVGRE8wbEJRMDBzVVVGQlVUdFJRVU5pTEU5QlFVOHNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJRenRaUVVOcVFpeEpRVUZKTEVOQlFVTXNNa0pCUVRKQ08xbEJRMmhETEVsQlFVa3NRMEZCUXl3clFrRkJLMEk3VTBGRGNrTXNRMEZCUXl4RFFVRkRPMGxCUTB3c1EwRkJRenRKUVVWRU96czdPMDlCU1VjN1NVRkRTU3hMUVVGTExFTkJRVU1zY1VKQlFYRkNMRU5CUVVNc1JVRkJSVHRSUVVOdVF5eE5RVUZOTEZGQlFWRXNSMEZCUnl4TlFVRk5MRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU03V1VGRGJFTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1JVRkJSVHRaUVVObUxFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZMRU5CUVVNc1ZVRkJWU3hEUVVGRExFOUJRVThzUlVGQlJTeEZRVUZGTEVOQlFVTXNRMEZCUXp0VFFVTm9SQ3hEUVVGRExFTkJRVU03VVVGRFNDeFBRVUZQTEZGQlFWRXNRMEZCUXp0SlFVTnNRaXhEUVVGRE8wTkJRMFlpZlE9PSIsImltcG9ydCB7IFJlc3BvbnNlQm9keUxpc3RlbmVyIH0gZnJvbSBcIi4vcmVzcG9uc2UtYm9keS1saXN0ZW5lclwiO1xuLyoqXG4gKiBUaWVzIHRvZ2V0aGVyIHRoZSB0d28gc2VwYXJhdGUgZXZlbnRzIHRoYXQgdG9nZXRoZXIgaG9sZHMgaW5mb3JtYXRpb24gYWJvdXQgYm90aCByZXNwb25zZSBoZWFkZXJzIGFuZCBib2R5XG4gKi9cbmV4cG9ydCBjbGFzcyBQZW5kaW5nUmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9uQmVmb3JlUmVxdWVzdEV2ZW50RGV0YWlscyA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlT25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25Db21wbGV0ZWRFdmVudERldGFpbHMgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzb2x2ZU9uQ29tcGxldGVkRXZlbnREZXRhaWxzID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZFJlc3BvbnNlUmVzcG9uc2VCb2R5TGlzdGVuZXIoZGV0YWlscykge1xuICAgICAgICB0aGlzLnJlc3BvbnNlQm9keUxpc3RlbmVyID0gbmV3IFJlc3BvbnNlQm9keUxpc3RlbmVyKGRldGFpbHMpO1xuICAgIH1cbiAgICByZXNvbHZlZCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMub25CZWZvcmVSZXF1ZXN0RXZlbnREZXRhaWxzLFxuICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlZEV2ZW50RGV0YWlscyxcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVpdGhlciByZXR1cm5zIG9yIHRpbWVzIG91dCBhbmQgcmV0dXJucyB1bmRlZmluZWQgb3JcbiAgICAgKiByZXR1cm5zIHRoZSByZXN1bHRzIGZyb20gcmVzb2x2ZWQoKSBhYm92ZVxuICAgICAqIEBwYXJhbSBtc1xuICAgICAqL1xuICAgIGFzeW5jIHJlc29sdmVkV2l0aGluVGltZW91dChtcykge1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVkKCksXG4gICAgICAgICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKSxcbiAgICAgICAgXSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlZDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2ljR1Z1WkdsdVp5MXlaWE53YjI1elpTNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2Y0dWdVpHbHVaeTF5WlhOd2IyNXpaUzUwY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGSlFTeFBRVUZQTEVWQlFVVXNiMEpCUVc5Q0xFVkJRVVVzVFVGQlRTd3dRa0ZCTUVJc1EwRkJRenRCUVVWb1JUczdSMEZGUnp0QlFVTklMRTFCUVUwc1QwRkJUeXhsUVVGbE8wbEJZekZDTzFGQlEwVXNTVUZCU1N4RFFVRkRMREpDUVVFeVFpeEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRM1pFTEVsQlFVa3NRMEZCUXl4clEwRkJhME1zUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZEY0VRc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFNDeEpRVUZKTEVOQlFVTXNkVUpCUVhWQ0xFZEJRVWNzU1VGQlNTeFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1dVRkRia1FzU1VGQlNTeERRVUZETERoQ1FVRTRRaXhIUVVGSExFOUJRVThzUTBGQlF6dFJRVU5vUkN4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRFRTd3JRa0ZCSzBJc1EwRkRjRU1zVDBGQk9FTTdVVUZGT1VNc1NVRkJTU3hEUVVGRExHOUNRVUZ2UWl4SFFVRkhMRWxCUVVrc2IwSkJRVzlDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkRhRVVzUTBGQlF6dEpRVU5OTEZGQlFWRTdVVUZEWWl4UFFVRlBMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU03V1VGRGFrSXNTVUZCU1N4RFFVRkRMREpDUVVFeVFqdFpRVU5vUXl4SlFVRkpMRU5CUVVNc2RVSkJRWFZDTzFOQlF6ZENMRU5CUVVNc1EwRkJRenRKUVVOTUxFTkJRVU03U1VGRlJEczdPenRQUVVsSE8wbEJRMGtzUzBGQlN5eERRVUZETEhGQ1FVRnhRaXhEUVVGRExFVkJRVVU3VVVGRGJrTXNUVUZCVFN4UlFVRlJMRWRCUVVjc1RVRkJUU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETzFsQlEyeERMRWxCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVU3V1VGRFppeEpRVUZKTEU5QlFVOHNRMEZCUXl4UFFVRlBMRU5CUVVNc1JVRkJSU3hEUVVGRExGVkJRVlVzUTBGQlF5eFBRVUZQTEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNN1UwRkRhRVFzUTBGQlF5eERRVUZETzFGQlEwZ3NUMEZCVHl4UlFVRlJMRU5CUVVNN1NVRkRiRUlzUTBGQlF6dERRVU5HSW4wPSIsImltcG9ydCB7IHNoYTI1NkJ1ZmZlciB9IGZyb20gXCIuL3NoYTI1NlwiO1xuZXhwb3J0IGNsYXNzIFJlc3BvbnNlQm9keUxpc3RlbmVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZXRhaWxzKSB7XG4gICAgICAgIHRoaXMucmVzcG9uc2VCb2R5ID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVSZXNwb25zZUJvZHkgPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb250ZW50SGFzaCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNvbHZlQ29udGVudEhhc2ggPSByZXNvbHZlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gVXNlZCB0byBwYXJzZSBSZXNwb25zZSBzdHJlYW1cbiAgICAgICAgY29uc3QgZmlsdGVyID0gYnJvd3Nlci53ZWJSZXF1ZXN0LmZpbHRlclJlc3BvbnNlRGF0YShkZXRhaWxzLnJlcXVlc3RJZCk7XG4gICAgICAgIGxldCByZXNwb25zZUJvZHkgPSBuZXcgVWludDhBcnJheSgpO1xuICAgICAgICBmaWx0ZXIub25kYXRhID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgc2hhMjU2QnVmZmVyKGV2ZW50LmRhdGEpLnRoZW4oZGlnZXN0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc29sdmVDb250ZW50SGFzaChkaWdlc3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBpbmNvbWluZyA9IG5ldyBVaW50OEFycmF5KGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgY29uc3QgdG1wID0gbmV3IFVpbnQ4QXJyYXkocmVzcG9uc2VCb2R5Lmxlbmd0aCArIGluY29taW5nLmxlbmd0aCk7XG4gICAgICAgICAgICB0bXAuc2V0KHJlc3BvbnNlQm9keSk7XG4gICAgICAgICAgICB0bXAuc2V0KGluY29taW5nLCByZXNwb25zZUJvZHkubGVuZ3RoKTtcbiAgICAgICAgICAgIHJlc3BvbnNlQm9keSA9IHRtcDtcbiAgICAgICAgICAgIGZpbHRlci53cml0ZShldmVudC5kYXRhKTtcbiAgICAgICAgfTtcbiAgICAgICAgZmlsdGVyLm9uc3RvcCA9IF9ldmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc29sdmVSZXNwb25zZUJvZHkocmVzcG9uc2VCb2R5KTtcbiAgICAgICAgICAgIGZpbHRlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFzeW5jIGdldFJlc3BvbnNlQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzcG9uc2VCb2R5O1xuICAgIH1cbiAgICBhc3luYyBnZXRDb250ZW50SGFzaCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudEhhc2g7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pY21WemNHOXVjMlV0WW05a2VTMXNhWE4wWlc1bGNpNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2Y21WemNHOXVjMlV0WW05a2VTMXNhWE4wWlc1bGNpNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZEUVN4UFFVRlBMRVZCUVVVc1dVRkJXU3hGUVVGRkxFMUJRVTBzVlVGQlZTeERRVUZETzBGQlJYaERMRTFCUVUwc1QwRkJUeXh2UWtGQmIwSTdTVUZOTDBJc1dVRkJXU3hQUVVFNFF6dFJRVU40UkN4SlFVRkpMRU5CUVVNc1dVRkJXU3hIUVVGSExFbEJRVWtzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4RlFVRkZPMWxCUTNoRExFbEJRVWtzUTBGQlF5eHRRa0ZCYlVJc1IwRkJSeXhQUVVGUExFTkJRVU03VVVGRGNrTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRTQ3hKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEVsQlFVa3NUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhGUVVGRk8xbEJRM1pETEVsQlFVa3NRMEZCUXl4clFrRkJhMElzUjBGQlJ5eFBRVUZQTEVOQlFVTTdVVUZEY0VNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRlNDeG5RMEZCWjBNN1VVRkRhRU1zVFVGQlRTeE5RVUZOTEVkQlFWRXNUMEZCVHl4RFFVRkRMRlZCUVZVc1EwRkJReXhyUWtGQmEwSXNRMEZEZGtRc1QwRkJUeXhEUVVGRExGTkJRVk1zUTBGRFdDeERRVUZETzFGQlJWUXNTVUZCU1N4WlFVRlpMRWRCUVVjc1NVRkJTU3hWUVVGVkxFVkJRVVVzUTBGQlF6dFJRVU53UXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hIUVVGSExFdEJRVXNzUTBGQlF5eEZRVUZGTzFsQlEzUkNMRmxCUVZrc1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhGUVVGRk8yZENRVU55UXl4SlFVRkpMRU5CUVVNc2EwSkJRV3RDTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1dVRkRiRU1zUTBGQlF5eERRVUZETEVOQlFVTTdXVUZEU0N4TlFVRk5MRkZCUVZFc1IwRkJSeXhKUVVGSkxGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1dVRkROVU1zVFVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4VlFVRlZMRU5CUVVNc1dVRkJXU3hEUVVGRExFMUJRVTBzUjBGQlJ5eFJRVUZSTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1dVRkRiRVVzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4WlFVRlpMRU5CUVVNc1EwRkJRenRaUVVOMFFpeEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1JVRkJSU3haUVVGWkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdXVUZEZGtNc1dVRkJXU3hIUVVGSExFZEJRVWNzUTBGQlF6dFpRVU51UWl4TlFVRk5MRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UlFVTXpRaXhEUVVGRExFTkJRVU03VVVGRlJpeE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhGUVVGRk8xbEJRM1pDTEVsQlFVa3NRMEZCUXl4dFFrRkJiVUlzUTBGQlF5eFpRVUZaTEVOQlFVTXNRMEZCUXp0WlFVTjJReXhOUVVGTkxFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTTdVVUZEZEVJc1EwRkJReXhEUVVGRE8wbEJRMG9zUTBGQlF6dEpRVVZOTEV0QlFVc3NRMEZCUXl4bFFVRmxPMUZCUXpGQ0xFOUJRVThzU1VGQlNTeERRVUZETEZsQlFWa3NRMEZCUXp0SlFVTXpRaXhEUVVGRE8wbEJSVTBzUzBGQlN5eERRVUZETEdOQlFXTTdVVUZEZWtJc1QwRkJUeXhKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETzBsQlF6RkNMRU5CUVVNN1EwRkRSaUo5IiwiLyoqXG4gKiBDb2RlIG9yaWdpbmFsbHkgZnJvbSB0aGUgZXhhbXBsZSBhdFxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1N1YnRsZUNyeXB0by9kaWdlc3RcbiAqXG4gKiBOb3RlOiBVc2luZyBTSEEyNTYgaW5zdGVhZCBvZiB0aGUgcHJldmlvdXNseSB1c2VkIE1ENSBkdWUgdG9cbiAqIHRoZSBmb2xsb3dpbmcgY29tbWVudCBmb3VuZCBhdCB0aGUgZG9jdW1lbnRhdGlvbiBwYWdlIGxpbmtlZCBhYm92ZTpcbiAqXG4gKiBXYXJuaW5nOiBPbGRlciBpbnNlY3VyZSBoYXNoIGZ1bmN0aW9ucywgbGlrZSBNRDUsIGFyZSBub3Qgc3VwcG9ydGVkXG4gKiBieSB0aGlzIG1ldGhvZC4gRXZlbiBhIHN1cHBvcnRlZCBtZXRob2QsIFNIQS0xLCBpcyBjb25zaWRlcmVkIHdlYWssXG4gKiBoYXMgYmVlbiBicm9rZW4gYW5kIHNob3VsZCBiZSBhdm9pZGVkIGZvciBjcnlwdG9ncmFwaGljIGFwcGxpY2F0aW9ucy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNoYTI1NihzdHIpIHtcbiAgICAvLyBXZSB0cmFuc2Zvcm0gdGhlIHN0cmluZyBpbnRvIGFuIGFycmF5YnVmZmVyLlxuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShzdHIpO1xuICAgIHJldHVybiBzaGEyNTZCdWZmZXIoYnVmZmVyKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzaGEyNTZCdWZmZXIoYnVmZmVyKSB7XG4gICAgcmV0dXJuIGNyeXB0by5zdWJ0bGUuZGlnZXN0KFwiU0hBLTI1NlwiLCBidWZmZXIpLnRoZW4oZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgICAgcmV0dXJuIGhleChoYXNoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGhleChidWZmZXIpIHtcbiAgICBjb25zdCBoZXhDb2RlcyA9IFtdO1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpZXcuYnl0ZUxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIC8vIFVzaW5nIGdldFVpbnQzMiByZWR1Y2VzIHRoZSBudW1iZXIgb2YgaXRlcmF0aW9ucyBuZWVkZWQgKHdlIHByb2Nlc3MgNCBieXRlcyBlYWNoIHRpbWUpXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdmlldy5nZXRVaW50MzIoaSk7XG4gICAgICAgIC8vIHRvU3RyaW5nKDE2KSB3aWxsIGdpdmUgdGhlIGhleCByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyIHdpdGhvdXQgcGFkZGluZ1xuICAgICAgICBjb25zdCBzdHJpbmdWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgLy8gV2UgdXNlIGNvbmNhdGVuYXRpb24gYW5kIHNsaWNlIGZvciBwYWRkaW5nXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSBcIjAwMDAwMDAwXCI7XG4gICAgICAgIGNvbnN0IHBhZGRlZFZhbHVlID0gKHBhZGRpbmcgKyBzdHJpbmdWYWx1ZSkuc2xpY2UoLXBhZGRpbmcubGVuZ3RoKTtcbiAgICAgICAgaGV4Q29kZXMucHVzaChwYWRkZWRWYWx1ZSk7XG4gICAgfVxuICAgIC8vIEpvaW4gYWxsIHRoZSBoZXggc3RyaW5ncyBpbnRvIG9uZVxuICAgIHJldHVybiBoZXhDb2Rlcy5qb2luKFwiXCIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJoaE1qVTJMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2TGk0dmMzSmpMMnhwWWk5emFHRXlOVFl1ZEhNaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3T3pzN096czdSMEZWUnp0QlFVVklMRTFCUVUwc1ZVRkJWU3hOUVVGTkxFTkJRVU1zUjBGQlJ6dEpRVU40UWl3clEwRkJLME03U1VGREwwTXNUVUZCVFN4TlFVRk5MRWRCUVVjc1NVRkJTU3hYUVVGWExFVkJRVVVzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkROME1zVDBGQlR5eFpRVUZaTEVOQlFVTXNUVUZCVFN4RFFVRkRMRU5CUVVNN1FVRkRPVUlzUTBGQlF6dEJRVVZFTEUxQlFVMHNWVUZCVlN4WlFVRlpMRU5CUVVNc1RVRkJUVHRKUVVOcVF5eFBRVUZQTEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExGTkJRVk1zUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1ZVRkJVeXhKUVVGSk8xRkJReTlFTEU5QlFVOHNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRMjVDTEVOQlFVTXNRMEZCUXl4RFFVRkRPMEZCUTB3c1EwRkJRenRCUVVWRUxGTkJRVk1zUjBGQlJ5eERRVUZETEUxQlFVMDdTVUZEYWtJc1RVRkJUU3hSUVVGUkxFZEJRVWNzUlVGQlJTeERRVUZETzBsQlEzQkNMRTFCUVUwc1NVRkJTU3hIUVVGSExFbEJRVWtzVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRPMGxCUTJ4RExFdEJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVlVGQlZTeEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVN1VVRkRNME1zZVVaQlFYbEdPMUZCUTNwR0xFMUJRVTBzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRGFFTXNPRVZCUVRoRk8xRkJRemxGTEUxQlFVMHNWMEZCVnl4SFFVRkhMRXRCUVVzc1EwRkJReXhSUVVGUkxFTkJRVU1zUlVGQlJTeERRVUZETEVOQlFVTTdVVUZEZGtNc05rTkJRVFpETzFGQlF6ZERMRTFCUVUwc1QwRkJUeXhIUVVGSExGVkJRVlVzUTBGQlF6dFJRVU16UWl4TlFVRk5MRmRCUVZjc1IwRkJSeXhEUVVGRExFOUJRVThzUjBGQlJ5eFhRVUZYTEVOQlFVTXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdVVUZEYmtVc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTXNRMEZCUXp0TFFVTTFRanRKUVVWRUxHOURRVUZ2UXp0SlFVTndReXhQUVVGUExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1FVRkRNMElzUTBGQlF5SjkiLCJleHBvcnQgZnVuY3Rpb24gZW5jb2RlX3V0Zjgocykge1xuICAgIHJldHVybiB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQocykpO1xufVxuZXhwb3J0IGNvbnN0IGVzY2FwZVN0cmluZyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAvLyBDb252ZXJ0IHRvIHN0cmluZyBpZiBuZWNlc3NhcnlcbiAgICBpZiAodHlwZW9mIHN0ciAhPSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHN0ciA9IFN0cmluZyhzdHIpO1xuICAgIH1cbiAgICByZXR1cm4gZW5jb2RlX3V0Zjgoc3RyKTtcbn07XG5leHBvcnQgY29uc3QgZXNjYXBlVXJsID0gZnVuY3Rpb24gKHVybCwgc3RyaXBEYXRhVXJsRGF0YSA9IHRydWUpIHtcbiAgICB1cmwgPSBlc2NhcGVTdHJpbmcodXJsKTtcbiAgICAvLyBkYXRhOls8bWVkaWF0eXBlPl1bO2Jhc2U2NF0sPGRhdGE+XG4gICAgaWYgKHVybC5zdWJzdHIoMCwgNSkgPT09IFwiZGF0YTpcIiAmJlxuICAgICAgICBzdHJpcERhdGFVcmxEYXRhICYmXG4gICAgICAgIHVybC5pbmRleE9mKFwiLFwiKSA+IC0xKSB7XG4gICAgICAgIHVybCA9IHVybC5zdWJzdHIoMCwgdXJsLmluZGV4T2YoXCIsXCIpICsgMSkgKyBcIjxkYXRhLXN0cmlwcGVkPlwiO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xufTtcbi8vIEJhc2U2NCBlbmNvZGluZywgZm91bmQgb246XG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjcxMDAwMS9ob3ctdG8tY29udmVydC11aW50OC1hcnJheS10by1iYXNlNjQtZW5jb2RlZC1zdHJpbmcvMjU2NDQ0MDkjMjU2NDQ0MDlcbmV4cG9ydCBjb25zdCBVaW50OFRvQmFzZTY0ID0gZnVuY3Rpb24gKHU4QXJyKSB7XG4gICAgY29uc3QgQ0hVTktfU0laRSA9IDB4ODAwMDsgLy8gYXJiaXRyYXJ5IG51bWJlclxuICAgIGxldCBpbmRleCA9IDA7XG4gICAgY29uc3QgbGVuZ3RoID0gdThBcnIubGVuZ3RoO1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGxldCBzbGljZTtcbiAgICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgc2xpY2UgPSB1OEFyci5zdWJhcnJheShpbmRleCwgTWF0aC5taW4oaW5kZXggKyBDSFVOS19TSVpFLCBsZW5ndGgpKTtcbiAgICAgICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgc2xpY2UpO1xuICAgICAgICBpbmRleCArPSBDSFVOS19TSVpFO1xuICAgIH1cbiAgICByZXR1cm4gYnRvYShyZXN1bHQpO1xufTtcbmV4cG9ydCBjb25zdCBib29sVG9JbnQgPSBmdW5jdGlvbiAoYm9vbCkge1xuICAgIHJldHVybiBib29sID8gMSA6IDA7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzNSeWFXNW5MWFYwYVd4ekxtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTGk0dkxpNHZMaTR2YzNKakwyeHBZaTl6ZEhKcGJtY3RkWFJwYkhNdWRITWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUVzVFVGQlRTeFZRVUZWTEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUXpOQ0xFOUJRVThzVVVGQlVTeERRVUZETEd0Q1FVRnJRaXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEZWtNc1EwRkJRenRCUVVWRUxFMUJRVTBzUTBGQlF5eE5RVUZOTEZsQlFWa3NSMEZCUnl4VlFVRlRMRWRCUVZFN1NVRkRNME1zYVVOQlFXbERPMGxCUTJwRExFbEJRVWtzVDBGQlR5eEhRVUZITEVsQlFVa3NVVUZCVVN4RlFVRkZPMUZCUXpGQ0xFZEJRVWNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1MwRkRia0k3U1VGRlJDeFBRVUZQTEZkQlFWY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRCUVVNeFFpeERRVUZETEVOQlFVTTdRVUZGUml4TlFVRk5MRU5CUVVNc1RVRkJUU3hUUVVGVExFZEJRVWNzVlVGRGRrSXNSMEZCVnl4RlFVTllMRzFDUVVFMFFpeEpRVUZKTzBsQlJXaERMRWRCUVVjc1IwRkJSeXhaUVVGWkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdTVUZEZUVJc2NVTkJRWEZETzBsQlEzSkRMRWxCUTBVc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRXRCUVVzc1QwRkJUenRSUVVNMVFpeG5Ra0ZCWjBJN1VVRkRhRUlzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUlVGRGNrSTdVVUZEUVN4SFFVRkhMRWRCUVVjc1IwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eERRVUZETEVWQlFVVXNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4cFFrRkJhVUlzUTBGQlF6dExRVU12UkR0SlFVTkVMRTlCUVU4c1IwRkJSeXhEUVVGRE8wRkJRMklzUTBGQlF5eERRVUZETzBGQlJVWXNOa0pCUVRaQ08wRkJRemRDTEhGSVFVRnhTRHRCUVVOeVNDeE5RVUZOTEVOQlFVTXNUVUZCVFN4aFFVRmhMRWRCUVVjc1ZVRkJVeXhMUVVGcFFqdEpRVU55UkN4TlFVRk5MRlZCUVZVc1IwRkJSeXhOUVVGTkxFTkJRVU1zUTBGQlF5eHRRa0ZCYlVJN1NVRkRPVU1zU1VGQlNTeExRVUZMTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUTJRc1RVRkJUU3hOUVVGTkxFZEJRVWNzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXp0SlFVTTFRaXhKUVVGSkxFMUJRVTBzUjBGQlJ5eEZRVUZGTEVOQlFVTTdTVUZEYUVJc1NVRkJTU3hMUVVGcFFpeERRVUZETzBsQlEzUkNMRTlCUVU4c1MwRkJTeXhIUVVGSExFMUJRVTBzUlVGQlJUdFJRVU55UWl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhMUVVGTExFZEJRVWNzVlVGQlZTeEZRVUZGTEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkRjRVVzVFVGQlRTeEpRVUZKTEUxQlFVMHNRMEZCUXl4WlFVRlpMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUlVGQlJTeExRVUZMTEVOQlFVTXNRMEZCUXp0UlFVTnFSQ3hMUVVGTExFbEJRVWtzVlVGQlZTeERRVUZETzB0QlEzSkNPMGxCUTBRc1QwRkJUeXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdRVUZEZEVJc1EwRkJReXhEUVVGRE8wRkJSVVlzVFVGQlRTeERRVUZETEUxQlFVMHNVMEZCVXl4SFFVRkhMRlZCUVZNc1NVRkJZVHRKUVVNM1F5eFBRVUZQTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEZEVJc1EwRkJReXhEUVVGREluMD0iLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1iaXR3aXNlICovXG4vLyBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODMjZ2lzdGNvbW1lbnQtMjQwMzM2OVxuY29uc3QgaGV4ID0gW107XG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgaGV4W2ldID0gKGkgPCAxNiA/IFwiMFwiIDogXCJcIikgKyBpLnRvU3RyaW5nKDE2KTtcbn1cbmV4cG9ydCBjb25zdCBtYWtlVVVJRCA9ICgpID0+IHtcbiAgICBjb25zdCByID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxNikpO1xuICAgIHJbNl0gPSAocls2XSAmIDB4MGYpIHwgMHg0MDtcbiAgICByWzhdID0gKHJbOF0gJiAweDNmKSB8IDB4ODA7XG4gICAgcmV0dXJuIChoZXhbclswXV0gK1xuICAgICAgICBoZXhbclsxXV0gK1xuICAgICAgICBoZXhbclsyXV0gK1xuICAgICAgICBoZXhbclszXV0gK1xuICAgICAgICBcIi1cIiArXG4gICAgICAgIGhleFtyWzRdXSArXG4gICAgICAgIGhleFtyWzVdXSArXG4gICAgICAgIFwiLVwiICtcbiAgICAgICAgaGV4W3JbNl1dICtcbiAgICAgICAgaGV4W3JbN11dICtcbiAgICAgICAgXCItXCIgK1xuICAgICAgICBoZXhbcls4XV0gK1xuICAgICAgICBoZXhbcls5XV0gK1xuICAgICAgICBcIi1cIiArXG4gICAgICAgIGhleFtyWzEwXV0gK1xuICAgICAgICBoZXhbclsxMV1dICtcbiAgICAgICAgaGV4W3JbMTJdXSArXG4gICAgICAgIGhleFtyWzEzXV0gK1xuICAgICAgICBoZXhbclsxNF1dICtcbiAgICAgICAgaGV4W3JbMTVdXSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZFhWcFpDNXFjeUlzSW5OdmRYSmpaVkp2YjNRaU9pSWlMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDNOeVl5OXNhV0l2ZFhWcFpDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN3clFrRkJLMEk3UVVGRkwwSXNPRVJCUVRoRU8wRkJRemxFTEUxQlFVMHNSMEZCUnl4SFFVRkhMRVZCUVVVc1EwRkJRenRCUVVWbUxFdEJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhIUVVGSExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdTVUZETlVJc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPME5CUXk5RE8wRkJSVVFzVFVGQlRTeERRVUZETEUxQlFVMHNVVUZCVVN4SFFVRkhMRWRCUVVjc1JVRkJSVHRKUVVNelFpeE5RVUZOTEVOQlFVTXNSMEZCUnl4TlFVRk5MRU5CUVVNc1pVRkJaU3hEUVVGRExFbEJRVWtzVlVGQlZTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkZja1FzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRKUVVNMVFpeERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRE8wbEJSVFZDTEU5QlFVOHNRMEZEVEN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzFGQlExUXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dFJRVU5VTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFZDeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzUjBGQlJ6dFJRVU5JTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFZDeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzUjBGQlJ6dFJRVU5JTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFZDeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzUjBGQlJ6dFJRVU5JTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VVVGRFZDeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8xRkJRMVFzUjBGQlJ6dFJRVU5JTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VVVGRFZpeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRE8xRkJRMVlzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJRenRSUVVOV0xFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1VVRkRWaXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRPMUZCUTFZc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVTllMRU5CUVVNN1FVRkRTaXhEUVVGRExFTkJRVU1pZlE9PSIsIi8vIGh0dHBzOi8vd3d3LnVuaWNvZGUub3JnL3JlcG9ydHMvdHIzNS90cjM1LWRhdGVzLmh0bWwjRGF0ZV9GaWVsZF9TeW1ib2xfVGFibGVcbmV4cG9ydCBjb25zdCBkYXRlVGltZVVuaWNvZGVGb3JtYXRTdHJpbmcgPSBcInl5eXktTU0tZGQnVCdISDptbTpzcy5TU1NYWFwiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYzJOb1pXMWhMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE1pT2xzaUxpNHZMaTR2YzNKakwzTmphR1Z0WVM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkpRU3dyUlVGQkswVTdRVUZETDBVc1RVRkJUU3hEUVVGRExFMUJRVTBzTWtKQlFUSkNMRWRCUVVjc05rSkJRVFpDTEVOQlFVTWlmUT09IiwiaW1wb3J0IHtcbiAgQ29va2llSW5zdHJ1bWVudCxcbiAgSmF2YXNjcmlwdEluc3RydW1lbnQsXG4gIEh0dHBJbnN0cnVtZW50LFxuICBOYXZpZ2F0aW9uSW5zdHJ1bWVudCxcbn0gZnJvbSBcIm9wZW53cG0td2ViZXh0LWluc3RydW1lbnRhdGlvblwiO1xuXG5pbXBvcnQgKiBhcyBsb2dnaW5nREIgZnJvbSBcIi4vbG9nZ2luZ2RiLmpzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIC8vIFJlYWQgdGhlIGJyb3dzZXIgY29uZmlndXJhdGlvbiBmcm9tIGZpbGVcbiAgbGV0IGZpbGVuYW1lID0gXCJicm93c2VyX3BhcmFtcy5qc29uXCI7XG4gIGxldCBjb25maWcgPSBhd2FpdCBicm93c2VyLnByb2ZpbGVEaXJJTy5yZWFkRmlsZShmaWxlbmFtZSk7XG4gIGlmIChjb25maWcpIHtcbiAgICBjb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZyk7XG4gICAgY29uc29sZS5sb2coXCJCcm93c2VyIENvbmZpZzpcIiwgY29uZmlnKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uX2luc3RydW1lbnQ6dHJ1ZSxcbiAgICAgIGNvb2tpZV9pbnN0cnVtZW50OnRydWUsXG4gICAgICBqc19pbnN0cnVtZW50OnRydWUsXG4gICAgICBqc19pbnN0cnVtZW50X21vZHVsZXM6XCJmaW5nZXJwcmludGluZ1wiLFxuICAgICAgaHR0cF9pbnN0cnVtZW50OnRydWUsXG4gICAgICBzYXZlX2NvbnRlbnQ6ZmFsc2UsXG4gICAgICB0ZXN0aW5nOnRydWUsXG4gICAgICBjcmF3bF9pZDowXG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IGNvbmZpZyBub3QgZm91bmQuIEFzc3VtaW5nIHRoaXMgaXMgYSB0ZXN0IHJ1biBvZlwiLFxuICAgICAgICAgICAgICAgIFwidGhlIGV4dGVuc2lvbi4gT3V0cHV0dGluZyBhbGwgcXVlcmllcyB0byBjb25zb2xlLlwiLCB7Y29uZmlnfSk7XG4gIH1cblxuICBhd2FpdCBsb2dnaW5nREIub3Blbihjb25maWdbJ2FnZ3JlZ2F0b3JfYWRkcmVzcyddLFxuICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbJ2xvZ2dlcl9hZGRyZXNzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1snY3Jhd2xfaWQnXSk7XG5cbiAgaWYgKGNvbmZpZ1tcIm5hdmlnYXRpb25faW5zdHJ1bWVudFwiXSkge1xuICAgIGxvZ2dpbmdEQi5sb2dEZWJ1ZyhcIk5hdmlnYXRpb24gaW5zdHJ1bWVudGF0aW9uIGVuYWJsZWRcIik7XG4gICAgbGV0IG5hdmlnYXRpb25JbnN0cnVtZW50ID0gbmV3IE5hdmlnYXRpb25JbnN0cnVtZW50KGxvZ2dpbmdEQik7XG4gICAgbmF2aWdhdGlvbkluc3RydW1lbnQucnVuKGNvbmZpZ1tcImNyYXdsX2lkXCJdKTtcbiAgfVxuXG4gIGlmIChjb25maWdbJ2Nvb2tpZV9pbnN0cnVtZW50J10pIHtcbiAgICBsb2dnaW5nREIubG9nRGVidWcoXCJDb29raWUgaW5zdHJ1bWVudGF0aW9uIGVuYWJsZWRcIik7XG4gICAgbGV0IGNvb2tpZUluc3RydW1lbnQgPSBuZXcgQ29va2llSW5zdHJ1bWVudChsb2dnaW5nREIpO1xuICAgIGNvb2tpZUluc3RydW1lbnQucnVuKGNvbmZpZ1snY3Jhd2xfaWQnXSk7XG4gIH1cblxuICBpZiAoY29uZmlnWydqc19pbnN0cnVtZW50J10pIHtcbiAgICBsb2dnaW5nREIubG9nRGVidWcoXCJKYXZhc2NyaXB0IGluc3RydW1lbnRhdGlvbiBlbmFibGVkXCIpO1xuICAgIGxldCBqc0luc3RydW1lbnQgPSBuZXcgSmF2YXNjcmlwdEluc3RydW1lbnQobG9nZ2luZ0RCKTtcbiAgICBqc0luc3RydW1lbnQucnVuKGNvbmZpZ1snY3Jhd2xfaWQnXSk7XG4gICAgYXdhaXQganNJbnN0cnVtZW50LnJlZ2lzdGVyQ29udGVudFNjcmlwdChjb25maWdbJ3Rlc3RpbmcnXSwgY29uZmlnWydqc19pbnN0cnVtZW50X21vZHVsZXMnXSk7XG4gIH1cblxuICBpZiAoY29uZmlnWydodHRwX2luc3RydW1lbnQnXSkge1xuICAgIGxvZ2dpbmdEQi5sb2dEZWJ1ZyhcIkhUVFAgSW5zdHJ1bWVudGF0aW9uIGVuYWJsZWRcIik7XG4gICAgbGV0IGh0dHBJbnN0cnVtZW50ID0gbmV3IEh0dHBJbnN0cnVtZW50KGxvZ2dpbmdEQik7XG4gICAgaHR0cEluc3RydW1lbnQucnVuKGNvbmZpZ1snY3Jhd2xfaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnWydzYXZlX2NvbnRlbnQnXSk7XG4gIH1cbn1cblxubWFpbigpO1xuIiwiaW1wb3J0ICogYXMgc29ja2V0IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuXG5sZXQgY3Jhd2xJRCA9IG51bGw7XG5sZXQgdmlzaXRJRCA9IG51bGw7XG5sZXQgZGVidWdnaW5nID0gZmFsc2U7XG5sZXQgZGF0YUFnZ3JlZ2F0b3IgPSBudWxsO1xubGV0IGxvZ0FnZ3JlZ2F0b3IgPSBudWxsO1xubGV0IGxpc3RlbmluZ1NvY2tldCA9IG51bGw7XG5cbmV4cG9ydCBsZXQgb3BlbiA9IGFzeW5jIGZ1bmN0aW9uKGFnZ3JlZ2F0b3JBZGRyZXNzLCBsb2dBZGRyZXNzLCBjdXJyX2NyYXdsSUQpIHtcbiAgICBpZiAoYWdncmVnYXRvckFkZHJlc3MgPT0gbnVsbCAmJiBsb2dBZGRyZXNzID09IG51bGwgJiYgY3Vycl9jcmF3bElEID09ICcnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGVidWdnaW5nLCBldmVyeXRoaW5nIHdpbGwgb3V0cHV0IHRvIGNvbnNvbGVcIik7XG4gICAgICAgIGRlYnVnZ2luZyA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3Jhd2xJRCA9IGN1cnJfY3Jhd2xJRDtcblxuICAgIGNvbnNvbGUubG9nKFwiT3BlbmluZyBzb2NrZXQgY29ubmVjdGlvbnMuLi5cIik7XG5cbiAgICAvLyBDb25uZWN0IHRvIE1QTG9nZ2VyIGZvciBleHRlbnNpb24gaW5mby9kZWJ1Zy9lcnJvciBsb2dnaW5nXG4gICAgaWYgKGxvZ0FkZHJlc3MgIT0gbnVsbCkge1xuICAgICAgICBsb2dBZ2dyZWdhdG9yID0gbmV3IHNvY2tldC5TZW5kaW5nU29ja2V0KCk7XG4gICAgICAgIGxldCBydiA9IGF3YWl0IGxvZ0FnZ3JlZ2F0b3IuY29ubmVjdChsb2dBZGRyZXNzWzBdLCBsb2dBZGRyZXNzWzFdKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2dTb2NrZXQgc3RhcnRlZD9cIiwgcnYpXG4gICAgfVxuXG4gICAgLy8gQ29ubmVjdCB0byBkYXRhYmFzZXMgZm9yIHNhdmluZyBkYXRhXG4gICAgaWYgKGFnZ3JlZ2F0b3JBZGRyZXNzICE9IG51bGwpIHtcbiAgICAgICAgZGF0YUFnZ3JlZ2F0b3IgPSBuZXcgc29ja2V0LlNlbmRpbmdTb2NrZXQoKTtcbiAgICAgICAgbGV0IHJ2ID0gYXdhaXQgZGF0YUFnZ3JlZ2F0b3IuY29ubmVjdChhZ2dyZWdhdG9yQWRkcmVzc1swXSwgYWdncmVnYXRvckFkZHJlc3NbMV0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNxbGl0ZVNvY2tldCBzdGFydGVkP1wiLHJ2KTtcbiAgICB9XG5cbiAgICAvLyBMaXN0ZW4gZm9yIGluY29taW5nIHVybHMgYXMgdmlzaXQgaWRzXG4gICAgbGlzdGVuaW5nU29ja2V0ID0gbmV3IHNvY2tldC5MaXN0ZW5pbmdTb2NrZXQoKTtcbiAgICBjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIHNvY2tldCBsaXN0ZW5pbmcgZm9yIGluY29taW5nIGNvbm5lY3Rpb25zLlwiKTtcbiAgICBsaXN0ZW5pbmdTb2NrZXQuc3RhcnRMaXN0ZW5pbmcoKS50aGVuKCgpID0+IHtcbiAgICAgICAgYnJvd3Nlci5wcm9maWxlRGlySU8ud3JpdGVGaWxlKFwiZXh0ZW5zaW9uX3BvcnQudHh0XCIsIGAke2xpc3RlbmluZ1NvY2tldC5wb3J0fWApO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGxldCBjbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChkYXRhQWdncmVnYXRvciAhPSBudWxsKSB7XG4gICAgICAgIGRhdGFBZ2dyZWdhdG9yLmNsb3NlKCk7XG4gICAgfVxuICAgIGlmIChsb2dBZ2dyZWdhdG9yICE9IG51bGwpIHtcbiAgICAgICAgbG9nQWdncmVnYXRvci5jbG9zZSgpO1xuICAgIH1cbn07XG5cbmxldCBtYWtlTG9nSlNPTiA9IGZ1bmN0aW9uKGx2bCwgbXNnKSB7XG4gICAgdmFyIGxvZ19qc29uID0ge1xuICAgICAgICAnbmFtZSc6ICdFeHRlbnNpb24tTG9nZ2VyJyxcbiAgICAgICAgJ2xldmVsJzogbHZsLFxuICAgICAgICAncGF0aG5hbWUnOiAnRmlyZWZveEV4dGVuc2lvbicsXG4gICAgICAgICdsaW5lbm8nOiAxLFxuICAgICAgICAnbXNnJzogZXNjYXBlU3RyaW5nKG1zZyksXG4gICAgICAgICdhcmdzJzogbnVsbCxcbiAgICAgICAgJ2V4Y19pbmZvJzogbnVsbCxcbiAgICAgICAgJ2Z1bmMnOiBudWxsXG4gICAgfVxuICAgIHJldHVybiBsb2dfanNvbjtcbn1cblxuZXhwb3J0IGxldCBsb2dJbmZvID0gZnVuY3Rpb24obXNnKSB7XG4gICAgLy8gQWx3YXlzIGxvZyB0byBicm93c2VyIGNvbnNvbGVcbiAgICBjb25zb2xlLmxvZyhtc2cpO1xuXG4gICAgaWYgKGRlYnVnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTG9nIGxldmVsIElORk8gPT0gMjAgKGh0dHBzOi8vZG9jcy5weXRob24ub3JnLzIvbGlicmFyeS9sb2dnaW5nLmh0bWwjbG9nZ2luZy1sZXZlbHMpXG4gICAgdmFyIGxvZ19qc29uID0gbWFrZUxvZ0pTT04oMjAsIG1zZyk7XG4gICAgbG9nQWdncmVnYXRvci5zZW5kKEpTT04uc3RyaW5naWZ5KFsnRVhUJywgSlNPTi5zdHJpbmdpZnkobG9nX2pzb24pXSkpO1xufTtcblxuZXhwb3J0IGxldCBsb2dEZWJ1ZyA9IGZ1bmN0aW9uKG1zZykge1xuICAgIC8vIEFsd2F5cyBsb2cgdG8gYnJvd3NlciBjb25zb2xlXG4gICAgY29uc29sZS5sb2cobXNnKTtcblxuICAgIGlmIChkZWJ1Z2dpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIExvZyBsZXZlbCBERUJVRyA9PSAxMCAoaHR0cHM6Ly9kb2NzLnB5dGhvbi5vcmcvMi9saWJyYXJ5L2xvZ2dpbmcuaHRtbCNsb2dnaW5nLWxldmVscylcbiAgICB2YXIgbG9nX2pzb24gPSBtYWtlTG9nSlNPTigxMCwgbXNnKTtcbiAgICBsb2dBZ2dyZWdhdG9yLnNlbmQoSlNPTi5zdHJpbmdpZnkoWydFWFQnLCBKU09OLnN0cmluZ2lmeShsb2dfanNvbildKSk7XG59O1xuXG5leHBvcnQgbGV0IGxvZ1dhcm4gPSBmdW5jdGlvbihtc2cpIHtcbiAgICAvLyBBbHdheXMgbG9nIHRvIGJyb3dzZXIgY29uc29sZVxuICAgIGNvbnNvbGUud2Fybihtc2cpO1xuXG4gICAgaWYgKGRlYnVnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTG9nIGxldmVsIFdBUk4gPT0gMzAgKGh0dHBzOi8vZG9jcy5weXRob24ub3JnLzIvbGlicmFyeS9sb2dnaW5nLmh0bWwjbG9nZ2luZy1sZXZlbHMpXG4gICAgdmFyIGxvZ19qc29uID0gbWFrZUxvZ0pTT04oMzAsIG1zZyk7XG4gICAgbG9nQWdncmVnYXRvci5zZW5kKEpTT04uc3RyaW5naWZ5KFsnRVhUJywgSlNPTi5zdHJpbmdpZnkobG9nX2pzb24pXSkpO1xufTtcblxuZXhwb3J0IGxldCBsb2dFcnJvciA9IGZ1bmN0aW9uKG1zZykge1xuICAgIC8vIEFsd2F5cyBsb2cgdG8gYnJvd3NlciBjb25zb2xlXG4gICAgY29uc29sZS5lcnJvcihtc2cpO1xuXG4gICAgaWYgKGRlYnVnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTG9nIGxldmVsIElORk8gPT0gNDAgKGh0dHBzOi8vZG9jcy5weXRob24ub3JnLzIvbGlicmFyeS9sb2dnaW5nLmh0bWwjbG9nZ2luZy1sZXZlbHMpXG4gICAgdmFyIGxvZ19qc29uID0gbWFrZUxvZ0pTT04oNDAsIG1zZyk7XG4gICAgbG9nQWdncmVnYXRvci5zZW5kKEpTT04uc3RyaW5naWZ5KFsnRVhUJywgSlNPTi5zdHJpbmdpZnkobG9nX2pzb24pXSkpO1xufTtcblxuZXhwb3J0IGxldCBsb2dDcml0aWNhbCA9IGZ1bmN0aW9uKG1zZykge1xuICAgIC8vIEFsd2F5cyBsb2cgdG8gYnJvd3NlciBjb25zb2xlXG4gICAgY29uc29sZS5lcnJvcihtc2cpO1xuXG4gICAgaWYgKGRlYnVnZ2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTG9nIGxldmVsIENSSVRJQ0FMID09IDUwIChodHRwczovL2RvY3MucHl0aG9uLm9yZy8yL2xpYnJhcnkvbG9nZ2luZy5odG1sI2xvZ2dpbmctbGV2ZWxzKVxuICAgIHZhciBsb2dfanNvbiA9IG1ha2VMb2dKU09OKDUwLCBtc2cpO1xuICAgIGxvZ0FnZ3JlZ2F0b3Iuc2VuZChKU09OLnN0cmluZ2lmeShbJ0VYVCcsIEpTT04uc3RyaW5naWZ5KGxvZ19qc29uKV0pKTtcbn07XG5cbmV4cG9ydCBsZXQgZGF0YVJlY2VpdmVyID0ge1xuICAgIHNhdmVSZWNvcmQoYSwgYikge1xuICAgICAgICBjb25zb2xlLmxvZyhiKTtcbiAgICB9LFxufTtcblxuZXhwb3J0IGxldCBzYXZlUmVjb3JkID0gZnVuY3Rpb24oaW5zdHJ1bWVudCwgcmVjb3JkKSB7XG4gICAgLy8gQWRkIHZpc2l0IGlkIGlmIGNoYW5nZWRcbiAgICB3aGlsZSAoIWRlYnVnZ2luZyAmJiBsaXN0ZW5pbmdTb2NrZXQucXVldWUubGVuZ3RoICE9IDApIHtcbiAgICAgICAgdmlzaXRJRCA9IGxpc3RlbmluZ1NvY2tldC5xdWV1ZS5zaGlmdCgpO1xuICAgICAgICBsb2dEZWJ1ZyhcIlZpc2l0IElkOiBcIiArIHZpc2l0SUQpO1xuICAgIH1cbiAgICByZWNvcmRbXCJ2aXNpdF9pZFwiXSA9IHBhcnNlSW50KHZpc2l0SUQsIDEwKTtcblxuXG4gICAgaWYgKCF2aXNpdElEICYmICFkZWJ1Z2dpbmcpIHtcbiAgICAgICAgbG9nQ3JpdGljYWwoJ0V4dGVuc2lvbi0nICsgY3Jhd2xJRCArICcgOiB2aXNpdElEIGlzIG51bGwgd2hpbGUgYXR0ZW1wdGluZyB0byBpbnNlcnQgJyArXG4gICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHJlY29yZCkpO1xuICAgICAgICByZWNvcmRbXCJ2aXNpdF9pZFwiXSA9IC0xO1xuICAgIH1cblxuICAgIC8vIHNlbmQgdG8gY29uc29sZSBpZiBkZWJ1Z2dpbmdcbiAgICBpZiAoZGVidWdnaW5nKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVYVEVOU0lPTlwiLCBpbnN0cnVtZW50LCByZWNvcmQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkYXRhQWdncmVnYXRvci5zZW5kKEpTT04uc3RyaW5naWZ5KFtpbnN0cnVtZW50LCByZWNvcmRdKSk7XG59O1xuXG4vLyBTdHViIGZvciBub3dcbmV4cG9ydCBsZXQgc2F2ZUNvbnRlbnQgPSBhc3luYyBmdW5jdGlvbihjb250ZW50LCBjb250ZW50SGFzaCkge1xuICAvLyBTZW5kIHBhZ2UgY29udGVudCB0byB0aGUgZGF0YSBhZ2dyZWdhdG9yXG4gIC8vIGRlZHVwbGljYXRlZCBieSBjb250ZW50SGFzaCBpbiBhIGxldmVsREIgZGF0YWJhc2VcbiAgaWYgKGRlYnVnZ2luZykge1xuICAgIGNvbnNvbGUubG9nKFwiTERCIGNvbnRlbnRIYXNoOlwiLGNvbnRlbnRIYXNoLFwid2l0aCBsZW5ndGhcIixjb250ZW50Lmxlbmd0aCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIFNpbmNlIHRoZSBjb250ZW50IG1pZ2h0IG5vdCBiZSBhIHZhbGlkIHV0Zjggc3RyaW5nIGFuZCBpdCBuZWVkcyB0byBiZVxuICAvLyBqc29uIGVuY29kZWQgbGF0ZXIsIGl0IGlzIGVuY29kZWQgdXNpbmcgYmFzZTY0IGZpcnN0LlxuICBjb25zdCBiNjQgPSBVaW50OFRvQmFzZTY0KGNvbnRlbnQpO1xuICBkYXRhQWdncmVnYXRvci5zZW5kKEpTT04uc3RyaW5naWZ5KFsncGFnZV9jb250ZW50JywgW2I2NCwgY29udGVudEhhc2hdXSkpO1xufTtcblxuZnVuY3Rpb24gZW5jb2RlX3V0Zjgocykge1xuICByZXR1cm4gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHMpKTtcbn1cblxuLy8gQmFzZTY0IGVuY29kaW5nLCBmb3VuZCBvbjpcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEyNzEwMDAxL2hvdy10by1jb252ZXJ0LXVpbnQ4LWFycmF5LXRvLWJhc2U2NC1lbmNvZGVkLXN0cmluZy8yNTY0NDQwOSMyNTY0NDQwOVxuZnVuY3Rpb24gVWludDhUb0Jhc2U2NCh1OEFycil7XG4gIHZhciBDSFVOS19TSVpFID0gMHg4MDAwOyAvL2FyYml0cmFyeSBudW1iZXJcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCA9IHU4QXJyLmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgc2xpY2U7XG4gIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgIHNsaWNlID0gdThBcnIuc3ViYXJyYXkoaW5kZXgsIE1hdGgubWluKGluZGV4ICsgQ0hVTktfU0laRSwgbGVuZ3RoKSk7XG4gICAgcmVzdWx0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgc2xpY2UpO1xuICAgIGluZGV4ICs9IENIVU5LX1NJWkU7XG4gIH1cbiAgcmV0dXJuIGJ0b2EocmVzdWx0KTtcbn1cblxuZXhwb3J0IGxldCBlc2NhcGVTdHJpbmcgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAvLyBDb252ZXJ0IHRvIHN0cmluZyBpZiBuZWNlc3NhcnlcbiAgICBpZih0eXBlb2Ygc3RyaW5nICE9IFwic3RyaW5nXCIpXG4gICAgICAgIHN0cmluZyA9IFwiXCIgKyBzdHJpbmc7XG5cbiAgICByZXR1cm4gZW5jb2RlX3V0Zjgoc3RyaW5nKTtcbn07XG5cbmV4cG9ydCBsZXQgYm9vbFRvSW50ID0gZnVuY3Rpb24oYm9vbCkge1xuICAgIHJldHVybiBib29sID8gMSA6IDA7XG59O1xuIiwibGV0IERhdGFSZWNlaXZlciA9IHtcbiAgY2FsbGJhY2tzOiBuZXcgTWFwKCksXG4gIG9uRGF0YVJlY2VpdmVkOiAoYVNvY2tldElkLCBhRGF0YSwgYUpTT04pID0+IHtcbiAgICBpZiAoIURhdGFSZWNlaXZlci5jYWxsYmFja3MuaGFzKGFTb2NrZXRJZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFKU09OKSB7XG4gICAgICBhRGF0YSA9IEpTT04ucGFyc2UoYURhdGEpO1xuICAgIH1cbiAgICBEYXRhUmVjZWl2ZXIuY2FsbGJhY2tzLmdldChhU29ja2V0SWQpLl91cGRhdGVRdWV1ZShhRGF0YSk7XG4gIH0sXG59O1xuXG5icm93c2VyLnNvY2tldHMub25EYXRhUmVjZWl2ZWQuYWRkTGlzdGVuZXIoRGF0YVJlY2VpdmVyLm9uRGF0YVJlY2VpdmVkKTtcblxubGV0IExpc3RlbmluZ1NvY2tldHMgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjbGFzcyBMaXN0ZW5pbmdTb2NrZXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1ZXVlID0gW107IC8vIHN0b3JlcyBtZXNzYWdlcyBzZW50IHRvIHNvY2tldFxuICB9XG5cbiAgYXN5bmMgc3RhcnRMaXN0ZW5pbmcoKSB7XG4gICAgdGhpcy5wb3J0ID0gYXdhaXQgYnJvd3Nlci5zb2NrZXRzLmNyZWF0ZVNlcnZlclNvY2tldCgpO1xuICAgIERhdGFSZWNlaXZlci5jYWxsYmFja3Muc2V0KHRoaXMucG9ydCwgdGhpcyk7XG4gICAgYnJvd3Nlci5zb2NrZXRzLnN0YXJ0TGlzdGVuaW5nKHRoaXMucG9ydCk7XG4gICAgY29uc29sZS5sb2coJ0xpc3RlbmluZyBvbiBwb3J0ICcgKyB0aGlzLnBvcnQpO1xuICB9XG5cbiAgX3VwZGF0ZVF1ZXVlKGRhdGEpIHtcbiAgICB0aGlzLnF1ZXVlLnB1c2goZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlbmRpbmdTb2NrZXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGFzeW5jIGNvbm5lY3QoaG9zdCwgcG9ydCkge1xuICAgIHRoaXMuaWQgPSBhd2FpdCBicm93c2VyLnNvY2tldHMuY3JlYXRlU2VuZGluZ1NvY2tldCgpO1xuICAgIGJyb3dzZXIuc29ja2V0cy5jb25uZWN0KHRoaXMuaWQsIGhvc3QsIHBvcnQpO1xuICAgIGNvbnNvbGUubG9nKGBDb25uZWN0ZWQgdG8gJHtob3N0fToke3BvcnR9YCk7XG4gIH1cblxuICBzZW5kKGFEYXRhLCBhSlNPTj10cnVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGJyb3dzZXIuc29ja2V0cy5zZW5kRGF0YSh0aGlzLmlkLCBhRGF0YSwgISFhSlNPTik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLGVyci5tZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBicm93c2VyLnNvY2tldHMuY2xvc2UodGhpcy5pZCk7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==