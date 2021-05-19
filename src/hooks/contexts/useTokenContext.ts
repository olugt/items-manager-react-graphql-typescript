import { TokenContext } from "../../App";
import { isTokenValid } from "../../common/logic/identityLogic";
import { checkCookieExists, setCookie, unSetCookie, getCookie } from "../../common/logic/browserLogic";
import { useProcessCustomContext } from "./customContextHooks";
import { MAGIC_STRINGS } from "../../common/enumerations/MagicStringsEnum";

/**
 * Hook used to manage the TokenContext.
 * @returns Object containing token model and a callback function to set it, as state and setState.
 */
export default function useTokenContext() {
    const identityCookieName = MAGIC_STRINGS.identityTokenCookieName;

    let returnValue = useProcessCustomContext(
        TokenContext,
   
        (tokenDetailContextModel) => {

            try {
                const tokenCookie = getCookie(identityCookieName);
                tokenDetailContextModel!.fromAny(JSON.parse(tokenCookie!)); // JSON.parse function may throw error if the cookie had been saved as undefined, etc. that are not valid JSON.
            } catch {
                tokenDetailContextModel = null;
            }

            return tokenDetailContextModel;

        },
        () => {

            return checkCookieExists(identityCookieName);

        },
        
        (tokenDetailContextModel) => {

            console.log(isTokenValid(tokenDetailContextModel))
            if (isTokenValid(tokenDetailContextModel)) {
                setCookie(identityCookieName, JSON.stringify(tokenDetailContextModel), tokenDetailContextModel!.expiryDatetime!);
            } else {
                unSetCookie(identityCookieName);
            }
            return tokenDetailContextModel;

        });
    return returnValue;
}