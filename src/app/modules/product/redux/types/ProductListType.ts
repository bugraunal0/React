import {CategoryListModel, ProductListModel} from "../../models/ProductListModel";

export const SET_CATEGORY_LIST = "categoryListActionTypes/SET_CATEGORY_LIST";
export interface SetCategoryListAction {
    type: typeof SET_CATEGORY_LIST;
    payload: Array<CategoryListModel>
}

export const GET_CATEGORY_LIST = "categoryListActionTypes/GET_CATEGORY_LIST";
export interface GetCategoryListAction {
    type: typeof GET_CATEGORY_LIST;
}

export const GET_CATEGORY_LIST_REQUEST = "categoryListActionTypes/GET_CATEGORY_LIST_REQUEST";
export interface GetCategoryListRequestAction {
    type: typeof GET_CATEGORY_LIST_REQUEST;
}

export const GET_CATEGORY_LIST_SUCCESS = "categoryListActionTypes/GET_CATEGORY_LIST_SUCCESS";
export interface GetCategoryListSuccessAction {
    type: typeof GET_CATEGORY_LIST_SUCCESS;
    payload: CategoryListModel
}

export const GET_CATEGORY_LIST_FAILURE = "categoryListActionTypes/GET_CATEGORY_LIST_FAILURE";
export interface GetCategoryListFailureAction {
    type: typeof GET_CATEGORY_LIST_FAILURE;
    error: Error | string;
}
//LIST
export const SET_PRODUCT_LIST = "productListActionTypes/SET_PRODUCT_LIST";
export interface SetProductListAction {
    type: typeof SET_PRODUCT_LIST;
    payload: Array<ProductListModel>
}

export const GET_PRODUCT_LIST = "productListActionTypes/GET_PRODUCT_LIST";
export interface GetProductListAction {
    type: typeof GET_PRODUCT_LIST;
    category: string;
    limit: number
}

export const GET_PRODUCT_LIST_REQUEST = "productListActionTypes/GET_PRODUCT_LIST_REQUEST";
export interface GetProductListRequestAction {
    type: typeof GET_PRODUCT_LIST_REQUEST;
}

export const GET_PRODUCT_LIST_SUCCESS = "productListActionTypes/GET_PRODUCT_LIST_SUCCESS";
export interface GetProductListSuccessAction {
    type: typeof GET_PRODUCT_LIST_SUCCESS;
    payload: ProductListModel
}

export const GET_PRODUCT_LIST_FAILURE = "productListActionTypes/GET_PRODUCT_LIST_FAILURE";
export interface GetProductListFailureAction {
    type: typeof GET_PRODUCT_LIST_FAILURE;
    error: Error | string;
}



// DELETE //
export const DELETE_PRODUCT_LIST = "userListActionTypes/DELETE_PRODUCT_LIST";
export interface DeleteProductAction {
    type: typeof DELETE_PRODUCT_LIST;
    productId: number;
}

export const DELETE_PRODUCT_LIST_REQUEST = "userListActionTypes/DELETE_PRODUCT_LIST_REQUEST";
export interface DeleteProductListRequestAction {
    type: typeof DELETE_PRODUCT_LIST_REQUEST;
}

export const DELETE_PRODUCT_LIST_SUCCESS = "userListActionTypes/DELETE_PRODUCT_LIST_SUCCESS";
export interface DeleteProductListSuccessAction {
    payload: ProductListModel;
    type: typeof DELETE_PRODUCT_LIST_SUCCESS;
}

export const DELETE_PRODUCT_LIST_FAILURE = "userListActionTypes/DELETE_PRODUCT_LIST_FAILURE";
export interface DeleteProductListFailureAction {
    type: typeof DELETE_PRODUCT_LIST_FAILURE;
    error: Error | string;
}

export type ProductListAction =
    | SetProductListAction
    | GetProductListAction
    | GetProductListRequestAction
    | GetProductListSuccessAction
    | GetProductListFailureAction
    | SetCategoryListAction
    | GetCategoryListAction
    | GetCategoryListRequestAction
    | GetCategoryListSuccessAction
    | GetCategoryListFailureAction
    | DeleteProductAction
    | DeleteProductListRequestAction
    | DeleteProductListSuccessAction
    | DeleteProductListFailureAction
    ;
