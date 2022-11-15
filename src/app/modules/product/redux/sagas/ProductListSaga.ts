
import { put, call, takeEvery, all, fork } from "redux-saga/effects";

import {fetchCategoryList, fetchDeleteProduct, fetchLimitProductList, fetchProductList, fetchSearchByCategory} from "../../../../../setup/services/productServices";
import commonSweetAlert2 from "../../../../../_metronic/partials/common/SweetAlert2";
import * as actionCreators from "../actions/ProductListAction";
import * as actionTypes from "../types/ProductListType";


//GET CATEGORIES
function* onLoadCategoryList() {
    try {
        yield put(actionCreators.getCategoryListRequest());
        const {data} = yield call(fetchCategoryList);
        yield put(actionCreators.getCategoryListSuccess(data));
    } catch (error : any) {
        yield put(actionCreators.getCategoryListFailure(error.response.data.error));
        
    }
}
//LIST
function* onLoadProductList({ category,limit }: actionTypes.GetProductListAction) {
    try {
        yield put(actionCreators.getProductListRequest());
        if(category!==''){
            const {data} = yield call(fetchSearchByCategory,category);
            yield put(actionCreators.getProductListSuccess(data));
        }
        if(limit!==0){
            const {data} = yield call(fetchLimitProductList,limit);
            yield put(actionCreators.getProductListSuccess(data));
        }
        
        if(limit===0 && category===''){
            const {data} = yield call(fetchProductList);
            yield put(actionCreators.getProductListSuccess(data));
        }
        
    } catch (error : any) {
        yield put(actionCreators.getProductListFailure(error.response.data.error));
    }
}

//DELETE
function* onDeleteProduct({ productId }: actionTypes.DeleteProductAction) {
    try {
        if (!productId){
            throw new Error();
        }
        yield put(actionCreators.deleteProductListRequest());
        const {data} = yield call(fetchDeleteProduct,productId);
        
        var state = data.id;
        var message = data.title;
        //yield SweetAlert2Warning(message,"Deleted");
        if (state){
            yield put(actionCreators.deleteProductListSuccess(data));
        }
        else {
            yield put(actionCreators.deleteProductListFailure(message));
        }

    } catch (error : any) {
        yield commonSweetAlert2(false, error.message, 10000);
        yield put(actionCreators.deleteProductListFailure(error));
    }
}

function* watchOnLoadCategoryList() {
    yield takeEvery(actionTypes.GET_PRODUCT_LIST, onLoadCategoryList);
}

function* watchOnLoadProductList() {
    yield takeEvery(actionTypes.GET_PRODUCT_LIST, onLoadProductList);
}



function* watchOnDeleteProduct() {
    yield takeEvery(actionTypes.DELETE_PRODUCT_LIST, onDeleteProduct);
}

export default function* productListSaga() {
    yield all([fork(watchOnLoadCategoryList)]);
    yield all([fork(watchOnLoadProductList)]);
    yield all([fork(watchOnDeleteProduct)]);
}