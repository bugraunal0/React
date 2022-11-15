import * as actions from "../types/CartDetailType";
import {CartEditModel} from "../../models/CartDetailModel";
import { CartDashboardModel, CartDetailWrapperModel, CartDynamicModel} from "../../models/CartDetailWrapperModel";

const initialState: CartDetailWrapperModel = {
    cart: 
    {id: 0, name: "", age: 0},
    cartDynamicList: Array<CartDynamicModel>(),
    cartDashboardList: Array<CartDashboardModel>()
};
const initialStateForEdit: CartEditModel = {
    id: 0, name: "", age: 0}
   
export default function cartDetailReducer(
    state: CartDetailWrapperModel = initialState,
    action: actions.CartAction
): CartDetailWrapperModel {
    switch (action.type) {
        case actions.SET_CART_DETAILS:
        case actions.GET_CART_DETAILS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function cartEditReducer(
    state: CartEditModel = initialStateForEdit,
    action: actions.CartAction
): CartEditModel {
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
