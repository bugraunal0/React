export interface ProductDetailWrapperModel{
    product: ProductModel,
    productDynamicList: Array<ProductDynamicModel>,
    productDashboardList: Array<ProductDashboardModel>
}


export interface ProductModel{
    id: number;
    name: string;
    age: number;
}

export interface ProductTimeSeriesDataModel{

    value: string,
    timeSeriesAttributeIdentityNumber: string,
    timeSeriesAttributeDisplayName: string,
    isTimeSeriesAttribute: boolean,
    isGeneralDashboard: boolean,
    productId: number,
    productDashboardItem : ProductDashboardModel
}

export interface ProductDynamicModel{

    id: number;
    name: string;
    age: number
}

export interface ProductDashboardModel{
    id: number;
    dashboardUrl: string,
    dashboardUrlIdentityNumber: string,
    dashboardUrlDisplayName: string,
    dashboardUrlHeader: string,
    isGeneralDashboard: boolean,
    productId: string
}


function props(props: any, Props: any) {
    throw new Error("Function not implemented.");
}
