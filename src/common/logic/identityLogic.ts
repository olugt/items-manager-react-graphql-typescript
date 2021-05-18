import { LOCATION_PATHS } from "../enumerations/LocationPathsEnum";
import { MAGIC_STRINGS } from "../enumerations/MagicStringsEnum";
import TokenDetailContextModel from "../models/contexts/TokenDetailContextModel";

/**
 * Checks if the identity token model is valid, by simple checks on the client-side.
 * @param tokenDetail The identity token model.
 * @returns Where or not the identity token is valid.
 */
function isTokenValid(tokenDetail?: TokenDetailContextModel | null) {
    return (tokenDetail && tokenDetail.token && tokenDetail.expiryDatetime && (tokenDetail.expiryDatetime > new Date()) && tokenDetail.emailAddress) ? true : false;
}

/**
 * Make URL for login page, on identity error.
 * @param redirectUrlOnSuccessfulLogin Relative-to-origin URL to redirect to when the user successfully logs in after the identity eror.
 * @returns Relative-to-origin URL of login URL, that may include URL to redirect to after successful log-in.
 */
function makeLoginUrlOnIdentityError(redirectUrlOnSuccessfulLogin: string) {
    const origin = window.location.origin;
    const absoluteLoginUrl = new URL(origin + LOCATION_PATHS.login);
    if (redirectUrlOnSuccessfulLogin && (redirectUrlOnSuccessfulLogin !== LOCATION_PATHS.login)) {
        absoluteLoginUrl.searchParams.set(MAGIC_STRINGS.redirectUrlQueryParameter, encodeURIComponent(redirectUrlOnSuccessfulLogin));
    }
    return absoluteLoginUrl.href.replace(origin, "");
}

export { isTokenValid, makeLoginUrlOnIdentityError }