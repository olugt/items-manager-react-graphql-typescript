import ErrorModel from "../ErrorModel";
import ContextModelBase from "./ContextModelBase";
import { graphQlResponseType, graphQlResponseTypeDataBase } from '../../types/GraphQlResponseType';

export default class NotificationContextModel extends ContextModelBase {
    public isError: boolean | undefined;
    public error: ErrorModel | undefined;
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
    setError(error: ErrorModel) {
        console.log(error);

        this.message = "Error occurred.";
        try {
            let errorData = error.data as graphQlResponseType<graphQlResponseTypeDataBase>;
            if (errorData?.data?.errors) {
                console.log(errorData)
                this.message = Object.keys(errorData.data.errors).map(a => errorData.data!.errors![a]).reduce(b => b.map(c => c)).join("\n");
            }
        } catch { }

        this.isError = true;
        this.error = error;
        return this;
    }
};
