import ContextModelBase from "./ContextModelBase";

export default class TokenDetailContextModel extends ContextModelBase {

    /**
     * Identity token model. Whenever a change is made to the parameters or properties of this class, update the fromParsedJson function.
     * @param token Identity token string.
     * @param expiryDatetime Date-time of expiry of token (also already embeded in the token).
     * @param emailAddress User's email address.
     */
    constructor(public token: string, public expiryDatetime: Date | undefined, public emailAddress: string) {
        super([token, expiryDatetime, emailAddress]);
    }

    /**
     * 
     * @param parsedJson An object that is the result of parsing a JSON representation of this class using JSON.parse function.
     */
    fromParsedJson(parsedJson: any) {
        if (parsedJson) {
            this.token = parsedJson["token"] as string;
            this.expiryDatetime = parsedJson["expiryDatetime"] ? new Date(parsedJson["expiryDatetime"] as string) : undefined;
            this.emailAddress = parsedJson["emailAddress"] as string;
        }
    }
};
