import ErrorModel from '../common/models/ErrorModel';
import TokenDetailContextModel from '../common/models/contexts/TokenDetailContextModel';
import ItemsManagerGraphQlServer from "../infrastructure/graphql/ItemsManagerGraphQlServer";

/**
 * 
 * @param emailAddress User's email address from login form.
 * @param password User's password from login form.
 * @param setTokenContextState The setState callback function for managing the identity token context.
 * @param doRestOnSuccessfulLogin The callback function that runs what else to do on successful login. The caller of processLogin can use it for navigating to redirect URL, etc.
 * @param handleErrorCallback Callback that needs error.
 */
export default function processLogin(
    emailAddress: string,
    password: string,
    setTokenContextState: (_: TokenDetailContextModel) => any,
    doRestOnSuccessfulLogin: () => any,
    handleErrorCallback: (_: ErrorModel) => void) {

    new ItemsManagerGraphQlServer().login(emailAddress, password)
        .then((value) => {
            console.log(value.expiryDatetime)
            setTokenContextState(value);
            doRestOnSuccessfulLogin();
        })
        .catch((error) => {
            console.log(error);
            handleErrorCallback(error);
        });

}