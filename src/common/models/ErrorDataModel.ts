import { TYPE_KINDS } from "../enumerations/TypeKindsEnum";

export class ErrorDataModel {
    public kind = TYPE_KINDS.errorDataModel;

    constructor(public key: string, public value: string[]) {
    }

    static fromUnconstructedErrorDataModels(errorDataModels?: ErrorDataModel[]): ErrorDataModel[] {
        if (errorDataModels) {
            return errorDataModels.map(a => new ErrorDataModel(a.key, a.value));
        }
        else {
            return [];
        }
    }
};