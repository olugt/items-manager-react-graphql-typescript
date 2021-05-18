import ErrorModel from "../ErrorModel";
import ContextModelBase from "./ContextModelBase";

export default class NotificationContextModel extends ContextModelBase {
    public isError: boolean | undefined;
    public error: ErrorModel | undefined;
    /**
     * Instantiate with just notification message.
     * @param show If should show notification.
     * @param message Notification message.
     */
    constructor(public show: boolean, message: string) {
        super([show, message]);
    }

    /**
     * Instantiate NotificationContextModel with error details.
     * @param error Error model.
     * @returns NotificationContextModel with error details.
     */
    setError(error: ErrorModel) {
        console.log(error);

        this.isError = true;
        this.error = error;
        return this;
    }
};
