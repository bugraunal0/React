import * as actions from "../types/ProductDetailType";
import { ProductListModel } from "../../models/ProductListModel";

// ADD //
export function addProduct(
    title: string,
    price: number,
    description: string,
    image: string,
    category: string
): actions.AddProductAction {
    return {
        type: actions.ADD_PRODUCT,
        title: title,
        price: price,
        description: description,
        image: image,
        category: category
    };
}

export function addProductRequest(): actions.AddProductRequestAction {
    return {
        type: actions.ADD_PRODUCT_REQUEST
    };
}

export function addProductSuccess(
    payload: ProductListModel
): actions.AddProductSuccessAction {
    return {
        type: actions.ADD_PRODUCT_SUCCESS,
        payload: payload
    };
}

export function addProductFailure(
    error: Error | string
): actions.AddProductFailureAction {
    return {
        type: actions.ADD_PRODUCT_FAILURE,
        error
    };
}

// EDIT //
export function setProductEdit(
    payload: ProductListModel
): actions.SetProductEditAction {
    return {
        type: actions.SET_PRODUCT_EDIT,
        payload: payload
    };
}

export function editProduct(
    id: number,
    title: string,
    price: number,
    description: string,
    image: string,
    category: string
): actions.GetProductEditAction {
    return {
        type: actions.GET_PRODUCT_EDIT,
        id: id,
        title: title,
        price: price,
        description: description,
        image: image,
        category: category
    };
}

export function getProductEditRequest(): actions.GetProductEditRequestAction {
    return {
        type: actions.GET_PRODUCT_EDIT_REQUEST
    };
}

export function getProductEditSuccess(
    payload: ProductListModel
): actions.GetProductEditSuccessAction {
    return {
        type: actions.GET_PRODUCT_EDIT_SUCCESS,
        payload,
    };
}

export function getProductEditFailure(
    error: Error | string
): actions.GetProductEditFailureAction {
    return {
        type: actions.GET_PRODUCT_EDIT_FAILURE,
        error
    };
}
