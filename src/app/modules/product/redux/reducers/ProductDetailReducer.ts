import * as actions from "../types/ProductDetailType";
import {ProductEditModel} from "../../models/ProductDetailModel";
import { ProductAddModel } from "../../models/ProductListModel";

const initialStateForEdit: ProductEditModel = {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: ""
}
   

export function productAddReducer(
    state: ProductAddModel = initialStateForEdit,
    action: actions.ProductDetailAction
): ProductAddModel {
    switch (action.type) {
        case actions.SET_PRODUCT_EDIT:
        case actions.GET_PRODUCT_EDIT_SUCCESS:
            return action.payload;
        case actions.ADD_PRODUCT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function productEditReducer(
    state: ProductEditModel = initialStateForEdit,
    action: actions.ProductDetailAction
): ProductEditModel {
    switch (action.type) {
        case actions.SET_PRODUCT_EDIT:
        case actions.GET_PRODUCT_EDIT_SUCCESS:
            return action.payload;
        case actions.ADD_PRODUCT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
