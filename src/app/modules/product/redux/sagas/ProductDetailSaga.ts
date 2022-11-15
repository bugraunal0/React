import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { fetchAddProduct, fetchEditProduct } from "../../../../../setup/services/productServices";
import * as actionCreators from "../actions/ProductDetailAction";
import * as actionTypes from "../types/ProductDetailType";

//ADD
function* onAddProduct({ title,price,description,image,category }: actionTypes.AddProductAction) {
    try {
        yield put(actionCreators.addProductRequest());
        const {data} = yield call(fetchAddProduct,title,price,description,image,category);
        let state = data.id;
        let message = data.title;
        //yield commonSweetAlert2(state,data.id+" numaralı id ile ürün oluşturuldu.", 10000);
        if (state){
            yield put(actionCreators.addProductSuccess(data));
        }
        else {
            yield put(actionCreators.addProductFailure(message));
        }
        
    } catch (error : any) {
        yield put(actionCreators.addProductFailure(error.response.data.error));
    }
}
//EDIT
function* onEditProduct({ id,title,price,description,image,category }: actionTypes.GetProductEditAction) {
    try {
        yield put(actionCreators.getProductEditRequest());
        const {data} = yield call(fetchEditProduct,id,title,price,description,image,category);
        yield put(actionCreators.getProductEditSuccess(data));
    } catch (error : any) {
        yield put(actionCreators.getProductEditFailure(error.response.data.error));
    }
}
function* watchOnAddProduct() {
    yield takeEvery(actionTypes.ADD_PRODUCT, onAddProduct);
}

function* watchOnEditProduct() {
    yield takeEvery(actionTypes.GET_PRODUCT_EDIT, onEditProduct);
}
export default function* productSaga() {
    yield all([fork(watchOnAddProduct)]);
    yield all([fork(watchOnEditProduct)]);
}
