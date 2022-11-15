import * as actions from "../types/UserType";

import {UserModel} from "../../models/UserModel";
  export function getUserList(
): actions.GetUserListAction {
    return {
        type: actions.GET_USER_LIST,
    };
}

export function getUserListRequest(): actions.GetUserListRequestAction {
    return {
        type: actions.GET_USER_LIST_REQUEST
    };
}

export function getUserListSuccess(
    payload: UserModel
): actions.GetUserListSuccessAction {
    return {
        type: actions.GET_USER_LIST_SUCCESS,
        payload,
    };
}

export function getUserListFailure(
    error: Error | string
): actions.GetUserListFailureAction {
    return {
        type: actions.GET_USER_LIST_FAILURE,
        error
    };
}