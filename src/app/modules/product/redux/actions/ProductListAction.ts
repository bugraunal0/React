import * as actions from "../types/ProductListType";
import {CategoryListModel, ProductListModel} from "../../models/ProductListModel";

//CATEGORY
export function setCategoryDetails(
    payload: Array<CategoryListModel>
): actions.SetCategoryListAction {
    return {
        type: actions.SET_CATEGORY_LIST,
        payload: payload
    };
}

export function getCategoryList(//Category listi buradan çağırıyor
): actions.GetCategoryListAction {
    return {
        type: actions.GET_CATEGORY_LIST,
    };
}

export function getCategoryListRequest(): actions.GetCategoryListRequestAction {
    return {
        type: actions.GET_CATEGORY_LIST_REQUEST
    };
}

export function getCategoryListSuccess(
    payload: CategoryListModel
): actions.GetCategoryListSuccessAction {
    return {
        type: actions.GET_CATEGORY_LIST_SUCCESS,
        payload,
    };
}

export function getCategoryListFailure(
    error: Error | string
): actions.GetCategoryListFailureAction {
    return {
        type: actions.GET_CATEGORY_LIST_FAILURE,
        error
    };
}

//LIST
export function setProductDetails(
    payload: Array<ProductListModel>
): actions.SetProductListAction {
    return {
        type: actions.SET_PRODUCT_LIST,
        payload: payload
    };
}

export function getProductList(//product listi buradan çağırıyor
category: string,
limit: number
): actions.GetProductListAction {
    return {
        type: actions.GET_PRODUCT_LIST,
        category: category,
        limit: limit
    };
}

export function getProductListRequest(): actions.GetProductListRequestAction {
    return {
        type: actions.GET_PRODUCT_LIST_REQUEST
    };
}

export function getProductListSuccess(
    payload: ProductListModel
): actions.GetProductListSuccessAction {
    return {
        type: actions.GET_PRODUCT_LIST_SUCCESS,
        payload,
    };
}

export function getProductListFailure(
    error: Error | string
): actions.GetProductListFailureAction {
    return {
        type: actions.GET_PRODUCT_LIST_FAILURE,
        error
    };
}

// DELETE //
export function deleteProductList(
    productId: number
): actions.DeleteProductAction {
    return {
        type: actions.DELETE_PRODUCT_LIST,
        productId: productId,
    };
}

export function deleteProductListRequest(): actions.DeleteProductListRequestAction {
    return {
        type: actions.DELETE_PRODUCT_LIST_REQUEST
    };
}

export function deleteProductListSuccess(
    payload: ProductListModel,
): actions.DeleteProductListSuccessAction {
    return {
        type: actions.DELETE_PRODUCT_LIST_SUCCESS,
        payload:payload,
    };
}

export function deleteProductListFailure(
    error: Error | string
): actions.DeleteProductListFailureAction {
    return {
        type: actions.DELETE_PRODUCT_LIST_FAILURE,
        error
    };
}