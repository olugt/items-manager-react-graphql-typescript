export default class ContextModelBase {
    /**
     * States whether child was constructed without parameters (i.e. true) or not (i.e. false);
     */
    public wasConstructedWithoutParameters: boolean;
    /**
     * Identity token model base.
     * @param childParams All child parameters are expected to be passed here in the constructor of child class, for things to work correctly.
     */
    constructor(childParams?: any[]) {
        this.wasConstructedWithoutParameters = childParams?.every(a => a === undefined) ?? true;
    }
};
