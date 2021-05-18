import { ConfigurationContext } from "../../App";
import { useProcessSimpleCustomContext } from "./customContextHooks";

/**
 * Hook used to manage the ConfigurationContext.
 * @returns Object containing configuration model and a callback function to set it, as state and setState.
 */
export default function useConfigurationContext() {

    let returnValue = useProcessSimpleCustomContext(
        ConfigurationContext
    );
    return returnValue;

}