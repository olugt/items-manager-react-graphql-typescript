export type graphQlResponseTypeDataBase = { errors?: Record<string, string[]> }

/**
 * GraphQL response type.
 */
export type graphQlResponseType<TData extends graphQlResponseTypeDataBase> = {
    data?: TData,
    errors?: {
        message?: string,
        locations?: {
            line: number,
            column: number
        }[]
    }[]
};