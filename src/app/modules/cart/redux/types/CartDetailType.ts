import {CartEditModel} from "../../models/CartDetailModel";
import { CartDetailWrapperModel } from "../../models/CartDetailWrapperModel";

export const SET_CART_DETAILS = "cartActionTypes/SET_CART_DETAILS";
export interface SetCartDetailsAction {
    type: typeof SET_CART_DETAILS;
    payload: CartDetailWrapperModel
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
    payload: CartDetailWrapperModel
}

export const GET_CART_DETAILS_FAILURE = "cartActionTypes/GET_CART_DETAILS_FAILURE";
export interface GetCartDetailsFailureAction {
    type: typeof GET_CART_DETAILS_FAILURE;
    error: Error | string;
}

// EDIT //

export const SET_CART_EDIT = "cartActionTypes/SET_CART_EDIT";
export interface SetCartEditAction {
    type: typeof SET_CART_EDIT;
    payload: CartEditModel
}

export const GET_CART_EDIT = "cartActionTypes/GET_CART_EDIT";
export interface GetCartEditAction {
    type: typeof GET_CART_EDIT;
    id: number;
}

export const GET_CART_EDIT_REQUEST = "cartActionTypes/GET_CART_EDIT_REQUEST";
export interface GetCartEditRequestAction {
    type: typeof GET_CART_EDIT_REQUEST;
}

export const GET_CART_EDIT_SUCCESS = "cartActionTypes/GET_CART_EDIT_SUCCESS";
export interface GetCartEditSuccessAction {
    type: typeof GET_CART_EDIT_SUCCESS;
    payload: CartEditModel
}

export const GET_CART_EDIT_FAILURE = "cartActionTypes/GET_CART_EDIT_FAILURE";
export interface GetCartEditFailureAction {
    type: typeof GET_CART_EDIT_FAILURE;
    error: Error | string;
}

// ADD //

export const ADD_CART = "cartActionTypes/ADD_CART";
export interface AddCartAction {
    type: typeof ADD_CART;
    payload: FormData;
}

export const ADD_CART_REQUEST = "cartActionTypes/ADD_CART_REQUEST";
export interface AddCartRequestAction {
    type: typeof ADD_CART_REQUEST;
}

export const ADD_CART_SUCCESS = "cartActionTypes/ADD_CART_SUCCESS";
export interface AddCartSuccessAction {
    type: typeof ADD_CART_SUCCESS;
    payload: CartEditModel;
}

export const ADD_CART_FAILURE = "cartActionTypes/ADD_CART_FAILURE";
export interface AddCartFailureAction {
    type: typeof ADD_CART_FAILURE;
    error: Error | string;
}

// EDIT OVERVIEW //
/*
export const SET_CART_OVERVIEW_EDIT = "cartActionTypes/SET_CART_OVERVIEW_EDIT";
export interface SetCartOverviewEditAction {
    type: typeof SET_CART_OVERVIEW_EDIT;
    payload: CartOverviewEditModel
}

export const GET_CART_OVERVIEW_EDIT = "cartActionTypes/GET_CART_OVERVIEW_EDIT";
export interface GetCartOverviewEditAction {
    type: typeof GET_CART_OVERVIEW_EDIT;
    id: number;
    cartId: number;
}

export const GET_CART_OVERVIEW_EDIT_REQUEST = "cartActionTypes/GET_CART_OVERVIEW_EDIT_REQUEST";
export interface GetCartOverviewEditRequestAction {
    type: typeof GET_CART_OVERVIEW_EDIT_REQUEST;
}

export const GET_CART_OVERVIEW_EDIT_SUCCESS = "cartActionTypes/GET_CART_OVERVIEW_EDIT_SUCCESS";
export interface GetCartOverviewEditSuccessAction {
    type: typeof GET_CART_OVERVIEW_EDIT_SUCCESS;
    payload: CartOverviewEditModel
}

export const GET_CART_OVERVIEW_EDIT_FAILURE = "cartActionTypes/GET_CART_OVERVIEW_EDIT_FAILURE";
export interface GetCartOverviewEditFailureAction {
    type: typeof GET_CART_OVERVIEW_EDIT_FAILURE;
    error: Error | string;
}

// ADD OVERVIEW //
export const ADD_CART_OVERVIEW = "cartActionTypes/ADD_CART_OVERVIEW";
export interface AddCartOverviewAction {
    type: typeof ADD_CART_OVERVIEW;
    payload: CartOverviewEditModel;
}

export const ADD_CART_OVERVIEW_REQUEST = "cartActionTypes/ADD_CART_OVERVIEW_REQUEST";
export interface AddCartOverviewRequestAction {
    type: typeof ADD_CART_OVERVIEW_REQUEST;
}

export const ADD_CART_OVERVIEW_SUCCESS = "cartActionTypes/ADD_CART_OVERVIEW_SUCCESS";
export interface AddCartOverviewSuccessAction {
    type: typeof ADD_CART_OVERVIEW_SUCCESS;
    payload: CartOverviewEditModel;
}

export const ADD_CART_OVERVIEW_FAILURE = "cartActionTypes/ADD_CART_OVERVIEW_FAILURE";
export interface AddCartOverviewFailureAction {
    type: typeof ADD_CART_OVERVIEW_FAILURE;
    error: Error | string;
}*/

// DELETE CART DYNAMIC //

export const DELETE_CART_DYNAMIC = "cartActionTypes/DELETE_CART_DYNAMIC";
export interface DeleteCartDynamicAction {
    type: typeof DELETE_CART_DYNAMIC;
    id: number;
}

export const DELETE_CART_DYNAMIC_REQUEST = "cartActionTypes/DELETE_CART_DYNAMIC_REQUEST";
export interface DeleteCartDynamicRequestAction {
    type: typeof DELETE_CART_DYNAMIC_REQUEST;
}

export const DELETE_CART_DYNAMIC_SUCCESS = "cartActionTypes/DELETE_CART_DYNAMIC_SUCCESS";
export interface DeleteCartDynamicSuccessAction {
    type: typeof DELETE_CART_DYNAMIC_SUCCESS;
    id: number;
}

export const DELETE_CART_DYNAMIC_FAILURE = "cartActionTypes/DELETE_CART_DYNAMIC_FAILURE";
export interface DeleteCartDynamicFailureAction {
    type: typeof DELETE_CART_DYNAMIC_FAILURE;
    error: Error | string;
}

export type CartAction =
    | SetCartDetailsAction
    | GetCartDetailsAction
    | GetCartDetailsRequestAction
    | GetCartDetailsSuccessAction
    | GetCartDetailsFailureAction
    | SetCartEditAction
    | GetCartEditAction
    | GetCartEditRequestAction
    | GetCartEditSuccessAction
    | GetCartEditFailureAction
    | AddCartAction
    | AddCartRequestAction
    | AddCartSuccessAction
    | AddCartFailureAction
    /*| SetCartOverviewEditAction
    | GetCartOverviewEditAction
    | GetCartOverviewEditRequestAction
    | GetCartOverviewEditSuccessAction
    | GetCartOverviewEditFailureAction
    | AddCartOverviewAction
    | AddCartOverviewRequestAction
    | AddCartOverviewSuccessAction
    | AddCartOverviewFailureAction*/
    | DeleteCartDynamicAction
    | DeleteCartDynamicRequestAction
    | DeleteCartDynamicSuccessAction
    | DeleteCartDynamicFailureAction
    ;
