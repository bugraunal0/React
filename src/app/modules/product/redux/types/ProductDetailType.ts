import { ProductListModel } from "../../models/ProductListModel";

// ADD //
export const ADD_PRODUCT = "productActionTypes/ADD_PRODUCT";
export interface AddProductAction {
    type: typeof ADD_PRODUCT;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string
}

export const ADD_PRODUCT_REQUEST = "productActionTypes/ADD_PRODUCT_REQUEST";
export interface AddProductRequestAction {
    type: typeof ADD_PRODUCT_REQUEST;
}

export const ADD_PRODUCT_SUCCESS = "productActionTypes/ADD_PRODUCT_SUCCESS";
export interface AddProductSuccessAction {
    type: typeof ADD_PRODUCT_SUCCESS;
    payload: ProductListModel;
}

export const ADD_PRODUCT_FAILURE = "productActionTypes/ADD_PRODUCT_FAILURE";
export interface AddProductFailureAction {
    type: typeof ADD_PRODUCT_FAILURE;
    error: Error | string;
}

// EDIT //
export const SET_PRODUCT_EDIT = "productActionTypes/SET_PRODUCT_EDIT";
export interface SetProductEditAction {
    type: typeof SET_PRODUCT_EDIT;
    payload: ProductListModel
}

export const GET_PRODUCT_EDIT = "productActionTypes/GET_PRODUCT_EDIT";
export interface GetProductEditAction {
    type: typeof GET_PRODUCT_EDIT;
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string
}

export const GET_PRODUCT_EDIT_REQUEST = "productActionTypes/GET_PRODUCT_EDIT_REQUEST";
export interface GetProductEditRequestAction {
    type: typeof GET_PRODUCT_EDIT_REQUEST;
}

export const GET_PRODUCT_EDIT_SUCCESS = "productActionTypes/GET_PRODUCT_EDIT_SUCCESS";
export interface GetProductEditSuccessAction {
    type: typeof GET_PRODUCT_EDIT_SUCCESS;
    payload: ProductListModel
}

export const GET_PRODUCT_EDIT_FAILURE = "productActionTypes/GET_PRODUCT_EDIT_FAILURE";
export interface GetProductEditFailureAction {
    type: typeof GET_PRODUCT_EDIT_FAILURE;
    error: Error | string;
}


export type ProductDetailAction =
    | SetProductEditAction
    | GetProductEditAction
    | GetProductEditRequestAction
    | GetProductEditSuccessAction
    | GetProductEditFailureAction
    | AddProductAction
    | AddProductRequestAction
    | AddProductSuccessAction
    | AddProductFailureAction
    ;

