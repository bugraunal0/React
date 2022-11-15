import * as actions from "../types/CartDetailType";

import {CartDetailModel, CartEditModel} from "../../models/CartDetailModel";
import { CartDetailWrapperModel } from "../../models/CartDetailWrapperModel";

export function setCartDetails(
    payload: CartDetailWrapperModel
): actions.SetCartDetailsAction {
    return {
        type: actions.SET_CART_DETAILS,
        payload: payload
    };
}

export function getCartDetails(
    id: number
): actions.GetCartDetailsAction {
    return {
        type: actions.GET_CART_DETAILS,
        id
    };
}

export function getCartRequest(): actions.GetCartDetailsRequestAction {
    return {
        type: actions.GET_CART_DETAILS_REQUEST
    };
}

export function getCartSuccess(
    payload: CartDetailWrapperModel
): actions.GetCartDetailsSuccessAction {
    return {
        type: actions.GET_CART_DETAILS_SUCCESS,
        payload,
    };
}

export function getCartFailure(
    error: Error | string
): actions.GetCartDetailsFailureAction {
    return {
        type: actions.GET_CART_DETAILS_FAILURE,
        error
    };
}


// EDIT //

export function setCartEdit(
    payload: CartEditModel
): actions.SetCartEditAction {
    return {
        type: actions.SET_CART_EDIT,
        payload: payload
    };
}

export function getCartEdit(
    id: number
): actions.GetCartEditAction {
    return {
        type: actions.GET_CART_EDIT,
        id
    };
}

export function getCartEditRequest(): actions.GetCartEditRequestAction {
    return {
        type: actions.GET_CART_EDIT_REQUEST
    };
}

export function getCartEditSuccess(
    payload: CartEditModel
): actions.GetCartEditSuccessAction {
    return {
        type: actions.GET_CART_EDIT_SUCCESS,
        payload,
    };
}

export function getCartEditFailure(
    error: Error | string
): actions.GetCartEditFailureAction {
    return {
        type: actions.GET_CART_EDIT_FAILURE,
        error
    };
}

// ADD //

export function addCart(
    payload: FormData
): actions.AddCartAction {
    return {
        type: actions.ADD_CART,
        payload: payload
    };
}

export function addCartRequest(): actions.AddCartRequestAction {
    return {
        type: actions.ADD_CART_REQUEST
    };
}

export function addCartSuccess(
    payload: CartDetailModel
): actions.AddCartSuccessAction {
    return {
        type: actions.ADD_CART_SUCCESS,
        payload: payload
    };
}

export function addCartFailure(
    error: Error | string
): actions.AddCartFailureAction {
    return {
        type: actions.ADD_CART_FAILURE,
        error
    };
}

// EDIT OVERVIEW //
/*
export function setCartOverviewEdit(
    payload: CartOverviewEditModel
): actions.SetCartOverviewEditAction {
    return {
        type: actions.SET_CART_OVERVIEW_EDIT,
        payload: payload
    };
}

export function getCartOverviewEdit(
    id: number,
    cartId: number
): actions.GetCartOverviewEditAction {
    return {
        type: actions.GET_CART_OVERVIEW_EDIT,
        id,
        cartId
    };
}

export function getCartOverviewEditRequest(): actions.GetCartOverviewEditRequestAction {
    return {
        type: actions.GET_CART_OVERVIEW_EDIT_REQUEST
    };
}

export function getCartOverviewEditSuccess(
    payload: CartOverviewEditModel
): actions.GetCartOverviewEditSuccessAction {
    return {
        type: actions.GET_CART_OVERVIEW_EDIT_SUCCESS,
        payload,
    };
}

export function getCartOverviewEditFailure(
    error: Error | string
): actions.GetCartOverviewEditFailureAction {
    return {
        type: actions.GET_CART_OVERVIEW_EDIT_FAILURE,
        error
    };
}


// ADD OVERVIEW //

export function addCartOverview(
    payload: CartOverviewEditModel
): actions.AddCartOverviewAction {
    return {
        type: actions.ADD_CART_OVERVIEW,
        payload: payload
    };
}

export function addCartOverviewRequest(): actions.AddCartOverviewRequestAction {
    return {
        type: actions.ADD_CART_OVERVIEW_REQUEST
    };
}

export function addCartOverviewSuccess(
    payload: CartOverviewEditModel
): actions.AddCartOverviewSuccessAction {
    return {
        type: actions.ADD_CART_OVERVIEW_SUCCESS,
        payload: payload
    };
}

export function addCartOverviewFailure(
    error: Error | string
): actions.AddCartOverviewFailureAction {
    return {
        type: actions.ADD_CART_OVERVIEW_FAILURE,
        error
    };
}
*/