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
     * @returns URL of the GraphQL server.
     */
    getItemsManagerGraphQlServerUrl(): string {
        return process.env.REACT_APP_ITEMS_MANAGER_GRAPHQL_SERVER_BASE_URL as string;
    }
};
