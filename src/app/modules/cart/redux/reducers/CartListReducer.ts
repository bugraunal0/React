import * as actions from "../types/CartListType";
import {CartListModel} from "../../models/CartListModel";

const initialState: CartListModel = {
    id: 0,
    userId: 0,
    date: "",
    products: []
};

export function cartListReducer(
    state: CartListModel = initialState,
    action: actions.CartListAction
): CartListModel {
    switch (action.type) {
        case actions.GET_CART_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function cartAddReducer(
    state: CartListModel = initialState,
    action: actions.CartListAction
): CartListModel {
    switch (action.type) {
        case actions.ADD_CART_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function cartEditReducer(
    state: CartListModel = initialState,
    action: actions.CartListAction
): CartListModel {
    switch (action.type) {
        case actions.SET_CART_EDIT:
        case actions.GET_CART_EDIT_SUCCESS:
            return action.payload;
        case actions.ADD_CART_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function cartDetailReducer(
    state: CartListModel = initialState,
    action: actions.CartListAction
): CartListModel {
    switch (action.type) {
        case actions.SET_CART_DETAILS:
        case actions.GET_CART_DETAILS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}