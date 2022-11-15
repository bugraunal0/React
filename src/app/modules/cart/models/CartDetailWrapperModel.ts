export interface CartDetailWrapperModel{
    cart: CartModel,
    cartDynamicList: Array<CartDynamicModel>,
    cartDashboardList: Array<CartDashboardModel>
}


export interface CartModel{
    id: number;
    name: string;
    age: number;
}

export interface CartTimeSeriesDataModel{

    value: string,
    timeSeriesAttributeIdentityNumber: string,
    timeSeriesAttributeDisplayName: string,
    isTimeSeriesAttribute: boolean,
    isGeneralDashboard: boolean,
    cartId: number,
    cartDashboardItem : CartDashboardModel
}

export interface CartDynamicModel{

    id: number;
    name: string;
    age: number
}

export interface CartDashboardModel{
    id: number;
    dashboardUrl: string,
    dashboardUrlIdentityNumber: string,
    dashboardUrlDisplayName: string,
    dashboardUrlHeader: string,
    isGeneralDashboard: boolean,
    cartId: string
}


function props(props: any, Props: any) {
    throw new Error("Function not implemented.");
}
