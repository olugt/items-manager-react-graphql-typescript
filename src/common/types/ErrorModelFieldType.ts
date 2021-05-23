import { ErrorModel } from "../models/ErrorModel"

export type ErrorModelFieldType<TData> = {
    error: ErrorModel<TData>
};