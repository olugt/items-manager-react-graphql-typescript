import ContextModelBase from "./ContextModelBase";

/**
 * Model for managing custom configurations, available to components.
 */
export default class ConfigurationContextModel extends ContextModelBase {
    constructor() {
        super();
    }

    /**
     * 
     * @returns Base URL of the promo codes web API.
     */
    getItemsManagerWebApiBaseUrl() {
        return process.env.REACT_APP_ITEMS_MANAGER_WEB_API_BASE_URL;
    }
};
