import { ErrorModel } from "../ErrorModel";
import ContextModelBase from "./ContextModelBase";
import { ErrorDataModel } from "../ErrorDataModel";
import { TYPE_KINDS } from "../../enumerations/TypeKindsEnum";

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

        if (((error as unknown) as ErrorModel<ErrorDataModel[]>)?.data
            && ((error as unknown) as ErrorModel<ErrorDataModel[]>)?.data![0].kind === TYPE_KINDS.errorDataModel) {
            this.message = error.message;

            let errorData = ((error as unknown) as ErrorModel<ErrorDataModel[]>)?.data!;

            errorData.forEach(data => {
                this.messages = [...this.messages, ...data.value]
            });
        } else {
            this.message = "App error occurred."
        }

        this.isError = true;
        return this;
    }
};
