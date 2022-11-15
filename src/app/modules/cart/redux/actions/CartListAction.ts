import * as actions from "../types/CartListType";
import {CartListModel, CartProductsModel} from "../../models/CartListModel";

export function setCartDetails(
    payload: Array<CartListModel>
): actions.SetCartListAction {
    return {
        type: actions.SET_CART_LIST,
        payload: payload
    };
}

export function getCartList(
    userId: number,
): actions.GetCartListAction {
    return {
        type: actions.GET_CART_LIST,
        userId: userId,
    };
}

export function getCartListRequest(): actions.GetCartListRequestAction {
    return {
        type: actions.GET_CART_LIST_REQUEST
    };
}

export function getCartListSuccess(
    payload: CartListModel
): actions.GetCartListSuccessAction {
    return {
        type: actions.GET_CART_LIST_SUCCESS,
        payload,
    };
}

export function getCartListFailure(
    error: Error | string
): actions.GetCartListFailureAction {
    return {
        type: actions.GET_CART_LIST_FAILURE,
        error
    };
}

// ADD //
export function addToCart(
    userId: number,
    date: any,
    products: any
): actions.AddCartAction {
    return {
        type: actions.ADD_CART,
        userId: userId,
        date: date,
        products: products
    };
}

export function addCartRequest(): actions.AddCartRequestAction {
    return {
        type: actions.ADD_CART_REQUEST
    };
}

export function addCartSuccess(
    payload: CartListModel
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

// UPDATE
export function setCartEdit(
    payload: CartListModel
): actions.SetCartEditAction {
    return {
        type: actions.SET_CART_EDIT,
        payload: payload
    };
}

export function getCartEdit(
    userId: number,
    date: Date,
    products: Array<CartProductsModel>
): actions.GetCartEditAction {
    return {
        type: actions.GET_CART_EDIT,
        userId: userId,
        date: date,
        products: products
    };
}

export function getCartEditRequest(): actions.GetCartEditRequestAction {
    return {
        type: actions.GET_CART_EDIT_REQUEST
    };
}

export function getCartEditSuccess(
    payload: CartListModel
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


// DELETE //
export function deleteCartList(
    id: number
): actions.DeleteCartListAction {
    return {
        type: actions.DELETE_CART_LIST,
        id
    };
}

export function deleteCartListRequest(): actions.DeleteCartListRequestAction {
    return {
        type: actions.DELETE_CART_LIST_REQUEST
    };
}

export function deleteCartListSuccess(
    id: number
): actions.DeleteCartListSuccessAction {
    return {
        type: actions.DELETE_CART_LIST_SUCCESS,
        id,
    };
}

export function deleteCartListFailure(
    error: Error | string
): actions.DeleteCartListFailureAction {
    return {
        type: actions.DELETE_CART_LIST_FAILURE,
        error
    };
}

//DELETEFROMCART
export function deleteFromCart(
    id: number
): actions.DeleteFromCartAction {
    return {
        type: actions.DELETE_FROM_CART,
        id
    };
}

export function deleteFromCartRequest(): actions.DeleteFromCartRequestAction {
    return {
        type: actions.DELETE_FROM_CART_REQUEST
    };
}

export function deleteFromCartSuccess(
    id: number
): actions.DeleteFromCartSuccessAction {
    return {
        type: actions.DELETE_FROM_CART_SUCCESS,
        id,
    };
}

export function deleteFromCartFailure(
    error: Error | string
): actions.DeleteFromCartFailureAction {
    return {
        type: actions.DELETE_FROM_CART_FAILURE,
        error
    };
}