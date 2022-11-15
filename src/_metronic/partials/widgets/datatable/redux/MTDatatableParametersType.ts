import {DTOrder, DTParameters} from "../MTDatatableModel";

export const SET_ORDER = "MTDatatableActionTypes/SET_ORDER";
export interface SetOrderAction {
    type: typeof SET_ORDER;
    sortOrder: string;
    order: Array<DTOrder>;
}

export const SET_PAGE_SIZE = "MTDatatableActionTypes/SET_PAGE_SIZE";
export interface SetPageSizeAction {
    type: typeof SET_PAGE_SIZE;
    pageSize: number
    currentPage: number
}

export const SET_PAGE = "MTDatatableActionTypes/SET_PAGE";
export interface SetPageAction {
    type: typeof SET_PAGE;
    currentPage: number
}

export const FILL_PARAMS = "MTDatatableActionTypes/FILL_PARAMS";
export interface FillParamsAction {
    type: typeof FILL_PARAMS;
    payload: DTParameters

}

export type MTDatatableAction =
    | SetOrderAction
    | SetPageSizeAction
    | SetPageAction
    | FillParamsAction;
