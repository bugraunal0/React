import * as actions from "./MTDatatableParametersType";
import {DTParameters} from "../MTDatatableModel";
import {AnyAction} from "redux";

const initialState: DTParameters = {
    Columns: [],
    Order: [],
    CurrentPage: 1,
    PageSize: 15,
    SortOrder: "",
};

export default function MTDatatableParametersReducer(
    state: DTParameters = initialState,
    action: AnyAction
): DTParameters {
    switch (action.type) {
        case actions.FILL_PARAMS:
            return {...state, ...action.payload};
        case actions.SET_PAGE:
            return {...state, CurrentPage: action.currentPage}
        case actions.SET_PAGE_SIZE:
            return {...state, PageSize: action.pageSize, CurrentPage: action.currentPage}
        case actions.SET_ORDER:
            return {...state, SortOrder: action.sortOrder, Order: action.order}
        default:
            return state;
    }
}