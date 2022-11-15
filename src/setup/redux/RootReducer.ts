import {all, fork} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'

import ErrorReducer from "../../app/modules/product/redux/reducers/ErrorReducer";
import isLoadingReducer from "../../app/modules/product/redux/reducers/isLoadingReducer";


import datatableParametersReducer from "../../_metronic/partials/widgets/datatable/redux/MTDatatableParametersReducer";

import {productListReducer, categoryListReducer, productDeleteReducer} from '../../app/modules/product/redux/reducers/ProductListReducer';
import { productAddReducer, productEditReducer } from '../../app/modules/product/redux/reducers/ProductDetailReducer';
import { UserReducer } from '../../app/modules/users/redux/reducers/UserReducer';
import ProductDetailSaga from '../../app/modules/product/redux/sagas/ProductDetailSaga';
import ProductListSaga from "../../app/modules/product/redux/sagas/ProductListSaga";

import { cartAddReducer, cartListReducer } from '../../app/modules/cart/redux/reducers/CartListReducer';
import cartDetailReducer, { cartEditReducer } from '../../app/modules/cart/redux/reducers/CartDetailReducer';
import CartListSaga from "../../app/modules/cart/redux/sagas/CartListSaga";


import UserSaga from '../../app/modules/users/redux/sagas/UserSaga';



export const rootReducer = combineReducers({
  
  productList: productListReducer,
  productAdd: productAddReducer,
  productDelete: productDeleteReducer,
  productEdit: productEditReducer,
  users: UserReducer,
  category: categoryListReducer,
  cart: cartDetailReducer,
  cartAdd: cartAddReducer,
  cartList: cartListReducer,
  cartEdit: cartEditReducer,


  isLoading: isLoadingReducer,
  isError: ErrorReducer,
  datatableParameters: datatableParametersReducer,
  auth: auth.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([fork(UserSaga)])
  yield all([fork(ProductListSaga)])
  yield all([fork(ProductDetailSaga)])
  yield all([fork(CartListSaga)])
  yield all([fork(auth.saga)])
}
