import { gql } from "../../common/constants/GraphQLContants";
import { GRAPHQL_ACTION } from "../../common/enumerations/GraphQLActionEnum";
import ConfigurationContextModel from "../../common/models/contexts/ConfigurationContextModel";
import TokenDetailContextModel from "../../common/models/contexts/TokenDetailContextModel";
import { GraphQlResponseType } from "./types/GraphQLResponseTypes";
import { ErrorModel } from '../../common/models/ErrorModel';
import { ERROR_CODES } from '../../common/enumerations/ErrorCodesEnum';
import { ErrorDataModel } from "../../common/models/ErrorDataModel";
import { ErrorModelFieldType } from "../../common/types/ErrorModelFieldType";

export default class ItemsManagerGraphQlServer {
    serverUrl: string;
    token?: string;

    /**
     * Constructs with an identity token.
     * @param token The identity token, to be passed by derived classes that have it.
     */
    constructor(token?: string) {
        this.serverUrl = new ConfigurationContextModel().getItemsManagerGraphQlServerUrl();

        if (token) {
            this.token = token;
        }
    }

    async login(emailAddress: string, password: string): Promise<TokenDetailContextModel> {
        let mutation: string = gql`
        mutation ($emailAddress: String!, $password: String!) {
            login(credentials: {emailAddress: $emailAddress, password: $password}) {
                ... on ErrorOutput {
                error {
                    message
                    data {
                        key
                        value
                    }
                    code
                }
                }
                ... on TokenDetailOutput {
                    token
                    emailAddress
                    expiryDatetime
                }
            }
        }
        `;

        let responseData = await this.client<{ login: TokenDetailContextModel | ErrorModelFieldType<ErrorDataModel[]> }>(GRAPHQL_ACTION.mutation, {
            query: mutation,
            variables: {
                emailAddress: emailAddress,
                password: password
            }
        });

        if ((responseData?.login as TokenDetailContextModel)?.token) {
            let tokenDetail = new TokenDetailContextModel();
            tokenDetail.fromAnyTokenDetail(responseData.login);
            return tokenDetail;
        } else if ((responseData?.login as ErrorModelFieldType<ErrorDataModel[]>)?.error) {
            let error = (responseData?.login as ErrorModelFieldType<ErrorDataModel[]>)?.error;
            throw new ErrorModel<ErrorDataModel[]>(error.message, error.data, error.code);
        } else {
            throw new ErrorModel<any>("Error occurred.");
        }
    }

    private async client<TGraphQlResponseData>(
        action: GRAPHQL_ACTION,
        graphQl: { query: string, variables?: any }
    ): Promise<TGraphQlResponseData> {

        let headers: Record<string, string> = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        let method = action === GRAPHQL_ACTION.query ? "GET" : (action === GRAPHQL_ACTION.mutation ? "POST" : null);
        if (method === null) {
            throw new ErrorModel("Invalid GraphQL action.", null, ERROR_CODES.validationError);
        }

        let response = await (await (await window.fetch(this.serverUrl + "/graphql", {
            body: JSON.stringify(graphQl),
            method: method,
            headers: headers
        })).json() as Promise<GraphQlResponseType<TGraphQlResponseData>>);

        if (response.errors) {
            throw new ErrorModel("GraphQL server error occurred.", response.errors, ERROR_CODES.graphQlServerError)
        }

        return response.data!;
    }
}