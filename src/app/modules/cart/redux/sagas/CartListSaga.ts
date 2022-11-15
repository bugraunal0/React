import { put, call, takeEvery, all, fork } from "redux-saga/effects";

import {getCartList, updateCartList, deleteCartList, addToCartList} from "../../../../../setup/services/cartServices";
import commonSweetAlert2 from "../../../../../_metronic/partials/common/SweetAlert2";
import SweetAlert2Warning from "../../../../../_metronic/partials/common/SweetAlertSuccess";
import * as actionCreators from "../actions/CartListAction";
import * as actionTypes from "../types/CartListType";
//LIST
function* onLoadCartList({userId}:actionTypes.GetCartListAction) {
    try {
        yield put(actionCreators.getCartListRequest());
        const {data} = yield call(getCartList,userId);
        yield put(actionCreators.getCartListSuccess(data));
    } catch (error : any) {
        yield put(actionCreators.getCartListFailure(error.response.data.error));
    }
}

//ADD
function* onAddCartList({userId,date,products}:actionTypes.AddCartAction) {
    try {
        yield put(actionCreators.getCartListRequest());
        const {data} = yield call(addToCartList,userId,date,products);
        yield put(actionCreators.getCartListSuccess(data));
    } catch (error : any) {
        yield put(actionCreators.getCartListFailure(error.response.data.error));
    }
}

//UPDATE
/*function* onUpdateCartList({userId,date,products}:actionTypes.GetCartEditAction) {
    try {
        yield put(actionCreators.getCartListRequest());
        const {data} = yield call(updateCartList,userId,date,products);
        yield put(actionCreators.getCartListSuccess(data));
    } catch (error : any) {
        yield put(actionCreators.getCartListFailure(error.response.data.error));
    }
}*/

//DELETE
function* onDeleteCart({ id }: actionTypes.DeleteCartListAction) {
    try {
        if (!id){
            throw new Error();
        }
        yield put(actionCreators.deleteCartListRequest());
        const {data} = yield call(deleteCartList,id);

        let state = data.id;
        let message = data.date;
        yield SweetAlert2Warning(state, message);
        if (state){
            yield put(actionCreators.deleteCartListSuccess(id));
        }
        else {
            yield put(actionCreators.deleteCartListFailure(message));
        }

    } catch (error : any) {
        yield commonSweetAlert2(false, error.message, 3000);
        yield put(actionCreators.deleteCartListFailure(error));
    }
}

//DELETEFROMCART
function* onDeleteFromCart({ id }: actionTypes.DeleteFromCartAction) {
    try {
        if (!id){
            throw new Error();
        }
        yield put(actionCreators.deleteCartListRequest());
        const {data} = yield call(deleteCartList,id);

        let state = data.id;
        let message = data.date;
        yield SweetAlert2Warning(state, message);
        if (state){
            yield put(actionCreators.deleteCartListSuccess(id));
        }
        else {
            yield put(actionCreators.deleteCartListFailure(message));
        }

    } catch (error : any) {
        yield commonSweetAlert2(false, error.message, 3000);
        yield put(actionCreators.deleteCartListFailure(error));
    }
}

function* watchOnLoadCartList() {
    yield takeEvery(actionTypes.GET_CART_LIST, onLoadCartList);
}

function* watchOnAddCartList() {
    yield takeEvery(actionTypes.ADD_CART, onAddCartList);
}

/*function* watchOnUpdateCartList() {
    yield takeEvery(actionTypes.GET_CART_LIST, onUpdateCartList);
}*/

function* watchOnDeleteCart() {
    yield takeEvery(actionTypes.DELETE_CART_LIST, onDeleteCart);
}

function* watchOnDeleteFromCart() {
    yield takeEvery(actionTypes.DELETE_CART_LIST, onDeleteFromCart);
}

export default function* cartListSaga() {
    yield all([fork(watchOnLoadCartList)]);
    yield all([fork(watchOnAddCartList)]);
    //yield all([fork(watchOnUpdateCartList)]);
    yield all([fork(watchOnDeleteCart)]);
    yield all([fork(watchOnDeleteFromCart)])
}