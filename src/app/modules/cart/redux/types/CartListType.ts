import {CartListModel, CartProductsModel} from "../../models/CartListModel";
export const SET_CART_LIST = "cartActionTypes/SET_CART_LIST";
//LIST
export interface SetCartListAction {
    type: typeof SET_CART_LIST;
    payload: Array<CartListModel>
}

export const GET_CART_LIST = "cartActionTypes/GET_CART_LIST";
export interface GetCartListAction {
    type: typeof GET_CART_LIST;
    userId: number;
}

export const GET_CART_LIST_REQUEST = "cartActionTypes/GET_CART_LIST_REQUEST";
export interface GetCartListRequestAction {
    type: typeof GET_CART_LIST_REQUEST;
}

export const GET_CART_LIST_SUCCESS = "cartActionTypes/GET_CART_LIST_SUCCESS";
export interface GetCartListSuccessAction {
    type: typeof GET_CART_LIST_SUCCESS;
    payload: CartListModel
}

export const GET_CART_LIST_FAILURE = "cartActionTypes/GET_CART_LIST_FAILURE";
export interface GetCartListFailureAction {
    type: typeof GET_CART_LIST_FAILURE;
    error: Error | string;
}

// ADD //
export const ADD_CART = "cartActionTypes/ADD_CART";
export interface AddCartAction {
    type: typeof ADD_CART;
    userId: number;
    date: any;
    products: any 
}

export const ADD_CART_REQUEST = "cartActionTypes/ADD_CART_REQUEST";
export interface AddCartRequestAction {
    type: typeof ADD_CART_REQUEST;
}

export const ADD_CART_SUCCESS = "cartActionTypes/ADD_CART_SUCCESS";
export interface AddCartSuccessAction {
    type: typeof ADD_CART_SUCCESS;
    payload: CartListModel;
}

export const ADD_CART_FAILURE = "cartActionTypes/ADD_CART_FAILURE";
export interface AddCartFailureAction {
    type: typeof ADD_CART_FAILURE;
    error: Error | string;
}

// EDIT //
export const SET_CART_EDIT = "cartActionTypes/SET_CART_EDIT";
export interface SetCartEditAction {
    type: typeof SET_CART_EDIT;
    payload: CartListModel
}

export const GET_CART_EDIT = "cartActionTypes/GET_CART_EDIT";
export interface GetCartEditAction {
    type: typeof GET_CART_EDIT;
    userId: number,
    date: Date,
    products: Array<CartProductsModel>
}

export const GET_CART_EDIT_REQUEST = "cartActionTypes/GET_CART_EDIT_REQUEST";
export interface GetCartEditRequestAction {
    type: typeof GET_CART_EDIT_REQUEST;
}

export const GET_CART_EDIT_SUCCESS = "cartActionTypes/GET_CART_EDIT_SUCCESS";
export interface GetCartEditSuccessAction {
    type: typeof GET_CART_EDIT_SUCCESS;
    payload: CartListModel
}

export const GET_CART_EDIT_FAILURE = "cartActionTypes/GET_CART_EDIT_FAILURE";
export interface GetCartEditFailureAction {
    type: typeof GET_CART_EDIT_FAILURE;
    error: Error | string;
}

//DETAIL
export const SET_CART_DETAILS = "cartActionTypes/SET_CART_DETAILS";
export interface SetCartDetailsAction {
    type: typeof SET_CART_DETAILS;
    payload: CartListModel
}

export const GET_CART_DETAILS = "cartActionTypes/GET_CART_DETAILS";
export interface GetCartDetailsAction {
    type: typeof GET_CART_DETAILS;
    id: number;
    
}

export const GET_CART_DETAILS_REQUEST = "cartActionTypes/GET_CART_DETAILS_REQUEST";
export interface GetCartDetailsRequestAction {
    type: typeof GET_CART_DETAILS_REQUEST;
}

export const GET_CART_DETAILS_SUCCESS = "cartActionTypes/GET_CART_DETAILS_SUCCESS";
export interface GetCartDetailsSuccessAction {
    type: typeof GET_CART_DETAILS_SUCCESS;
    payload: CartListModel
}

export const GET_CART_DETAILS_FAILURE = "cartActionTypes/GET_CART_DETAILS_FAILURE";
export interface GetCartDetailsFailureAction {
    type: typeof GET_CART_DETAILS_FAILURE;
    error: Error | string;
}

// DELETE //
export const DELETE_CART_LIST = "cartActionTypes/DELETE_CART_LIST";
export interface DeleteCartListAction {
    type: typeof DELETE_CART_LIST;
    id: number;
}

export const DELETE_CART_LIST_REQUEST = "cartActionTypes/DELETE_CART_LIST_REQUEST";
export interface DeleteCartListRequestAction {
    type: typeof DELETE_CART_LIST_REQUEST;
}

export const DELETE_CART_LIST_SUCCESS = "cartActionTypes/DELETE_CART_LIST_SUCCESS";
export interface DeleteCartListSuccessAction {
    type: typeof DELETE_CART_LIST_SUCCESS;
    id: number;
}

export const DELETE_CART_LIST_FAILURE = "cartActionTypes/DELETE_CART_LIST_FAILURE";
export interface DeleteCartListFailureAction {
    type: typeof DELETE_CART_LIST_FAILURE;
    error: Error | string;
}

//DELETEFROMCART
export const DELETE_FROM_CART = "cartActionTypes/DELETE_FROM_CART";
export interface DeleteFromCartAction {
    type: typeof DELETE_FROM_CART;
    id: number;
}

export const DELETE_FROM_CART_REQUEST = "cartActionTypes/DELETE_FROM_CART_REQUEST";
export interface DeleteFromCartRequestAction {
    type: typeof DELETE_FROM_CART_REQUEST;
}

export const DELETE_FROM_CART_SUCCESS = "cartActionTypes/DELETE_FROM_CART_SUCCESS";
export interface DeleteFromCartSuccessAction {
    type: typeof DELETE_FROM_CART_SUCCESS;
    id: number;
}

export const DELETE_FROM_CART_FAILURE = "cartActionTypes/DELETE_FROM_CART_FAILURE";
export interface DeleteFromCartFailureAction {
    type: typeof DELETE_FROM_CART_FAILURE;
    error: Error | string;
}
export type CartListAction =
    | SetCartListAction
    | GetCartListAction
    | GetCartListRequestAction
    | GetCartListSuccessAction
    | GetCartListFailureAction
    | SetCartEditAction
    | GetCartEditAction
    | GetCartEditRequestAction
    | GetCartEditSuccessAction
    | GetCartEditFailureAction
    | AddCartAction
    | AddCartRequestAction
    | AddCartSuccessAction
    | AddCartFailureAction
    | DeleteCartListAction
    | DeleteCartListRequestAction
    | DeleteCartListSuccessAction
    | DeleteCartListFailureAction
    | SetCartDetailsAction
    | GetCartDetailsAction
    | GetCartDetailsRequestAction
    | GetCartDetailsSuccessAction
    | GetCartDetailsFailureAction
    | DeleteFromCartAction
    | DeleteFromCartRequestAction
    | DeleteFromCartSuccessAction
    | DeleteFromCartFailureAction
    ;
