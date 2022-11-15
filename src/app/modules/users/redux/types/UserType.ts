import {UserModel} from "../../models/UserModel";

export const GET_USER_LIST = "userListActionTypes/GET_USER_LIST";
export interface GetUserListAction {
    type: typeof GET_USER_LIST;
}

export const GET_USER_LIST_REQUEST = "userListActionTypes/GET_USER_LIST_REQUEST";
export interface GetUserListRequestAction {
    type: typeof GET_USER_LIST_REQUEST;
}

export const GET_USER_LIST_SUCCESS = "userListActionTypes/GET_USER_LIST_SUCCESS";
export interface GetUserListSuccessAction {
    type: typeof GET_USER_LIST_SUCCESS;
    payload: UserModel
}

export const GET_USER_LIST_FAILURE = "userListActionTypes/GET_USER_LIST_FAILURE";
export interface GetUserListFailureAction {
    type: typeof GET_USER_LIST_FAILURE;
    error: Error | string;
}

export type UserListAction =
    | GetUserListAction
    | GetUserListRequestAction
    | GetUserListSuccessAction
    | GetUserListFailureAction
    ;
