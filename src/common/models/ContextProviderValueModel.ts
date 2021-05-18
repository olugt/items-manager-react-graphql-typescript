import { Dispatch, SetStateAction } from 'react';
import ContextModelBase from './contexts/ContextModelBase';

export default class ContextProviderValueModel<TContextModel extends ContextModelBase> {
    public wasConstructedWithParameters: boolean;
    public isSetLaterAfterContructed: boolean;

    /**
     * Used to generally manage context provider's useState array.
     * @param state The state array item from the useState managing the concerned context provider. Don't explicitly use undefined as a value during construction, but null can be used if need be.
     * @param setState The setState array item from the useState managing the concerned context provider. Don't explicitly use undefined as a value during construction, but null can be used if need be.
     */
    constructor(public state?: TContextModel, public setState?: Dispatch<SetStateAction<TContextModel>>) {

        /**
         * This is this way because, if the constructor is called without arguments, the parameters are set to undefined. Also, if React useContext() hook constructs the object explicitly as dictated in the value of the provider, but useContext() would use, for the state, null (if the singature at value of provider says null or setState was called with null) or undefined (if it [i.e. useContext()] cannot find the value, e.g. during an intentional page reload by the user, or, as already warned against, if value at provider was set to undefined or setState was called with undefined), but always use a function for the setState, provided that the signature for the construction at the value of the provider assigns a function to setState. So, if the object is constructed explicitly and the context is already disrupted by, for example, a page reload, useContext() will set undefined to state (and note that this is not about null, because useContext() will not set null in this scenario, hence this can be used to detect such scenario) and set a function to setState, hence, allowing the detection that it was still contructed explicitly abeit with undesired values.
         */
        this.wasConstructedWithParameters = !(state === undefined && setState === undefined);

        /**
         * This should be explicitly set to true in the next line of code at whenever setState is explicitly called with a value, because if setState is null or undefined, an error will be thrown before this would have the oppurtunity to be set.
         */
        this.isSetLaterAfterContructed = false;
    }
};
