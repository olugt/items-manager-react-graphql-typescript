/**
 * GraphQL response type.
 */
export type GraphQlResponseType<TData> = {
    data?: TData,
    errors?: {
        message?: string,
        locations?: {
            line: number,
            column: number
        }[]
    }[]
};