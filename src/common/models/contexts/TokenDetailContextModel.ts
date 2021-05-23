import ContextModelBase from "./ContextModelBase";

export default class TokenDetailContextModel extends ContextModelBase {

    /**
     * Identity token model. Whenever a change is made to the parameters or properties of this class, update the fromParsedJson function.
     * @param token Identity token string.
     * @param expiryDatetime Date-time of expiry of token (also already embeded in the token).
     * @param emailAddress User's email address.
     */
    constructor(public token?: string, public expiryDatetime?: Date, public emailAddress?: string) {
        super([token, expiryDatetime, emailAddress]);
    }

    /**
     * 
     * @param anyTokenDetail An object that could be from the result of parsing a JSON representation of this class using JSON.parse function, from web API, etc. This function is to ensure that especially the Date type is correctly constructed.
     */
    fromAnyTokenDetail(anyTokenDetail: any) {
        if (anyTokenDetail) {
            this.token = anyTokenDetail["token"] as string;
            this.expiryDatetime = anyTokenDetail["expiryDatetime"] ? new Date(anyTokenDetail["expiryDatetime"] as string) : undefined;
            this.emailAddress = anyTokenDetail["emailAddress"] as string;
        }
    }
};
