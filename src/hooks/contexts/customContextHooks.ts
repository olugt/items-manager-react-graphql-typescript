import { useContext } from "react";
import ContextProviderValueModel from "../../common/models/ContextProviderValueModel";
import ContextModelBase from "../../common/models/contexts/ContextModelBase";

/**
 * Initializes the context model from useContext() (and the provder value model), for further action in the custom hook managing the context model.
 * @param Context React context to use, passed directly as exported from creation by React's createContext().
 * @returns Initialized context model (initialized from context via useContext() and the provider value model, and it should be casted into the desired context model that derives/extends ContextModelBase) and the provider value model.
 */
function usePreliminaryInitializeContextModel<TContextModel extends ContextModelBase>(Context: React.Context<ContextProviderValueModel<TContextModel>>) {
    let contextProviderValueModel = new ContextProviderValueModel<TContextModel>();
    contextProviderValueModel = useContext(Context);

    let contextModel = contextProviderValueModel.state;
    return { contextModel, contextProviderValueModel };
}

/**
 * This is intended to be called in the hook used to manage the context of a state. It should be called as the last option to recover state value for the state (i.e. after state has already been attempted to be assigned by useContext(), etc.) and the recovering of the state must be by direct assignment of a value to the state (i.e. not by calling setState with a value).
 * @param contextProviderValueModel The instance of ContextProviderValueModel associated with the state.
 * @param state Value should be an instance of a class that inherits/implements from ContextModelBase, i.e a model that can be used as context state.
 */
function shouldAssignStateFromBackingStore<TContextModel extends ContextModelBase>(contextProviderValueModel: ContextProviderValueModel<TContextModel>, state?: TContextModel | null) {
    return (contextProviderValueModel?.wasConstructedWithParameters === true
        && state?.wasConstructedWithoutParameters === true);
}

/**
 * 
 * @param Context React context to use, passed directly as exported from creation by React's createContext().
 * @param runWhenSystemNeedsToRetrieveStateFromBackingStore To run when system needs to retrieve state from backing store. The system decides when it needs the state to be retrieved from backing store (e.g. when the state is lost). So, use this to retrieve the state from your backing store, or to modify the incoming state, or to return something entirely new and different, but must be of same type as what the state expects. Something not null and not undefined must be returned, unless it is intentional to return those, but note that the system runs this when it really needs to retrieve state from the backing store.
 * @param checkToRunBeforeStateIsFinallyReturned Check to run just before system finally returns state, and the check is to determine if system should finally return state or return null. If true, the state the system has processed is returned, otherwise, null is returned as state. For example, the check can be about checking if authentication token (i.e. state) is still valid when token is being retrieved from token context.
 * @param runWhenSetStateIsCalled When you attempt to set state, with this, retrieve state being set, then save it to your backing store or modify it and/or return it or what should actually be set into state. What to be returned must be same type as what the state expects.
 * @returns 
 */
function useProcessCustomContext<TContextModel extends ContextModelBase>(
    Context: React.Context<ContextProviderValueModel<TContextModel>>,
    runWhenSystemNeedsToRetrieveStateFromBackingStore: (_?: TContextModel | null) => TContextModel | null | undefined,
    checkToRunBeforeStateIsFinallyReturned: () => boolean,
    runWhenSetStateIsCalled: (_: TContextModel | null) => TContextModel | null
) {

    let { contextModel, contextProviderValueModel } = usePreliminaryInitializeContextModel(Context);

    if (shouldAssignStateFromBackingStore(contextProviderValueModel, contextModel)) {
        contextModel = runWhenSystemNeedsToRetrieveStateFromBackingStore(contextModel);
    }

    const shouldFinallyAssignStateToTheContextModelOtherwiseAssignStateToNull = checkToRunBeforeStateIsFinallyReturned();

    let setState = (model: TContextModel | null) => {
        contextProviderValueModel.setState && contextProviderValueModel.setState(runWhenSetStateIsCalled(model));
        contextProviderValueModel.isSetLaterAfterContructed = true;
    }

    return {
        state: (shouldFinallyAssignStateToTheContextModelOtherwiseAssignStateToNull ? contextModel : null),
        setState
    }
}

/**
 * 
 * @param Context React context to use, passed directly as exported from creation by React's createContext().
 * @returns 
 */
function useProcessSimpleCustomContext<TContextModel extends ContextModelBase>(
    Context: React.Context<ContextProviderValueModel<TContextModel>>
) {

    return useProcessCustomContext(
        Context,
        contextModel => contextModel,
        () => true,
        contextModel => contextModel
    );

}

export { useProcessCustomContext, useProcessSimpleCustomContext }