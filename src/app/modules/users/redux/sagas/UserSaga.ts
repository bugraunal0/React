import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { fetchAllUsers } from "../../../../../setup/services/userService";
import * as actionCreators from "../actions/UserAction";
import * as actionTypes from "../types/UserType";
function* onLoadUserList() {
    try {
        yield put(actionCreators.getUserListRequest());
        const {data} = yield call(fetchAllUsers);
        yield put(actionCreators.getUserListSuccess(data));
    } catch (error : any) {
        
        yield put(actionCreators.getUserListFailure(error.response.data.error));
    }
}

function* watchOnLoadUserList() {
    yield takeEvery(actionTypes.GET_USER_LIST, onLoadUserList);
}

export default function* userListSaga() {
    yield all([fork(watchOnLoadUserList)]);
}