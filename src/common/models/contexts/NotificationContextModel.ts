import { ErrorModel } from "../ErrorModel";
import ContextModelBase from "./ContextModelBase";
import { ErrorDataModel } from "../ErrorDataModel";

export default class NotificationContextModel extends ContextModelBase {
    public isError: boolean | undefined;
    public messages: string[] = [];

    /**
     * Instantiate with just notification message.
     * @param show If should show notification.
     * @param message Notification message.
     */
    constructor(public show?: boolean, public message?: string | null) {
        super([show, message]);
    }

    /**
     * Instantiate NotificationContextModel with error details.
     * @param error Error model.
     * @returns NotificationContextModel with error details.
     */
    setError<TErrorData>(error: ErrorModel<TErrorData>) {
        this.message = error.message;

        if (((error as unknown) as ErrorModel<ErrorDataModel[]>)?.data) {
            let errorData = ((error as unknown) as ErrorModel<ErrorDataModel[]>)?.data!;

            errorData.forEach(data => {
                this.messages = [...this.messages, ...data.value]
            });
        }

        this.isError = true;
        return this;
    }
};
