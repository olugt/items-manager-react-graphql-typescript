import { NotificationContext } from "../../App";
import { useProcessSimpleCustomContext } from "./customContextHooks";

/**
 * Hook used to manage the NotificationContext.
 * @returns Object containing notification model and a callback function to set it, as state and setState.
 */
export default function useNotificationContext() {

    let returnValue = useProcessSimpleCustomContext(
        NotificationContext
    );
    return returnValue;
}