import { MAGIC_STRINGS } from "../enumerations/MagicStringsEnum";

/**
 * Set item into browser/document cookie.
 * @param name Name of cookie. Must be unique.
 * @param value Value of cookie. Can only be in string form.
 * @param expiryDatetime Date-time of expiry of the cookie.
 */
function setCookie(name: string, value: string, expiryDatetime: Date) {
    document.cookie = `${name}=${value};expires=${expiryDatetime.toUTCString()};path=/`;
}

/**
 * Unset a cookie in the browser/document cookie. It expects operation to run in same local or UTC time.
 * @param name Name of cookie. Must be unique.
 */
function unSetCookie(name: string) {
    let toBePastDate = new Date();
    toBePastDate.setDate(toBePastDate.getDate() - 10);
    document.cookie = `${name}=;expires=${toBePastDate.toUTCString()};path=/`;
}

/**
 * Check if cookie exists in browser/document.
 * @param name Name of cookie to check for.
 * @returns Whether or not said cookie exists in browser/document.
 */
function checkCookieExists(name: string) {
    return document.cookie.split(";").some((a) => a.trim().startsWith(`${name}=`))
}

/**
 * Get cookie by using the name as it was set in browser/document.
 * @param name Name of cookie to get.
 * @returns Value of cookie or undefined (or null?) if the cooking is not found.
 */
function getCookie(name: string) {
    return document.cookie.split("; ")?.find(a => a?.startsWith(`${name}=`))?.split("=")[1]
}

/**
 * Get redirect URL from url parameter.
 * @param url Absolute URL to use.
 * @returns Relative-to-origin (wrt url parameter) and decoded redirect URL extracted from url parameter. So, this should be noted when initially making the url parameter URL.
 */
function getRedirectUrlFromUrl(url: string) {
    const redirectUrl = getRedirectUrlQueryParameterValue(url);
    return decodeURIComponent(redirectUrl);
}

/**
 * Get the redirect URL from query string parameter of a URL.
 * @param url Absolute URL to use.
 * @returns Relative-to-origin (wrt url parameter) redirect URL query string parameter value as seen in the URL likely encoded. So, this should be noted when initially making the url parameter URL.
 */
function getRedirectUrlQueryParameterValue(url: string) {
    return (new URL(url)).searchParams.get(MAGIC_STRINGS.redirectUrlQueryParameter) ?? "";
}

/**
 * Determines whether or not redirect URL is in a URL.
 * @param url Absolute URL to use.
 * @returns Whether or not url parameter contains redirect URL. The query string parameter name is as in MAGIC_STRINGS constant.
 */
function doesUrlHaveRedirectUrl(url: string) {
    return (getRedirectUrlQueryParameterValue(url) ? true : false)
}

export { setCookie, unSetCookie, checkCookieExists, getCookie, getRedirectUrlFromUrl, doesUrlHaveRedirectUrl }