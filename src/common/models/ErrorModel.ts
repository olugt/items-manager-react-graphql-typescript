export default class ErrorModel {
    /**
     * App-wide error model. All errors should be transformed to this before throwing.
     * @param message Error message, intended for display in view.
     * @param data Error data of any type. It is intended to be logged as is.
     * @param code Optional error code, as enlisted in ERROR_CODES constant.
     */
    constructor(public message: string, public data: any, public code: string) {
    }
};
