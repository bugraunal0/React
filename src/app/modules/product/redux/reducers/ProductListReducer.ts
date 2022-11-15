import * as actions from "../types/ProductListType";
import {CategoryListModel, ProductListModel} from "../../models/ProductListModel";

const initialState: ProductListModel = {
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {rate:0,count:0}
};
const initialState4Category: CategoryListModel = {
    categoryArray: []
};
export function categoryListReducer(
    state: CategoryListModel = initialState4Category,
    action: actions.ProductListAction
): CategoryListModel {
    switch (action.type) {
        case actions.GET_CATEGORY_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function productListReducer(
    state: ProductListModel = initialState,
    action: actions.ProductListAction
): ProductListModel {
    switch (action.type) {
        case actions.GET_PRODUCT_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
export function productDeleteReducer(
    state: ProductListModel = initialState,
    action: actions.ProductListAction
): ProductListModel {
    switch (action.type) {
        case actions.DELETE_PRODUCT_LIST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
