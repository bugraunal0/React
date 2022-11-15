import * as actions from "./MTDatatableParametersType";
import {DTOrder, DTParameters} from "../MTDatatableModel";

export function fillParams(
    payload: DTParameters,
): actions.FillParamsAction {
    return {
        type: actions.FILL_PARAMS,
        payload: payload,
    };
}

export function setPage(
    currentPage: number,
): actions.SetPageAction {
    return {
        type: actions.SET_PAGE,
        currentPage: currentPage,
    };
}

export function setPageSize(
    pageSize: number,
    currentPage: number,
): actions.SetPageSizeAction {
    return {
        type: actions.SET_PAGE_SIZE,
        pageSize: pageSize,
        currentPage: currentPage,
    };
}

export function setSortOrder(
    sortOrder: string,
    order: Array<DTOrder>,
): actions.SetOrderAction {
    return {
        type: actions.SET_ORDER,
        sortOrder: sortOrder,
        order: order,
    };
}
